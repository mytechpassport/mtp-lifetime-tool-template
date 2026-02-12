import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export type ProfileResponse = {
  email: string;
  name: string;
  companyName?: string | null;
  payoutMethodType?: "bank" | "airwallex" | "stripe" | null;
  payoutMethodDetails?: Record<string, string>;
  defaultPaymentMethodType?: "card" | "credits" | null;
  referralCode?: string | null;
};

export const getProfile = async () => {
  const response = await apiClient.get<ApiResponse<ProfileResponse>>(
    "/api/custom/mtp/profile/v1"
  );

  return response.data;
};

export const updateProfile = async (payload: {
  companyName?: string;
  payoutMethodType?: "bank" | "airwallex" | "stripe" | null;
  payoutMethodDetails?: Record<string, string>;
  defaultPaymentMethodType?: "card" | "credits" | null;
}) => {
  const response = await apiClient.put<ApiResponse<ProfileResponse>>(
    "/api/custom/mtp/profile/v1",
    payload
  );

  return response.data;
};
