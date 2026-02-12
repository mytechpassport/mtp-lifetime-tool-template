import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export type SupportTicket = {
  id: number;
  subject: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority?: "low" | "medium" | "high";
  category?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};

export type SupportMessage = {
  id: number;
  senderType: "user" | "support";
  message: string;
  createdAt: string;
};

export type SupportTicketDetail = SupportTicket & {
  messages?: SupportMessage[];
};

export type SupportTicketsResponse = {
  items: SupportTicket[];
};

export const getSupportTickets = async () => {
  const response = await apiClient.get<ApiResponse<SupportTicketsResponse>>(
    "/api/custom/mtp/support/v1/tickets"
  );

  return response.data;
};

export const getSupportTicket = async (ticketId: number | string) => {
  const response = await apiClient.get<ApiResponse<SupportTicketDetail>>(
    `/api/custom/mtp/support/v1/tickets/${ticketId}`
  );

  return response.data;
};

export const createSupportTicket = async (payload: {
  subject: string;
  message: string;
  category?: string;
  attachments?: Array<{
    fileId: number | string;
    fileName: string;
  }>;
}) => {
  const response = await apiClient.post<ApiResponse<SupportTicket>>(
    "/api/custom/mtp/support/v1/tickets",
    payload
  );

  return response.data;
};

export const replyToSupportTicket = async (
  ticketId: number | string,
  payload: { message: string }
) => {
  const response = await apiClient.post<ApiResponse<SupportTicket>>(
    `/api/custom/mtp/support/v1/tickets/${ticketId}/reply`,
    payload
  );

  return response.data;
};

export const resolveSupportTicket = async (ticketId: number | string) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/support/v1/tickets/${ticketId}/resolve`
  );

  return response.data;
};
