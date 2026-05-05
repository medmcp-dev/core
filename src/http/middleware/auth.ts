import type { Context, Next } from "hono";

type ValidateApiKeyFn = (key: string) => boolean;
let validateApiKey: ValidateApiKeyFn | null = null;

async function getValidateApiKey(): Promise<ValidateApiKeyFn> {
  if (validateApiKey) return validateApiKey;

  const db = await import("../../db/database.js");
  validateApiKey = db.validateApiKey;
  return validateApiKey;
}

export async function authMiddleware(c: Context, next: Next): Promise<Response | void> {
  const key = c.req.header("X-API-Key");

  if (!key) {
    return c.json({ error: "Missing X-API-Key header" }, 401);
  }

  try {
    const validate = await getValidateApiKey();
    if (!validate(key)) {
      return c.json({ error: "Invalid API key" }, 403);
    }
  } catch (err) {
    console.error("Auth DB initialization failed:", err);
    return c.json({ error: "Service unavailable" }, 503);
  }

  await next();
}
