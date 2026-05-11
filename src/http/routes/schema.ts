import type { Context } from "hono";
import {
  CORE_PACKAGE_VERSION,
  MEDDATA_DATA_REVISION,
  MEDDATA_GIT_REVISION,
} from "../build-info.js";
import {
  CAPABILITY_DESCRIPTIONS,
  DEFAULT_PLAN_CAPABILITIES,
  KNOWN_CAPABILITIES,
} from "../capabilities.js";

const INPUT_SCHEMA = {
  type: "object",
  required: ["type", "data"],
  properties: {
    type: {
      type: "string",
      enum: ["symptom", "lab", "vitals", "medication"],
      description: "The input data type. Only 'symptom' is supported in v1.",
    },
    data: {
      type: "object",
      description: "Type-specific payload.",
      oneOf: [
        {
          title: "SymptomInput",
          required: ["text"],
          properties: {
            text: {
              type: "string",
              description: "Free-text symptom description.",
              example: "chest pain for 2 hours",
            },
          },
        },
      ],
    },
  },
};

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    risk_level: {
      type: "string",
      enum: ["low", "medium", "high", "critical"],
    },
    confidence: {
      type: "number",
      minimum: 0,
      maximum: 1,
      description: "Fraction of extracted symptoms matched by at least one differential.",
    },
    entities: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["symptom", "diagnosis", "icd_code"] },
          value: { type: "string" },
          metadata: { type: "object" },
        },
      },
    },
    signals: {
      type: "array",
      description:
        "Structured signals for agents: risk drivers from rules, top differentials with match scores, and extracted symptom tokens.",
      items: {
        type: "object",
        required: ["type", "label"],
        properties: {
          type: {
            type: "string",
            enum: ["risk_driver", "differential", "symptom_match"],
          },
          label: { type: "string" },
          detail: { type: "string" },
        },
      },
    },
    source_type: {
      type: "string",
      enum: ["symptom", "lab", "vitals", "medication"],
    },
    interpretation: {
      type: "string",
      description: "Short structured reasoning suitable for agent consumption.",
    },
  },
};

export async function schemaHandler(c: Context) {
  const dataRevision = MEDDATA_DATA_REVISION?.trim() || null;
  const gitRevision = MEDDATA_GIT_REVISION?.trim() || null;
  const apiKey = c.get("apiKey") as string | undefined;
  let keyPlan: string | null = null;
  let keyCapabilities: string[] | null = null;
  if (apiKey) {
    try {
      const db = await import("../../db/database.js");
      const plan = db.getApiKeyPlan(apiKey);
      if (plan) {
        keyPlan = plan;
        keyCapabilities = db.getCapabilitiesForKey(apiKey);
      }
    } catch {
      keyPlan = null;
      keyCapabilities = null;
    }
  }

  return c.json({
    version: "1.0.0",
    /** npm `@medmcp/core` semver — same idea as `X-MedMCP-Release` on responses */
    release: CORE_PACKAGE_VERSION,
    ...(dataRevision ? { data_revision: dataRevision } : {}),
    ...(gitRevision ? { git_revision: gitRevision } : {}),
    supported_types: ["symptom"],
    known_capabilities: KNOWN_CAPABILITIES,
    default_plan_capabilities: [...DEFAULT_PLAN_CAPABILITIES],
    capability_descriptions: CAPABILITY_DESCRIPTIONS,
    ...(keyPlan !== null ? { key_plan: keyPlan, key_capabilities: keyCapabilities ?? [] } : {}),
    input: INPUT_SCHEMA,
    output: OUTPUT_SCHEMA,
    /** How to position MedMCP for agent builders (HTTP + MCP) */
    agent_tooling: {
      positioning:
        "Agents need medical facts in a tool-call shape (structured fields, reproducible lookups) — not scraped web pages meant for humans.",
      mcp_server_name: "medmcp",
      mcp_transport: "stdio",
      routing_hint:
        "Use MCP where the host supports it (e.g. IDE agents); use HTTP from backend services. Read this document before wiring clients.",
      http_response_headers: [
        {
          name: "X-MedMCP-Schema-Version",
          meaning: "HTTP JSON contract major version (currently v1).",
        },
        {
          name: "X-MedMCP-Release",
          meaning: "Semver of the deployed @medmcp/core package.",
        },
        {
          name: "X-MedMCP-Git-Revision",
          meaning: "Short git commit when the host exposes MEDDATA_GIT_REVISION / RAILWAY_GIT_COMMIT_SHA / GITHUB_SHA.",
        },
        {
          name: "X-MedMCP-Data-Revision",
          meaning: "Opaque tag for active seed/rules when MEDDATA_DATA_REVISION is set.",
        },
      ],
      limitations: [
        "Not a consumer-facing diagnosis or triage product; outputs are decision-support signals for developers.",
        "Knowledge is seeded and bounded — validate with your SME before treating as universal clinical truth.",
        "Only type=symptom is implemented on POST /v1/analyze in v1; other types return HTTP 501 with supported_types.",
        "Each API key has a plan (default | full | custom) stored in SQLite for audit; this response includes key_plan and effective key_capabilities when authenticated.",
      ],
      endpoints: [
        { method: "GET", path: "/v1/health", auth: false, summary: "Liveness + release metadata" },
        { method: "GET", path: "/v1/schema", auth: true, summary: "This machine-readable contract" },
        { method: "POST", path: "/v1/analyze", auth: true, summary: "Symptom → risk + differential (rule-based)" },
        { method: "GET", path: "/v1/lab", auth: true, summary: "Lab reference lookup" },
        { method: "POST", path: "/v1/waitlist", auth: false, summary: "Join waitlist" },
        { method: "GET", path: "/v1/waitlist", auth: true, summary: "List waitlist (admin-style)" },
      ],
    },
  });
}
