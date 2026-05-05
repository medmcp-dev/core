interface Drug {
    id: number;
    name: string;
    generic_name: string | null;
    drug_class: string;
    mechanism: string;
    indications: string;
    contraindications: string | null;
    side_effects: string | null;
    dosing: string | null;
    monitoring: string | null;
    created_at: string;
}
export interface GetDrugInfoInput {
    name: string;
    exact?: boolean;
}
export interface DrugInfoResult {
    found: boolean;
    drug?: Drug;
    matches?: Array<{
        name: string;
        generic_name: string | null;
        drug_class: string;
    }>;
    query: string;
}
export declare function getDrugInfo(input: GetDrugInfoInput): DrugInfoResult;
export declare function listDrugClasses(): string[];
export {};
//# sourceMappingURL=get_drug_info.d.ts.map