export type RiskLevel = "low" | "medium" | "high" | "critical";

// NOTE: These classifications need medical review before production use.
// Based on standard triage red-flag criteria, not diagnostic guidelines.
const CRITICAL_SYMPTOMS = new Set([
  "syncope",
  "altered consciousness",
  "haemoptysis",
]);

const HIGH_SYMPTOMS = new Set([
  "chest pain",
  "pleuritic chest pain",
  "chest discomfort",
  "dyspnoea",
  "hypoxia",
  "tachycardia",
  "palpitations",
  "presyncope",
]);

export interface RiskResult {
  risk_level: RiskLevel;
  confidence: number;
  reasons: string[];
}

const MEDIUM_SYMPTOMS = new Set([
  "fever",
  "rigors",
  "oliguria",
  "haematuria",
  "hemiplegia",
  "dysarthria",
  "facial droop",
  "neck stiffness",
  "photophobia",
]);

interface RiskCombination {
  symptoms: string[];
  reason: string;
}

const CRITICAL_COMBINATIONS: RiskCombination[] = [
  { symptoms: ["chest pain", "dyspnoea"], reason: "Possible acute cardiopulmonary emergency" },
  { symptoms: ["chest pain", "diaphoresis"], reason: "Possible acute coronary syndrome" },
  { symptoms: ["hemiplegia", "dysarthria"], reason: "Possible acute stroke" },
  { symptoms: ["facial droop", "dysarthria"], reason: "Possible acute stroke" },
  { symptoms: ["fever", "neck stiffness", "photophobia"], reason: "Possible meningitis" },
  { symptoms: ["chest pain", "jaw pain"], reason: "Possible ACS with jaw radiation" },
  { symptoms: ["chest pain", "back pain"], reason: "Possible aortic dissection" },
  { symptoms: ["dyspnoea", "hypoxia"], reason: "Possible respiratory failure" },
  { symptoms: ["altered consciousness", "fever"], reason: "Possible septic encephalopathy" },
  { symptoms: ["seizure", "fever"], reason: "Possible CNS infection" },
  { symptoms: ["haemoptysis", "dyspnoea"], reason: "Possible pulmonary embolism with haemorrhage" },
  { symptoms: ["syncope", "chest pain"], reason: "High-risk syncope (aortic, PE, dissection)" },
];

const HIGH_COMBINATIONS: RiskCombination[] = [
  { symptoms: ["fever", "rigors", "oliguria"], reason: "Possible early sepsis" },
  { symptoms: ["headache", "visual disturbance"], reason: "Possible hypertensive crisis or SAH" },
  { symptoms: ["abdominal pain", "rigors"], reason: "Possible peritonitis or perforation" },
  { symptoms: ["back pain", "haematuria"], reason: "Possible renal colic or aortic pathology" },
  { symptoms: ["tachycardia", "diaphoresis"], reason: "Possible thyroid storm or shock" },
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
  const extracted = new Set(extractedSymptoms);

  for (const combo of CRITICAL_COMBINATIONS) {
    const hasAll = combo.symptoms.every((sym) => extracted.has(sym));
    if (hasAll) {
      reasons.push(`critical symptom cluster: ${combo.symptoms.join(" + ")} (${combo.reason})`);
      risk_level = "critical";
    }
  }

  if (risk_level !== "critical") {
    for (const combo of HIGH_COMBINATIONS) {
      const hasAll = combo.symptoms.every((sym) => extracted.has(sym));
      if (hasAll) {
        reasons.push(`high-risk symptom cluster: ${combo.symptoms.join(" + ")} (${combo.reason})`);
        risk_level = "high";
      }
    }
  }

  for (const sym of extractedSymptoms) {
    if (CRITICAL_SYMPTOMS.has(sym)) {
      reasons.push(`critical symptom present: ${sym}`);
      risk_level = "critical";
      riskPoints += 4;
      continue;
    }

    if (HIGH_SYMPTOMS.has(sym)) {
      reasons.push(`high-risk symptom present: ${sym}`);
      // Do not downgrade critical (e.g. chest pain + dyspnoea cluster already set critical).
      if (risk_level !== "critical") {
        risk_level = "high";
      }
      riskPoints += 2;
      continue;
    }

    if (MEDIUM_SYMPTOMS.has(sym)) {
      riskPoints += 1;
    }
  }

  if (risk_level !== "critical") {
    if (riskPoints >= 5) {
      risk_level = "high";
      reasons.push("multiple risk contributors in symptom profile");
    } else if (riskPoints >= 2 && risk_level === "low") {
      risk_level = "medium";
      reasons.push("multiple moderate-risk features identified");
    }
  }

  // Upgrade low → medium if ≥2 symptoms with a differential match
  if (risk_level === "low" && extractedSymptoms.length >= 2 && differentialCount > 0) {
    risk_level = "medium";
    reasons.push("multiple symptoms match at least one differential");
  }

  // confidence = fraction of extracted symptoms that appear in at least one differential
  const confidence =
    Math.round((matchedSymptoms.length / extractedSymptoms.length) * 100) / 100;

  return { risk_level, confidence, reasons };
}
