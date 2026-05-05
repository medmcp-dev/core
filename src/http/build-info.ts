import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Resolves `@medmcp/core` semver from repo `package.json` (works from `dist/http/`). */
function readPkgVersion(): string {
  try {
    const pkgPath = join(__dirname, "..", "..", "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version?: string };
    return pkg.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

export const CORE_PACKAGE_VERSION = readPkgVersion();

/** Optional opaque tag for seeded data / rules (you set per deploy). */
export const MEDDATA_DATA_REVISION = process.env.MEDDATA_DATA_REVISION ?? null;

/** Git SHA if CI/hosting exposes it */
export const MEDDATA_GIT_REVISION =
  process.env.MEDDATA_GIT_REVISION ??
  process.env.RAILWAY_GIT_COMMIT_SHA ??
  process.env.GITHUB_SHA ??
  null;
