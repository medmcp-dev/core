import test from "node:test";
import assert from "node:assert/strict";
import { MedMCP, MedMCPError } from "../dist/client.js";

test("labList returns typed list payload", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        count: 1,
        lab_values: [
          {
            name: "sodium",
            abbreviation: "Na+",
            unit: "mmol/L",
            reference_range: "135-145",
            category: "electrolytes",
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  try {
    const client = new MedMCP({ apiKey: "test_key", baseUrl: "https://example.com" });
    const result = await client.labList("electrolytes");
    assert.equal(result.count, 1);
    assert.equal(result.lab_values[0].name, "sodium");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("waitlistJoin sends request body and returns response", async () => {
  const originalFetch = globalThis.fetch;
  let capturedBody = "";

  globalThis.fetch = async (_url, init) => {
    capturedBody = String(init?.body ?? "");
    return new Response(JSON.stringify({ ok: true, message: "You're on the list." }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const client = new MedMCP({ apiKey: "test_key", baseUrl: "https://example.com" });
    const result = await client.waitlistJoin("user@example.com");
    assert.equal(result.ok, true);
    assert.match(capturedBody, /user@example\.com/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("throws MedMCPError on non-2xx response", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const client = new MedMCP({ apiKey: "bad_key", baseUrl: "https://example.com" });
    await assert.rejects(client.labCategories(), (err) => {
      assert.ok(err instanceof MedMCPError);
      assert.equal(err.status, 401);
      return true;
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("retries on 5xx and eventually succeeds", async () => {
  const originalFetch = globalThis.fetch;
  let attempts = 0;

  globalThis.fetch = async () => {
    attempts += 1;
    if (attempts < 3) {
      return new Response(JSON.stringify({ error: "Temporary failure" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ categories: ["cardiac"] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const client = new MedMCP({
      apiKey: "test_key",
      baseUrl: "https://example.com",
      maxRetries: 2,
      retryDelayMs: 1,
    });
    const result = await client.labCategories();
    assert.equal(attempts, 3);
    assert.deepEqual(result.categories, ["cardiac"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("throws timeout error when request exceeds timeoutMs", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (_url, init) =>
    new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => {
        reject(new DOMException("The operation was aborted", "AbortError"));
      });
    });

  try {
    const client = new MedMCP({
      apiKey: "test_key",
      baseUrl: "https://example.com",
      timeoutMs: 10,
      maxRetries: 0,
    });

    await assert.rejects(client.labCategories(), (err) => {
      assert.ok(err instanceof Error);
      assert.match(err.message, /timed out/i);
      return true;
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
