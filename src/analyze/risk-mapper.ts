export type RiskLevel = "low" | "medium" | "high" | "critical";

// Calibrated heuristic layer — curated for B2B agent infrastructure (see docs/risk-classification-draft.md).

const CRITICAL_SYMPTOMS_SOLO = new Set(["syncope", "altered consciousness"]);

const HIGH_SYMPTOMS_SOLO = new Set([
  "chest pain",
  "pleuritic chest pain",
  "chest discomfort",
  "dyspnoea",
  "hypoxia",
  "tachycardia",
  "presyncope",
  "haemoptysis",
  "hemiplegia",
  "facial droop",
  "dysarthria",
  "arm weakness",
  "sudden vision loss",
  "seizure",
]);

const MEDIUM_SYMPTOMS = new Set([
  "fever",
  "rigors",
  "oliguria",
  "haematuria",
  "neck stiffness",
  "photophobia",
  "palpitations",
  "hypotension",
]);

/** Allows riskPoints≥5 → HIGH aggregate (anchor required). */
function hasAnchoringRiskSource(extracted: Set<string>): boolean {
  for (const s of extracted) {
    if (CRITICAL_SYMPTOMS_SOLO.has(s) || HIGH_SYMPTOMS_SOLO.has(s)) return true;
  }
  return false;
}

export interface RiskResult {
  risk_level: RiskLevel;
  confidence: number;
  reasons: string[];
}

interface RiskCombination {
  symptoms: string[];
  reason: string;
}

const CRITICAL_COMBINATIONS: RiskCombination[] = [
  { symptoms: ["chest pain", "dyspnoea"], reason: "Possible acute cardiopulmonary emergency" },
  { symptoms: ["chest pain", "diaphoresis"], reason: "Possible acute coronary syndrome" },
  { symptoms: ["hemiplegia", "dysarthria"], reason: "Possible acute stroke (FAST)" },
  { symptoms: ["facial droop", "dysarthria"], reason: "Possible acute stroke (FAST)" },
  { symptoms: ["hemiplegia", "facial droop"], reason: "Possible acute stroke (FAST)" },
  { symptoms: ["arm weakness", "dysarthria"], reason: "Possible acute stroke (FAST)" },
  { symptoms: ["arm weakness", "facial droop"], reason: "Possible acute stroke (FAST)" },
  { symptoms: ["fever", "neck stiffness", "photophobia"], reason: "Possible meningitis" },
  { symptoms: ["chest pain", "jaw pain"], reason: "Possible ACS with jaw radiation" },
  { symptoms: ["chest pain", "back pain"], reason: "Possible aortic dissection" },
  { symptoms: ["dyspnoea", "hypoxia"], reason: "Possible respiratory failure" },
  { symptoms: ["altered consciousness", "fever"], reason: "Possible septic encephalopathy" },
  { symptoms: ["seizure", "fever"], reason: "Possible CNS infection" },
  {
    symptoms: ["seizure", "altered consciousness"],
    reason: "Possible status epilepticus or CNS pathology",
  },
  { symptoms: ["haemoptysis", "dyspnoea"], reason: "Possible pulmonary embolism with haemorrhage" },
  {
    symptoms: ["haemoptysis", "chest pain"],
    reason: "Possible pulmonary embolism or aortic pathology",
  },
  {
    symptoms: ["tachycardia", "hypotension", "fever"],
    reason: "Possible septic shock",
  },
  { symptoms: ["syncope", "chest pain"], reason: "High-risk syncope (aortic, PE, dissection)" },
];

