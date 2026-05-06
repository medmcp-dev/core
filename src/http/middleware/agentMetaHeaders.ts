import type { MiddlewareHandler } from "hono";
import {
  CORE_PACKAGE_VERSION,
  MEDDATA_DATA_REVISION,
  MEDDATA_GIT_REVISION,
} from "../build-info.js";

/**
 * Adds stable response headers so HTTP clients and agent proxies can read
 * schema/release lineage without parsing JSON bodies.
 */
export const agentMetaHeaders: MiddlewareHandler = async (c, next) => {
  await next();
  c.header("X-MedMCP-Schema-Version", "v1");
  c.header("X-MedMCP-Release", CORE_PACKAGE_VERSION);
  const git = MEDDATA_GIT_REVISION?.trim();
  if (git) {
    c.header("X-MedMCP-Git-Revision", git.length > 12 ? git.slice(0, 12) : git);
  }
  const dataRev = MEDDATA_DATA_REVISION?.trim();
  if (dataRev) {
    c.header("X-MedMCP-Data-Revision", dataRev);
  }
};
