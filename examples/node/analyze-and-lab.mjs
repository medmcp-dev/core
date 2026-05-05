#!/usr/bin/env node
/**
 * Minimal call: POST /v1/analyze + GET /v1/lab (no local SDK dependency).
 */
const BASE_URL = (process.env.MEDDATA_BASE_URL ?? "https://core-production-389e.up.railway.app").replace(
  /\/$/,
  "",
);
const KEY = process.env.MEDDATA_API_KEY;

if (!KEY) {
  console.error("Set MEDDATA_API_KEY (e.g. PowerShell: $env:MEDDATA_API_KEY=\"mk_...\")");
  process.exit(1);
}

async function main() {
  const analyzeRes = await fetch(`${BASE_URL}/v1/analyze`, {
    method: "POST",
    headers: {
      "X-API-Key": KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "symptom",
      data: { text: "shortness of breath and chest discomfort for about an hour" },
    }),
  });
  const analyzeBody = await analyzeRes.json();
  console.log("POST /v1/analyze", analyzeRes.status, JSON.stringify(analyzeBody, null, 2));

  const qs = new URLSearchParams({ name: "troponin" });
  const labRes = await fetch(`${BASE_URL}/v1/lab?${qs}`, {
    headers: { "X-API-Key": KEY },
  });
  const labBody = await labRes.json();
  console.log("\nGET /v1/lab?name=troponin", labRes.status, JSON.stringify(labBody, null, 2));
}

await main();
