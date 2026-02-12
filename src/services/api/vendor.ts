import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export type VendorSoftware = {
  id: number;
  name: string;
  description: string;
  category: string;
  pricingModel: "free" | "lifetime" | "subscription" | "trial" | "tiered";
  lifetimePrice?: number | null;
  tieredPricing?: Array<{ tier: string; price: number; features: string[] }>;
  features?: string[];
  websiteUrl?: string | null;
  loginUrl?: string | null;
  logoUrl?: string | null;
  screenshots?: string[];
  status: "pending" | "approved" | "denied" | "disabled";
  denialReason?: string | null;
  isListed?: boolean;
  isEnabled?: boolean;
  createdAt?: string;
};

export type VendorPayout = {
  id: number;
  amount: number;
  currency: string;
  status: "processing" | "completed" | "rejected";
  methodType: string;
  createdAt: string;
  rejectionReason?: string | null;
};

export type VendorIntegration = {
  ssoType?: "oauth2" | "saml";
  clientId?: string | null;
  clientSecret?: string | null;
  authUrl?: string | null;
  tokenUrl?: string | null;
  webhookUrl?: string | null;
  webhookSecret?: string | null;
  provisioningUrl?: string | null;
  licenseActivateUrl?: string | null;
  licenseDeactivateUrl?: string | null;
  status?: "pending" | "approved" | "rejected";
  lastTestStatus?: "success" | "error" | "pass" | "fail" | null;
  lastTestAt?: string | null;
};

export type VendorProfile = {
  name?: string | null;
  email?: string | null;
  companyName?: string | null;
  companyDescription?: string | null;
  supportEmail?: string | null;
  websiteUrl?: string | null;
  status?: "active" | "pending" | "disabled";
};

const parseJsonArray = <T>(value: unknown): T[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value as T[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T[]) : undefined;
    } catch (error) {
      return undefined;
    }
  }
  return undefined;
};

const toBool = (value: unknown) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1";
  }
  return Boolean(value);
};

const normalizeVendorSoftware = (
  item: Record<string, unknown>
): VendorSoftware => ({
  id: Number(item.id),
  name: String(item.name ?? ""),
  description: String(item.description ?? ""),
  category: String(item.category ?? ""),
  pricingModel: (item.pricingModel ?? item.pricing_model ?? "free") as VendorSoftware["pricingModel"],
  lifetimePrice:
    item.lifetimePrice !== undefined
      ? (item.lifetimePrice as number | null)
      : (item.lifetime_price as number | null),
  tieredPricing: parseJsonArray(item.tieredPricing ?? item.tiered_pricing_json),
  features: parseJsonArray(item.features ?? item.features_json),
  websiteUrl: (item.websiteUrl ?? item.website_url ?? null) as string | null,
  loginUrl: (item.loginUrl ?? item.login_url ?? null) as string | null,
  logoUrl: (item.logoUrl ?? item.logo_url ?? null) as string | null,
  screenshots: parseJsonArray(item.screenshots ?? item.screenshots_json),
  status: (item.status ?? "pending") as VendorSoftware["status"],
  denialReason: (item.denialReason ?? item.denial_reason ?? null) as
    | string
    | null,
  isListed:
    item.isListed !== undefined
      ? toBool(item.isListed)
      : toBool(item.is_listed),
  isEnabled:
    item.isEnabled !== undefined
      ? toBool(item.isEnabled)
      : toBool(item.is_enabled),
  createdAt: (item.createdAt ?? item.created_at ?? undefined) as
    | string
    | undefined,
});

const normalizeVendorPayout = (item: Record<string, unknown>): VendorPayout => ({
  id: Number(item.id),
  amount: Number(item.amount ?? 0),
  currency: String(item.currency ?? "USD"),
  status: (item.status ?? "processing") as VendorPayout["status"],
  methodType: String(item.methodType ?? item.method_type ?? ""),
  createdAt: String(item.createdAt ?? item.created_at ?? ""),
  rejectionReason: (item.rejectionReason ?? item.rejection_reason ?? null) as
    | string
    | null,
});

const normalizeVendorIntegration = (
  item: Record<string, unknown> | null
): VendorIntegration | null => {
  if (!item) return null;
  const rawStatus = (item.lastTestStatus ?? item.last_test_status ?? null) as
    | string
    | null;
  const normalizedStatus =
    rawStatus === "pass"
      ? "success"
      : rawStatus === "fail"
      ? "error"
      : rawStatus;

  return {
    ssoType: (item.ssoType ?? item.sso_type ?? "oauth2") as VendorIntegration["ssoType"],
    clientId: (item.clientId ?? item.client_id ?? null) as string | null,
    clientSecret: (item.clientSecret ?? item.client_secret ?? null) as string | null,
    authUrl: (item.authUrl ?? item.auth_url ?? null) as string | null,
    tokenUrl: (item.tokenUrl ?? item.token_url ?? null) as string | null,
    userinfoUrl: (item.userinfoUrl ?? item.userinfo_url ?? null) as string | null,
    jwksUrl: (item.jwksUrl ?? item.jwks_url ?? null) as string | null,
    webhookUrl: (item.webhookUrl ?? item.webhook_url ?? null) as string | null,
    webhookSecret: (item.webhookSecret ?? item.webhook_secret ?? null) as string | null,
    provisioningUrl: (item.provisioningUrl ?? item.provisioning_url ?? null) as string | null,
    licenseActivateUrl: (item.licenseActivateUrl ?? item.license_activate_url ?? null) as
      | string
      | null,
    licenseDeactivateUrl: (item.licenseDeactivateUrl ?? item.license_deactivate_url ?? null) as
      | string
      | null,
    status: (item.status ?? "pending") as VendorIntegration["status"],
    lastTestStatus: normalizedStatus as VendorIntegration["lastTestStatus"],
    lastTestAt: (item.lastTestAt ?? item.last_test_at ?? null) as string | null,
  };
};

