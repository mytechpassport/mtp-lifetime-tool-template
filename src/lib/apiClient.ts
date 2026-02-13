import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import vce from "@/lib/vce";
import { isSessionExpiryError } from "@/utils/apiError";

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
    // Tool APIs: { error: true, message: "..." }; normal APIs: { error: "string", ... }
    const data = error.response?.data as
      | { error?: string | boolean; message?: string; details?: string }
      | undefined;

    const skipAuthRedirect =
      (error.config as AxiosRequestConfig & { skipAuthRedirect?: boolean })
        ?.skipAuthRedirect ?? false;

    // Only run session-expiry flow when 401 indicates token/session invalidity,
    // not for resource-specific 401s (e.g. "Google Drive is not connected", "User mismatch").
    if (
      status != null &&
      isSessionExpiryError(status, data) &&
      !skipAuthRedirect
    ) {
      const { TokenManager } = await import("@/utils/tokenManager");
      await TokenManager.handleTokenExpiration();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
