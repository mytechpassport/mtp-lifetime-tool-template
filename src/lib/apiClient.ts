import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import vce from "@/lib/vce";

const apiClient = axios.create({
  baseURL: vce.getClient().baseUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const client = vce.getClient();
  const headers = config.headers ?? {};

  headers["apikey"] = client.apiKey;

  if (client.accessToken) {
    headers["Authorization"] = `Bearer ${client.accessToken}`;
  }

  if (!headers["Content-Type"] && !(config.data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  config.headers = headers;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as
      | { error?: string; message?: string; details?: string }
      | undefined;

    const shouldHandleAuth =
      status === 401 ||
      data?.error === "Authentication failed" ||
      data?.error === "Authorization token required" ||
      data?.error === "Unauthorized" ||
      data?.error === "Invalid or expired token" ||
      data?.details === "Token expired" ||
      data?.details === "Invalid token";

    const skipAuthRedirect =
      (error.config as AxiosRequestConfig & { skipAuthRedirect?: boolean })
        ?.skipAuthRedirect ?? false;

    if (shouldHandleAuth && !skipAuthRedirect) {
      const { TokenManager } = await import("@/utils/tokenManager");
      await TokenManager.handleTokenExpiration();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
