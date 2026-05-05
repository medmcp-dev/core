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
    seed-drugs.ts     # 8 drugs
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
- [x] Seed data: 100 dijagnoza, 8 lijekova, 16+ medical concepts, lab values
- [x] Symptom engine (rule-based differential diagnosis)
- [x] Waitlist endpoint
- [x] Dockerfile (multi-stage build)
- [x] Railway config (`railway.toml`)
- [x] GitHub auto-deploy pipeline

## U tijeku 🔄

- [ ] **Railway deployment debugging** — server se pokreće (logovi pokazuju startup na :8080) ali healthcheck pada → 502. Zadnji pokušaj: dodali `mkdir -p /data` u Dockerfile i `2>&1` redirect. Commit: `533794a`. Čeka se deploy rezultat.
- [x] **SDK parity (TS + Python)** — dodane metode za `lab` i `waitlist` u oba SDK-a:
  - TS (`sdk/src/client.ts`): `labGet`, `labList`, `labCategories`, `waitlistJoin`, `waitlistList`
  - TS tipovi (`sdk/src/types.ts`): `LabValue`, `LabListResult`, `LabCategoriesResult`, `WaitlistJoinResult`, `WaitlistListResult`
  - Python (`sdk-python/medmcp/client.py`): `lab_get`, `lab_list`, `lab_categories`, `waitlist_join`, `waitlist_list`
  - Python tipovi (`sdk-python/medmcp/types.py`): `LabValue`, `LabListItem`, `WaitlistEntry`

## Sljedeće 📋

- [ ] Stripe integracija (API key management, billing)
- [ ] Proširiti symptom engine — trenutno rule-based, mogući upgrade
- [ ] SDK-ovi — dodati testove, timeout/retry i release/publish flow (`npm` + `PyPI`)
- [ ] Dokumentacija / landing page
- [ ] Više seed data (drugs, interactions, ICD-11 kodovi — trenutno mali brojevi)

---

## Napomene

- Vlasnik medicinskih podataka je Bruno (med student) — uvijek potvrdi s njim točnost dijagnoza/lijekova
- Architekturalne odluke: Claude
- Komunikacija: hrvatski
- Landing page/website je napravljen preko Lovable (koristiti kao source-of-truth za web copy/branding dok se docs usklađuju).
