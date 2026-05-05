interface DrugInteraction {
    id: number;
    drug_a: string;
    drug_b: string;
    severity: "mild" | "moderate" | "severe" | "contraindicated";
    mechanism: string;
    clinical_effect: string;
    management: string;
    created_at: string;
}
export interface GetDrugInteractionsInput {
    drugs: string[];
}
export interface InteractionResult {
    drug_pair: [string, string];
    interaction: DrugInteraction | null;
}
export interface DrugInteractionsResult {
    checked_pairs: number;
    interactions_found: number;
    results: InteractionResult[];
    queried_drugs: string[];
}
export declare function getDrugInteractions(input: GetDrugInteractionsInput): DrugInteractionsResult;
export {};
//# sourceMappingURL=get_drug_interactions.d.ts.map