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

export function getDifferentialDiagnosis(
  input: GetDifferentialDiagnosisInput
): DifferentialResult {
  const db = getDb();
  const { symptoms, max_results = 5 } = input;

  const normalisedSymptoms = symptoms.map((s) => s.toLowerCase().trim());

  // Fetch all diagnoses and rank by symptom overlap in application code
  // (SQLite's FTS would be better at scale, but keeps the dependency minimal)
  const allDiagnoses = db
    .prepare("SELECT * FROM diagnoses")
    .all() as Diagnosis[];

  const ranked = allDiagnoses
    .map((dx) => {
      const dxSymptoms = dx.symptoms
        .split(",")
        .map((s) => s.toLowerCase().trim());

      const matched = normalisedSymptoms.filter((qs) =>
        dxSymptoms.some(
          (ds) => ds.includes(qs) || qs.includes(ds)
        )
      );

      return {
        name: dx.name,
        matched_symptoms: matched,
        match_score: matched.length,
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
