/**
 * Syncs drug data from OpenFDA Drug Label API into local SQLite.
 * Fetches each drug already in the database and enriches it with
 * official FDA label data (mechanism, indications, dosing, etc.).
 *
 * Rate limits:
 *   Without API key : 1 000 req/day,  ~40/min
 *   With API key    : 120 000 req/day, ~240/min
 *
 * Set OPENFDA_API_KEY env var to raise limits.
 * Docs: https://open.fda.gov/apis/drug/label/
 */
import "dotenv/config";
//# sourceMappingURL=sync-drugs.d.ts.map