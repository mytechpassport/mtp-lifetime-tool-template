import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { connectTool, getTool, getTools, purchaseTool } from "@/services/api/tools";
import { getApiErrorMessage } from "@/utils/apiError";

export const toolQueryKeys = {
  list: (filters?: Record<string, unknown>) => [
    "tools",
    "list",
    filters ?? "all",
  ],
  detail: (toolId: number | string) => ["tools", "detail", toolId],
};

export const useTools = (filters?: {
  category?: string;
  owned?: boolean;
  connected?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  const query = useQuery({
    queryKey: toolQueryKeys.list(filters),
    queryFn: async () => {
      const response = await getTools(filters);
      return response.data;
    },
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
};

export const useTool = (toolId: number | string) => {
  const query = useQuery({
    queryKey: toolQueryKeys.detail(toolId),
    queryFn: async () => {
      const response = await getTool(toolId);
      return response.data;
    },
    enabled: Boolean(toolId),
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
};

export const usePurchaseTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      toolId,
      paymentMethodType,
    }: {
      toolId: number | string;
      paymentMethodType: "credits" | "card";
    }) => purchaseTool(toolId, { paymentMethodType }),
    onSuccess: () => {
      toast.success("Tool purchase started.");
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
};

export const useConnectTool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      toolId,
      payload,
    }: {
      toolId: number | string;
      payload?: Record<string, unknown>;
    }) => connectTool(toolId, payload),
    onSuccess: () => {
      toast.success("Tool connected successfully.");
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
};
