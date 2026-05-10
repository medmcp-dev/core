export type RiskLevel = "low" | "medium" | "high" | "critical";
export type SourceType = "symptom" | "lab" | "vitals" | "medication";
export type EntityType = "symptom" | "diagnosis" | "icd_code";

export interface Entity {
  type: EntityType;
  value: string;
  metadata?: Record<string, unknown>;
}

export type SignalType = "risk_driver" | "differential" | "symptom_match";

export interface Signal {
  type: SignalType;
  label: string;
  detail?: string;
}

export interface AnalyzeResult {
  risk_level: RiskLevel;
  confidence: number;
  entities: Entity[];
  signals: Signal[];
  source_type: SourceType;
  interpretation: string;
}

export interface HealthResult {
  status: string;
  /** Public API schema version string */
  version: string;
  timestamp: string;
  /** Core package semver (`@medmcp/core`), when exposed by `/v1/health` */
  release?: string;
  /** Deployer-defined seed/rules revision */
  data_revision?: string;
  /** Git SHA when `MEDDATA_GIT_REVISION` / platform env is set */
  git_revision?: string;
}

export interface LabValue {
  name: string;
  abbreviation: string | null;
  unit: string;
  reference_range: string;
  critical_low?: string | null;
  critical_high?: string | null;
  category: string;
  interpretation?: string | null;
  clinical_notes?: string | null;
  male_range?: string | null;
  female_range?: string | null;
}

export interface LabGetResult {
  lab_value: LabValue;
}

export interface LabListItem {
  name: string;
  abbreviation: string | null;
  unit: string;
  reference_range: string;
  category: string;
}

export interface LabListResult {
  count: number;
  lab_values: LabListItem[];
}

export interface LabCategoriesResult {
  categories: string[];
}

export interface WaitlistJoinResult {
  ok: boolean;
  message: string;
}

export interface WaitlistEntry {
  id: number;
  email: string;
  created_at: string;
}

export interface WaitlistListResult {
  count: number;
  waitlist: WaitlistEntry[];
}

export interface MedMCPOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
}
