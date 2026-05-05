# MedMCP API — minimalni primjeri

Nema ovisnosti o lokalnom `sdk/` buildu: samo **Node 18+** ili **Python 3.10+**.

## Varijable okoline

| Varijabla | Obavezno | Default |
|-----------|----------|---------|
| `MEDDATA_API_KEY` | da | — |
| `MEDDATA_BASE_URL` | ne | `https://core-production-389e.up.railway.app` |

## Node.js

```bash
set MEDDATA_API_KEY=mk_tvoj_kljuc
node node/analyze-and-lab.mjs
```

PowerShell:

```powershell
$env:MEDDATA_API_KEY = "mk_tvoj_kljuc"
node node/analyze-and-lab.mjs
```

## Python

```bash
set MEDDATA_API_KEY=mk_tvoj_kljuc
python python/analyze_and_lab.py
```

## Službeni SDK-ovi

Za produkcijski kod koristi **`@medmcp/sdk`** (npm) ili **`medmcp`** (pip) — vidi glavni `README.md` u korijenu repozitorija.
