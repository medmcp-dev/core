import type { Context, Next } from "hono";
import type { Capability } from "../capabilities.js";

type ValidateApiKeyFn = (key: string) => boolean;
let validateApiKey: ValidateApiKeyFn | null = null;
type HasCapabilityForKeyFn = (key: string, capability: Capability) => boolean;
let hasCapabilityForKey: HasCapabilityForKeyFn | null = null;

async function getValidateApiKey(): Promise<ValidateApiKeyFn> {
  if (validateApiKey) return validateApiKey;

  const db = await import("../../db/database.js");
  validateApiKey = db.validateApiKey;
  hasCapabilityForKey = db.hasCapabilityForKey;
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
    c.set("apiKey", key);
  } catch (err) {
    console.error("Auth DB initialization failed:", err);
    return c.json({ error: "Service unavailable" }, 503);
  }

  await next();
}

export function requireCapability(capability: Capability) {
  return async (c: Context, next: Next): Promise<Response | void> => {
    const key = (c.get("apiKey") as string | undefined) ?? c.req.header("X-API-Key");
    if (!key) return c.json({ error: "Missing X-API-Key header" }, 401);

    try {
      if (!hasCapabilityForKey) {
        await getValidateApiKey();
      }
      if (!hasCapabilityForKey || !hasCapabilityForKey(key, capability)) {
        return c.json(
          { error: "Capability not enabled for this API key", code: "capability_not_enabled", capability },
          403
        );
      }
    } catch (err) {
      console.error("Capability DB check failed:", err);
      return c.json({ error: "Service unavailable" }, 503);
    }

    await next();
  };
}
