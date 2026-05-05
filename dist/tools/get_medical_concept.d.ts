export interface MedicalConcept {
    id: number;
    name: string;
    category: string;
    summary: string;
    mechanism: string | null;
    clinical_relevance: string | null;
    related_concepts: string | null;
    created_at: string;
}
export interface GetMedicalConceptInput {
    name: string;
    category?: string;
    exact?: boolean;
}
export interface ConceptResult {
    found: boolean;
    concept?: MedicalConcept & {
        related_concepts_list: string[];
    };
    matches?: Array<{
        name: string;
        category: string;
        summary: string;
    }>;
    query: string;
}
export declare function getMedicalConcept(input: GetMedicalConceptInput): ConceptResult;
export declare function listCategories(): string[];
export declare function listConcepts(category?: string): Array<{
    name: string;
    category: string;
    summary: string;
}>;
//# sourceMappingURL=get_medical_concept.d.ts.map