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

## MCP (Claude Desktop / Cursor)

Lokalni **MCP server** koristi istu bazu kao `npm start` u korijenu repozitorija (SQLite nakon `npm run setup`).

1. `npm run setup`
2. U Claude / Cursor MCP postavke dodaj server iz glavnog **`README.md`** → sekcija *Self-hosting → MCP Server (stdio)*.
3. Kopija predloška s placeholder putem: [`mcp-claude-desktop.snippet.json`](mcp-claude-desktop.snippet.json)

Za simptom analizu preko mreže i dalje koristi **HTTP** primjere iznad (`MEDDATA_BASE_URL`) ili SDK — MCP u ovom repou pokriva alate iz SQLitea, ne zamjenjuje cijeli hosted API.

## Službeni SDK-ovi

Za produkcijski kod koristi **`@medmcp/sdk`** (npm) ili **`medmcp`** (pip) — vidi glavni `README.md` u korijenu repozitorija.
