import { getDb } from "../db/database.js";
export function getDrugInfo(input) {
    const db = getDb();
    const { name, exact = false } = input;
    if (exact) {
        const row = db
            .prepare("SELECT * FROM drugs WHERE lower(name) = lower(?) OR lower(generic_name) = lower(?)")
            .get(name, name);
        if (row)
            return { found: true, drug: row, query: name };
    }
    const like = `%${name}%`;
    const rows = db
        .prepare(`SELECT * FROM drugs
       WHERE lower(name) LIKE lower(?)
          OR lower(generic_name) LIKE lower(?)
          OR lower(drug_class) LIKE lower(?)
          OR lower(indications) LIKE lower(?)
       ORDER BY length(name) LIMIT 10`)
        .all(like, like, like, like);
    if (rows.length === 0)
        return { found: false, query: name };
    if (rows.length === 1)
        return { found: true, drug: rows[0], query: name };
    const exactMatch = rows.find((r) => r.name.toLowerCase() === name.toLowerCase() ||
        r.generic_name?.toLowerCase() === name.toLowerCase());
    if (exactMatch)
        return { found: true, drug: exactMatch, query: name };
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
export function listDrugClasses() {
    const db = getDb();
    return db
        .prepare("SELECT DISTINCT drug_class FROM drugs ORDER BY drug_class")
        .all().map((r) => r.drug_class);
}
//# sourceMappingURL=get_drug_info.js.map