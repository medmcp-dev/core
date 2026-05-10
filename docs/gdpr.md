# Data & Privacy (GDPR summary)

Summary for developers and **B2B integrators**. MedMCP is **not marketed as a consumer product** — this document is **not** a standalone replacement for lawyer-written Privacy Policy pages if your own product requires them.

MedMCP is operated by Bruno Babić as an individual (see **`[policy.md](./policy.md)`** — Operator).

## What MedMCP stores

| Data | Where | Purpose |
|------|-------|---------|
| API secrets (`X-API-Key` values) | SQLite `api_keys` table on the Railway volume (`DB_PATH`) | Authentication; **`last_used_at` updated on successful use** |
| Waitlist emails | SQLite `waitlist` table | Early-access sign-ups |
| Seeded clinical reference data | SQLite (diagnoses, drugs, ICD-11 samples, etc.) | Deterministic reasoning — **no personal data** |

**API keys:** stored **as provided** for equality checks (plaintext in SQLite). Protect the database file (**volume encryption / access control** is Railway + account hygiene). Planned improvement: migrate to salted hash + constant-time comparison (not implemented today).

### Application logging (Railway stdout)

| Shape | Typical content | Personal data in app-defined fields |
|-------|-----------------|-------------------------------------|
| Default `[http] …` | `METHOD`, path, HTTP status, duration | Path only (no request body); **does not emit IP or User-Agent by default** |
| Optional `LOG_HTTP_JSON=true` | Same dimensions as JSON (`msg`, `method`, `path`, `status`, …) | Same — **no body** logged |
| Optional `[http-metrics] …` | Aggregates per interval (counts, **p50/p95** per route) | **Aggregated** counts / latencies |

**Clinical / symptom payloads:** `POST /v1/analyze` body is processed **in memory** — **not** written to SQLite and **not** included in MedMCP’s normal HTTP log middleware.

### What your infrastructure provider may still see

Railway (and upstream networks) **may retain access logs, IP addresses, or TLS metadata** at the platform or edge layer outside this Node process — still applies even when the workload runs in the **EU (Amsterdam)** region below. Confirm details in Railway’s docs and project settings; surface what your customers need if you act as controller toward end users.

## What MedMCP does **not** intentionally store (in app DB / app logs)

- Patient identifiers or free-text clinical input from API calls (symptom strings, etc.)
- User-Agent or client IP **inside** the described application log lines (rate limiting uses IP **in memory** for throttling only; it is **not** persisted to SQLite by this codebase)

## Data controller

**Bruno Babić** — brunobabic019@gmail.com

## Sub-processors (typical stack)

| Provider | Role | Notes |
|----------|------|--------|
| **Railway** | Hosting, compute, optional volume for SQLite | **Region:** production API is deployed in **`Amsterdam`** (Railway EU). Update this row if you change regions. |
| **GitHub** | Source code, CI | US / global infrastructure per GitHub policies |

**If you add a log drain** (Datadog, Axiom, Logtail, etc.): treat the vendor as an additional **sub-processor** — sign their DPA if required, list them in customer-facing privacy docs, and document **what** is forwarded (often full stdout, still without analyze bodies if you only run our logger).

**Marketing site** (e.g. Vercel / Lovable): separate stack from the API; list separately if you collect analytics or waitlist there under different terms.

## Retention (practical defaults)

| Item | Default / guidance |
|------|-------------------|
| API keys | Until **manually removed** from `api_keys` |
| Waitlist emails | Until **deleted** on request or list cleared |
| Railway **in-platform** deploy logs (Log Explorer) | **~7 days** on the current account configuration (typical Railway **Hobby-style** default). If you upgrade plans, Railway may expose **longer** in-platform retention — **revisit this row** and your customer-facing text. |
| Longer log history | Requires **log drain** to your storage + your retention policy |

## Requests (data subject / integrator hygiene)

For **waitlist deletion** or **API key lifecycle** questions: **brunobabic019@gmail.com**

If an integrator’s end user contacts you: responsibility is usually **shared / layered** — your customer is often controller for their app; document that in your B2B agreement.

---

## Operational notes (answers to common open questions)

1. **Railway region** — Documented here as **Amsterdam** to match the configured production deployment. If you move regions, edit the sub-processor table and any DPA / transfer narratives you publish.

2. **Log drain** — Add one when you need **> ~7 days**, **security investigations**, or **aggregated SLO reporting**. Each new vendor = **sub-processor** + DPA checklist + update this summary.

3. **Is ~7 days “enough”?** — Reasonable for early-stage **abuse debugging** and triage on Railway’s built-in logs. For **longer audit trails** or **legal hold**, add a **drain** and your own retention policy. Align what you promise with what the platform actually retains.
