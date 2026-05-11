export const CAPABILITY = {
  SYMPTOMS: "symptoms",
  LABS: "labs",
  SCHEMA: "schema",
  WAITLIST_READ: "waitlist_read",
  ONCOLOGY: "oncology",
  IMAGING: "imaging",
  MEDICATION_SAFETY: "medication_safety",
} as const;

export type Capability = (typeof CAPABILITY)[keyof typeof CAPABILITY];

export const KNOWN_CAPABILITIES: readonly Capability[] = Object.values(CAPABILITY);

/** New API keys (`plan = default`) start with these capabilities only (billing / product tiers). */
export const DEFAULT_PLAN_CAPABILITIES: readonly Capability[] = [
  CAPABILITY.SYMPTOMS,
  CAPABILITY.LABS,
  CAPABILITY.SCHEMA,
] as const;

/** Human-readable descriptions for `/v1/schema` and ops tooling. */
export const CAPABILITY_DESCRIPTIONS: Record<Capability, string> = {
  [CAPABILITY.SYMPTOMS]:
    "POST /v1/analyze — free-text symptoms to risk band, differentials, and structured signals (rule-based v1).",
  [CAPABILITY.LABS]:
    "GET /v1/lab — reference ranges, panic hints, and notes for seeded lab analytes by name.",
  [CAPABILITY.SCHEMA]:
    "GET /v1/schema — machine-readable contract, release metadata, and agent_tooling block.",
  [CAPABILITY.WAITLIST_READ]:
    "GET /v1/waitlist — list waitlist rows (admin-style; not part of the default developer tier).",
  [CAPABILITY.ONCOLOGY]:
    "Reserved for future oncology HTTP endpoints (not active in core v1).",
  [CAPABILITY.IMAGING]:
    "Reserved for future imaging HTTP endpoints (not active in core v1).",
  [CAPABILITY.MEDICATION_SAFETY]:
    "Reserved for future medication-safety HTTP surface (lookup tools may also exist on MCP).",
};

export type ApiKeyPlan = "default" | "full" | "custom";

export const API_KEY_PLANS: readonly ApiKeyPlan[] = ["default", "full", "custom"] as const;

