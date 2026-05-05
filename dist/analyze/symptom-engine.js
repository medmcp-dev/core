import { normalizeText } from "./text-normalizer.js";
import { mapRisk } from "./risk-mapper.js";
import { getDifferentialDiagnosis } from "../tools/get_differential_diagnosis.js";
export function analyzeSymptoms(text) {
    const extractedSymptoms = normalizeText(text);
    if (extractedSymptoms.length === 0) {
        return {
            risk_level: "low",
            confidence: 0,
            entities: [],
            source_type: "symptom",
            interpretation: "No recognizable symptoms extracted from input.",
        };
    }
    const result = getDifferentialDiagnosis({ symptoms: extractedSymptoms, max_results: 5 });
    // Union of all symptoms matched across all differentials
    const allMatchedSymptoms = [
        ...new Set(result.differentials.flatMap((d) => d.matched_symptoms)),
    ];
    const { risk_level, confidence } = mapRisk(extractedSymptoms, allMatchedSymptoms, result.differentials.length);
    const entities = [
        ...extractedSymptoms.map((s) => ({ type: "symptom", value: s })),
        ...result.differentials.slice(0, 3).map((d) => ({
            type: "diagnosis",
            value: d.name,
            metadata: {
                match_score: d.match_score,
                ...(d.icd11_code ? { icd11_code: d.icd11_code } : {}),
            },
        })),
    ];
    const topDx = result.differentials[0];
    const symptomList = extractedSymptoms.join(", ");
    const differentialSummary = topDx
        ? `Top differential: ${topDx.name} (match score: ${topDx.match_score}).`
        : "No matching differentials found.";
    const interpretation = `${extractedSymptoms.length} symptom(s) identified: ${symptomList}. ` +
        differentialSummary;
    return { risk_level, confidence, entities, source_type: "symptom", interpretation };
}
//# sourceMappingURL=symptom-engine.js.map