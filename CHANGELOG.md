# Changelog

All notable changes to this repository are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
for the **core** package version in the repo root (`package.json`).

## [Unreleased]

### Documentation

- **`docs/roadmap-mcp-capabilities.md`** — capability surfaces (symptom, lab, imaging, oncology direction) + Clauda/Cursor checklists and product hints.

- **`docs/risk-classification-draft.md`** — pragmatic risk policy (**implementation** in `risk-mapper` **v2:** see **Changed** below; still update this doc if wording drifts).

- **`docs/gdpr.md`** — data categories, logging shapes, retention notes, controller / sub-processors (developer-facing summary); **Railway Amsterdam** + **~7 day** in-platform log retention documented for current production config.
- **`docs/policy.md`** — usage policy (ENG); Croatian summary moved to **`docs/policy-hr.md`**; playbook for Vercel/Lovable (**footer link**, HR paste) — **`docs/landing-lovable.md`**.

### Added

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
