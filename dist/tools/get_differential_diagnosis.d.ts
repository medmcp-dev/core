export interface GetDifferentialDiagnosisInput {
    symptoms: string[];
    max_results?: number;
}
interface RankedDiagnosis {
    name: string;
    matched_symptoms: string[];
    match_score: number;
    distinguishing_features: string | null;
    key_investigations: string | null;
    icd11_code: string | null;
    prevalence: string | null;
}
export interface DifferentialResult {
    queried_symptoms: string[];
    differentials: RankedDiagnosis[];
    total_candidates: number;
}
export declare function getDifferentialDiagnosis(input: GetDifferentialDiagnosisInput): DifferentialResult;
export {};
//# sourceMappingURL=get_differential_diagnosis.d.ts.map