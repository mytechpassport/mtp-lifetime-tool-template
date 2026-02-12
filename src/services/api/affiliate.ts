import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export type ReferralEarning = {
  id: number;
  referee_email: string;
  amount: number;
  status: "pending" | "approved" | "processing" | "paid" | "rejected";
  created_at: string;
};

export type ReferralEarningsResponse = {
  success: boolean;
  summary: {
    pending: { count: number; totalAmount: string };
    approved: { count: number; totalAmount: string };
    paid: { count: number; totalAmount: string };
  };
  payout: {
    canRequestPayout: boolean;
    eligibilityMessage: string;
    hasStripeConnection: boolean;
  };
  earnings: {
    pending: ReferralEarning[];
    approved: ReferralEarning[];
    paid: ReferralEarning[];
  };
};

export type ReferralEarningsHistoryResponse = {
  items: ReferralEarning[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export const getReferralEarnings = async () => {
  const response = await apiClient.get<ReferralEarningsResponse>(
    "/api/stripe/v1/referral-earnings"
  );

  return response.data;
};

export const getReferralEarningsHistory = async (params?: {
  page?: number;
  pageSize?: number;
}) => {
  const response = await apiClient.get<
    ApiResponse<ReferralEarningsHistoryResponse>
  >("/api/stripe/v1/referral-earnings/history", { params });

  return response.data;
};

export const requestReferralPayout = async (payload?: { amount?: number }) => {
  const response = await apiClient.post<Record<string, unknown>>(
    "/api/stripe/v2/payout/referral-earnings",
    payload ?? {}
  );

  return response.data;
};
