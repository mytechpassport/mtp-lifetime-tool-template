/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { TokenManager } from "./tokenManager";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export class ErrorHandler {
  /**
   * Handle API errors
   */
  static handleApiError(error: any): void {
    const message =
      error?.message ||
      error?.error ||
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "An error occurred";

    toast.error(message, {
      description: error?.details || "",
    });
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
   * Create user-friendly error message
   */
  static createUserFriendlyMessage(error: any): string {
    if (typeof error === "string") {
      return error;
    }

    if (error?.message) {
      return error.message;
    }

    if (error?.error) {
      return error.error;
    }

    return "An unexpected error occurred. Please try again.";
  }
}
