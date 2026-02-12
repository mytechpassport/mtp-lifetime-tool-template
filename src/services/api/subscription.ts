import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export type Subscription = {
  plan: string;
  isPaid: boolean;
  maxWorkflows: number;
  mtpToolsFree: boolean;
  thirdPartyToolsFree: boolean;
  renewalDate?: string | null;
  status?: string | null;
};

export const getCurrentSubscription = async () => {
  const response = await apiClient.get<ApiResponse<Subscription>>(
    "/api/custom/mtp/subscription/v1/current"
  );

  return response.data;
};

export const createBillingPortalSession = async () => {
  const response = await apiClient.get<ApiResponse<{ url: string }>>(
    "/api/stripe/v1/billing-portal-session"
  );

  return response.data;
};
