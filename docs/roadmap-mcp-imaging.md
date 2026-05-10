# Roadmap — MCP beyond text symptoms (imaging / RTG)

Handoff: **Bruno želi dizajn kojeg vodi Claude (arhitektura, granice modaliteta, compliance)**; **Cursor-agent implementira** u `src/` kada spec postoji (`medical-review` ako dira medicinski sadržaj).

---

## Cilj (proizvod)

Zadržati **jedan mentalni model** za agente — strukturiran izlaz (npr. `risk_level`, `signals[]`, opc. audit polja), ulaz koji može biti **tekst** ili **medicinska slika / study referenca**.

---

## Za Clauda — što odlučiti prije koda

1. **Modality boundary** — što je „in scope“ za v1 imaging alata (npr. samo CXR rezultat tekstualnog read-a protiv pravog pixel upload-a).
2. **Input contract po alatu** — minimalni argumenti (`text`, `image_url`, `dicom_web`, `study_uid`, hash na storageu); što **nikad** ne ulazi u MCP (PHI direktno u prompt).
3. **Output contract zajedničko jezgro** — koja polja su obavezna preko svih modaliteta (`risk_band` vs `risk_level`, `confidence`, `audit_id`, trace_id).
4. **Gdje radi inference** — lokalni model vs vanjski BAA/DPA vendor; što znači za **Railway deployment** i **bez-Pixel-S3** story.
5. **Capability / tenant model** — treba li `MEDMCP_CAPABILITY_SET` ili samo liste dozvoljenih toola po API keyu u DB.
6. **Regulatory framing** jedna stranica u policy — imaging path kao „decision support / signal extraction“, ne dijagnostika.

**Deliverable od Clauda:** 1–2 stranice **Architecture note** + **primjer JSON Schema** za 1 imaging tool kao MD u `docs/` ili poruka koja se merga prije prvog stub PR-a.

---

## Za Cursor-agenta sutra — red implementacije (nakon speca)

1. Registracija novog MCP tool handlera (`src/tools/`, `src/index.ts`) koji **delegira** na `src/analyze/…` ili na novi `@imaging` modul kad bude wiring.
2. **Stub odgovor** (HTTP 503 / MCP error code) ako capability nije uključena — da klijenti mogu paralelno integrirati.
3. `GET /v1/schema` ili MCP tool listing — dokumentirani parametri kad Bruno odobri stringove.
4. Testovi kao za ostale analyse rute gdje ima smisla (contract shape, ne pravi CXR inference).
5. Ako ima uploada datoteka — novi sloj (**ne** linija u postojeći `/v1/analyze` ako Claude kaže „odvojeni endpoint/tool“ iz sigurnosti.

---

## Otvoreno (Bruno kad se vratiš)

- Hoćeš li **prvu iteraciju** samo kao **„structured report passthrough“** (RTG nalazi već strukturirani od radiolog LLM‑a izvan MedMCP) ili cilj **„pixel in → signals out“**?
- Jedan MCP server (**preporuka do ikad split**) vs dva procesa ako zakon zahtijeva izoliran storage.

---

*Kreiran kao noćni handoff — ažuriraj ovaj doc kad Claude dostavi Architecture note.*
