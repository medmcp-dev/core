# Roadmap — MCP po **capability površinama** (symptom · lab · imaging · oncology · …)

*Napomena: isti obrazac vrijedi za **lab-only**, **samostalne labs**, **imaging**, **onkologiju (kurirani signal sloj)**, ili bilo koji budući skup alata po tenantu / API ključu.*

Handoff: **Claude** — arhitektura (granice, I/O contract, compliance); **Cursor-agent** — implementacija u `src/` kad spec postoji (**`medical-review`** ako dira klinički sadržaj / tvrdnje).

---

## Cilj (proizvod)

Jedan **MCP poslužitelj** (`medmcp`), **više alata** (`tools/`), ali klijent vidi **samo površi za koje ima plan**:

| Površina (primjer) | Što agent tipično zove | Napomena |
|--------------------|-------------------------|----------|
| **Symptom / analyze** | Tekst → `risk_level`, `signals[]`, diferencijala | Postoji (`/v1/analyze`, symptom engine). |
| **Lab** | Lookup lab vrijednosti, kategorije | Postoji (`/v1/lab`, MCP `lab_value`). „Samo lab” tenant bez analyze — capability flag u budućnosti. |
| **Imaging** | Slika / study ref → strukturirani signali | Stub/spec od Clauda prije inference. |
| **Oncology (kurirano)** | Strukturiran ulaz (npr. stadij/terapija/regimen ili ključne riječi za **routing signale**, ne automatku terapiju) → `signals[]` / educate layer | Zahtijeva **narrow scope** i **Bruno SME** — prvo reference + pravila iz seeda; bez „personalized cancer Dx”. |
| **Proširenja (primjer)** | Vitals-schema, bundled triage ulaz | Isti pattern: alat + opc. capability set. |

**Zajednički princip:** strukturiran izlaz (signali / razine / audit), **ne** zamjena za kliničku odluku.

---

## Checklist za Clauda (arhitektura — prije koda)

- [ ] **Imenovanje površina** — ENUM u docsu (`symptoms`, `labs`, `imaging`, `oncology`, `reserved`).
- [ ] **Oncology MVP scope** — što je *in*: npr. edukacija + red-flag routing copy (febrile neutropenia hint, SOS toxicity *keyword→signal*) vs što je eksplicitno *out* (staging engine, pravilo individualized chemo bez onk tima).
- [ ] **Input contract po alatu** — args za oncology (minimalni strukturirani JSON vs zabranjen free-text PHI u tool args).
- [ ] **Output contract — zajedničko jezgro** preko površina (`risk_band`/`risk_level`, `confidence`, `signals[]`, opc. `audit_id`).
- [ ] **Inference boundary** — SQLite/pravila lokalno; vanjski model samo ako BAA/DPA jasni; što na **Railway** vs odvojenom storageu.
- [ ] **Tenant model** — `MEDMCP_CAPABILITY_SET` vs `allowed_tools[]` po ključu u DB.
- [ ] **Policy** — jedna rečenica po površini (posebno imaging + oncology).

**Deliverable:** kratki **Architecture note** + **JSON Schema** primjer za prvi *novi* stub (imaging ili oncology — što Bruno prioritizira).

---

## Checklist za Cursor-agenta (nakon Claudinog odobrenja speca)

- [ ] MCP tool registar + handler u `src/tools/`, vez na `src/index.ts`.
- [ ] **Stub / `not_enabled`** kad capability nedostaje (kontrakt stabilan za integratore).
- [ ] `GET /v1/schema` + MCP tool opisi sink s imenima iz speca.
- [ ] Contract testovi oblik odgovora (bez obveze PRAVOG ML/osobno-onk sloja na startu).
- [ ] Za upload/binary — odvojeni endpoint/kanal ako spec kaže tako (sigurnost ≠ gnijezdenje svega u jedan textual analyze).

---

## Savjet-checklist produkt / medicina (prioriteti, bez obveznog redoslijeda kodiranja)

- [ ] **Oncology**: početi jako usko — npr. *supportive-care signali* ili *red-flag sintagme za hitni kontakt* iz kuriranog skup pravila + seed; sve šire **samo uz Brunov SME** i versioning (`MEDDATA_DATA_REVISION`).
- [ ] **„Triage bundle“ alat** — jedan structured input (`symptoms[]`, opc. `labs[]`, `meds[]`) → jedan JSON odgovor; ergonomija pilota bez više MCP round-tripova u nizu.
- [ ] **Medication surface** — grupirati postojeće `drug_*` + interakcije kao „medication_safety“ u capability docsu (kod uglavnom već ima).
- [ ] **DX / changelog znanja** — `data_revision` + kratak „what changed in rules“ kada dira seed/analyze/oncology pravila (prod trust).
- [ ] **Batch / eval endpoint** (rate-limited) — za testiranje agenata nad fixture setom.
- [ ] **Audit-lite API** (bez tijela pacijenta) — enterprise pitanje „tko što zvao“ — kasnije ako pilot traži.
- [ ] **Ne žuriti** dok nije jasan pilot — puni FHIR, real-time guideline feed, široki „oncology Dx engine“ van scopea bez jakog medicinskog + pravnog sloja.

---

## Otvoreno (Bruno / produkt)

- Pilot: **„samo lab“** bez analyze — samo sakrivanje toola ili poseban API key tier?
- Imaging: strukturiran **radiology report passthrough** prvo ili **pixels** kasnije?
- Oncology: koja je **prva konkretna bolest / scenario** za pilot (npr. febrilna neutropenija tekst-trigger vs šire)?
- Jedan MCP deploy (**preporuka**) dok regulator ne traži fizičku izolaciju podataka.

---

*Nakon Claudinog architecture note-a — ažuriraj checklistu i obriši kvačicu kad je točka završena.*
