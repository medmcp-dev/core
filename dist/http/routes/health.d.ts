import type { Context } from "hono";
export declare function healthHandler(c: Context): Response & import("hono").TypedResponse<{
    status: string;
    version: string;
    timestamp: string;
}, import("hono/utils/http-status").ContentfulStatusCode, "json">;
//# sourceMappingURL=health.d.ts.map