import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export type CreditPack = {
  id: number;
  credits: number;
  price: number;
  isActive: boolean;
  bonusCredits?: number;
  sortOrder?: number;
};

export type CreditBalanceResponse = {
  balance: number;
};

export type CreditTransaction = {
  id: number;
  amount: number;
  type: string;
  description?: string | null;
  referenceId?: string | null;
  createdAt: string;
};

export type CreditTransactionsResponse = {
  items: CreditTransaction[];
};

const toBool = (value: unknown) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1";
  }
  return Boolean(value);
};

const normalizeCreditPack = (pack: Record<string, unknown>): CreditPack => ({
  id: Number(pack.id),
  credits: Number(pack.credits ?? 0),
  price: Number(pack.price ?? 0),
  isActive:
    pack.isActive !== undefined
      ? toBool(pack.isActive)
      : toBool(pack.is_active),
  bonusCredits:
    pack.bonusCredits !== undefined
      ? Number(pack.bonusCredits)
      : pack.bonus_credits !== undefined
      ? Number(pack.bonus_credits)
      : 0,
  sortOrder:
    pack.sortOrder !== undefined
      ? Number(pack.sortOrder)
      : pack.sort_order !== undefined
      ? Number(pack.sort_order)
      : undefined,
});

const normalizeCreditTransaction = (
  transaction: Record<string, unknown>
): CreditTransaction => ({
  id: Number(transaction.id),
  amount: Number(transaction.amount ?? 0),
  type: String(transaction.type ?? ""),
  description: (transaction.description as string | null) ?? null,
  referenceId:
    (transaction.referenceId ?? transaction.reference_id ?? null) as
      | string
      | null,
  createdAt: String(transaction.createdAt ?? transaction.created_at ?? ""),
});

export const getCreditPacks = async () => {
  const response = await apiClient.get<ApiResponse<CreditPack[]>>(
    "/api/custom/mtp/credits/v1/packs"
  );

  const payload = response.data;
  const items = Array.isArray(payload.data) ? payload.data : [];
  return { ...payload, data: items.map((pack) => normalizeCreditPack(pack)) };
};

export const getCreditBalance = async () => {
  const response = await apiClient.get<ApiResponse<CreditBalanceResponse>>(
    "/api/custom/mtp/credits/v1/balance"
  );

  return response.data;
};

export const purchaseCredits = async (payload: {
  packId: number;
  paymentMethodType: "card" | "credits";
}) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    "/api/custom/mtp/credits/v1/purchase",
    payload
  );

  return response.data;
};

export const getCreditTransactions = async () => {
  const response = await apiClient.get<ApiResponse<CreditTransactionsResponse>>(
    "/api/custom/mtp/credits/v1/transactions"
  );

  const payload = response.data;
  const data = payload.data as CreditTransactionsResponse | CreditTransaction[] | undefined;
  const items = Array.isArray(data)
    ? data
    : data?.items ?? [];

  return {
    ...payload,
    data: {
      items: items.map((transaction) =>
        normalizeCreditTransaction(transaction as Record<string, unknown>)
      ),
    },
  };
};
