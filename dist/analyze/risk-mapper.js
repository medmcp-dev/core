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
export function mapRisk(extractedSymptoms, matchedSymptoms, differentialCount) {
    if (extractedSymptoms.length === 0) {
        return { risk_level: "low", confidence: 0 };
    }
    let risk_level = "low";
    for (const sym of extractedSymptoms) {
        if (CRITICAL_SYMPTOMS.has(sym)) {
            risk_level = "critical";
            break;
        }
        if (HIGH_SYMPTOMS.has(sym)) {
            risk_level = "high";
        }
    }
    // Upgrade low → medium if ≥2 symptoms with a differential match
    if (risk_level === "low" && extractedSymptoms.length >= 2 && differentialCount > 0) {
        risk_level = "medium";
    }
    // confidence = fraction of extracted symptoms that appear in at least one differential
    const confidence = Math.round((matchedSymptoms.length / extractedSymptoms.length) * 100) / 100;
    return { risk_level, confidence };
}
//# sourceMappingURL=risk-mapper.js.map