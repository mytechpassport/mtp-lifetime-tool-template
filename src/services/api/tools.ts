import apiClient from "@/lib/apiClient";
import type { ApiResponse, Pagination } from "@/types/api";
import type { ToolCatalogItem } from "@/types/mtp";

export type ToolCatalogResponse = {
  items: ToolCatalogItem[];
  pagination?: Pagination;
  categories?: string[];
};

const parseTieredPricing = (
  value: unknown
): Array<{ tier: string; price: number; features: string[] }> | null => {
  if (!value) return null;
  if (Array.isArray(value)) {
    return value as Array<{ tier: string; price: number; features: string[] }>;
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed)
        ? (parsed as Array<{ tier: string; price: number; features: string[] }>)
        : null;
    } catch (error) {
      return null;
    }
  }
  return null;
};

const toBool = (value: unknown) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1";
  }
  return Boolean(value);
};

const normalizeTool = (tool: Record<string, unknown>): ToolCatalogItem => ({
  id: Number(tool.id),
  slug: String(tool.slug ?? ""),
  name: String(tool.name ?? ""),
  description: (tool.description as string | null) ?? null,
  category: String(tool.category ?? ""),
  toolType: String(tool.toolType ?? tool.tool_type ?? ""),
  pricingModel: String(tool.pricingModel ?? tool.pricing_model ?? ""),
  lifetimePrice: (() => {
    const raw =
      tool.lifetimePrice !== undefined ? tool.lifetimePrice : tool.lifetime_price;
    if (raw === null || raw === undefined) return null;
    return Number(raw);
  })(),
  tieredPricing: parseTieredPricing(
    tool.tieredPricing ?? tool.tiered_pricing_json ?? null
  ),
  isListed:
    tool.isListed !== undefined ? toBool(tool.isListed) : toBool(tool.is_listed),
  isEnabled:
    tool.isEnabled !== undefined
      ? toBool(tool.isEnabled)
      : toBool(tool.is_enabled),
  externalUrl: (tool.externalUrl ?? tool.external_url ?? null) as
    | string
    | null,
  subdomainUrl: (tool.subdomainUrl ?? tool.subdomain_url ?? null) as
    | string
    | null,
  flowiseNodeName: (tool.flowiseNodeName ?? tool.flowise_node_name ?? null) as
    | string
    | null,
  vendorUserId: (() => {
    const raw =
      tool.vendorUserId !== undefined ? tool.vendorUserId : tool.vendor_user_id;
    if (raw === null || raw === undefined) return null;
    return Number(raw);
  })(),
  createdAt: (tool.createdAt ?? tool.created_at ?? null) as string | null,
  updatedAt: (tool.updatedAt ?? tool.updated_at ?? null) as string | null,
  connected: toBool(tool.is_connected ?? tool.connected),
  owned: toBool(tool.is_purchased ?? tool.owned),
  is_connected: toBool(tool.is_connected ?? tool.connected),
  is_purchased: toBool(tool.is_purchased ?? tool.owned),
  includedInPlan: toBool(tool.includedInPlan ?? tool.included_in_plan),
  requiresAuth:
    tool.requiresAuth !== undefined
      ? Number(tool.requiresAuth)
      : Number(tool.requires_auth ?? 1),
});

export const getTools = async (params?: {
  category?: string;
  owned?: boolean;
  connected?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  const response = await apiClient.get<ApiResponse<ToolCatalogResponse>>(
    "/api/custom/mtp/tools/v1",
    { params }
  );

  const payload = response.data as ApiResponse<
    ToolCatalogResponse | ToolCatalogItem[] | Record<string, unknown>
  > & {
    pagination?: Pagination;
    categories?: string[];
  };
  const data = payload.data as
    | ToolCatalogResponse
    | ToolCatalogItem[]
    | Record<string, unknown>
    | undefined;

  const rawItems = Array.isArray(data)
    ? data
    : ((data as ToolCatalogResponse | undefined)?.items ?? []);

  const pagination =
    (data as ToolCatalogResponse | undefined)?.pagination ?? payload.pagination;
  const categories =
    (data as ToolCatalogResponse | undefined)?.categories ?? payload.categories;

  return {
    ...payload,
    data: {
      items: (rawItems as Record<string, unknown>[]).map(normalizeTool),
      pagination,
      categories,
    },
  };
};

export const getTool = async (toolId: number | string) => {
  const response = await apiClient.get<ApiResponse<ToolCatalogItem>>(
    `/api/custom/mtp/tools/v1/${toolId}`
  );

  const payload = response.data as ApiResponse<ToolCatalogItem>;
  const tool = normalizeTool(payload.data as Record<string, unknown>);
  return { ...payload, data: tool };
};

export const getToolBySlug = async (slug: string) => {
  if (!slug || typeof slug !== "string") throw new Error("Slug is required");
  const response = await apiClient.get<ApiResponse<ToolCatalogItem>>(
    `/api/custom/mtp/tools/v1/by-slug/${encodeURIComponent(slug.trim())}`
  );
  const payload = response.data as ApiResponse<ToolCatalogItem>;
  const tool = normalizeTool(payload.data as Record<string, unknown>);
  return { ...payload, data: tool };
};

export const purchaseTool = async (
  toolId: number | string,
  payload: { paymentMethodType: "credits" | "card" }
) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/tools/v1/${toolId}/purchase`,
    payload
  );

  return response.data;
};

export const connectTool = async (
  toolId: number | string,
  payload?: Record<string, unknown>
) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    `/api/custom/mtp/tools/v1/${toolId}/connect`,
    payload ?? {}
  );

  return response.data;
};
