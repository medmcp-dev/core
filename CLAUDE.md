# MedData API — Project Context

## Što je ovo
Medical reasoning API za AI agente. Ima dva moda:
- **MCP server** (stdio) — za Claude Desktop / Claude Code
- **HTTP REST API** — za vanjske klijente (Stripe-like developer API)

Stack: Node.js + TypeScript, Hono, better-sqlite3, Zod. Deploya na Railway.

---

## Arhitektura

```
src/
  index.ts            # MCP server entry (stdio)
  http/server.ts      # HTTP server entry (Hono, port $PORT)
  db/
    database.ts       # SQLite singleton, schema, migrations
    seed.ts           # Puni bazu iz seed-* fileova
  data/
    seed-concepts.ts  # 16+ medical concepts
    seed-drugs.ts     # proširen set lijekova
    seed-interactions.ts
    seed-icd11.ts
    seed-diagnoses.ts # 100 diagnoses
    seed-labs.ts
  tools/              # MCP tool handlers
  analyze/            # Symptom engine (rule-based, bez LLM-a)
  http/
    routes/           # health, schema, analyze, lab, waitlist
    middleware/       # auth (X-API-Key), rateLimit
  sync/               # sync-drugs.ts, sync-icd11.ts (external data)
```

## HTTP endpointi

| Method | Path | Auth | Opis |
|--------|------|------|------|
| GET | `/v1/health` | — | Health check |
| GET | `/v1/schema` | ✓ | API schema/docs |
| POST | `/v1/analyze` | ✓ | Symptom analysis (type: "symptom") |
| GET | `/v1/lab` | ✓ | Lab value lookup |
| POST | `/v1/waitlist` | — | Join waitlist |
| GET | `/v1/waitlist` | ✓ | List waitlist |

Auth: `X-API-Key` header. Key se generira automatski pri prvom pokretanju ako `MEDDATA_API_KEY` env var nije postavljen.

## Railway deployment

- **URL:** `https://core-production-389e.up.railway.app`
- **Volume:** montiran na `/data`, DB na `/data/meddata.db`
- **Env vars:** `DB_PATH=/data/meddata.db`, `PORT` (Railway injektira), `MEDDATA_API_KEY` (opcionalno)
- **Auto-deploy:** svaki push na `main` → Railway automatski builda i deploya
- **Health check:** `/v1/health`, timeout 30s

Lokalno build + pokretanje:
```bash
npm run build
node dist/db/seed.js
node dist/http/server.js
```

---

## Napravljeno ✅

- [x] MCP server s 5 alata (medical_concept, drug_info, drug_interactions, icd11_code, lab_value, differential_diagnosis)
- [x] HTTP REST API (Hono) s auth middleware i rate limitingom
- [x] SQLite baza s kompletnom schemom + migracijama
- [x] Seed data: 100 dijagnoza, proširen skup lijekova/interakcija/ICD-11, concepts, lab values
- [x] Symptom engine (rule-based differential diagnosis)
- [x] Waitlist endpoint
- [x] Dockerfile (multi-stage build)
- [x] Railway config (`railway.toml`)
- [x] GitHub auto-deploy pipeline

## U tijeku 🔄

- [x] **Railway** — stabilan deploy (lazy DB init i sl.; provjeri `main`).
- [x] **SDK parity (TS + Python)** — dodane metode za `lab` i `waitlist` u oba SDK-a:
  - TS (`sdk/src/client.ts`): `labGet`, `labList`, `labCategories`, `waitlistJoin`, `waitlistList`
  - TS tipovi (`sdk/src/types.ts`): `LabValue`, `LabListResult`, `LabCategoriesResult`, `WaitlistJoinResult`, `WaitlistListResult`
  - Python (`sdk-python/medmcp/client.py`): `lab_get`, `lab_list`, `lab_categories`, `waitlist_join`, `waitlist_list`
  - Python tipovi (`sdk-python/medmcp/types.py`): `LabValue`, `LabListItem`, `WaitlistEntry`

## Sljedeće 📋 (općenito)

- [ ] Stripe integracija (API key management, billing) — kad bude vrijeme
- [ ] Daljnji symptom engine (više pravila, medicinski review)
- [x] Python SDK: timeout/retry parity s TS SDK-om
- [x] Dokumentacija / README (CI badge, quality gates)
- [ ] Dodatni seed / sync za drugs, ICD-11, interactions

---

## Checklista: cilj — default medicinski sloj (MCP + HTTP) za AI startupove

Koristi kao roadmap: što već imaš vs što diže povjerenje developera i kliničara. Ažuriraj kvačice kad nešto završi ili promijeni prioritet.

### 1) Trust & sigurnost signala

- [x] Deterministički put (rule-based symptom engine bez LLM-a u jezgri `/v1/analyze`)
- [x] Jasna klasifikacija rizika + cluster pravila + „Risk drivers” u tekstu (uz medicinski review)
- [ ] Formalni medicinski review ciklus (tko odobrava nove seed/rule promjene, minimalni checklist po PR-u)
- [ ] Jedna policy stranica: što proizvod **nije** (nije dijagnoza, nije osobni savjet bez konteksta)
- [ ] Verzioniranje znanja (npr. `data_revision` ili tag u `/v1/health`) da se zna koja je pravila/skup podataka aktivna

