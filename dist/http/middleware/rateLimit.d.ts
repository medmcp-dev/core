import type { Context, Next } from "hono";
export declare function rateLimit(maxRequests: number, windowMs: number): (c: Context, next: Next) => Promise<void | (Response & import("hono").TypedResponse<{
    error: string;
}, 429, "json">)>;
//# sourceMappingURL=rateLimit.d.ts.map