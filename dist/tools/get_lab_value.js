import { getDb } from "../db/database.js";
function formatRow(row) {
    return {
        name: row.name,
        abbreviation: row.abbreviation,
        unit: row.unit,
        reference_range: row.reference_range,
        ...(row.sex_specific
            ? {
                male_range: row.male_low !== null && row.male_high !== null
                    ? `${row.male_low}–${row.male_high} ${row.unit}`
                    : null,
                female_range: row.female_low !== null && row.female_high !== null
                    ? `${row.female_low}–${row.female_high} ${row.unit}`
                    : null,
            }
            : {}),
        critical_low: row.critical_low !== null ? `${row.critical_low} ${row.unit}` : null,
        critical_high: row.critical_high !== null ? `${row.critical_high} ${row.unit}` : null,
        category: row.category,
        interpretation: row.interpretation,
        clinical_notes: row.clinical_notes,
    };
}
export function getLabValue(params) {
    const db = getDb();
    if (params.action === "list" || (!params.name && !params.category)) {
        const where = params.category
            ? "WHERE LOWER(category) = LOWER(?)"
            : "";
        const rows = db
            .prepare(`SELECT name, abbreviation, unit, reference_range, category FROM lab_values ${where} ORDER BY category, name`)
            .all(...(params.category ? [params.category] : []));
        return {
            count: rows.length,
            lab_values: rows.map((r) => ({
                name: r.name,
                abbreviation: r.abbreviation,
                unit: r.unit,
                reference_range: r.reference_range,
                category: r.category,
            })),
        };
    }
    if (!params.name) {
        return {
            error: "Provide a 'name' to search, or use action='list' to see all available lab values.",
        };
    }
    const term = params.name.toLowerCase();
    // Exact match on name or abbreviation first
    let row = db
        .prepare("SELECT * FROM lab_values WHERE LOWER(name) = ? OR LOWER(COALESCE(abbreviation,'')) = ?")
        .get(term, term);
    // Fuzzy: contains match
    if (!row) {
        row = db
            .prepare("SELECT * FROM lab_values WHERE LOWER(name) LIKE ? OR LOWER(COALESCE(abbreviation,'')) LIKE ?")
            .get(`%${term}%`, `%${term}%`);
    }
    if (!row) {
        const all = db
            .prepare("SELECT name, abbreviation FROM lab_values ORDER BY name")
            .all();
        return {
            error: `No lab value found matching "${params.name}".`,
            available: all.map((r) => `${r.name}${r.abbreviation ? ` (${r.abbreviation})` : ""}`),
        };
    }
    return { lab_value: formatRow(row) };
}
export function listLabCategories() {
    const db = getDb();
    return db.prepare("SELECT DISTINCT category FROM lab_values ORDER BY category").all().map((r) => r.category);
}
//# sourceMappingURL=get_lab_value.js.map