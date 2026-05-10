# Medical review process

Every PR that touches `src/data/seed-*`, `src/analyze/`, or `src/tools/`  
(medical content) requires explicit sign-off from **Bruno Babić** before merge.

Architecture, infra, SDK, and docs PRs do not require medical review unless they materially change clinical claims surfaced to users.

## PR checklist (author)

Before requesting review on a medically relevant PR, confirm:

- [ ] Clinical claims match what you are willing to stand behind publicly  
      (seed data ≠ comprehensive medicine — scope is clearly bounded)
- [ ] Drug interaction severity labels (mild / moderate / severe) and pairs are defensible
- [ ] Any new ICD-11 codes have been cross-checked against the official [ICD-11 MMS browser](https://icd.who.int/browse)
- [ ] `MEDDATA_DATA_REVISION` is updated on Railway after the deploy lands  
      (format: `YYYY-MM-DD-short-description`, e.g. `2026-05-10-add-warfarin-interactions`)

## Review flow

1. Open a PR with the label **`medical-review`** when it touches medical content.
2. Mention **(@brunobabic019)** in the PR description or request review .
3. Bruno leaves a GitHub comment: **`medical: approved`** or requests changes.
4. Only after **`medical: approved`** may that PR be merged.

**Review channel:** GitHub on the PR is sufficient. Other channels can be informal; the PR comment remains the authoritative record.

**Reviewers:** For now Bruno is the only required medical reviewer. If a second clinician or SME is added later, update this doc and the checklist.

## What this process does NOT cover

- Completeness — the dataset is explicitly not a comprehensive clinical reference.
- Real-time guideline updates — seed data reflects the state at the time of authoring.
- Individual patient advice — the API is infrastructure for agents, not end-user clinical software.

## Data provenance and liability (informational — not legal advice)

**Pointing to external databases alone does not make clinical or product liability “disappear”.** Licenses and citations matter for **reuse, attribution, and copyright** — they do not automatically shield you when **you choose what to ingest, simplify, recombine in rules**, and **ship under your API / product**.

What actually helps commercially and legally over time usually combines several layers:

- **Contracts and product positioning** — clear Terms / acceptable use stating the product does not diagnose or treat individuals and is not professional medical advice unless you consciously build regulated software (then you step into a different regime and need specialised counsel).
- **Disclaimers in API / docs / schema copy** aligned with truth — honesty reduces mismatch between marketing and technical reality.
- **Traceability** — document *which* official or licensed sources each seed area is derived from; it supports good practice and argumentation, not a magic shield.
- **Organisation and insurance** — how you trade (e.g. d.o.o.), directors’ liability, and professional indemnity where applicable are questions for a **Croatian / EU commercial and health-tech lawyer**, not for this doc.

If you want to reduce *your* personal exposure as an individual, that is a **structuring** question (entity, caps, contractual chain with customers) rather than “all data came from ICD-11 so I’m fine.” Curated rules (`src/analyze/`) remain **your authored clinical logic envelope** unless you offload that to verified third-party content under contract.

---

## After production deploy

Set the Railway env var:

`MEDDATA_DATA_REVISION=YYYY-MM-DD-description`

This surfaces on `GET /v1/health` so consumers and agents know which data/rules revision they are hitting.
