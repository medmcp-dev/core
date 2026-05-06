import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { randomUUID } from "crypto";
import { authMiddleware } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rateLimit.js";
import { healthHandler } from "./routes/health.js";
import { schemaHandler } from "./routes/schema.js";
import { analyzeHandler } from "./routes/analyze.js";
import { labHandler } from "./routes/lab.js";
import { waitlistPostHandler, waitlistGetHandler } from "./routes/waitlist.js";
import { requestTimingLog } from "./middleware/requestLog.js";
import { agentMetaHeaders } from "./middleware/agentMetaHeaders.js";

process.on("uncaughtException", (err) => { console.error("UNCAUGHT:", err); });
process.on("unhandledRejection", (err) => { console.error("UNHANDLED:", err); });

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: [
      "X-MedMCP-Schema-Version",
      "X-MedMCP-Release",
      "X-MedMCP-Git-Revision",
      "X-MedMCP-Data-Revision",
    ],
  })
);

app.use("/v1/*", requestTimingLog);
app.use("/v1/*", agentMetaHeaders);

app.get("/v1/health", healthHandler);

app.use("/v1/analyze", rateLimit(60, 60_000));   // 60 req/min per IP
app.use("/v1/lab",     rateLimit(60, 60_000));   // 60 req/min per IP
app.use("/v1/waitlist", rateLimit(5, 3_600_000)); // 5 req/hour per IP

app.use("/v1/schema", authMiddleware);
app.use("/v1/analyze", authMiddleware);
app.use("/v1/lab", authMiddleware);
app.use("/v1/waitlist", async (c, next) => {
  if (c.req.method === "GET") return authMiddleware(c, next);
  return next();
});

app.get("/v1/schema", schemaHandler);
app.post("/v1/analyze", analyzeHandler);
app.get("/v1/lab", labHandler);
app.post("/v1/waitlist", waitlistPostHandler);
app.get("/v1/waitlist", waitlistGetHandler);

app.notFound((c) => c.json({ error: "Not found" }, 404));

const PORT = Number(process.env.PORT ?? 3000);

console.log(`Starting server on port ${PORT}...`);
serve({ fetch: app.fetch, port: PORT, hostname: "0.0.0.0" });
console.log(`MedMCP HTTP server running on http://0.0.0.0:${PORT}`);

void initializeDataLayer();

async function initializeDataLayer(): Promise<void> {
  try {
    const { seed } = await import("../db/seed.js");
    seed();
    await seedFirstApiKey();
    console.log("Initialization complete.");
  } catch (err) {
    console.error("Initialization error (non-fatal):", err);
  }
}

async function seedFirstApiKey(): Promise<void> {
  const db = await import("../db/database.js");
  const { hasApiKeys, createApiKey } = db;
  if (hasApiKeys()) return;

  const key = process.env.MEDDATA_API_KEY ?? `mk_${randomUUID().replace(/-/g, "")}`;
  createApiKey("default", key);

  if (!process.env.MEDDATA_API_KEY) {
    console.log(`
┌─────────────────────────────────────────────────┐
│  No API keys found. Generated a development key: │
│                                                   │
│  X-API-Key: ${key}  │
│                                                   │
│  Set MEDDATA_API_KEY in your env to use your own. │
└─────────────────────────────────────────────────┘
`);
  }
}
