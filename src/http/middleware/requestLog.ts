import type { MiddlewareHandler } from "hono";
import { recordHttpRequest } from "../metrics-http.js";

function statusClass(code: number): string {
  if (code >= 500) return "5xx";
  if (code >= 400) return "4xx";
  if (code >= 300) return "3xx";
  if (code >= 200) return "2xx";
  return "1xx";
}

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
  const status = c.res.status;
  const omitFromRollup =
    c.req.method === "GET" && c.req.path === "/v1/health";
  if (!omitFromRollup) recordHttpRequest(c.req.method, c.req.path, status, ms);

  const useJson =
    process.env.LOG_HTTP_JSON === "1" || process.env.LOG_HTTP_JSON === "true";
  if (useJson) {
    console.info(
      JSON.stringify({
        level: "info",
        msg: "http_request",
        method: c.req.method,
        path: c.req.path,
        status,
        status_class: statusClass(status),
        duration_ms: ms,
        ts: new Date().toISOString(),
      })
    );
  } else {
    console.info(`[http] ${c.req.method} ${c.req.path} ${status} ${ms}ms`);
  }
};
