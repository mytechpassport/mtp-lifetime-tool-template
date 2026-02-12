import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";
import type {
  FlowiseCredential,
  FlowiseCredentialSchema,
  FlowiseNodeDefinition,
} from "@/types/flowise";

export const getFlowiseCredentials = async (params?: {
  credentialName?: string;
}) => {
  const response = await apiClient.get<ApiResponse<FlowiseCredential[]>>(
    "/api/custom/mtp/flowise/v1/credentials",
    { params }
  );

  return response.data;
};

export const getFlowiseCredentialSchema = async (credentialName: string) => {
  const response = await apiClient.get<ApiResponse<FlowiseCredentialSchema>>(
    "/api/custom/mtp/flowise/v1/credentials/schema",
    { params: { credentialName } }
  );

  return response.data;
};

export const createFlowiseCredential = async (payload: {
  name: string;
  credentialName: string;
  credentialData: Record<string, unknown>;
  visibility?: "PRIVATE" | "PUBLIC";
}) => {
  const response = await apiClient.post<ApiResponse<FlowiseCredential>>(
    "/api/custom/mtp/flowise/v1/credentials",
    payload
  );

  return response.data;
};

export const getFlowiseNodeDefinition = async (nodeName: string) => {
  const response = await apiClient.get<ApiResponse<FlowiseNodeDefinition>>(
    `/api/custom/mtp/flowise/v1/nodes/${nodeName}`
  );

  return response.data;
};
