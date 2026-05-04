import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH ?? path.join(__dirname, "..", "..", "meddata.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
  }
  return _db;
}

export function initSchema(): void {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS medical_concepts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      summary TEXT NOT NULL,
      mechanism TEXT,
      clinical_relevance TEXT,
      related_concepts TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS drugs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      generic_name TEXT,
      drug_class TEXT NOT NULL,
      mechanism TEXT NOT NULL,
      indications TEXT NOT NULL,
      contraindications TEXT,
      side_effects TEXT,
      dosing TEXT,
      monitoring TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS drug_interactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      drug_a TEXT NOT NULL,
      drug_b TEXT NOT NULL,
      severity TEXT NOT NULL CHECK(severity IN ('mild', 'moderate', 'severe', 'contraindicated')),
      mechanism TEXT NOT NULL,
      clinical_effect TEXT NOT NULL,
      management TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(drug_a, drug_b)
    );

    CREATE TABLE IF NOT EXISTS icd11_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      inclusion_terms TEXT,
      exclusion_terms TEXT,
      category TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS diagnoses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      symptoms TEXT NOT NULL,
      distinguishing_features TEXT,
      key_investigations TEXT,
      icd11_code TEXT,
      prevalence TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS lab_values (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      abbreviation TEXT,
      unit TEXT NOT NULL,
      reference_range TEXT NOT NULL,
      reference_low REAL,
      reference_high REAL,
      critical_low REAL,
      critical_high REAL,
      sex_specific INTEGER NOT NULL DEFAULT 0,
      male_low REAL,
      male_high REAL,
      female_low REAL,
      female_high REAL,
      interpretation TEXT,
      clinical_notes TEXT,
      category TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_concepts_name ON medical_concepts(name);
    CREATE INDEX IF NOT EXISTS idx_concepts_category ON medical_concepts(category);
    CREATE INDEX IF NOT EXISTS idx_drugs_name ON drugs(name);
    CREATE INDEX IF NOT EXISTS idx_interactions_drug_a ON drug_interactions(drug_a);
    CREATE INDEX IF NOT EXISTS idx_interactions_drug_b ON drug_interactions(drug_b);
    CREATE INDEX IF NOT EXISTS idx_icd11_code ON icd11_codes(code);
    CREATE INDEX IF NOT EXISTS idx_diagnoses_name ON diagnoses(name);
    CREATE INDEX IF NOT EXISTS idx_lab_values_name ON lab_values(name);
    CREATE INDEX IF NOT EXISTS idx_lab_values_category ON lab_values(category);

    CREATE TABLE IF NOT EXISTS api_keys (
      key TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      last_used_at TEXT
    );

    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Additive migrations — safe to run on existing databases
  addColumnIfMissing(db, "drugs", "source", "TEXT DEFAULT 'seed'");
  addColumnIfMissing(db, "drugs", "updated_at", "TEXT");
  addColumnIfMissing(db, "icd11_codes", "source", "TEXT DEFAULT 'seed'");
  addColumnIfMissing(db, "icd11_codes", "updated_at", "TEXT");
}

export function validateApiKey(key: string): boolean {
  const db = getDb();
  const row = db.prepare("SELECT key FROM api_keys WHERE key = ?").get(key);
  if (!row) return false;
  db.prepare("UPDATE api_keys SET last_used_at = datetime('now') WHERE key = ?").run(key);
  return true;
}

export function hasApiKeys(): boolean {
  const db = getDb();
  return (db.prepare("SELECT COUNT(*) as count FROM api_keys").get() as { count: number }).count > 0;
}

export function createApiKey(name: string, key: string): void {
  const db = getDb();
  db.prepare("INSERT INTO api_keys (key, name) VALUES (?, ?)").run(key, name);
}

export function addToWaitlist(email: string): { ok: boolean; already_exists: boolean } {
  const db = getDb();
  const result = db.prepare("INSERT OR IGNORE INTO waitlist (email) VALUES (?)").run(email);
  return { ok: true, already_exists: result.changes === 0 };
}

export function getWaitlist(): { id: number; email: string; created_at: string }[] {
  const db = getDb();
  return db.prepare("SELECT id, email, created_at FROM waitlist ORDER BY created_at DESC").all() as {
    id: number;
    email: string;
    created_at: string;
  }[];
}

function addColumnIfMissing(
  db: Database.Database,
  table: string,
  column: string,
  definition: string
): void {
  const exists = (
    db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]
  ).some((col) => col.name === column);
  if (!exists) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}
