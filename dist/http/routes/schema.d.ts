import type { Context } from "hono";
export declare function schemaHandler(c: Context): Response & import("hono").TypedResponse<{
    version: string;
    supported_types: string[];
    input: {
        type: string;
        required: string[];
        properties: {
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            data: {
                type: string;
                description: string;
                oneOf: {
                    title: string;
                    required: string[];
                    properties: {
                        text: {
                            type: string;
                            description: string;
                            example: string;
                        };
                    };
                }[];
            };
        };
    };
    output: {
        type: string;
        properties: {
            risk_level: {
                type: string;
                enum: string[];
            };
            confidence: {
                type: string;
                minimum: number;
                maximum: number;
                description: string;
            };
            entities: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            enum: string[];
                        };
                        value: {
                            type: string;
                        };
                        metadata: {
                            type: string;
                        };
                    };
                };
            };
            source_type: {
                type: string;
                enum: string[];
            };
            interpretation: {
                type: string;
                description: string;
            };
        };
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">;
//# sourceMappingURL=schema.d.ts.map