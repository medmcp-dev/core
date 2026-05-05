import { validateApiKey } from "../../db/database.js";
export async function authMiddleware(c, next) {
    const key = c.req.header("X-API-Key");
    if (!key) {
        return c.json({ error: "Missing X-API-Key header" }, 401);
    }
    if (!validateApiKey(key)) {
        return c.json({ error: "Invalid API key" }, 403);
    }
    await next();
}
//# sourceMappingURL=auth.js.map