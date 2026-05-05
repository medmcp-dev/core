export type RiskLevel = "low" | "medium" | "high" | "critical";
export interface RiskResult {
    risk_level: RiskLevel;
    confidence: number;
}
export declare function mapRisk(extractedSymptoms: string[], matchedSymptoms: string[], differentialCount: number): RiskResult;
//# sourceMappingURL=risk-mapper.d.ts.map