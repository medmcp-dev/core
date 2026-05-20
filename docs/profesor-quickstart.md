# Brzi početak za profesora / demo (`/v1/analyze`)

Ovo je najjednostavnije **bez Postmana**: jedan blok u **PowerShellu** ili **Terminalu**.

## Što znati za 30 sekundi

- **`GET /v1/health`** u pregledniku radi **bez ključa** (brza provjera da URL živi).
- **`POST /v1/analyze`** **mora** imati HTTP header **`X-API-Key`** — zato „otvaranje“ samo adresne trake preglednika na `/v1/analyze` ne radi.

Nikad ne kopirati API ključ u javni kod, gist, prezentacijski PDF ili javni Slack/Discord ako nije privatni kanal. Ako iscuri ili završi na GitHubu → smatraj ključ **kompromitiranim**.

---

## Zamijeni ove vrijednosti

- **`BASE_URL`** — produkcija: `https://core-production-389e.up.railway.app` (bez kose crte na kraju).
- **`API_KEY`** — ključ koji ti Bruno pošalje **nakon** što ga kreira na produkcijskoj bazi (format `mk_…`, bez razmaka pri kopiranju).

### Ako dobiješ `403` i `"Invalid API key"`

Servis radi, ali **ključ nije upisan u produkcijsku bazu** (nije problem curla). Javi Brunu — treba **novi ključ** kreiran na Railwayu (vidi [`docs/ops-production-api-keys.md`](./ops-production-api-keys.md)).  
`403` s `"capability_not_enabled"` je druga stvar (ključ postoji, ali ruta nije u planu).

### Brza provjera da ključ radi (curl, macOS)

```bash
BASE_URL="https://core-production-389e.up.railway.app"
API_KEY="mk_TVOJ_KLJUC_OVDJE"

curl -sS -w "\nHTTP:%{http_code}\n" \
  -H "X-API-Key: $API_KEY" \
  "$BASE_URL/v1/schema"
```

Očekuješ **HTTP:200** i JSON s `version`. Zatim `POST /v1/analyze` (primjer ispod).

---

## Windows — PowerShell (preporuka)

Copy/paste cijelog bloka:

```powershell
$BASE_URL = "https://core-production-389e.up.railway.app"
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
BASE_URL="https://core-production-389e.up.railway.app"
API_KEY="mk_TVOJ_KLJUC_OVDJE"

curl -sS \
  -X POST "$BASE_URL/v1/analyze" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d '{"type":"symptom","data":{"text":"headache with neck stiffness"}}'
```

---

## Kako Bruno dodaje poseban ključ za nekoga drugog

**Produkcija (obavezno):** ključ mora ući u SQLite na Railway volumeu (`DB_PATH=/data/meddata.db`). Puni postupak: **[`docs/ops-production-api-keys.md`](./ops-production-api-keys.md)**.

```bash
./scripts/railway-create-professor-key.sh professor-demo
```

Ispiše se `mk_…` **jednom** → pošalji privatno, testiraj s curl prije slanja profesoru. Revoke:

```bash
railway run -- sh -c "DB_PATH=/data/meddata.db npm run api-keys -- revoke mk_xxxxxxxx"
```

Lokalni `npm run api-keys -- create …` **bez** `railway run` + `/data/meddata.db` kreira ključ u **laptop bazi** → profesor na produkciji dobije **`403 Invalid API key`**.

### Ako lokalno `npm run api-keys` padne na `better-sqlite3` / NODE_MODULE_VERSION

Instalacija native modula mora odgovarati verziji Nodea (npr. nakon nadogradnje Nodea): `npm rebuild better-sqlite3` ili čist `npm install`. Na Railwayu Docker build to obično već slaže automatski.

---

## Opcionalno: Postman (bez posebnog „profila“ ako ne želiš)

Postman dopušta korištenje bez računa u mnogim koracima, ali ovaj dokument namjerno ostaje bez njega jer PowerShell + `Invoke-RestMethod` obično dovoljni.
