import test from "node:test";
import assert from "node:assert/strict";
import { mapRisk } from "../../dist/analyze/risk-mapper.js";

test("returns low risk for no symptoms", () => {
  const result = mapRisk([], [], 0);
  assert.equal(result.risk_level, "low");
  assert.equal(result.confidence, 0);
  assert.deepEqual(result.reasons, []);
});

test("flags critical for explicit critical symptom", () => {
  const result = mapRisk(["syncope"], ["syncope"], 1);
  assert.equal(result.risk_level, "critical");
  assert.match(result.reasons.join(" "), /critical symptom present/i);
});

test("flags critical for chest pain and dyspnoea cluster", () => {
  const result = mapRisk(["chest pain", "dyspnoea"], ["chest pain", "dyspnoea"], 1);
  assert.equal(result.risk_level, "critical");
  assert.match(result.reasons.join(" "), /critical symptom cluster/i);
});

test("keeps high risk for high-risk symptom without critical criteria", () => {
  const result = mapRisk(["palpitations"], ["palpitations"], 1);
  assert.equal(result.risk_level, "high");
  assert.match(result.reasons.join(" "), /high-risk symptom present/i);
});

test("upgrades to medium with multiple moderate-risk features", () => {
  const result = mapRisk(["fever", "rigors"], ["fever"], 1);
  assert.equal(result.risk_level, "medium");
  assert.match(result.reasons.join(" "), /multiple moderate-risk features/i);
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
