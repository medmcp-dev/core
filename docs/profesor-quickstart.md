# Brzi početak za profesora / demo (`/v1/analyze`)

Ovo je najjednostavnije **bez Postmana**: jedan blok u **PowerShellu** ili **Terminalu**.

## Što znati za 30 sekundi

- **`GET /v1/health`** u pregledniku radi **bez ključa** (brza provjera da URL živi).
- **`POST /v1/analyze`** **mora** imati HTTP header **`X-API-Key`** — zato „otvaranje“ samo adresne trake preglednika na `/v1/analyze` ne radi.

Nikad ne kopirati API ključ u javni kod, gist, prezentacijski PDF ili javni Slack/Discord ako nije privatni kanal. Ako iscuri ili završi na GitHubu → smatraj ključ **kompromitiranim**.

---

## Zamijeni ove vrijednosti

- **`BASE_URL`** — tvoj host, npr. `https://…up.railway.app` (bez kose crte na kraju).
- **`API_KEY`** — ključ koji ti Bruno pošalje (format tipično `mk_…`).

---

## Windows — PowerShell (preporuka)

Copy/paste cijelog bloka:

```powershell
$BASE_URL = "https://PRIMjer.up.railway.app"
$key      = "mk_TVOJ_KLJUC_OVDJE"

Invoke-RestMethod `
  -Uri "$BASE_URL/v1/analyze" `
  -Method POST `
  -Headers @{ "X-API-Key" = $key; "Content-Type" = "application/json" } `
  -Body '{"type":"symptom","data":{"text":"chest pain with shortness of breath"}}'
```

Ako dobije **`401`** i **`Missing X-API-Key header`**, znači da header nije stigao (pogledaj da nema typo u varijablama ili da ne koristiš obični browser tab umjesto PowerShella).

---

## curl (macOS / Linux / Git Bash)

```bash
BASE_URL="https://PRIMjer.up.railway.app"
API_KEY="mk_TVOJ_KLJUC_OVDJE"

curl -sS \
  -X POST "$BASE_URL/v1/analyze" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d '{"type":"symptom","data":{"text":"headache with neck stiffness"}}'
```

---

## Kako Bruno dodaje poseban ključ za nekoga drugog

Na stroju gdje imaš **isti** SQLite kao HTTP server (isti `DB_PATH` kao na deployu ako radiš ključ za produkciju):

```bash
npm run build
npm run api-keys -- create ime-primatelja-demo
```

Ispiše se ključ **jednom** → pošalji ga privatnim kanalom. Za uklanjanje nakon ispada ili kraja ispita:

```bash
npm run api-keys -- revoke mk_xxxxxxxx...
npm run api-keys -- list
```

Više pojedinosti o skripti: kao i drugi tooling, kompilirani ulaz je `src/scripts/api-keys-admin.ts`.

**Produkcija (Railway):** pokretanje mora koristiti **isti volume / `DB_PATH`** kao servis koji sluša promet (npr. `railway run …` ili jednokratni kontejnerski exec), inače kreiraš ključ u „drugoj“ bazi i **401 će i dalje** dolaziti.

### Ako lokalno `npm run api-keys` padne na `better-sqlite3` / NODE_MODULE_VERSION

Instalacija native modula mora odgovarati verziji Nodea (npr. nakon nadogradnje Nodea): `npm rebuild better-sqlite3` ili čist `npm install`. Na Railwayu Docker build to obično već slaže automatski.

---

## Opcionalno: Postman (bez posebnog „profila“ ako ne želiš)

Postman dopušta korištenje bez računa u mnogim koracima, ali ovaj dokument namjerno ostaje bez njega jer PowerShell + `Invoke-RestMethod` obično dovoljni.
