# Production API keys (Railway)

HTTP auth checks the **`api_keys`** table in SQLite at **`DB_PATH`** (production: **`/data/meddata.db`** on the mounted volume). A key that works locally or only in deploy logs **will return `403 Invalid API key`** on production until it is inserted into **that** database.

## Symptom: professor / pilot gets 403 Invalid API key

- **`GET /v1/health` → 200** without a key is normal; it does not validate the key.
- **`403` + `"Invalid API key"`** → the `X-API-Key` value is **not** in production `api_keys`.
- **`403` + `"capability_not_enabled"`** → key exists but plan/capabilities block the route (different issue).

## Fix (recommended): create key on Railway volume

From repo root, with [Railway CLI](https://docs.railway.app/develop/cli) logged in and linked to the **core** service:

```bash
./scripts/railway-create-professor-key.sh professor-demo
```

Windows PowerShell:

```powershell
.\scripts\railway-create-professor-key.ps1 -Name professor-demo
```

Manual equivalent:

```bash
railway run -- sh -c "npm run build && DB_PATH=/data/meddata.db npm run api-keys -- create professor-demo"
railway run -- sh -c "DB_PATH=/data/meddata.db npm run api-keys -- list"
```

Copy the printed `mk_…` key **once**, send privately, then verify with curl (see `docs/profesor-quickstart.md`).

Revoke after demo:

```bash
railway run -- sh -c "DB_PATH=/data/meddata.db npm run api-keys -- revoke mk_xxxxxxxx"
```

## Alternative: `MEDDATA_API_KEY` on Railway

1. Generate or choose a key string (`mk_…`).
2. Set Railway service variable **`MEDDATA_API_KEY`** to that exact value (no spaces).
3. Redeploy. On startup, **`ensureEnvApiKeyRegistered()`** inserts the key into `api_keys` if missing.
4. Share **only** that env value with the recipient.

Do **not** share a key created with `npm run api-keys` on a laptop unless you also ran the command against **`DB_PATH=/data/meddata.db`** via `railway run`.

## After code deploy

- Auth trims whitespace on **`X-API-Key`** (copy/paste from email/Slack).
- Startup registers **`MEDDATA_API_KEY`** into SQLite when set and absent from `api_keys`.
