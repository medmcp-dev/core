import type { Context, Next } from "hono";

interface Window {
  count: number;
  resetAt: number;
}

const store = new Map<string, Window>();

export function rateLimit(maxRequests: number, windowMs: number) {
  return async (c: Context, next: Next) => {
    const ip =
      c.req.header("x-forwarded-for")?.split(",")[0].trim() ??
      c.req.header("x-real-ip") ??
      "unknown";
    const key = `${c.req.path}:${ip}`;
    const now = Date.now();

    let win = store.get(key);
    if (!win || win.resetAt < now) {
      win = { count: 1, resetAt: now + windowMs };
      store.set(key, win);
      return next();
    }

    if (win.count >= maxRequests) {
      const retryAfter = Math.ceil((win.resetAt - now) / 1000);
      c.header("Retry-After", String(retryAfter));
      return c.json({ error: "Too many requests. Please slow down." }, 429);
    }

    win.count++;
    return next();
  };
}
