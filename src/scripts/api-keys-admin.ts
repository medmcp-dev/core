/**
 * Manage HTTP API keys in SQLite (`api_keys` table).
 *
 * Usage:
 *   npm run build && npm run api-keys -- create <name>
 *   npm run build && npm run api-keys -- list
 *   npm run build && npm run api-keys -- revoke <key>
 *
 * Env: DB_PATH — same database as HTTP server / seed (Railway volume path in production).
 */

import { randomUUID } from "crypto";
import {
  initSchema,
  createApiKey,
  listApiKeys,
  deleteApiKey,
} from "../db/database.js";

function printHelp(): void {
  console.log(`api-keys-admin — manage MEDDATA SQLite API keys

Commands:
  create <name> [key]   Insert a key (optional explicit key; else mk_<uuid-without-dashes>)
  list                  Print all rows (secrets — use only on your machine)
  revoke <key>          Delete one row by exact key string

Environment:
  DB_PATH               Path to meddata.sqlite (defaults match core server)

Examples:
  npm run api-keys -- create professor-demo
  npm run api-keys -- revoke mk_abc123...
`);
}

function main(): void {
  initSchema();

  const argv = process.argv.slice(2).filter((a) => a !== "--");
  const cmd = argv[0];

  if (!cmd || cmd === "-h" || cmd === "--help") {
    printHelp();
    process.exit(cmd ? 0 : 1);
  }

  switch (cmd) {
    case "create": {
      const name = argv[1];
      const explicitKey = argv[2];
      if (!name?.trim()) {
        console.error("Usage: npm run api-keys -- create <name> [optional-key]");
        process.exit(1);
      }
      const key =
        explicitKey?.trim() || `mk_${randomUUID().replace(/-/g, "")}`;
      try {
        createApiKey(name.trim(), key);
      } catch (e) {
        console.error("create failed (duplicate key or DB error):", e);
        process.exit(1);
      }
      console.log(`Created API key for name "${name.trim()}":\n${key}`);
      console.log(
        "\nSend this once to the recipient; rotate with revoke if it leaks.",
      );
      break;
    }
    case "list": {
      const rows = listApiKeys();
      if (rows.length === 0) {
        console.log("(no api_keys rows)");
        break;
      }
      for (const r of rows) {
        const last = r.last_used_at ?? "never";
        console.log(`${r.name}\tcreated ${r.created_at}\tlast_used ${last}`);
        console.log(`  ${r.key}`);
      }
      break;
    }
    case "revoke": {
      const key = argv[1];
      if (!key?.trim()) {
        console.error("Usage: npm run api-keys -- revoke <exact-key>");
        process.exit(1);
      }
      const ok = deleteApiKey(key.trim());
      console.log(ok ? "Revoked (deleted row)." : "No row matched that key.");
      process.exit(ok ? 0 : 1);
    }
    default:
      console.error(`Unknown command: ${cmd}`);
      printHelp();
      process.exit(1);
  }
}

main();
