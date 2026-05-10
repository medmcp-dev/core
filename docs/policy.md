# Usage policy

## What MedMCP is

MedMCP is **developer infrastructure** — a deterministic medical reasoning layer for AI agents. It returns structured risk signals, drug interaction flags, and differential hints based on a curated, rule-based dataset.

## What MedMCP is not

- **Not a clinical diagnosis tool.** Output is not a substitute for examination, clinical judgment, or a licensed clinician.
- **Not a consumer product.** MedMCP is an API for developers and AI agents, not a service intended for direct end-user patient use without your own safeguards.
- **Not a replacement for authoritative sources.** Always verify critical clinical decisions against current prescribing guidelines, peer-reviewed literature, and your institution’s protocols.
- **Not a real-time safety net.** The dataset reflects a point-in-time curation; it does not automatically track guideline changes or drug recalls.

## Intended use

MedMCP output may be used to:

- Power structured routing in AI agent workflows
- Provide a shared, deterministic output contract across models
- Surface reference signals (risk level, differentials, drug interactions) for human-readable summaries or downstream agent decisions

MedMCP output **must not** be used to:

- Present a definitive diagnosis to a patient without clinician oversight
- Replace clinical decision support in regulated environments without appropriate validation for your jurisdiction
- Be presented to end users as standalone authoritative medical advice

## Operator

MedMCP is operated by **Bruno Babić** as an **individual developer** (there is **no formal company entity** behind the product yet). Product limitations and disclaimers apply regardless; incorporation or published **Terms** may be added later and should supersede contradictory informal copy when they exist.

## Jurisdiction note

MedMCP is **not CE-marked, FDA-cleared, or certified** as a medical device under any framework. Developers who integrate MedMCP in regulated contexts are solely responsible for their own compliance obligations.

## Contact

Questions about appropriate use: **brunobabic019@gmail.com**.

---

### HR (usklađivanje za domaće čitanje)

Kratki hrvatski blok za landing i pilote nalazi se u **`[docs/policy-hr.md](./policy-hr.md)`** — jedinstveni HR izvor u repou; na webu kopiraš taj tekst kao odlomak, a puni ENG policy **ne dupliciraš** na sajtu (samo link u footeru, vidi **[`landing-lovable.md`](./landing-lovable.md)**).
