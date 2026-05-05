/**
 * Syncs ICD-11 data from the WHO ICD-11 API into local SQLite.
 *
 * Requires free registration at https://icd.who.int/icdapi/
 * Set in .env:
 *   ICD11_CLIENT_ID=...
 *   ICD11_CLIENT_SECRET=...
 */
import "dotenv/config";
import { getDb, initSchema } from "../db/database.js";
const TOKEN_URL = "https://icdaccessmanagement.who.int/connect/token";
const API_BASE = "https://id.who.int/icd/release/11/2024-01/mms";
const CLIENT_ID = process.env.ICD11_CLIENT_ID;
const CLIENT_SECRET = process.env.ICD11_CLIENT_SECRET;
const SEARCH_SEEDS = [
    { query: "myocardial infarction", category: "cardiovascular" },
    { query: "heart failure", category: "cardiovascular" },
    { query: "ischaemic stroke", category: "neurological" },
    { query: "pneumonia", category: "respiratory" },
    { query: "asthma", category: "respiratory" },
    { query: "chronic obstructive pulmonary disease", category: "respiratory" },
    { query: "type 2 diabetes", category: "endocrine" },
    { query: "hypothyroidism", category: "endocrine" },
    { query: "acute kidney injury", category: "renal" },
    { query: "sepsis", category: "infectious" },
    { query: "deep vein thrombosis", category: "cardiovascular" },
    { query: "pulmonary embolism", category: "cardiovascular" },
    { query: "acute appendicitis", category: "gastrointestinal" },
    { query: "peptic ulcer disease", category: "gastrointestinal" },
    { query: "Crohn disease", category: "gastrointestinal" },
    { query: "depressive episode", category: "psychiatric" },
    { query: "generalised anxiety", category: "psychiatric" },
    { query: "epilepsy", category: "neurological" },
    { query: "Parkinson disease", category: "neurological" },
    { query: "rheumatoid arthritis", category: "rheumatological" },
];
// ── Token ────────────────────────────────────────────────────────────────────
let cachedToken = null;
let tokenExpiry = 0;
async function getToken() {
    if (cachedToken && Date.now() < tokenExpiry - 30_000)
        return cachedToken;
    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: "icdapi_access",
            grant_type: "client_credentials",
        }),
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Token request failed (${res.status}): ${body.slice(0, 300)}`);
    }
    const data = (await res.json());
    cachedToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000;
    console.log("  Token obtained OK.");
    return cachedToken;
}
// ── API ──────────────────────────────────────────────────────────────────────
async function apiGet(path) {
    const token = await getToken();
    const url = `${API_BASE}${path}`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "API-Version": "v2",
            "Accept-Language": "en",
        },
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`API ${res.status} ${url}\n  ${body.slice(0, 300)}`);
    }
    return res.json();
}
async function search(query, flex) {
    const params = new URLSearchParams({
        q: query,
        useFlexisearch: String(flex),
        flatResults: "true",
    });
    const data = await apiGet(`/search?${params}`);
    return data.destinationEntities ?? [];
}
// WHO search API returns titles with HTML highlight tags — strip them.
// Also handles cases where title is a plain string vs { "@value": string }.
function extractTitle(title) {
    if (!title)
        return null;
    let raw;
    if (typeof title === "string")
        raw = title;
    else if (typeof title === "object" && "@value" in title)
        raw = title["@value"] ?? "";
    else
        return null;
    return raw.replace(/<[^>]+>/g, "").trim() || null;
}
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
function joinLabels(items) {
    return items?.length
        ? items.map((i) => i.label["@value"]).join("; ")
        : null;
}
// ── Sync ─────────────────────────────────────────────────────────────────────
async function syncICD11() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.error("Set ICD11_CLIENT_ID and ICD11_CLIENT_SECRET in .env\n" +
            "Register free at https://icd.who.int/icdapi/");
        process.exit(1);
    }
    initSchema();
    const db = getDb();
    const upsertExisting = db.prepare(`
    UPDATE icd11_codes SET
      title           = @title,
      description     = COALESCE(@description, description),
      inclusion_terms = COALESCE(@inclusion_terms, inclusion_terms),
      exclusion_terms = COALESCE(@exclusion_terms, exclusion_terms),
      source          = 'who_icd11',
      updated_at      = datetime('now')
    WHERE code = @code
  `);
    const insertNew = db.prepare(`
    INSERT OR IGNORE INTO icd11_codes
      (code, title, description, inclusion_terms, exclusion_terms, category, source, updated_at)
    VALUES (@code, @title, @description, @inclusion_terms, @exclusion_terms, @category, 'who_icd11', datetime('now'))
  `);
    // ── Connectivity check ────────────────────────────────────────────────────
    console.log("Checking WHO API connectivity…");
    try {
        const entities = await search("diabetes mellitus", false);
        console.log(`  OK — search returned ${entities.length} entities.\n`);
    }
    catch (e) {
        console.error("  FAILED:", e.message);
        console.error("\nFix the above error and retry.");
        process.exit(1);
    }
    // ── Phase 1: Update existing codes (search by title, validate by code) ────
    const existing = db
        .prepare("SELECT code, title FROM icd11_codes ORDER BY code")
        .all();
    console.log(`Phase 1: Updating ${existing.length} existing codes…`);
    let updated = 0;
    for (const row of existing) {
        process.stdout.write(`  ${row.code.padEnd(8)}`);
        try {
            const entities = await search(row.title, true);
            // Exact code match first; fallback to entity whose code starts with ours
            const match = entities.find((e) => e.theCode?.toUpperCase() === row.code.toUpperCase()) ??
                entities.find((e) => e.theCode?.toUpperCase().startsWith(row.code.toUpperCase()));
            if (!match) {
                const sample = entities
                    .slice(0, 5)
                    .map((e) => e.theCode ?? "?")
                    .join(", ");
                console.log(`→ no code match. Top codes: [${sample}]`);
            }
            else {
                const title = extractTitle(match.title) ?? row.title;
                upsertExisting.run({
                    code: row.code,
                    title,
                    description: extractTitle(match.definition) ?? null,
                    inclusion_terms: joinLabels(match.inclusion),
                    exclusion_terms: joinLabels(match.exclusion),
                });
                console.log(`→ ${title.slice(0, 55)}`);
                updated++;
            }
        }
        catch (e) {
            console.log(`→ error: ${e.message.split("\n")[0]}`);
        }
        await sleep(350);
    }
    // ── Phase 2: Discover new codes from keyword seeds ────────────────────────
    console.log(`\nPhase 2: Discovering codes from ${SEARCH_SEEDS.length} keywords…`);
    let newCodes = 0;
    for (const { query, category } of SEARCH_SEEDS) {
        process.stdout.write(`  "${query}" → `);
        try {
            const entities = await search(query, true);
            // Filter to entities that have a code, then take up to 6
            const coded = entities.filter((e) => !!e.theCode).slice(0, 6);
            let added = 0;
            for (const e of coded) {
                const title = extractTitle(e.title);
                if (!title)
                    continue;
                const result = insertNew.run({
                    code: e.theCode,
                    title,
                    // Search results don't include definition — fall back to title
                    // to satisfy the NOT NULL constraint on description
                    description: extractTitle(e.definition) ?? title,
                    inclusion_terms: joinLabels(e.inclusion),
                    exclusion_terms: joinLabels(e.exclusion),
                    category,
                });
                if (result.changes > 0) {
                    added++;
                    newCodes++;
                }
            }
            const sampleCodes = coded.slice(0, 3).map((e) => e.theCode).join(", ");
            console.log(`${added} new [${coded.length} with codes, e.g. ${sampleCodes}]`);
        }
        catch (e) {
            console.log(`error: ${e.message.split("\n")[0]}`);
        }
        await sleep(300);
    }
    console.log(`\nDone. Phase 1 updated: ${updated}/${existing.length} | Phase 2 new: ${newCodes}`);
}
syncICD11().catch((e) => {
    console.error("Sync failed:", e.message);
    process.exit(1);
});
//# sourceMappingURL=sync-icd11.js.map