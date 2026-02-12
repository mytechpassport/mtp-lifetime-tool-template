import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";
import type {
  WorkflowConnection,
  WorkflowGeneratorModel,
  WorkflowTemplate,
} from "@/types/mtp";

export type WorkflowTemplatesResponse = {
  items: WorkflowTemplate[];
  grouped: Record<string, WorkflowTemplate[]>;
};

export type WorkflowConnectionsResponse = {
  items: WorkflowConnection[];
};

export type WorkflowRun = {
  id: string;
  status: string;
  startedAt?: string | null;
  completedAt?: string | null;
  durationMs?: number | null;
  output?: Record<string, unknown> | null;
  input?: Record<string, unknown> | null;
  executionData?: string | null; // Raw execution data for detailed parsing
};

export type WorkflowRunsResponse = {
  items: WorkflowRun[];
  page: number;
  limit: number;
  total: number;
};

export const getTemplates = async (params?: { department?: string }) => {
  const response = await apiClient.get<ApiResponse<WorkflowTemplatesResponse>>(
    "/api/custom/mtp/workflows/v1/templates",
    {
      params: {
        isMTP: true,
        ...(params?.department ? { department: params.department } : {}),
      },
    }
  );

  return response.data;
};

export const getConnectedWorkflows = async () => {
  const response = await apiClient.get<ApiResponse<WorkflowConnectionsResponse>>(
    "/api/custom/mtp/workflows/v1/connected"
  );

  return response.data;
};

export const getGeneratorModels = async () => {
  const response = await apiClient.get<ApiResponse<WorkflowGeneratorModel[]>>(
    "/api/custom/mtp/workflows/v1/generator/models"
  );

  return response.data;
};

export const generateWorkflow = async (payload: {
  question: string;
  selectedChatModel: Record<string, unknown>;
}) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    "/api/custom/mtp/workflows/v1/generate",
    payload
  );

  return response.data;
};

export const connectWorkflow = async (payload: {
  templateSlug: string;
  name: string;
  flowData: string;
  department?: string | null;
}) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    "/api/custom/mtp/workflows/v1/connect",
    payload
  );

  return response.data;
};

export const updateWorkflowInputs = async (
  flowiseChatflowId: string,
  payload: { inputForm: Record<string, unknown> }
) => {
  const response = await apiClient.put<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/workflows/v1/${flowiseChatflowId}/inputs`,
    payload
  );

  return response.data;
};

export const updateWorkflowConfig = async (
  flowiseChatflowId: string,
  payload: { flowData: string; configuration?: Record<string, unknown> }
) => {
  const response = await apiClient.put<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/workflows/v1/${flowiseChatflowId}/config`,
    payload
  );

  return response.data;
};

export const scheduleWorkflow = async (
  flowiseChatflowId: string,
  payload: {
    runMode: "manual" | "once" | "recurring";
    runAt?: string | null;
    cronExpression?: string | null;
    timezone?: string | null;
  }
) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/workflows/v1/${flowiseChatflowId}/schedule`,
    payload
  );

  return response.data;
};

export const validateWorkflow = async (flowiseChatflowId: string) => {
  const response = await apiClient.get<
    ApiResponse<
      | { issues: Array<{ id: string; label: string; name: string; issues: string[] }> }
      | Record<string, unknown>
    >
  >(
    `/api/custom/mtp/workflows/v1/${flowiseChatflowId}/validate`
  );

  return response.data;
};

export const runWorkflow = async (
  flowiseChatflowId: string,
  payload?: Record<string, unknown>
) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/workflows/v1/${flowiseChatflowId}/run`,
    payload ?? {}
  );

  return response.data;
};

export const getWorkflowRuns = async (
  flowiseChatflowId: string,
  params?: { page?: number; limit?: number }
) => {
  const response = await apiClient.get<ApiResponse<WorkflowRunsResponse>>(
    `/api/custom/mtp/workflows/v1/${flowiseChatflowId}/runs`,
    {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 50,
      },
    }
  );

  return response.data;
};

export const deleteWorkflow = async (flowiseChatflowId: string) => {
  const response = await apiClient.delete<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/workflows/v1/${flowiseChatflowId}`
  );

  return response.data;
};

export const reportWorkflowIssue = async (
  flowiseChatflowId: string,
  payload: { title: string; description: string }
) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/workflows/v1/${flowiseChatflowId}/issue`,
    payload
  );

  return response.data;
};
