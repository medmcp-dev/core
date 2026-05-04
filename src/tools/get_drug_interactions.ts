import { getDb } from "../db/database.js";

interface DrugInteraction {
  id: number;
  drug_a: string;
  drug_b: string;
  severity: "mild" | "moderate" | "severe" | "contraindicated";
  mechanism: string;
  clinical_effect: string;
  management: string;
  created_at: string;
}

export interface GetDrugInteractionsInput {
  drugs: string[];
}

export interface InteractionResult {
  drug_pair: [string, string];
  interaction: DrugInteraction | null;
}

export interface DrugInteractionsResult {
  checked_pairs: number;
  interactions_found: number;
  results: InteractionResult[];
  queried_drugs: string[];
}

export function getDrugInteractions(
  input: GetDrugInteractionsInput
): DrugInteractionsResult {
  const db = getDb();
  const { drugs } = input;

  const results: InteractionResult[] = [];

  // Check every unique pair
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const a = drugs[i].toLowerCase();
      const b = drugs[j].toLowerCase();

      const row = db
        .prepare(
          `SELECT * FROM drug_interactions
           WHERE (lower(drug_a) = ? AND lower(drug_b) = ?)
              OR (lower(drug_a) = ? AND lower(drug_b) = ?)`
        )
        .get(a, b, b, a) as DrugInteraction | undefined;

      results.push({
        drug_pair: [drugs[i], drugs[j]],
        interaction: row ?? null,
      });
    }
  }

  return {
    checked_pairs: results.length,
    interactions_found: results.filter((r) => r.interaction !== null).length,
    results,
    queried_drugs: drugs,
  };
}