### 2) Developer experience (da te startupi biraju kao default)

- [x] HTTP API + MCP (stdio), JSON kontrakt, `/v1/schema`
- [x] SDK (TypeScript + Python) s lab/waitlist + timeout/retry na oba gdje ima smisla
- [x] README quickstart + quality gates + CI badge na repou
- [x] CI: core build, analyze testovi, TS SDK test, Python SDK test
- [ ] „5 minuti do prvog poziva”: minimalni starter repo ili Copy-paste sekcije po use-caseu (scribe, intake, copilot)
- [ ] Jedan `CHANGELOG.md` / release notes proces prije širenja korisnika
- [ ] Javni roadmap (što dolazi u 30/90 dana) usklađen s landingom (Lovable)

### 3) Dubina kliničkog sadržaja (perceived intelligence)

- [x] Bazni skup: dijagnoze, labs, ICD-11, lijekovi, interakcije (seed + MCP alati)
- [x] Proširenje seeda (lijevo mjesto za još: više ATC/klasa, više ICD, više DD pravila)
- [ ] Sinonimi / normalizacija teksta — kontinuirano proširenje bez lažnog preciznog matcha
- [ ] Jasno dokumentirani izvori i dopuštena upotreba (licence, vlastiti sadržaj, SME verify)
- [ ] Lokalizacija (EN kao default; HR copy gdje ima smisla za domaće pilote)

### 4) Pouzdanost, opservabilnost, sigurnost

- [x] Deploy (Railway) + health endpoint
- [x] Rate limit + API key na HTTP sloju
- [ ] Mjerenje: p50/p95 latencija po ruti, error rate, rate-limit hit rate (barem log-based na početku)
- [ ] Runbook: što raditi kad 502/DB lock/rate limit storm
- [ ] Secret scanning / dependabot / osnovni security checklist prije „public beta”
- [ ] GDPR flow (što se logira, retention) — kratki doc, ne roman

### 5) Tržište i „moat” (zašto baš ti)

- [x] Online referenca: website (Lovable) + core repo
- [ ] Jedna rečenica ICP + 3 use-case rečenice (Claude zadatak → uskladiti README + landing)
- [ ] 5–10 ciljanih startupova + 2 pilot integracije + 1 javni case study (čak i kratki)
- [ ] Pricing v1 i free tier koji ne ubija troškove API-ja
- [ ] (Kasnije) Stripe / billing kad prođe traction faza koju sama odrediš

### 6) Faze (grubo vrijeme — prilagodi sebi)

**0–8 tjedana:** CI + SDK + dokumentacija + stalno širenje seeda/pravila + prvi piloti.  
**3–6 mjeseci:** observability, SLA mindset, SME review rutina, jedan jak case study.  
**6–12 mjeseci:** enterprise-ready signal (billing, pravni okvir, eventualni compliance put za US ako treba).

---

## Suradnja: Claude vs Cursor (backend agent)

**Pravilo:** Claude vodi **arhitekturu, proizvod i medicinsku/stratešku odluku**. Cursor-agent (Composer) izvršava **implementaciju, testove, CI i ship** u kodu.

- **Ne raditi paralelno** isti file bez dogovora; jedna strana definira cilj → druga merga.
- Nakon svake veće cjeline: sink `main`, ažuriraj ovaj podlist ako se prioriteti promijene.

### Sljedeći zadaci za **Claude** (čitati i držati se redoslijeda ako nije drugačije dogovoreno)

1. **Symptom / risk pravila:** Definiraj sljedeći set (prioritet + opravdanje): koje još “cluster” kombinacije ulaze u `critical` / `high`, što ostaje izvan automatike.
2. **Medicinski review:** Lista seed sadržaja koji mora Bruno eksplicitno potvrditi prije širenja kao “clinical truth”.
3. **API / proizvod:** Verzioniranje (`/v1` vs breaking changes), i hoće li `interpretation` polje ostati tekst ili treba strukturiran `signals[]` u v2.
4. **GTM niša:** Jedna rečenica ICP-a + tri use-case rečenice za startupove — da se README i docs usklade.

### Sljedeći zadaci za **Cursor-agenta / backend**

1. **Ostalo po prioritetu:** release polish, observability, performance baseline.

### Nedavno završeno (backend)

- **Python SDK parity:** `timeout_ms`, `max_retries`, `retry_delay_ms` (isti defaulti kao TS; retry 429/5xx; timeout → `RuntimeError` kao TS).
- **README:** CI badge + sekcija „Quality gates”.
- **Contract test:** `tests/analyze/symptom-engine.contract.test.mjs` — privremeni `DB_PATH`, `seed()`, pa `analyzeSymptoms` (oblika odgovora + critical/high scenariji). Vrti se s `npm run test:analyze`.

### Gotovo nedavno (referenca za sync)

- SDK lab/waitlist, TS timeout/retry, SDK testovi, seed proširenje, symptom risk v1.1, `npm run test:analyze`, GitHub Actions CI.

---

## Napomene

- Vlasnik medicinskih podataka je Bruno (med student) — uvijek potvrdi s njim točnost dijagnoza/lijekova
- Architekturalne odluke: Claude
- Komunikacija: hrvatski
- Landing page/website je napravljen preko Lovable (koristiti kao source-of-truth za web copy/branding dok se docs usklađuju).
