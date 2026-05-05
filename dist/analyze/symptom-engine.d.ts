import { type RiskLevel } from "./risk-mapper.js";
export interface Entity {
    type: "symptom" | "diagnosis" | "icd_code";
    value: string;
    metadata?: Record<string, unknown>;
}
export interface AnalyzeOutput {
    risk_level: RiskLevel;
    confidence: number;
    entities: Entity[];
    source_type: "symptom" | "lab" | "vitals" | "medication";
    interpretation: string;
}
export declare function analyzeSymptoms(text: string): AnalyzeOutput;
//# sourceMappingURL=symptom-engine.d.ts.map