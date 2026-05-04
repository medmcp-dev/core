import { getDb } from "../db/database.js";

interface ICD11Code {
  id: number;
  code: string;
  title: string;
  description: string;
  inclusion_terms: string | null;
  exclusion_terms: string | null;
  category: string;
  created_at: string;
}

export interface GetICD11CodeInput {
  query: string;
  search_by?: "code" | "title" | "any";
}

export interface ICD11Result {
  found: boolean;
  entry?: ICD11Code;
  matches?: Array<{ code: string; title: string; category: string }>;
  query: string;
}

export function getICD11Code(input: GetICD11CodeInput): ICD11Result {
  const db = getDb();
  const { query, search_by = "any" } = input;

  // Exact code lookup
  if (search_by === "code" || search_by === "any") {
    const byCode = db
      .prepare("SELECT * FROM icd11_codes WHERE upper(code) = upper(?)")
      .get(query.trim()) as ICD11Code | undefined;
    if (byCode) return { found: true, entry: byCode, query };
  }

  // Text search
  const like = `%${query}%`;
  const stmt =
    search_by === "title"
      ? db.prepare(
          "SELECT * FROM icd11_codes WHERE lower(title) LIKE lower(?) ORDER BY length(title) LIMIT 10"
        )
      : db.prepare(
          `SELECT * FROM icd11_codes
           WHERE lower(title) LIKE lower(?)
              OR lower(description) LIKE lower(?)
              OR lower(inclusion_terms) LIKE lower(?)
           ORDER BY length(title) LIMIT 10`
        );

  const rows =
    search_by === "title"
      ? (stmt.all(like) as ICD11Code[])
      : (stmt.all(like, like, like) as ICD11Code[]);

  if (rows.length === 0) return { found: false, query };
  if (rows.length === 1) return { found: true, entry: rows[0], query };

  const exactTitle = rows.find(
    (r) => r.title.toLowerCase() === query.toLowerCase()
  );
  if (exactTitle) return { found: true, entry: exactTitle, query };

  return {
    found: true,
    matches: rows.map((r) => ({ code: r.code, title: r.title, category: r.category })),
    query,
  };
}