const HIGH_COMBINATIONS: RiskCombination[] = [
  { symptoms: ["fever", "rigors", "oliguria"], reason: "Possible early sepsis" },
  { symptoms: ["headache", "visual disturbance"], reason: "Possible hypertensive crisis or SAH" },
  { symptoms: ["abdominal pain", "rigors"], reason: "Possible peritonitis or perforation" },
  { symptoms: ["back pain", "haematuria"], reason: "Possible renal colic or aortic pathology" },
  { symptoms: ["tachycardia", "diaphoresis"], reason: "Possible thyroid storm or shock" },
  {
    symptoms: ["tachycardia", "hypotension"],
    reason: "Possible haemodynamic compromise",
  },
  {
    symptoms: ["palpitations", "presyncope"],
    reason: "Possible haemodynamically significant arrhythmia",
  },
  {
    symptoms: ["abdominal pain", "haematuria"],
    reason: "Possible renal pathology",
  },
];

export function mapRisk(
  extractedSymptoms: string[],
  matchedSymptoms: string[],
  differentialCount: number
): RiskResult {
  if (extractedSymptoms.length === 0) {
    return { risk_level: "low", confidence: 0, reasons: [] };
  }

  let risk_level: RiskLevel = "low";
  const reasons: string[] = [];
  let riskPoints = 0;
  /** True once a cluster matched or a solo symptom provides an anchoring HIGH/CRITICAL tier. */
  let allowsAggregateHighFromPoints = false;

  const extracted = new Set(extractedSymptoms);

  for (const combo of CRITICAL_COMBINATIONS) {
    const hasAll = combo.symptoms.every((sym) => extracted.has(sym));
    if (hasAll) {
      reasons.push(`critical symptom cluster: ${combo.symptoms.join(" + ")} (${combo.reason})`);
      risk_level = "critical";
      allowsAggregateHighFromPoints = true;
    }
  }

  if (risk_level !== "critical") {
    for (const combo of HIGH_COMBINATIONS) {
      const hasAll = combo.symptoms.every((sym) => extracted.has(sym));
      if (hasAll) {
        reasons.push(`high-risk symptom cluster: ${combo.symptoms.join(" + ")} (${combo.reason})`);
        risk_level = "high";
        allowsAggregateHighFromPoints = true;
      }
    }
  }

  for (const sym of extractedSymptoms) {
    if (CRITICAL_SYMPTOMS_SOLO.has(sym)) {
      reasons.push(`critical symptom present: ${sym}`);
      risk_level = "critical";
      riskPoints += 4;
      allowsAggregateHighFromPoints = true;
      continue;
    }

    if (HIGH_SYMPTOMS_SOLO.has(sym)) {
      riskPoints += 2;
      if (risk_level !== "critical") {
        reasons.push(`high-risk symptom present: ${sym}`);
        risk_level = "high";
        allowsAggregateHighFromPoints = true;
      }
      continue;
    }

    if (MEDIUM_SYMPTOMS.has(sym)) {
      riskPoints += 1;
    }
  }

  if (risk_level !== "critical") {
    if (riskPoints >= 5 && allowsAggregateHighFromPoints) {
      if (risk_level !== "high") {
        reasons.push("multiple risk contributors in symptom profile");
      }
      risk_level = "high";
    } else if (riskPoints >= 5 && !allowsAggregateHighFromPoints) {
      if (risk_level === "low") {
        risk_level = "medium";
      }
      reasons.push("multiple moderate-risk features without anchoring high-risk symptom");
    } else if (riskPoints >= 2 && risk_level === "low") {
      risk_level = "medium";
      reasons.push("multiple moderate-risk features identified");
    }
  }

  if (
    risk_level === "low" &&
    extractedSymptoms.length > 0 &&
    extractedSymptoms.every((s) => MEDIUM_SYMPTOMS.has(s))
  ) {
    risk_level = "medium";
    reasons.push("moderate-risk symptom(s) identified");
  }

  if (risk_level === "low" && extractedSymptoms.length >= 2 && differentialCount > 0) {
    risk_level = "medium";
    reasons.push("multiple symptoms match at least one differential");
  }

  const confidence =
    Math.round((matchedSymptoms.length / extractedSymptoms.length) * 100) / 100;

  return { risk_level, confidence, reasons };
}
