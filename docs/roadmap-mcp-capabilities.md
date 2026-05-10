# Roadmap — MCP po **capability površinama** (symptom · lab · imaging · …)

***Napomena:** prijašnji fokus samo na RTG/`imaging` — prošireno: isti obrazac vrijedi za **lab-only**, **samo-vitals**, **medicinske slike**, ili bilo koji budući skup alata koji želiš davati odabranom tenantu / API ključu.*

Handoff: **Claude** definira **arhitekturu** (granice površina, input/output contract, compliance); **Cursor-agent** implementira u `src/` kad spec postoji (`medical-review` ako dira klinički sadržaj / tvrdnje).

---

## Cilj (proizvod)

Jedan **MCP poslužitelj** (`medmcp`), **više alata** (`tools/`), ali **klijent vidi samo ono za što mu je uključen plan** — npr.:

| Površina (primjer) | Što agent tipično zove | Napomena |
|--------------------|-------------------------|----------|
| **Symptom / analyze** | Tekst → `risk_level`, `signals[]`, diferencijala | Već postoji. |
| **Lab** | Lookup / interpretacija referentnih vrijednosti (`/v1/lab`, MCP `lab_value`) | Već postoji; capability može „samo lab” bez analyze. |
| **Imaging** (RTG, CT, …) | Slika / study ref → strukturirani signali (kad bude spec) | Primjer druge ulazne sheme. |
| **Buduće** | Vitals schema, lijekovi-only, … | Isti pattern alata + flagovi. |

**Zajednički princip:** strukturiran izlaz (signali / razine / audit_id), ne zamjena za kliničku odluku.

---

## Za Clauda — što odlučiti prije koda

1. **Imenovanje površina** — npr. `capability_surface: symptoms | labs | imaging | …` u docsu; što je v1 obavezno vs „reserved“.
2. **Input contract po alatu** — za svaku površinu: argumenti (`text`, lab `name`+`value`, `image_ref` / `study_uid`, …); što **nikad** ne ulazi u MCP (npr. raw PHI u tool args bez storage indirection).
3. **Output contract — zajedničko jezgro** — minimalna polja preko svih alata (`risk_level` ili `risk_band`, `confidence`, `signals[]`, opc. `audit_id` / `trace_id`).
4. **Gdje radi inference** — koji sloj je lokalno SQLite/pravila; gdje vanjski model (BAA/DPA); što znači za **Railway** i storage.
5. **Tenant / API key model** — env `MEDMCP_CAPABILITY_SET=symptoms,labs` vs **DB polje** `allowed_tools[]` po ključu; ručni pilot vs self-serve Stripe kasnije.
6. **Policy copy** — jedna rečenica po površini: „nije dijagnostika“, posebno za imaging i interpretaciju nalaza.

**Deliverable:** kratki **Architecture note** + za **barem jednu** površinu koja nije još u kodu (npr. imaging stub) primjer **JSON Schema** za tool args/response — lab-only može biti samo tablica „već pokriveno HTTP+MCP“ bez novog PR-a ako ne želite novi alat.

---

## Za Cursor-agenta — red implementacije (nakon speca)

1. Registracija alata u `src/index.ts` + handler u `src/tools/` koji **delegira** na odgovarajući modul (`analyze`, `lab`, budući `imaging`).
2. **Stub** ako capability isključena — deterministički odgovor (npr. `not_enabled`) da frontend/agent može paralelno graditi integraciju.
3. Dokumentacija u `GET /v1/schema` + MCP opisi alata sinkronizirani s Claudovim nazivljem.
4. Testovi za oblik odgovora (contract), bez obveze na pravi model ako je stub.
5. Upload / binary — uvijek **odvojen** kanal ako Claude tako kaže (ne gnjezditi sve u jedan `/v1/analyze` ako je rizik drugačiji od teksta).

---

## Otvoreno (Bruno / produkt)

- Prvi plaćeni / pilot sloj: **„samo lab”** korisnik (bez symptom enginea uopće) — da li je to samo **isključivanje tool opisa** ili i **rate limit / drugačiji ključ**?
- Imaging: **passthrough strukturiranog read-a** prvo vs **pixel pipeline** kasnije?
- Jedan MCP deployment (**preporuka**) vs split samo ako regulator ili kupac traži izolaciju podataka.

---

*Ažuriraj nakon Claudinog architecture note-a.*
