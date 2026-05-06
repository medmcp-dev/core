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
  examples/           # minimalni Node + Python bez lokalnog SDK builda
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
- Opcionalno observability/revizija u `/v1/health`: `MEDDATA_DATA_REVISION`, `MEDDATA_GIT_REVISION` (Railway često ima `RAILWAY_GIT_COMMIT_SHA` — već čitamo kao fallback). Za log health checkova: `LOG_HTTP_HEALTH=true`.
- **Auto-deploy:** svaki push na `main` → Railway automatski builda i deploya
- **Health check:** `/v1/health`, timeout 30s

Lokalno build + pokretanje:
```bash
npm run build
node dist/db/seed.js
node dist/http/server.js
```

---

## Runbook (brza dijagnostika)

### 502 / gateway upstream error
- U deploy logovima traži crash pri startu ili port mismatch: server mora slušati **`0.0.0.0`** i **`PORT`** iz enva (Railway ga postavlja).
- Provjeri izvana: `GET /v1/health` — ako ne odgovara, health check / proxy pada prije aplikacije.
- **SQLite na volumeu:** `DB_PATH` mora biti na montiranoj stazi (npr. `/data/meddata.db`). Ako put ne postoji ili nema prava na pisanje, startup ili seed može pasti.

### 503 „Service unavailable“ (npr. waitlist)
- Tipično greška oko DB inita ili nedostupnog diska pri `addToWaitlist` / čitanju waitliste — pogledaj stderr u logovima („Waitlist DB initialization failed“ ili slično).

### 401 Unauthorized
- Za zaštićene rute obavezno **`X-API-Key`** (isti ključ kao u SQLite `api_keys` tablici ili `MEDDATA_API_KEY` pri prvom pokretanju ako nije prethodno seedano).

### 429 Too many requests
- **Rate limit po IP-u:** `/v1/analyze` i `/v1/lab` ≈ **60/min**; `/v1/waitlist` ≈ **5/sat**. Sačekaj prozor ili smanji intenzitet testova — konfig je u `src/http/server.ts`.

### Logovi
- Za `/v1/*` (osim zadanog **GET `/v1/health`**) vide se linije `[http] METHOD path status …ms`. Za health ping u log postavi **`LOG_HTTP_HEALTH=true`**.

