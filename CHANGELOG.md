# Changelog

All notable changes to this repository are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
for the **core** package version in the repo root (`package.json`).

## [Unreleased]

### Added

- HTTP middleware adds `X-MedMCP-*` response headers on all `/v1/*` routes (schema version, release, optional git/data revision); CORS `exposeHeaders` for browser clients.
- `GET /v1/schema` includes `agent_tooling` (positioning, MCP name, endpoint index, limitations, header meanings).
- MCP tool descriptions prefixed for agent hosts: structured facts for tool-calling, not individualized clinical decisions.
- Symptom **risk mapper** expanded with additional **critical** and **high** symptom clusters (`src/analyze/risk-mapper.ts`).
- **`POST /v1/analyze` response (`type=symptom`)**: additive `signals[]` field (`risk_driver`, `differential`, `symptom_match`) alongside `interpretation` (`src/analyze/symptom-engine.ts`).
- **`GET /v1/schema`** `output` JSON schema documents `signals`.
- SDK parity: **`AnalyzeResult.signals`** in TypeScript (`sdk/src/types.ts`) and Python (`sdk-python/medmcp/types.py`), with Python client parsing when present (defaults to `[]` against older cores).

### Changed

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
