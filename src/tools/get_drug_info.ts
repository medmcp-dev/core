import { getDb } from "../db/database.js";

interface Drug {
  id: number;
  name: string;
  generic_name: string | null;
  drug_class: string;
  mechanism: string;
  indications: string;
  contraindications: string | null;
  side_effects: string | null;
  dosing: string | null;
  monitoring: string | null;
  created_at: string;
}

export interface GetDrugInfoInput {
  name: string;
  exact?: boolean;
}

export interface DrugInfoResult {
  found: boolean;
  drug?: Drug;
  matches?: Array<{ name: string; generic_name: string | null; drug_class: string }>;
  query: string;
}

export function getDrugInfo(input: GetDrugInfoInput): DrugInfoResult {
  const db = getDb();
  const { name, exact = false } = input;

  if (exact) {
    const row = db
      .prepare("SELECT * FROM drugs WHERE lower(name) = lower(?) OR lower(generic_name) = lower(?)")
      .get(name, name) as Drug | undefined;
    if (row) return { found: true, drug: row, query: name };
  }

  const like = `%${name}%`;
  const rows = db
    .prepare(
      `SELECT * FROM drugs
       WHERE lower(name) LIKE lower(?)
          OR lower(generic_name) LIKE lower(?)
          OR lower(drug_class) LIKE lower(?)
          OR lower(indications) LIKE lower(?)
       ORDER BY length(name) LIMIT 10`
    )
    .all(like, like, like, like) as Drug[];

  if (rows.length === 0) return { found: false, query: name };
  if (rows.length === 1) return { found: true, drug: rows[0], query: name };

  const exactMatch = rows.find(
    (r) =>
      r.name.toLowerCase() === name.toLowerCase() ||
      r.generic_name?.toLowerCase() === name.toLowerCase()
  );
  if (exactMatch) return { found: true, drug: exactMatch, query: name };

  return {
    found: true,
    matches: rows.map((r) => ({
      name: r.name,
      generic_name: r.generic_name,
      drug_class: r.drug_class,
    })),
    query: name,
  };
}

export function listDrugClasses(): string[] {
  const db = getDb();
  return (
    db
      .prepare("SELECT DISTINCT drug_class FROM drugs ORDER BY drug_class")
      .all() as { drug_class: string }[]
  ).map((r) => r.drug_class);
}
