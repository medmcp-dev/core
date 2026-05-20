/** Trim whitespace from copy-paste; reject empty after trim. */
export function normalizeApiKeyHeader(raw: string | undefined): string | undefined {
  if (raw == null) return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
