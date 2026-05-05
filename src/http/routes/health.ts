import type { Context } from "hono";
import {
  CORE_PACKAGE_VERSION,
  MEDDATA_DATA_REVISION,
  MEDDATA_GIT_REVISION,
} from "../build-info.js";

export function healthHandler(c: Context) {
  const dataRevision =
    MEDDATA_DATA_REVISION?.trim() ? MEDDATA_DATA_REVISION.trim() : undefined;
  const gitRevision =
    MEDDATA_GIT_REVISION?.trim() ? MEDDATA_GIT_REVISION.trim() : undefined;

  return c.json({
    status: "ok",
    /** HTTP API compatibility (schema / docs) */
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    /** npm `@medmcp/core` semver from package.json — matches deploy artefact */
    release: CORE_PACKAGE_VERSION,
    ...(dataRevision !== undefined ? { data_revision: dataRevision } : {}),
    ...(gitRevision !== undefined ? { git_revision: gitRevision } : {}),
  });
}
