import { getDb } from "../db/database.js";

export interface MedicalConcept {
  id: number;
  name: string;
  category: string;
  summary: string;
  mechanism: string | null;
  clinical_relevance: string | null;
  related_concepts: string | null;
  created_at: string;
}

export interface GetMedicalConceptInput {
  name: string;
  category?: string;
  exact?: boolean;
}

export interface ConceptResult {
  found: boolean;
  concept?: MedicalConcept & { related_concepts_list: string[] };
  matches?: Array<{ name: string; category: string; summary: string }>;
  query: string;
}

export function getMedicalConcept(input: GetMedicalConceptInput): ConceptResult {
  const db = getDb();
  const { name, category, exact = false } = input;

  if (exact) {
    const stmt = category
      ? db.prepare(
          "SELECT * FROM medical_concepts WHERE lower(name) = lower(?) AND category = ?"
        )
      : db.prepare(
          "SELECT * FROM medical_concepts WHERE lower(name) = lower(?)"
        );

    const row = (category ? stmt.get(name, category) : stmt.get(name)) as
      | MedicalConcept
      | undefined;

    if (row) {
      return {
        found: true,
        concept: formatConcept(row),
        query: name,
      };
    }
  }

  // Partial / fuzzy match
  const likePattern = `%${name}%`;
  const stmt = category
    ? db.prepare(
        "SELECT * FROM medical_concepts WHERE (lower(name) LIKE lower(?) OR lower(summary) LIKE lower(?) OR lower(related_concepts) LIKE lower(?)) AND category = ? ORDER BY length(name) LIMIT 10"
      )
    : db.prepare(
        "SELECT * FROM medical_concepts WHERE lower(name) LIKE lower(?) OR lower(summary) LIKE lower(?) OR lower(related_concepts) LIKE lower(?) ORDER BY length(name) LIMIT 10"
      );

  const rows = (
    category
      ? stmt.all(likePattern, likePattern, likePattern, category)
      : stmt.all(likePattern, likePattern, likePattern)
  ) as MedicalConcept[];

  if (rows.length === 0) {
    return { found: false, query: name };
  }

  if (rows.length === 1) {
    return { found: true, concept: formatConcept(rows[0]), query: name };
  }

  // Exact name match among fuzzy results
  const exactMatch = rows.find(
    (r) => r.name.toLowerCase() === name.toLowerCase()
  );
  if (exactMatch) {
    return { found: true, concept: formatConcept(exactMatch), query: name };
  }

  // Multiple matches — return list for disambiguation
  return {
    found: true,
    matches: rows.map((r) => ({
      name: r.name,
      category: r.category,
      summary: r.summary,
    })),
    query: name,
  };
}

function formatConcept(
  row: MedicalConcept
): MedicalConcept & { related_concepts_list: string[] } {
  return {
    ...row,
    related_concepts_list: row.related_concepts
      ? row.related_concepts.split(",").map((s) => s.trim())
      : [],
  };
}

export function listCategories(): string[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT DISTINCT category FROM medical_concepts ORDER BY category")
    .all() as { category: string }[];
  return rows.map((r) => r.category);
}

export function listConcepts(
  category?: string
): Array<{ name: string; category: string; summary: string }> {
  const db = getDb();
  const stmt = category
    ? db.prepare(
        "SELECT name, category, summary FROM medical_concepts WHERE category = ? ORDER BY name"
      )
    : db.prepare(
        "SELECT name, category, summary FROM medical_concepts ORDER BY category, name"
      );
  return (category ? stmt.all(category) : stmt.all()) as Array<{
    name: string;
    category: string;
    summary: string;
  }>;
}
