import { getDb } from "../db/database.js";
export function getICD11Code(input) {
    const db = getDb();
    const { query, search_by = "any" } = input;
    // Exact code lookup
    if (search_by === "code" || search_by === "any") {
        const byCode = db
            .prepare("SELECT * FROM icd11_codes WHERE upper(code) = upper(?)")
            .get(query.trim());
        if (byCode)
            return { found: true, entry: byCode, query };
    }
    // Text search
    const like = `%${query}%`;
    const stmt = search_by === "title"
        ? db.prepare("SELECT * FROM icd11_codes WHERE lower(title) LIKE lower(?) ORDER BY length(title) LIMIT 10")
        : db.prepare(`SELECT * FROM icd11_codes
           WHERE lower(title) LIKE lower(?)
              OR lower(description) LIKE lower(?)
              OR lower(inclusion_terms) LIKE lower(?)
           ORDER BY length(title) LIMIT 10`);
    const rows = search_by === "title"
        ? stmt.all(like)
        : stmt.all(like, like, like);
    if (rows.length === 0)
        return { found: false, query };
    if (rows.length === 1)
        return { found: true, entry: rows[0], query };
    const exactTitle = rows.find((r) => r.title.toLowerCase() === query.toLowerCase());
    if (exactTitle)
        return { found: true, entry: exactTitle, query };
    return {
        found: true,
        matches: rows.map((r) => ({ code: r.code, title: r.title, category: r.category })),
        query,
    };
}
//# sourceMappingURL=get_icd11_code.js.map