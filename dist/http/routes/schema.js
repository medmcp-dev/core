const INPUT_SCHEMA = {
    type: "object",
    required: ["type", "data"],
    properties: {
        type: {
            type: "string",
            enum: ["symptom", "lab", "vitals", "medication"],
            description: "The input data type. Only 'symptom' is supported in v1.",
        },
        data: {
            type: "object",
            description: "Type-specific payload.",
            oneOf: [
                {
                    title: "SymptomInput",
                    required: ["text"],
                    properties: {
                        text: {
                            type: "string",
                            description: "Free-text symptom description.",
                            example: "chest pain for 2 hours",
                        },
                    },
                },
            ],
        },
    },
};
const OUTPUT_SCHEMA = {
    type: "object",
    properties: {
        risk_level: {
            type: "string",
            enum: ["low", "medium", "high", "critical"],
        },
        confidence: {
            type: "number",
            minimum: 0,
            maximum: 1,
            description: "Fraction of extracted symptoms matched by at least one differential.",
        },
        entities: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    type: { type: "string", enum: ["symptom", "diagnosis", "icd_code"] },
                    value: { type: "string" },
                    metadata: { type: "object" },
                },
            },
        },
        source_type: {
            type: "string",
            enum: ["symptom", "lab", "vitals", "medication"],
        },
        interpretation: {
            type: "string",
            description: "Short structured reasoning suitable for agent consumption.",
        },
    },
};
export function schemaHandler(c) {
    return c.json({
        version: "1.0.0",
        supported_types: ["symptom"],
        input: INPUT_SCHEMA,
        output: OUTPUT_SCHEMA,
    });
}
//# sourceMappingURL=schema.js.map