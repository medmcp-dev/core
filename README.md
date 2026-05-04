# MedData API

Agent-friendly medical MCP server for AI agents that need structured, clinically accurate medical data.

## What it does

Exposes a **Model Context Protocol (MCP) server** over stdio with 5 tools:

| Tool | Description |
|------|-------------|
| `get_medical_concept` | Physiology, anatomy, pharmacology, immunology concepts with mechanisms and clinical relevance |
| `get_drug_info` | Drug mechanism, indications, contraindications, dosing, side effects, monitoring |
| `get_drug_interactions` | Pairwise drug interaction check with severity, mechanism, and management |
| `get_icd11_code` | ICD-11 diagnostic codes with inclusion/exclusion terms |
| `get_differential_diagnosis` | Ranked differential diagnosis from a list of symptoms |

## Prerequisites

- Node.js ≥ 20
- npm

## Setup

```bash
npm install
npm run build
npm run seed        # populates meddata.db with initial data
npm start           # starts the MCP server (stdio mode)
```

Or in one step:

```bash
npm run setup && npm start
```

The SQLite database (`meddata.db`) is created in the project root on first seed.

## Connect to Claude Desktop

Add the following to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "meddata": {
      "command": "node",
      "args": ["C:/Users/bruno/meddata-api/dist/index.js"]
    }
  }
}
```

Restart Claude Desktop after saving. You should see "meddata" listed under MCP servers.

## Tool reference

### `get_medical_concept`

```jsonc
// Fetch a concept
{ "name": "action potential" }
{ "name": "RAAS", "category": "physiology" }

// Browse
{ "action": "list_categories" }
{ "action": "list_concepts", "category": "anatomy" }
```

**Fields returned:** `name`, `category`, `summary`, `mechanism`, `clinical_relevance`, `related_concepts_list`

### `get_drug_info`

```jsonc
{ "name": "metformin" }
{ "name": "ACE inhibitor" }   // searches by drug class
{ "action": "list_classes" }
```

**Fields returned:** `name`, `generic_name`, `drug_class`, `mechanism`, `indications`, `contraindications`, `side_effects`, `dosing`, `monitoring`

### `get_drug_interactions`

```jsonc
{ "drugs": ["warfarin", "aspirin"] }
{ "drugs": ["warfarin", "aspirin", "omeprazole"] }  // checks all 3 pairs
```

**Fields returned per pair:** `drug_pair`, `interaction` (with `severity`, `mechanism`, `clinical_effect`, `management`)  
**Severity levels:** `mild` → `moderate` → `severe` → `contraindicated`

### `get_icd11_code`

```jsonc
{ "query": "5A11" }                           // by code
{ "query": "diabetes", "search_by": "any" }  // by keyword
{ "query": "atrial fibrillation" }
```

**Fields returned:** `code`, `title`, `description`, `inclusion_terms`, `exclusion_terms`, `category`

### `get_differential_diagnosis`

```jsonc
{
  "symptoms": ["dyspnoea", "pleuritic chest pain", "haemoptysis", "tachycardia"],
  "max_results": 5
}
```

**Fields returned per diagnosis:** `name`, `matched_symptoms`, `match_score`, `distinguishing_features`, `key_investigations`, `icd11_code`, `prevalence`

## Seed data (initial)

| Category | Count | Notes |
|----------|-------|-------|
| Medical concepts | 16 | Physiology (8), Anatomy (8) |
| Drugs | 8 | Metformin, Atorvastatin, Lisinopril, Aspirin, Warfarin, Amoxicillin, Furosemide, Omeprazole |
| Drug interactions | 10 | Clinically significant pairs |
| ICD-11 codes | 10 | Common conditions across specialties |
| Diagnoses (differential) | 8 | PE, CAP, DVT, T2DM, HFrEF, AF, Appendicitis, Hypothyroidism |

## Development

```bash
npm run dev     # TypeScript watch mode (recompiles on change)
npm run seed    # Re-run seed (uses INSERT OR IGNORE — safe to re-run)
```

## Extending the data

All seed data lives in `src/data/`. Add entries to the relevant file and re-run `npm run seed`. The schema is in `src/db/database.ts`.

To add a new tool:
1. Create `src/tools/your_tool.ts` with the query logic
2. Register it in `src/index.ts` under `ListToolsRequestSchema` and `CallToolRequestSchema`
3. Rebuild: `npm run build`

## Medical disclaimer

This server provides educational and reference information for AI agents and medical students. It is not a substitute for clinical judgment, current prescribing guidelines, or peer-reviewed literature. Always verify critical clinical data against authoritative sources (BNF, UpToDate, local formulary).
