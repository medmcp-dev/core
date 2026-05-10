/** In-process rolling-window HTTP metrics → periodic JSON summary line (Railway/logs). No external APM required. */

const MAX_SAMPLES_PER_ROUTE = 384;

interface RouteAgg {
  count: number;
  sumMs: number;
  samples: number[];
  n429: number;
  n5xx: number;
  n4xxOther: number;
}

const routeAggs = new Map<string, RouteAgg>();

let windowOpensAtMs = Date.now();

function aggKey(method: string, path: string): string {
  return `${method} ${path}`;
}

function pushSample(samples: number[], ms: number): void {
  samples.push(ms);
  while (samples.length > MAX_SAMPLES_PER_ROUTE) samples.shift();
}

function percentile(samples: readonly number[], p: number): number {
  if (samples.length === 0) return 0;
  const sorted = [...samples].sort((a, b) => a - b);
  const n = sorted.length;
  const pos = (p / 100) * (n - 1);
  const base = Math.floor(pos);
  const rest = pos - base;
  const hi = sorted[base + 1];
  if (hi !== undefined && rest > 0) return sorted[base] + rest * (hi - sorted[base]);
  return sorted[base]!;
}

function roundMs(x: number): number {
  return Math.round(x * 100) / 100;
}

/** Call after response is finalized (few routes — low cardinality). */
export function recordHttpRequest(
  method: string,
  path: string,
  status: number,
  durationMs: number
): void {
  const key = aggKey(method, path);
  let agg = routeAggs.get(key);
  if (!agg) {
    agg = { count: 0, sumMs: 0, samples: [], n429: 0, n5xx: 0, n4xxOther: 0 };
    routeAggs.set(key, agg);
  }
  agg.count += 1;
  agg.sumMs += durationMs;
  pushSample(agg.samples, durationMs);
  if (status === 429) agg.n429 += 1;
  else if (status >= 500) agg.n5xx += 1;
  else if (status >= 400) agg.n4xxOther += 1;
}

function snapshotTotals(aggs: RouteAgg[]): {
  requests: number;
  ratelimited_429: number;
  failures_5xx: number;
  client_error_4xx: number;
} {
  let requests = 0;
  let ratelimited_429 = 0;
  let failures_5xx = 0;
  let client_error_4xx = 0;
  for (const a of aggs) {
    requests += a.count;
    ratelimited_429 += a.n429;
    failures_5xx += a.n5xx;
    client_error_4xx += a.n4xxOther;
  }
  return { requests, ratelimited_429, failures_5xx, client_error_4xx };
}

/** Emit one `[http-metrics] {…}` line and reset the window; no-op when nothing was recorded. */
export function flushHttpMetricsSnapshot(): void {
  if (routeAggs.size === 0) return;

  const until = Date.now();
  const fromMs = windowOpensAtMs;
  windowOpensAtMs = until;

  const entries = [...routeAggs.entries()];
  routeAggs.clear();

  const routes: Record<string, unknown> = {};
  for (const [key, agg] of entries) {
    routes[key] = {
      requests: agg.count,
      p50_ms: roundMs(percentile(agg.samples, 50)),
      p95_ms: roundMs(percentile(agg.samples, 95)),
      avg_ms:
        agg.count > 0 ? roundMs(agg.sumMs / agg.count) : 0,
      ratelimited_429: agg.n429,
      failures_5xx: agg.n5xx,
      client_error_4xx: agg.n4xxOther,
    };
  }

  const totals = snapshotTotals(entries.map(([, agg]) => agg));

  console.info(
    `[http-metrics] ${JSON.stringify({
      level: "info",
      msg: "http_metrics_window",
      window_from: new Date(fromMs).toISOString(),
      window_to: new Date(until).toISOString(),
      window_ms: until - fromMs,
      totals,
      routes,
    })}`
  );
}

/** Start periodic snapshot logs. Idempotent enough for tests (single worker). */
export function startHttpMetricsReporterIfConfigured(): void {
  const raw = process.env.MEDDATA_HTTP_METRICS_INTERVAL_SEC?.trim();
  if (!raw) return;

  const sec = Number(raw);
  if (!(sec > 0) || !Number.isFinite(sec)) return;

  const ms = Math.min(Math.round(sec * 1000), 86_400_000);
  setInterval(() => flushHttpMetricsSnapshot(), ms).unref();
}
