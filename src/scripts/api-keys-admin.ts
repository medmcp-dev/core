/**
 * Manage HTTP API keys in SQLite (`api_keys` table).
 *
 * Usage:
 *   npm run build && npm run api-keys -- create <name>
 *   npm run build && npm run api-keys -- list
 *   npm run build && npm run api-keys -- revoke <key>
 *   npm run build && npm run api-keys -- set-plan <key> default|full|custom
 *
 * Env: DB_PATH — same database as HTTP server / seed (Railway volume path in production).
 */

import { randomUUID } from "crypto";
import {
  initSchema,
  createApiKey,
  listApiKeys,
  deleteApiKey,
  getApiKeyPlan,
  getCapabilitiesForKey,
  setCapabilitiesForKey,
  setPlanForKey,
} from "../db/database.js";
import { API_KEY_PLANS, KNOWN_CAPABILITIES, type ApiKeyPlan, type Capability } from "../http/capabilities.js";

function printHelp(): void {
  console.log(`api-keys-admin — manage MEDDATA SQLite API keys

Commands:
  create <name> [key]   Insert a key (optional explicit key; else mk_<uuid-without-dashes>)
  list                  Print all rows (secrets — use only on your machine)
  revoke <key>          Delete one row by exact key string
  capabilities <key>    Show explicit capability list for key
  set-capabilities <key> <csv|all|clear>
                        csv: custom plan with that capability set
                        all: plan full (all capabilities; clears capability rows)
                        clear: same as all (full access)
  set-plan <key> <default|full|custom>
                        default: starter tier (symptoms, labs, schema)
                        full: all capabilities (clears capability rows)
                        custom: use rows from set-capabilities (custom with no rows = no caps)

Environment:
  DB_PATH               Path to meddata.sqlite (defaults match core server)

Examples:
  npm run api-keys -- create professor-demo
  npm run api-keys -- revoke mk_abc123...
  npm run api-keys -- set-capabilities mk_abc123... symptoms,labs
  npm run api-keys -- set-capabilities mk_abc123... clear
  npm run api-keys -- set-plan mk_abc123... default
`);
}

function parseCapabilities(input: string): Capability[] {
  const parts = input
    .trim()
    .toLowerCase()
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const invalid = parts.filter((p) => !(KNOWN_CAPABILITIES as readonly string[]).includes(p));
  if (invalid.length > 0) {
    throw new Error(`Unknown capabilities: ${invalid.join(", ")}. Known: ${KNOWN_CAPABILITIES.join(", ")}`);
  }
  return parts as Capability[];
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
        const caps = getCapabilitiesForKey(r.key);
        const capLabel = caps.join(",");
        console.log(`${r.name}\tplan ${r.plan}\tcreated ${r.created_at}\tlast_used ${last}`);
        console.log(`  ${r.key}`);
        console.log(`  effective capabilities: ${capLabel}`);
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
    case "capabilities": {
      const key = argv[1];
      if (!key?.trim()) {
        console.error("Usage: npm run api-keys -- capabilities <exact-key>");
        process.exit(1);
      }
      const plan = getApiKeyPlan(key.trim());
      const caps = getCapabilitiesForKey(key.trim());
      console.log(`plan: ${plan ?? "(unknown)"}`);
      console.log(caps.length === 0 ? "(none)" : caps.join(","));
      break;
    }
    case "set-plan": {
      const key = argv[1];
      const planArg = argv[2]?.trim().toLowerCase();
      if (!key?.trim() || !planArg) {
        console.error("Usage: npm run api-keys -- set-plan <exact-key> <default|full|custom>");
        process.exit(1);
      }
      if (!(API_KEY_PLANS as readonly string[]).includes(planArg)) {
        console.error(`Invalid plan. Use one of: ${API_KEY_PLANS.join(", ")}`);
        process.exit(1);
      }
      try {
        setPlanForKey(key.trim(), planArg as ApiKeyPlan);
        console.log(`Set plan to "${planArg}" for key.`);
      } catch (e) {
        console.error("set-plan failed:", e);
        process.exit(1);
      }
      break;
    }
    case "set-capabilities": {
      const key = argv[1];
      const set = argv[2];
      if (!key?.trim() || !set?.trim()) {
        console.error("Usage: npm run api-keys -- set-capabilities <exact-key> <csv|all|clear>");
        process.exit(1);
      }
      try {
        const raw = set.trim().toLowerCase();
        if (raw === "all" || raw === "clear") {
          setPlanForKey(key.trim(), "full");
          console.log("Set plan full (all capabilities).");
          break;
        }
        const caps = parseCapabilities(set);
        setCapabilitiesForKey(key.trim(), caps);
        console.log(`Set plan custom with capabilities: ${caps.join(",")}`);
      } catch (e) {
        console.error("set-capabilities failed:", e);
        process.exit(1);
      }
      break;
    }
    default:
      console.error(`Unknown command: ${cmd}`);
      printHelp();
      process.exit(1);
  }
}

main();
