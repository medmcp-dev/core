import test from "node:test";
import assert from "node:assert/strict";
import { mapRisk } from "../../dist/analyze/risk-mapper.js";

test("returns low risk for no symptoms", () => {
  const result = mapRisk([], [], 0);
  assert.equal(result.risk_level, "low");
  assert.equal(result.confidence, 0);
  assert.deepEqual(result.reasons, []);
});

test("flags critical for explicit critical symptom solo", () => {
  const result = mapRisk(["syncope"], ["syncope"], 1);
  assert.equal(result.risk_level, "critical");
  assert.match(result.reasons.join(" "), /critical symptom present/i);
});

test("flags critical for chest pain and dyspnoea cluster", () => {
  const result = mapRisk(["chest pain", "dyspnoea"], ["chest pain", "dyspnoea"], 1);
  assert.equal(result.risk_level, "critical");
  assert.match(result.reasons.join(" "), /critical symptom cluster/i);
});

test("haemoptysis solo is high (calibrated heuristic)", () => {
  const result = mapRisk(["haemoptysis"], ["haemoptysis"], 1);
  assert.equal(result.risk_level, "high");
  assert.ok(result.reasons.some((r) => /high-risk symptom present:\s*haemoptysis/i.test(r)));
});

test("palpitations solo is medium-risk tier", () => {
  const result = mapRisk(["palpitations"], ["palpitations"], 1);
  assert.equal(result.risk_level, "medium");
  assert.match(result.reasons.join(" "), /moderate-risk symptom/i);
});

test("FAST arm weakness solo is high", () => {
  const r = mapRisk(["arm weakness"], ["arm weakness"], 1);
  assert.equal(r.risk_level, "high");
});

test("five medium-only symptoms cap at medium without HIGH anchor", () => {
  // Exclude clusters like fever+rigors+oliguria (HIGH sepsis pattern in mapper).
  const syms = [
    "photophobia",
    "haematuria",
    "oliguria",
    "hypotension",
    "palpitations",
  ];
  const result = mapRisk(syms, syms.slice(0, 1), 1);
  assert.equal(result.risk_level, "medium");
  assert.match(result.reasons.join(" "), /without anchoring high-risk symptom/i);
});

test("five medium symptoms with HIGH anchor can reach high via points", () => {
  const syms = ["fever", "rigors", "oliguria", "haematuria", "tachycardia"];
  const result = mapRisk(syms, syms, 1);
  assert.equal(result.risk_level, "high");
});

test("upgrades low to medium from differential-backed multi-symptom match", () => {
  const result = mapRisk(["fatigue", "nausea"], ["fatigue"], 2);
  assert.equal(result.risk_level, "medium");
  assert.match(result.reasons.join(" "), /multiple symptoms match/i);
});

test("confidence reflects matched symptom fraction", () => {
  const result = mapRisk(["fever", "rigors", "fatigue"], ["fever", "rigors"], 2);
  assert.equal(result.confidence, 0.67);
});

test("tachycardia hypotension fever is critical cluster", () => {
  const r = mapRisk(
    ["tachycardia", "hypotension", "fever"],
    ["tachycardia", "hypotension", "fever"],
    1
  );
  assert.equal(r.risk_level, "critical");
});
