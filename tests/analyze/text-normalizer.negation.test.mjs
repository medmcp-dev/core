import test from "node:test";
import assert from "node:assert/strict";
import { normalizeText } from "../../dist/analyze/text-normalizer.js";

test("negation: no chest pain suppresses chest pain symptom", () => {
  const out = normalizeText("no chest pain");
  assert.ok(!out.includes("chest pain"));
});

test("negation: no chest pain and no shortness of breath suppresses both", () => {
  const out = normalizeText("runny nose, no chest pain, no shortness of breath");
  assert.ok(!out.includes("chest pain"));
  assert.ok(!out.includes("dyspnoea"));
});

test("negation: without/denies/negative for cues suppress mapped symptom", () => {
  const out = normalizeText("denies haemoptysis and is negative for fever without chest pain");
  assert.ok(!out.includes("haemoptysis"));
  assert.ok(!out.includes("fever"));
  assert.ok(!out.includes("chest pain"));
});

test("negation scope ends at contrast term", () => {
  const out = normalizeText("no chest pain but shortness of breath and tachycardia");
  assert.ok(!out.includes("chest pain"));
  assert.ok(out.includes("dyspnoea"));
  assert.ok(out.includes("tachycardia"));
});

