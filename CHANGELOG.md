# Changelog

All notable changes to this repository are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
for the **core** package version in the repo root (`package.json`).

## [Unreleased]

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
