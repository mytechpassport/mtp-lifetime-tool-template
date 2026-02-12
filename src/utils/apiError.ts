import type { AxiosError } from "axios";

type ApiErrorPayload = {
  error?: string;
  message?: string;
  details?: string;
};

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
  const apiMessage =
    axiosError.response?.data?.message ||
    axiosError.response?.data?.error ||
    axiosError.message;

  return apiMessage || fallback;
};
