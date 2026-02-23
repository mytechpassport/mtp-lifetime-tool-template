export type UserRole = "user" | "vendor";

export type WorkflowTemplate = {
  templateSlug: string;
  name: string;
  description: string;
  department: string;
  usecases: string[];
  flowData: string;
  recommended?: boolean;
};

export type WorkflowConnection = {
  id: number;
  flowiseChatflowId: string;
  templateSlug: string | null;
  templateName: string;
  department: string | null;
  status: "connected" | "error" | "paused";
  lastExecutionStatus?: "success" | "error";
  lastExecutionAt?: string | null;
  inputForm?: Record<string, unknown> | null;
  schedule: {
    runMode: "manual" | "once" | "recurring";
    runAt?: string | null;
    cronExpression?: string | null;
    timezone?: string | null;
    nextRunAt?: string | null;
  };
};

/** Valid tool_type values from API (mtp_tools.tool_type) */
export type ToolType = "mtp_original" | "vendor" | "third_party";

export type ToolCatalogItem = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  toolType: ToolType | string;
  pricingModel: string;
  lifetimePrice?: number | null;
  tieredPricing?: Array<{ tier: string; price: number; features: string[] }> | null;
  isListed: boolean;
  isEnabled: boolean;
  externalUrl?: string | null;
  /** Subdomain only (e.g. "ai-writer"). Full URL built via buildToolSubdomainFullUrl() using VITE_BASE_URL. */
  subdomainUrl?: string | null;
  flowiseNodeName?: string | null;
  vendorUserId?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  connected?: boolean;
  owned?: boolean;
  is_connected?: boolean;
  is_purchased?: boolean;
  includedInPlan?: boolean;
  requiresAuth?: number;
};

export type WorkflowGeneratorModel = {
  name: string;
  label: string;
  credentialName: string;
  inputs: Record<string, unknown>;
  hasCredential: boolean;
  credential?: string;
};

export type VendorIntegration = {
  ssoType: "oidc" | "saml" | "jwt" | "none";
  authUrl?: string;
  tokenUrl?: string;
  userinfoUrl?: string;
  jwksUrl?: string;
  clientId?: string;
  scopes?: string;
  provisioningUrl?: string;
  licenseActivateUrl?: string;
  licenseDeactivateUrl?: string;
  webhookUrl?: string;
  testAccountJson?: Record<string, unknown>;
  lastTestStatus?: "pass" | "fail";
};