const normalizeVendorProfile = (
  item: Record<string, unknown> | null
): VendorProfile | null => {
  if (!item) return null;
  return {
    name: (item.name ?? null) as string | null,
    email: (item.email ?? null) as string | null,
    companyName: (item.companyName ?? item.company_name ?? null) as string | null,
    companyDescription: (item.companyDescription ?? item.company_description ?? null) as
      | string
      | null,
    supportEmail: (item.supportEmail ?? item.support_email ?? null) as string | null,
    websiteUrl: (item.websiteUrl ?? item.website_url ?? null) as string | null,
    status: (item.status ?? "active") as VendorProfile["status"],
  };
};

const serializeVendorSoftware = (payload: Partial<VendorSoftware>) => ({
  name: payload.name,
  description: payload.description,
  category: payload.category,
  pricing_model: payload.pricingModel,
  lifetime_price: payload.lifetimePrice,
  tiered_pricing_json: payload.tieredPricing,
  features_json: payload.features,
  website_url: payload.websiteUrl,
  login_url: payload.loginUrl,
  logo_url: payload.logoUrl,
  screenshots_json: payload.screenshots,
});

const serializeVendorProfile = (payload: VendorProfile) => ({
  name: payload.name,
  company_name: payload.companyName,
  company_description: payload.companyDescription,
  support_email: payload.supportEmail,
  website_url: payload.websiteUrl,
});

const serializeVendorIntegration = (
  payload: VendorIntegration & { testUserEmail?: string; testUserPassword?: string }
) => ({
  sso_type: payload.ssoType,
  client_id: payload.clientId,
  client_secret: payload.clientSecret,
  auth_url: payload.authUrl,
  token_url: payload.tokenUrl,
  userinfo_url: payload.userinfoUrl,
  jwks_url: payload.jwksUrl,
  scopes: payload.scopes,
  provisioning_url: payload.provisioningUrl,
  license_activate_url: payload.licenseActivateUrl,
  license_deactivate_url: payload.licenseDeactivateUrl,
  webhook_url: payload.webhookUrl,
  webhook_secret: payload.webhookSecret,
  test_account_json:
    payload.testUserEmail || payload.testUserPassword
      ? { email: payload.testUserEmail, password: payload.testUserPassword }
      : undefined,
});

export const getVendorSoftware = async () => {
  const response = await apiClient.get<ApiResponse<VendorSoftware[]>>(
    "/api/custom/mtp/vendor/v1/software"
  );

  const payload = response.data;
  const items = Array.isArray(payload.data) ? payload.data : [];
  return {
    ...payload,
    data: items.map((item) =>
      normalizeVendorSoftware(item as Record<string, unknown>)
    ),
  };
};

export const createVendorSoftware = async (payload: Partial<VendorSoftware>) => {
  const response = await apiClient.post<ApiResponse<VendorSoftware>>(
    "/api/custom/mtp/vendor/v1/software",
    serializeVendorSoftware(payload)
  );

  return response.data;
};

export const updateVendorSoftware = async (
  softwareId: number | string,
  payload: Partial<VendorSoftware>
) => {
  const response = await apiClient.put<ApiResponse<VendorSoftware>>(
    `/api/custom/mtp/vendor/v1/software/${softwareId}`,
    serializeVendorSoftware(payload)
  );

  return response.data;
};

export const getVendorPayouts = async () => {
  const response = await apiClient.get<ApiResponse<VendorPayout[]>>(
    "/api/custom/mtp/vendor/v1/payouts"
  );

  const payload = response.data;
  const items = Array.isArray(payload.data) ? payload.data : [];
  return {
    ...payload,
    data: items.map((item) =>
      normalizeVendorPayout(item as Record<string, unknown>)
    ),
  };
};

export const updateVendorPayoutMethod = async (payload: {
  methodType: "bank" | "airwallex" | "stripe";
  details: Record<string, string>;
}) => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    "/api/custom/mtp/vendor/v1/payout-method",
    payload
  );

  return response.data;
};

export const getVendorIntegration = async () => {
  const response = await apiClient.get<ApiResponse<VendorIntegration>>(
    "/api/custom/mtp/vendor/v1/integration"
  );

  const payload = response.data;
  return {
    ...payload,
    data: normalizeVendorIntegration(payload.data as Record<string, unknown>),
  };
};

export const updateVendorIntegration = async (
  payload: VendorIntegration & {
    testUserEmail?: string;
    testUserPassword?: string;
  }
) => {
  const response = await apiClient.put<ApiResponse<VendorIntegration>>(
    "/api/custom/mtp/vendor/v1/integration",
    serializeVendorIntegration(payload)
  );

  return response.data;
};

export const testVendorIntegration = async () => {
  const response = await apiClient.post<ApiResponse<Record<string, unknown>>>(
    "/api/custom/mtp/vendor/v1/integration/test"
  );

  return response.data;
};

export const getVendorProfile = async () => {
  const response = await apiClient.get<ApiResponse<VendorProfile>>(
    "/api/custom/mtp/vendor/v1/profile"
  );

  const payload = response.data;
  return {
    ...payload,
    data: normalizeVendorProfile(payload.data as Record<string, unknown>),
  };
};

export const updateVendorProfile = async (payload: VendorProfile) => {
  const response = await apiClient.put<ApiResponse<VendorProfile>>(
    "/api/custom/mtp/vendor/v1/profile",
    serializeVendorProfile(payload)
  );

  return response.data;
};
