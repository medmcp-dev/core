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

