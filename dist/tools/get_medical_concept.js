import { getDb } from "../db/database.js";
export function getMedicalConcept(input) {
    const db = getDb();
    const { name, category, exact = false } = input;
    if (exact) {
        const stmt = category
            ? db.prepare("SELECT * FROM medical_concepts WHERE lower(name) = lower(?) AND category = ?")
            : db.prepare("SELECT * FROM medical_concepts WHERE lower(name) = lower(?)");
        const row = (category ? stmt.get(name, category) : stmt.get(name));
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
        ? db.prepare("SELECT * FROM medical_concepts WHERE (lower(name) LIKE lower(?) OR lower(summary) LIKE lower(?) OR lower(related_concepts) LIKE lower(?)) AND category = ? ORDER BY length(name) LIMIT 10")
        : db.prepare("SELECT * FROM medical_concepts WHERE lower(name) LIKE lower(?) OR lower(summary) LIKE lower(?) OR lower(related_concepts) LIKE lower(?) ORDER BY length(name) LIMIT 10");
    const rows = (category
        ? stmt.all(likePattern, likePattern, likePattern, category)
        : stmt.all(likePattern, likePattern, likePattern));
    if (rows.length === 0) {
        return { found: false, query: name };
    }
    if (rows.length === 1) {
        return { found: true, concept: formatConcept(rows[0]), query: name };
    }
    // Exact name match among fuzzy results
    const exactMatch = rows.find((r) => r.name.toLowerCase() === name.toLowerCase());
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
function formatConcept(row) {
    return {
        ...row,
        related_concepts_list: row.related_concepts
            ? row.related_concepts.split(",").map((s) => s.trim())
            : [],
    };
}
export function listCategories() {
    const db = getDb();
    const rows = db
        .prepare("SELECT DISTINCT category FROM medical_concepts ORDER BY category")
        .all();
    return rows.map((r) => r.category);
}
export function listConcepts(category) {
    const db = getDb();
    const stmt = category
        ? db.prepare("SELECT name, category, summary FROM medical_concepts WHERE category = ? ORDER BY name")
        : db.prepare("SELECT name, category, summary FROM medical_concepts ORDER BY category, name");
    return (category ? stmt.all(category) : stmt.all());
}
//# sourceMappingURL=get_medical_concept.js.map