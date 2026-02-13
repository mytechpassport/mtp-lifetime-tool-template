/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { TokenManager } from "./tokenManager";
import { getApiErrorMessage } from "./apiError";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export class ErrorHandler {
  /**
   * Handle API errors. Uses getApiErrorMessage so tool API shape
   * ({ error: true, message: "..." }) and normal API shape ({ error: "string" }) both show the right message.
   */
  static handleApiError(error: any): void {
    const message = getApiErrorMessage(error, "An error occurred");
    const description =
      error?.details && typeof error.details === "string" ? error.details : "";

    toast.error(message, description ? { description } : undefined);
  }

  /**
   * Handle generic errors with retry option
   */
  static handleErrorWithRetry(
    error: any,
    retryAction?: () => void,
    context?: string
  ): void {
    console.error(`Error in ${context || "operation"}:`, error);

    const message = error?.message || "An unexpected error occurred";

    if (retryAction) {
      toast.error(message, {
        action: {
          label: "Retry",
          onClick: retryAction,
        },
      });
    } else {
      toast.error(message);
    }
  }

  /**
   * Handle form submission errors
   */
  static handleFormError(
    error: any,
    formName?: string
  ): Record<string, string> {
    console.error(`Form error in ${formName || "form"}:`, error);

    const fieldErrors: Record<string, string> = {};

    if (error?.details && typeof error.details === "object") {
      // Map backend validation errors to form fields
      Object.entries(error.details).forEach(([field, message]) => {
        fieldErrors[field] = message as string;
      });
    } else {
      // Show general error
      toast.error(error?.message || "Please check your input and try again.");
    }

    return fieldErrors;
  }

  /**
   * Handle rate limiting errors
   */
  static handleRateLimitError(retryAfter?: number): void {
    const message = retryAfter
      ? `Too many requests. Please wait ${retryAfter} seconds and try again.`
      : "Too many requests. Please wait a moment and try again.";

    toast.error(message);
  }

  /**
   * Log error for debugging (in development)
   */
  static logError(error: any, context?: string): void {
    if (process.env.NODE_ENV === "development") {
      console.group(`🚨 Error ${context ? `in ${context}` : ""}`);
      console.error("Error object:", error);
      console.error("Stack trace:", error?.stack);
      console.groupEnd();
    }
  }

  /**
   * Create user-friendly error message. Prefers getApiErrorMessage for consistency
   * (handles tool API { error: true, message } vs normal API { error: "string" }).
   */
  static createUserFriendlyMessage(error: any): string {
    return getApiErrorMessage(error, "An unexpected error occurred. Please try again.");
  }
}
