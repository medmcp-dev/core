import type { MiddlewareHandler } from "hono";

/** Log `{method path status durationMs}` for `/v1/*`. Skips GET `/v1/health` unless `LOG_HTTP_HEALTH=1/true`. */
export const requestTimingLog: MiddlewareHandler = async (c, next) => {
  const skipHealthLogging =
    process.env.LOG_HTTP_HEALTH !== "1" &&
    process.env.LOG_HTTP_HEALTH !== "true";

  const isHealthNoise =
    skipHealthLogging && c.req.method === "GET" && c.req.path === "/v1/health";

  if (isHealthNoise) {
    return next();
  }

  const t0 = performance.now();
  await next();
  const ms = Math.round((performance.now() - t0) * 100) / 100;
  console.info(`[http] ${c.req.method} ${c.req.path} ${c.res.status} ${ms}ms`);
};
