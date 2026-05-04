export type RiskLevel = "low" | "medium" | "high" | "critical";
export type SourceType = "symptom" | "lab" | "vitals" | "medication";
export type EntityType = "symptom" | "diagnosis" | "icd_code";

export interface Entity {
  type: EntityType;
  value: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyzeResult {
  risk_level: RiskLevel;
  confidence: number;
  entities: Entity[];
  source_type: SourceType;
  interpretation: string;
}

export interface HealthResult {
  status: string;
  version: string;
  timestamp: string;
}

export interface MedMCPOptions {
  apiKey: string;
  baseUrl?: string;
}
