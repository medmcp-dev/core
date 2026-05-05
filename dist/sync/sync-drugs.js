/**
 * Syncs drug data from OpenFDA Drug Label API into local SQLite.
 * Fetches each drug already in the database and enriches it with
 * official FDA label data (mechanism, indications, dosing, etc.).
 *
 * Rate limits:
 *   Without API key : 1 000 req/day,  ~40/min
 *   With API key    : 120 000 req/day, ~240/min
 *
 * Set OPENFDA_API_KEY env var to raise limits.
 * Docs: https://open.fda.gov/apis/drug/label/
 */
import "dotenv/config";
import { getDb, initSchema } from "../db/database.js";
const OPENFDA_BASE = "https://api.fda.gov/drug/label.json";
const API_KEY = process.env.OPENFDA_API_KEY;
const DELAY_MS = API_KEY ? 300 : 1600; // stay well within rate limits
async function fetchLabel(drugName) {
    // OpenFDA indexes names in uppercase; substance_name catches e.g. "AMOXICILLIN TRIHYDRATE"
    const searchTerm = `openfda.generic_name:"${drugName}" OR openfda.brand_name:"${drugName}" OR openfda.substance_name:"${drugName}"`;
    const params = new URLSearchParams({
        search: searchTerm,
        limit: "1",
        ...(API_KEY ? { api_key: API_KEY } : {}),
    });
    const res = await fetch(`${OPENFDA_BASE}?${params}`);
    if (res.status === 404)
        return null; // no results — not an error
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`OpenFDA HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    const data = (await res.json());
    return data.results?.[0] ?? null;
}
function cap(arr, maxLen = 1800) {
    if (!arr?.length)
        return null;
    const text = arr[0].replace(/\s+/g, " ").trim();
    return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
}
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
async function syncDrugs() {
    initSchema();
    const db = getDb();
    const drugs = db
        .prepare("SELECT id, name, generic_name FROM drugs ORDER BY name")
        .all();
    console.log(`Found ${drugs.length} drugs to sync from OpenFDA…`);
    if (API_KEY) {
        console.log("Using API key — higher rate limits active.");
    }
    else {
        console.log("No OPENFDA_API_KEY set — using anonymous limits (1000 req/day).");
    }
    const upsert = db.prepare(`
    UPDATE drugs SET
      mechanism        = COALESCE(@mechanism, mechanism),
      indications      = COALESCE(@indications, indications),
      contraindications= COALESCE(@contraindications, contraindications),
      side_effects     = COALESCE(@side_effects, side_effects),
      dosing           = COALESCE(@dosing, dosing),
      generic_name     = COALESCE(@generic_name, generic_name),
      drug_class       = COALESCE(@drug_class, drug_class),
      source           = 'openfda',
      updated_at       = datetime('now')
    WHERE id = @id
  `);
    let updated = 0;
    let notFound = 0;
    let errors = 0;
    for (const drug of drugs) {
        process.stdout.write(`  ${drug.name.padEnd(20)}`);
        try {
            const label = await fetchLabel(drug.generic_name ?? drug.name);
            if (!label) {
                console.log("→ not found in OpenFDA");
                notFound++;
            }
            else {
                upsert.run({
                    id: drug.id,
                    mechanism: cap(label.mechanism_of_action),
                    indications: cap(label.indications_and_usage),
                    contraindications: cap(label.contraindications) ?? cap(label.warnings_and_cautions),
                    side_effects: cap(label.adverse_reactions),
                    dosing: cap(label.dosage_and_administration),
                    generic_name: label.openfda?.generic_name?.[0] ?? null,
                    drug_class: label.openfda?.pharm_class_epc?.[0] ?? null,
                });
                console.log("→ updated");
                updated++;
            }
        }
        catch (e) {
            console.log(`→ error: ${e.message}`);
            errors++;
        }
        await sleep(DELAY_MS);
    }
    console.log(`\nDone. Updated: ${updated}, Not found: ${notFound}, Errors: ${errors}`);
}
syncDrugs().catch((e) => {
    console.error("Sync failed:", e);
    process.exit(1);
});
//# sourceMappingURL=sync-drugs.js.map