import type { Context } from "hono";

export function healthHandler(c: Context) {
  return c.json({
    status: "ok",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}
