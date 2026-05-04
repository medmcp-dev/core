import type { Context, Next } from "hono";
import { validateApiKey } from "../../db/database.js";

export async function authMiddleware(c: Context, next: Next): Promise<Response | void> {
  const key = c.req.header("X-API-Key");

  if (!key) {
    return c.json({ error: "Missing X-API-Key header" }, 401);
  }

  if (!validateApiKey(key)) {
    return c.json({ error: "Invalid API key" }, 403);
  }

  await next();
}
