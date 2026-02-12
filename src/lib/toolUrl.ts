/**
 * Base URL for the app (main domain). Used to build tool subdomain URLs.
 * Env: VITE_BASE_URL. Fallback so app works when env not set.
 */
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_BASE_URL) ||
  "https://mytechpassport.com";

/**
 * Build full URL for a tool that lives on a subdomain.
 * subdomain_url in API is stored as subdomain only (e.g. "ai-writer").
 * Full URL is built from VITE_BASE_URL so domain changes require only env update.
 */
export function buildToolSubdomainFullUrl(
  subdomain: string | null | undefined
): string | null {
  if (!subdomain || typeof subdomain !== "string") return null;
  const trimmed = subdomain.trim();
  if (!trimmed) return null;
  try {
    const base = new URL(BASE_URL.startsWith("http") ? BASE_URL : `https://${BASE_URL}`);
    return `${base.protocol}//${trimmed}.${base.hostname}`;
  } catch {
    return null;
  }
}

export function getBaseUrl(): string {
  const url = BASE_URL.startsWith("http") ? BASE_URL : `https://${BASE_URL}`;
  return url;
}
