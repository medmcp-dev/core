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

test("negation: extended cues suppress list-style symptom mentions", () => {
  const out = normalizeText("denies any chest pain or shortness of breath and is free of fever");
  assert.ok(!out.includes("chest pain"));
  assert.ok(!out.includes("dyspnoea"));
  assert.ok(!out.includes("fever"));
});

test("negation: no evidence of suppresses downstream symptom", () => {
  const out = normalizeText("exam: no evidence of neck stiffness or photophobia");
  assert.ok(!out.includes("neck stiffness"));
  assert.ok(!out.includes("photophobia"));
});

test("negation scope ends at contrast term", () => {
  const out = normalizeText("no chest pain but shortness of breath and tachycardia");
  assert.ok(!out.includes("chest pain"));
  assert.ok(out.includes("dyspnoea"));
  assert.ok(out.includes("tachycardia"));
});

test("term boundaries: do not match substring inside larger word", () => {
  const out = normalizeText("the patient mentions trash bins and no respiratory concerns");
  assert.ok(!out.includes("rash"));
});

test("term boundaries: still match proper symptom phrase", () => {
  const out = normalizeText("developed a skin rash today");
  assert.ok(out.includes("rash"));
});

test("negation scope: sentence/semicolon break restores affirmative symptom", () => {
  const out = normalizeText("negative for chest pain; reports shortness of breath");
  assert.ok(!out.includes("chest pain"));
  assert.ok(out.includes("dyspnoea"));
});

test("negation scope: affirmative cue after comma restores positive symptom", () => {
  const out = normalizeText("no cough, productive cough present");
  assert.ok(out.includes("productive cough"));
});

