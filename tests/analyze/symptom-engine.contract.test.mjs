/**
 * Integration-style contract tests: real DB seed + symptom engine.
 * Requires: DB_PATH unset until this file sets it, then dynamic import of seed/engine.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const fixtureDir = mkdtempSync(path.join(tmpdir(), "meddata-contract-"));
const dbPath = path.join(fixtureDir, "meddata.db");
process.env.DB_PATH = dbPath;

const { seed } = await import("../../dist/db/seed.js");
const { analyzeSymptoms } = await import("../../dist/analyze/symptom-engine.js");

seed();

function assertAnalyzeShape(out) {
  assert.ok(["low", "medium", "high", "critical"].includes(out.risk_level));
  assert.equal(out.source_type, "symptom");
  assert.equal(typeof out.confidence, "number");
  assert.ok(out.confidence >= 0 && out.confidence <= 1);
  assert.ok(Array.isArray(out.entities));
  assert.equal(typeof out.interpretation, "string");
}

test.after(() => {
  try {
    rmSync(fixtureDir, { recursive: true, force: true });
  } catch {
    // Windows may keep a lock on the WAL; ignore cleanup failure in CI
  }
});

test("analyzeSymptoms: empty input yields low and no entities", () => {
  const out = analyzeSymptoms("   ");
  assertAnalyzeShape(out);
  assert.equal(out.risk_level, "low");
  assert.equal(out.confidence, 0);
  assert.equal(out.entities.length, 0);
  assert.match(out.interpretation, /no recognizable symptoms/i);
});

test("analyzeSymptoms: chest pain + dyspnoea cluster is critical", () => {
  const out = analyzeSymptoms("chest pain and shortness of breath for 1 hour");
  assertAnalyzeShape(out);
  assert.equal(out.risk_level, "critical");
  assert.ok(out.entities.some((e) => e.type === "symptom" && e.value === "chest pain"));
  assert.ok(out.entities.some((e) => e.type === "symptom" && e.value === "dyspnoea"));
  assert.match(out.interpretation, /risk drivers/i);
});

const NEW_CRITICAL_CLUSTER_CASES = [
  {
    name: "chest pain + jaw pain",
    text: "chest pain with jaw pain",
  },
  {
    name: "chest pain + back pain",
    text: "severe chest pain radiating to back pain",
  },
  {
    name: "dyspnoea + hypoxia",
    text: "dyspnoea and hypoxia",
  },
  {
    name: "altered consciousness + fever",
    text: "altered consciousness with fever",
  },
  {
    name: "seizure + fever",
    text: "seizure with fever",
  },
  {
    name: "haemoptysis + dyspnoea",
    text: "haemoptysis and dyspnoea",
  },
  {
    name: "syncope + chest pain",
    text: "syncope after sudden chest pain",
  },
];

for (const c of NEW_CRITICAL_CLUSTER_CASES) {
  test(`analyzeSymptoms: ${c.name} cluster is critical`, () => {
    const out = analyzeSymptoms(c.text);
    assertAnalyzeShape(out);
    assert.equal(out.risk_level, "critical");
  });
}

const NEW_HIGH_CLUSTER_CASES = [
  {
    name: "fever + rigors + oliguria",
    text: "fever with rigors and oliguria",
  },
  {
    name: "headache + visual disturbance",
    text: "headache with visual disturbance",
  },
  {
    name: "abdominal pain + rigors",
    text: "abdominal pain and rigors",
  },
  {
    name: "back pain + haematuria",
    text: "back pain with haematuria",
  },
  {
    name: "tachycardia + diaphoresis",
    text: "tachycardia with diaphoresis",
  },
];

for (const c of NEW_HIGH_CLUSTER_CASES) {
  test(`analyzeSymptoms: ${c.name} cluster is at least high`, () => {
    const out = analyzeSymptoms(c.text);
    assertAnalyzeShape(out);
    assert.ok(["high", "critical"].includes(out.risk_level));
  });
}

test("analyzeSymptoms: chest pain alone is at least high", () => {
  const out = analyzeSymptoms("retrosternal chest pain");
  assertAnalyzeShape(out);
  assert.ok(["high", "critical"].includes(out.risk_level));
  assert.ok(out.entities.some((e) => e.type === "symptom" && e.value === "chest pain"));
});

test("analyzeSymptoms: mild fatigue may stay low or medium with DB matches", () => {
  const out = analyzeSymptoms("I've been unusually tired lately");
  assertAnalyzeShape(out);
  assert.ok(["low", "medium"].includes(out.risk_level));
  assert.ok(out.entities.some((e) => e.type === "symptom"));
});