### Lokalna provjera
```bash
npm run build && node dist/http/server.js
npm run test:analyze
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
- [ ] Formalni medicinski review ciklus (tko odobrava nove seed/rule promjene, minimalni checklist po PR-u) — vidi **Medicinski review (Bruno)** ispod
- [ ] Jedna policy stranica: što proizvod **nije** (nije dijagnoza, nije osobni savjet bez konteksta)
- [x] Verzioniranje znanja — u `/v1/health`: `release` (semver), opc. `git_revision`, opc. **`MEDDATA_DATA_REVISION`** (postavi na Railwayu kad mijenjaš seed/pravila)

### 2) Developer experience (da te startupi biraju kao default)

- [x] HTTP API + MCP (stdio), JSON kontrakt, `/v1/schema` (+ `agent_tooling`, `X-MedMCP-*` zaglavlja na `/v1/*`, MCP prefiksi za tool opise)
- [x] SDK (TypeScript + Python) s lab/waitlist + timeout/retry na oba gdje ima smisla
- [x] README quickstart + quality gates + CI badge na repou
- [x] CI: core build, analyze testovi, TS SDK test, Python SDK test
- [x] Minimalni primjeri bez SDK builda: `examples/` (Node + Python, `analyze` + `lab`)
- [ ] Dalje: use-case copy (scribe, intake, copilot) ili zasebni starter repo
- [x] Jedan `CHANGELOG.md` / release notes proces prije širenja korisnika — vidi `CHANGELOG.md` + README
- [ ] Javni roadmap (što dolazi u 30/90 dana) usklađen s landingom (Lovable)

### 3) Dubina kliničkog sadržaja (perceived intelligence)

- [x] Bazni skup: dijagnoze, labs, ICD-11, lijekovi, interakcije (seed + MCP alati)
- [x] Proširenje seeda (lijevo mjesto za još: više ATC/klasa, više ICD, više DD pravila)
- [ ] Sinonimi / normalizacija teksta — kontinuirano proširenje bez lažnog preciznog matcha (zadnji batch u `src/analyze/text-normalizer.ts`)
- [ ] Jasno dokumentirani izvori i dopuštena upotreba (licence, vlastiti sadržaj, SME verify)
- [ ] Lokalizacija (EN kao default; HR copy gdje ima smisla za domaće pilote)

### 4) Pouzdanost, opservabilnost, sigurnost

- [x] Deploy (Railway) + health endpoint
- [x] Rate limit + API key na HTTP sloju
- [x] Bazni HTTP access log (`[http] …`) za `/v1/*` (health isključen osim `LOG_HTTP_HEALTH`); health vraća `release` + opc. `data_revision` / `git_revision`
- [ ] Mjerenje: p50/p95 latencija po ruti, error rate, rate-limit hit rate (centralizirani alat / APM)
- [x] Runbook: vidi sekciju **Runbook (brza dijagnostika)** u ovom fileu
- [x] Dependabot (npm core + sdk, pip sdk-python, github-actions)
- [ ] Secret scanning (GitHub u postavkama repoa); ručni pregled prije širenje repoa
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

1. **Ostalo po prioritetu:** release polish, observability (npr. p95 po ruti u logovima ili APM), performance baseline — kad Claude/Bruno dodijele cilj ili pilot traži konkretnu metriku.

### Nedavno završeno (backend — sink s `main`)

Najnovije (agent / dokumentacija):

- **HTTP za agente:** middleware `agentMetaHeaders` — na svakom `/v1/*` odgovoru `X-MedMCP-Schema-Version`, `X-MedMCP-Release`, opc. `X-MedMCP-Git-Revision` / `X-MedMCP-Data-Revision`; CORS `exposeHeaders` za browsere (`src/http/middleware/agentMetaHeaders.ts`, `src/http/server.ts`).
- **`GET /v1/schema`:** blok `agent_tooling` — positioning za buildere (MCP `medmcp`, popis endpointa, ograničenja, značenje zaglavlja) (`src/http/routes/schema.ts`).
- **MCP:** prefiks na svim tool `description` stringovima — tool-use / nije osobna klinička odluka (`src/index.ts`).
- **`CHANGELOG.md` + README:** proces izdanja; `@types/node` **^22** u core-u i SDK-u usklađeno s CI `node-version: 22`; `sdk/tsconfig` i dalje `lib` uključuje `DOM` radi TS 6 + `fetch` tipova gdje Node tipovi sami ne pokriju sve.

Ranije merging na `main` (sažeto):

- **Deps / CI:** GitHub Actions v6; Hono/Zod **4.x** (+ `analyze` `z.record` dva argumenta); TypeScript **6.x** (`package.json`, `sdk/`, lockfileovi).
- **Sadržaj / DX:** dodatni seed (npr. paracetamol, ibuprofen, interakcije, ICD `8A80`, `DB10`), još sinonima u text-normalizeru; **`npm run test:all`** (analyze + TS SDK + Python).
- **SDK parity:** TS + Python timeout/retry; lab/waitlist metode i testovi; zero-dependency **`examples/`**.
- **Testovi:** `npm run test:analyze` — risk-mapper unit + **`tests/analyze/symptom-engine.contract.test.mjs`** (privremeni `DB_PATH`, `seed()`, `analyzeSymptoms`).
- **Runbook:** sekcija u ovom dokumentu (**Runbook (brza dijagnostika)**); **Medicinski review (Bruno)** mini-checklist.

---

## Medicinski review (Bruno) — mini-checklist po PR-u

Koristi kad PR dira **`src/data/seed-*`**, **`src/analyze/`**, ili značajno **`src/tools/`** medicinski sadržaj:

- [ ] Jesu li kliničke tvrdnje u skladu s onim što želiš javno stajati iza (seed ≠ sveobuhvatna medicina)?
- [ ] Jesu li **severity** kod interakcija (mild/moderate/severe) i parovi lijekova smisleni?
- [ ] Treba li **ICD-11 kod** provjera u odnosu na službeni MMS prije širenja kao „izvor istine“?
- [ ] Nakon mergea na produkciju: postavi **`MEDDATA_DATA_REVISION`** na Railwayu na novu oznaku (npr. datum + kratki opis).

---

## Napomene

- Vlasnik medicinskih podataka je Bruno (med student) — uvijek potvrdi s njim točnost dijagnoza/lijekova
- Architekturalne odluke: Claude
- Komunikacija: hrvatski
- Landing page/website je napravljen preko Lovable (koristiti kao source-of-truth za web copy/branding dok se docs usklađuju).
