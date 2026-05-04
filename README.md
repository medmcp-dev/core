# MedMCP

Medical reasoning API for AI agents. Converts clinical input into structured risk signals.

```bash
npm install @medmcp/sdk
```

---

## What it is

MedMCP is a developer-first infrastructure layer that gives AI agents deterministic medical reasoning signals — no LLM in the pipeline, no hallucinations, no prompt engineering required.

Think of it as the medical data layer your agent stack is missing.

**Not a diagnosis tool. Not a consumer product. Infrastructure.**

---

## Quickstart

### JavaScript / TypeScript

```bash
npm install @medmcp/sdk
```

```ts
import { MedMCP } from '@medmcp/sdk';

const client = new MedMCP({ apiKey: 'mk_your_key_here' });
const result = await client.analyze('chest pain for 2 hours');

console.log(result.risk_level);      // "high"
console.log(result.interpretation);  // "1 symptom(s) identified: chest pain. Top differential: pulmonary embolism..."
```

### curl

```bash
curl -X POST https://core-production-389e.up.railway.app/v1/analyze \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"symptom","data":{"text":"chest pain for 2 hours"}}'
```

Response:

```json
{
  "risk_level": "high",
  "confidence": 1,
  "entities": [
    { "type": "symptom", "value": "chest pain" },
    { "type": "diagnosis", "value": "pulmonary embolism", "metadata": { "match_score": 1, "icd11_code": "BB41" } }
  ],
  "source_type": "symptom",
  "interpretation": "1 symptom(s) identified: chest pain. Top differential: pulmonary embolism (match score: 1)."
}
```

Integration time: under 5 minutes.

---

## API Reference

### `POST /v1/analyze`

Converts clinical input into a structured risk signal.

**Request**

```json
{
  "type": "symptom",
  "data": {
    "text": "shortness of breath and racing heart"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"symptom"` | Input type. Only `symptom` supported in v1. |
| `data.text` | `string` | Free-text clinical description. |

**Response schema (stable across all versions)**

```json
{
  "risk_level": "low | medium | high | critical",
  "confidence": 0.0,
  "entities": [],
  "source_type": "symptom | lab | vitals | medication",
  "interpretation": "string"
}
```

| Field | Description |
|-------|-------------|
| `risk_level` | Deterministic risk classification based on clinical red-flag criteria. |
| `confidence` | Fraction of extracted symptoms matched by at least one differential (0–1). |
| `entities` | Recognized symptoms, top differential diagnoses, ICD-11 codes. |
| `source_type` | Mirrors the input type. |
| `interpretation` | Short structured reasoning for agent consumption. |

---

### `GET /v1/health`

No auth required.

```json
{ "status": "ok", "version": "1.0.0", "timestamp": "..." }
```

---

### `GET /v1/schema`

Returns full input/output JSON schema. Auth required.

---

## Authentication

All endpoints (except `/v1/health`) require an API key:

```
X-API-Key: mk_your_key_here
```

---

## How risk_level is determined

Risk classification is **rule-based, not LLM-based**. Deterministic by design.

| Level | Criteria |
|-------|----------|
| `critical` | Red-flag symptom present: syncope, altered consciousness, haemoptysis |
| `high` | High-risk symptom present: chest pain, dyspnoea, tachycardia, palpitations |
| `medium` | ≥2 symptoms matched with at least one differential |
| `low` | Single mild symptom or no recognized symptoms |

---

## Self-hosting

### HTTP API

```bash
git clone https://github.com/medmcp-dev/core
cd core
npm install
npm run setup      # build + seed database
npm run start:http # starts on port 3000
```

Set `MEDDATA_API_KEY` in your environment to use a fixed key instead of auto-generated.

### MCP Server (stdio)

For direct AI agent integration via Model Context Protocol:

```bash
npm run setup
npm start
```

Add to your MCP client config:

```json
{
  "mcpServers": {
    "medmcp": {
      "command": "node",
      "args": ["/path/to/core/dist/index.js"]
    }
  }
}
```

**MCP tools available:** `get_medical_concept`, `get_drug_info`, `get_drug_interactions`, `get_icd11_code`, `get_differential_diagnosis`, `get_lab_value`

---

## Roadmap

| Phase | Status |
|-------|--------|
| Symptom → risk signal (`POST /v1/analyze`) | ✅ v1 |
| Lab result interpretation | Planned |
| Vitals processing | Planned |
| Medication context | Planned |
| JS SDK (`@medmcp/sdk`) | ✅ v1 |
| Python SDK | Planned |

---

## Medical disclaimer

MedMCP provides structured reference signals for AI agents and developers. It is not a substitute for clinical judgment, current prescribing guidelines, or peer-reviewed literature. Always verify critical clinical decisions against authoritative sources.
