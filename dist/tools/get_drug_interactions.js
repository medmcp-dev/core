import { getDb } from "../db/database.js";
export function getDrugInteractions(input) {
    const db = getDb();
    const { drugs } = input;
    const results = [];
    // Check every unique pair
    for (let i = 0; i < drugs.length; i++) {
        for (let j = i + 1; j < drugs.length; j++) {
            const a = drugs[i].toLowerCase();
            const b = drugs[j].toLowerCase();
            const row = db
                .prepare(`SELECT * FROM drug_interactions
           WHERE (lower(drug_a) = ? AND lower(drug_b) = ?)
              OR (lower(drug_a) = ? AND lower(drug_b) = ?)`)
                .get(a, b, b, a);
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
//# sourceMappingURL=get_drug_interactions.js.map