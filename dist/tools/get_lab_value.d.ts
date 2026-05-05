interface GetLabValueParams {
    name?: string;
    category?: string;
    action?: "get" | "list";
}
export declare function getLabValue(params: GetLabValueParams): {
    count: number;
    lab_values: {
        name: string;
        abbreviation: string | null;
        unit: string;
        reference_range: string;
        category: string;
    }[];
    error?: undefined;
    available?: undefined;
    lab_value?: undefined;
} | {
    error: string;
    count?: undefined;
    lab_values?: undefined;
    available?: undefined;
    lab_value?: undefined;
} | {
    error: string;
    available: string[];
    count?: undefined;
    lab_values?: undefined;
    lab_value?: undefined;
} | {
    lab_value: {
        critical_low: string | null;
        critical_high: string | null;
        category: string;
        interpretation: string | null;
        clinical_notes: string | null;
        male_range?: string | null | undefined;
        female_range?: string | null | undefined;
        name: string;
        abbreviation: string | null;
        unit: string;
        reference_range: string;
    };
    count?: undefined;
    lab_values?: undefined;
    error?: undefined;
    available?: undefined;
};
export declare function listLabCategories(): string[];
export {};
//# sourceMappingURL=get_lab_value.d.ts.map