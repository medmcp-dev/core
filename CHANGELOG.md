# Changelog

All notable changes to this repository are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
for the **core** package version in the repo root (`package.json`).

## [Unreleased]

### Added

- **`ensureEnvApiKeyRegistered()`** — on HTTP startup, inserts `MEDDATA_API_KEY` into `api_keys` when set and missing (Railway env + volume).
- **`docs/ops-production-api-keys.md`**, **`scripts/railway-create-professor-key.{sh,ps1}`** — create keys on production `DB_PATH`, curl verify steps.

### Fixed

- **`X-API-Key`** header trimmed before validation (copy/paste whitespace).
- Documented **`403 Invalid API key`** vs health-without-key for professor/pilot onboarding (`docs/profesor-quickstart.md`).

### Added

- **`api_keys.plan`** (`default` \| `full` \| `custom`) with additive migration: legacy keys without `api_key_capabilities` rows stay **`full`** (unchanged access); keys that already had explicit capability rows become **`custom`**; **`createApiKey`** (including first bootstrapped dev key) uses **`default`** = `symptoms` + `labs` + `schema` only (`DEFAULT_PLAN_CAPABILITIES` in `src/http/capabilities.ts`).
- Admin CLI **`set-plan <key> default|full|custom`** (`src/scripts/api-keys-admin.ts`).
- **`GET /v1/schema`:** `default_plan_capabilities`, `capability_descriptions`, and when authenticated `key_plan` plus effective `key_capabilities`.

### Changed

- **`set-capabilities <key> all|clear`** now sets **plan `full`** and clears junction rows (same net access as before for `all`); a CSV still sets **plan `custom`** with that exact capability set.
- **`src/data/seed-labs.ts`:** normalised long `interpretation` / `clinical_notes` strings to **ASCII** (dashes, `>=`, `->`, `increased`/`decreased`/`low if`, `umol/L`, etc.) so JSON displays correctly in **Windows PowerShell 5** and other non-UTF-8 consoles; medical meaning preserved, wording slightly simplified in a few lipid statin lines.
- **Docker / Railway:** container start runs **`node dist/db/seed.js`** before **`node dist/http/server.js`** (idempotent `INSERT OR IGNORE`) so production SQLite on the volume receives new seed rows (e.g. expanded `lab_values`) after deploy without a manual one-off seed.

### Added

- **Lab seed data:** 33 additional `lab_values` entries in `src/data/seed-labs.ts` (electrolytes, metabolic, hepatic, haematology, cardiac, thyroid, coagulation) — reference-style copy intended from Harrison's Principles of Internal Medicine, 21st ed.; confirm with SME before treating as clinical truth.
- **Lab seed data:** 6 more entries — lipids (total cholesterol, LDL-C, HDL-C, triglycerides) and inflammatory (ESR, procalcitonin); same Harrison's 21e / SME review caveat.

### Documentation

- **README (Self-hosting → MCP)** — Claude Desktop / Cursor paths, `cwd` + `DB_PATH` example, HTTP vs MCP clarification, GitHub topic hints; **`examples/mcp-claude-desktop.snippet.json`** template and cross-link from **`examples/README.md`**.
- **`docs/roadmap-mcp-capabilities.md`** — capability surfaces (symptom, lab, imaging, oncology direction) + Clauda/Cursor checklists and product hints.

- **`docs/risk-classification-draft.md`** — pragmatic risk policy (**implementation** in `risk-mapper` **v2:** see **Changed** below; still update this doc if wording drifts).

- **`docs/gdpr.md`** — data categories, logging shapes, retention notes, controller / sub-processors (developer-facing summary); **Railway Amsterdam** + **~7 day** in-platform log retention documented for current production config.
- **`docs/policy.md`** — usage policy (ENG); Croatian summary moved to **`docs/policy-hr.md`**; playbook for Vercel/Lovable (**footer link**, HR paste) — **`docs/landing-lovable.md`**.

### Added

