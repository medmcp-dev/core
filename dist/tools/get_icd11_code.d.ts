interface ICD11Code {
    id: number;
    code: string;
    title: string;
    description: string;
    inclusion_terms: string | null;
    exclusion_terms: string | null;
    category: string;
    created_at: string;
}
export interface GetICD11CodeInput {
    query: string;
    search_by?: "code" | "title" | "any";
}
export interface ICD11Result {
    found: boolean;
    entry?: ICD11Code;
    matches?: Array<{
        code: string;
        title: string;
        category: string;
    }>;
    query: string;
}
export declare function getICD11Code(input: GetICD11CodeInput): ICD11Result;
export {};
//# sourceMappingURL=get_icd11_code.d.ts.map