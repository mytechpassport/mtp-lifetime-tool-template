import type { AxiosError } from "axios";

/** Tool APIs: { error: true, message: "..." }. Normal APIs: { error: "string", message?: string }. */
type ApiErrorPayload = {
  error?: string | boolean;
  message?: string;
  details?: string;
  success?: boolean;
};

/**
 * 401 from the backend can mean either:
 * - Session/token expired or invalid → should trigger refresh/redirect (good UX).
 * - User is authenticated but the action is not allowed (e.g. "Google Drive is not connected", "User mismatch") → should NOT trigger refresh/redirect.
 * Returns true only when the 401 indicates session/token invalidity.
 *
 * Tool APIs (e.g. ai-transcription) use a different shape: { error: true, message: "..." } where error is boolean.
 * Normal APIs use { error: "Invalid or expired token" } where error is a string. We handle both.
 */
const SESSION_EXPIRY_INDICATORS = [
  "Authentication required",
  "Authentication failed",
  "Authorization token required",
  "Unauthorized",
  "Invalid or expired token",
  "Token expired",
  "Invalid token",
  "No token provided",
  "Invalid token type",
] as const;

/** Messages that mean "user is logged in but this action is not allowed" — do NOT treat as session expiry. */
const NOT_SESSION_EXPIRY_INDICATORS = [
  "Google Drive is not connected",
  "User mismatch",
] as const;

/** Normalize response payload: tool APIs use { error: true, message } (error boolean), others use { error: "string" }. */
function getMessageText(
  data?: { error?: string | boolean; message?: string; details?: string } | string | null
): string {
  if (data == null) return "";
  if (typeof data === "string") return data;
  const parts: string[] = [];
  if (typeof data.message === "string") parts.push(data.message);
  if (typeof data.error === "string") parts.push(data.error);
  if (typeof data.details === "string") parts.push(data.details);
  return parts.join(" ").trim().toLowerCase();
}

export function isSessionExpiryError(
  status: number,
  data?: { error?: string | boolean; message?: string; details?: string } | string | null
): boolean {
  if (status !== 401) return false;
  const msg = getMessageText(data);
  // Check NOT-session first: tool APIs return e.g. { error: true, message: "Google Drive is not connected" }.
  const notSession = NOT_SESSION_EXPIRY_INDICATORS.some((s) =>
    msg.includes(s.toLowerCase())
  );
  if (notSession) return false;
  const isSession = SESSION_EXPIRY_INDICATORS.some((s) =>
    msg.includes(s.toLowerCase())
  );
  // Only treat as session expiry when we have a known session/token message.
  return isSession;
}

/**
 * Extract user-facing message from API error. Handles both shapes:
 * - Tool APIs: { error: true, message: "Google Drive is not connected" } → use message
 * - Normal APIs: { error: "Invalid token", message?: string } → use message or error (string only)
 * Never use boolean (error/success) as display text.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string => {
  if (!error) {
    return fallback;
  }

  if (typeof error === "string") {
    return error;
  }

  const axiosError = error as AxiosError<ApiErrorPayload>;
  const data = axiosError.response?.data;

  if (data != null && typeof data === "object") {
    if (typeof data.message === "string" && data.message.trim()) {
      return data.message.trim();
    }
    if (typeof data.error === "string" && data.error.trim()) {
      return data.error.trim();
    }
  }

  // Non-Axios or plain object (e.g. { error: true, message: "..." } or { error: "string" })
  const obj = error as Record<string, unknown>;
  if (obj && typeof obj === "object") {
    if (typeof obj.message === "string" && obj.message.trim()) {
      return obj.message.trim();
    }
    if (typeof obj.error === "string" && obj.error.trim()) {
      return obj.error.trim();
    }
  }

  const msg = (error as Error).message;
  if (typeof msg === "string" && msg.trim()) {
    return msg.trim();
  }

  return fallback;
};