- Capability scaffolding for API-key segmentation: `api_key_capabilities` table, route-level capability middleware (`symptoms`, `labs`, `schema`, `waitlist_read`) and explicit `403 capability_not_enabled` contract.
- `api-keys` admin CLI commands for capability management: `capabilities` and `set-capabilities <csv|all|clear>`.
- **`npm run api-keys`** — SQLite admin za **create / list / revoke** HTTP ključeva (`src/scripts/api-keys-admin.ts`).
- **`docs/profesor-quickstart.md`** — copy/paste **PowerShell / curl** za `POST /v1/analyze` + napomena za zaseban ključ i rotaciju.
- HTTP observability: optional JSON request logs (`LOG_HTTP_JSON=true`) and rolling-window **`[http-metrics]`** summaries with per-route **p50 / p95** latency plus **429 / 5xx / 4xx** counts (period controlled by **`MEDDATA_HTTP_METRICS_INTERVAL_SEC`**).
- HTTP middleware adds `X-MedMCP-*` response headers on all `/v1/*` routes (schema version, release, optional git/data revision); CORS `exposeHeaders` for browser clients.
- `GET /v1/schema` includes `agent_tooling` (positioning, MCP name, endpoint index, limitations, header meanings).
- MCP tool descriptions prefixed for agent hosts: structured facts for tool-calling, not individualized clinical decisions.
- Symptom **risk mapper** expanded with additional **critical** and **high** symptom clusters (`src/analyze/risk-mapper.ts`).
- **`POST /v1/analyze` response (`type=symptom`)**: additive `signals[]` field (`risk_driver`, `differential`, `symptom_match`) alongside `interpretation` (`src/analyze/symptom-engine.ts`).
- **`GET /v1/schema`** `output` JSON schema documents `signals`.
- SDK parity: **`AnalyzeResult.signals`** in TypeScript (`sdk/src/types.ts`) and Python (`sdk-python/medmcp/types.py`), with Python client parsing when present (defaults to `[]` against older cores).

### Changed

- **HTTP `GET /`** — returns a small JSON index (links to `/v1/health`, `/v1/schema`, `/v1/analyze`) so opening only the Railway host in a browser is not a bare `Not found`.

- **`feat(analyze): risk-mapper v2`** — calibrated `critical`/`high`/`medium` heuristics aligned with B2B infra positioning (solo reclassifications: **haemoptysis** HIGH, **FAST** signs + **arm weakness**/**sudden vision loss**/**seizure** HIGH, **palpitations**/**hypotension** medium tier; new stroke/PE/septic/focal clusters; **aggregate point HIGH** requires anchoring HIGH/CRITICAL source; **generic headache** strings no longer inflate risk via removed thunderclap/WOL synonyms on `headache`). Seizure explanatory copy in **`signals[]`**. See PR body + **`docs/risk-classification-draft.md`**.
- HTTP rollup metrics run **every 60 seconds by default** when **`NODE_ENV=production`** (e.g. Railway / production Docker images) unless **`MEDDATA_HTTP_METRICS_INTERVAL_SEC`** is set; set it to **`0`** to disable.
- DevDependency `@types/node` set to `^22` in the core package and in `sdk/` so typings match CI (`node-version: "22"`).

## [0.1.0] — 2026-05-06

### Added

- HTTP `/v1` API (Hono): health, schema, analyze (symptom), lab, waitlist; API key auth and rate limiting.
- MCP server **`medmcp`** (stdio) with medical tools backed by SQLite.
- Rule-based symptom analysis (differential + risk levels, cluster rules).
- SQLite schema, migrations, and seed data (diagnoses, labs, drugs, interactions, ICD-11 samples, concepts).
- TypeScript SDK (`sdk/`) and Python SDK (`sdk-python/`) with timeout/retry, lab and waitlist helpers.
- `npm run test:all` — core analyze tests, then TS SDK tests, then Python `unittest`.
- Zero-dependency examples under `examples/` (Node and Python).

### Changed

- CI: GitHub Actions `checkout` / `setup-node` / `setup-python` updated to **v6**.
- Runtime dependencies: **Hono** 4.12.x, **Zod** 4.x; **TypeScript** 6.x for builds.
- Zod 4: analyze route uses `z.record(z.string(), z.unknown())` for request `data` objects.

### Documentation

- README quality gates and CI badge; `CLAUDE.md` roadmap and SME mini-checklist (Bruno).
