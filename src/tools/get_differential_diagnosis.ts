import { getDb } from "../db/database.js";

interface Diagnosis {
  id: number;
  name: string;
  symptoms: string;
  distinguishing_features: string | null;
  key_investigations: string | null;
  icd11_code: string | null;
  prevalence: string | null;
  created_at: string;
}

export interface GetDifferentialDiagnosisInput {
  symptoms: string[];
  max_results?: number;
}

interface RankedDiagnosis {
  name: string;
  matched_symptoms: string[];
  match_score: number;
  distinguishing_features: string | null;
  key_investigations: string | null;
  icd11_code: string | null;
  prevalence: string | null;
}

export interface DifferentialResult {
  queried_symptoms: string[];
  differentials: RankedDiagnosis[];
  total_candidates: number;
}

function symptomMatches(queriedSymptom: string, diagnosisSymptom: string): boolean {
  return diagnosisSymptom.includes(queriedSymptom) || queriedSymptom.includes(diagnosisSymptom);
}

export function getDifferentialDiagnosis(
  input: GetDifferentialDiagnosisInput
): DifferentialResult {
  const db = getDb();
  const { symptoms, max_results = 5 } = input;

  const normalisedSymptoms = symptoms.map((s) => s.toLowerCase().trim());

  const allDiagnoses = db
    .prepare("SELECT * FROM diagnoses")
    .all() as Diagnosis[];

  const total = allDiagnoses.length;

  // IDF: symptoms appearing in fewer diagnoses get higher weight
  // idf[symptom] = log(total / count of diagnoses containing that symptom)
  const idf = new Map<string, number>();
  for (const qs of normalisedSymptoms) {
    const df = allDiagnoses.filter((dx) =>
      dx.symptoms.split(",").map((s) => s.toLowerCase().trim()).some((ds) => symptomMatches(qs, ds))
    ).length;
    idf.set(qs, Math.log(total / Math.max(df, 1)));
  }

  const ranked = allDiagnoses
    .map((dx) => {
      const dxSymptoms = dx.symptoms
        .split(",")
        .map((s) => s.toLowerCase().trim());

      const matched = normalisedSymptoms.filter((qs) =>
        dxSymptoms.some((ds) => symptomMatches(qs, ds))
      );

      const weightedScore = matched.reduce((sum, qs) => sum + (idf.get(qs) ?? 1), 0);

      return {
        name: dx.name,
        matched_symptoms: matched,
        match_score: Math.round(weightedScore * 100) / 100,
        distinguishing_features: dx.distinguishing_features,
        key_investigations: dx.key_investigations,
        icd11_code: dx.icd11_code,
        prevalence: dx.prevalence,
      };
    })
    .filter((dx) => dx.match_score > 0)
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, max_results);

  return {
    queried_symptoms: symptoms,
    differentials: ranked,
    total_candidates: ranked.length,
  };
}
