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

const CRITICAL_COMBINATIONS: string[][] = [
  ["chest pain", "dyspnoea"],
  ["chest pain", "diaphoresis"],
  ["hemiplegia", "dysarthria"],
  ["facial droop", "dysarthria"],
  ["fever", "neck stiffness", "photophobia"],
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
    const hasAll = combo.every((sym) => extracted.has(sym));
    if (hasAll) {
      reasons.push(`critical symptom cluster: ${combo.join(" + ")}`);
      risk_level = "critical";
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
