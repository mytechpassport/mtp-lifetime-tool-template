/* eslint-disable @typescript-eslint/no-explicit-any */
import { showError } from "@/utils/toast";
import {
  TableReference,
  ColumnReference,
  JoinCondition,
  JoinClause,
  WhereCondition,
  WindowFunction,
  CaseWhen,
  CaseExpression,
  AggregateFunction,
  DateFunction,
  SelectExpression,
  OrderByClause,
  HavingCondition,
  CTEDefinition,
  QueryBuilder,
  QueryExecutionOptions,
  QueryExecutionResult,
  QueryValidationResult,
  QueryBuilders,
} from "./QueryBuilder";
import Groq from "groq-sdk";

// Type definitions
interface VCEClient {
  baseUrl: string;
  apiKey: string;
  accessToken?: string;
  openRouterApiKey?: string;
  groqApiKey?: string;
}

// Custom URLSearchParams class that preserves commas for specific parameters
class VCEURLSearchParams extends URLSearchParams {
  private preserveCommaParams = new Set(["filter", "order"]); // This is because of how the backend expects the values

  append(name: string, value: string): void {
    if (this.preserveCommaParams.has(name)) {
      // For filter and order params, use the value as is
      super.append(name, value);
    } else {
      // For other params, let URLSearchParams handle encoding
      super.append(name, value);
    }
  }

  toString(): string {
    const params = super.toString();
    // Decode only the commas in filter and order parameters
    return params.replace(/%2C(?=[^=]*(?:&|$))/g, ",");
  }
}

interface User {
  id: string;
  email: string;
  created_at: string;
  role?: string;
}

interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: object;
}

interface SignUpResponse {
  user: User | null;
  session: Session | null;
}

interface SignUpOptions {
  data?: Record<string, any>;
}

interface SignInResponse {
  session: Session;
  user: User;
}

interface RefreshTokenRequest {
  refresh_token: string;
}

interface RefreshTokenResponse {
  session: Session;
  user: User;
}

interface ResetPasswordResponse {
  [key: string]: any;
}

interface UpdatePasswordResponse {
  data: {
    id: string;
    email: string;
    role: string;
    updated_at: string;
    [key: string]: any;
  };
  error: null;
}

interface ConfirmResetPasswordResponse {
  message: string;
  success: boolean;
}

interface UpdateEmailResponse {
  message: string;
  success: boolean;
}

interface UpdateNameResponse {
  message: string;
  success: boolean;
}

interface DatabaseRow {
  id: string | number;
  [key: string]: any;
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface FilterCondition {
  column: string;
  matchType:
    | "eq"
    | "neq"
    | "lt"
    | "le"
    | "gt"
    | "ge"
    | "cs"
    | "sw"
    | "ew"
    | "bt"
    | "in"
    | "is"
    | "ncs"
    | "nsw"
    | "new"
    | "nbt"
    | "nin"
    | "nis"
    | "nlt"
    | "nle"
    | "ngt"
    | "nge";
  value?: string | number | (string | number)[];
}

interface OrderCondition {
  column: string;
  direction?: "asc" | "desc";
}

interface FetchRowsOptions {
  page?: number;
  pageSize?: number;
  where?: Record<string, any>; // Keep for backward compatibility
  no_user_id?: number;
  filters?: FilterCondition[]; // AND logic
  orFilters?: FilterCondition[][]; // OR logic - array of filter groups
  order?: OrderCondition[];
}

interface RealtimePayload {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  schema: string;
  table: string;
  record: object;
  old_record?: object;
}

interface RealtimeChannel {
  unsubscribe: () => void;
}

interface FileUploadResult {
  success: boolean;
  fileId: string | number;
  fileKey: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  isPublic: boolean;
  publicUrl: string | null;
  uploadedAt: string;
  description: string | null;
}

interface FileUploadAPIResponse {
  success: boolean;
  uploadedFiles: FileUploadResult[];
  totalFiles: number;
  successfulUploads: number;
  failedUploads: number;
  uploadTime: number;
  errors?: Array<{
    fileName: string;
    error: string;
  }>;
  partialSuccess?: boolean;
}

interface FileUploadOptions {
  isPublic?: boolean;
  description?: string;
}

interface FileRecord {
  id: string | number;
  file_key: string;
  original_name: string;
  file_size: number;
  mime_type: string;
  is_public: boolean;
  public_url: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | number;
}

interface FileListResponse {
  success: boolean;
  files: FileRecord[];
  pagination: Pagination;
  filters: {
    isPublic: boolean | null;
    mimeType: string | null;
  };
}

interface FileListOptions {
  page?: number;
  pageSize?: number;
  isPublic?: boolean;
  mimeType?: string;
}

interface FileUrlResponse {
  success: boolean;
  fileId: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
  isPublic: boolean | number;
  accessUrl: string;
  urlType: string;
  expiresIn: string | null;
  generatedAt: string;
  // Keeping original fields
  expiresAt?: string;
  fileMetadata?: {
    id: string | number;
    originalName: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: string;
  };
}

interface FileDeleteResponse {
  success: boolean;
  message: string;
  deletedFile: {
    id: string | number;
    originalName: string;
    fileKey: string;
  };
}

interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
interface GroqMessage {
  role: "system" | "user" | "assistant";

  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;

      role: string;
    };

    finish_reason: string;

    index: number;
  }>;

  usage: {
    prompt_tokens: number;

    completion_tokens: number;

    total_tokens: number;
  };

  id: string;

  model: string;

  created: number;
}

// =============================================================================
// STRIPE INTERFACES
// =============================================================================

interface StripeCustomer {
  name: string;
  email: string;
  description?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  metadata?: Record<string, any>;
}

interface StripeInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number; // in cents
  metadata?: Record<string, any>;
  metadataMapping?: Record<
    string,
    {
      isAssociatedWithDbRecord: boolean;
      tableName: string;
      fieldName?: string;
    }
  >;
}

interface StripeTaxRate {
  percentage: number;
  displayName?: string;
  description?: string;
  inclusive?: boolean;
  metadata?: Record<string, any>;
  metadataMapping?: Record<
    string,
    {
      isAssociatedWithDbRecord: boolean;
      tableName: string;
      fieldName?: string;
    }
  >;
}

interface StripeInvoiceData {
  customer: StripeCustomer;
  customerMetadataMapping?: Record<
    string,
    {
      isAssociatedWithDbRecord: boolean;
      tableName: string;
      fieldName?: string;
    }
  >;
  items: StripeInvoiceItem[];
  // Legacy single tax support (maintained for backward compatibility)
  taxRate?: number;
  taxName?: string;
  taxDescription?: string;
  taxInclusive?: boolean;
  taxMetadata?: Record<string, any>;
  taxMetadataMapping?: Record<
    string,
    {
      isAssociatedWithDbRecord: boolean;
      tableName: string;
      fieldName?: string;
    }
  >;
  // New multiple taxes support
  taxes?: StripeTaxRate[];
  dueDate?: string;
  isRecurring?: boolean;
  isDraft?: boolean;
  notes?: string;
  metadata?: Record<string, any>;
  metadataMapping?: Record<
    string,
    {
      isAssociatedWithDbRecord: boolean;
      tableName: string;
      fieldName?: string;
    }
  >;
}

interface StripeInvoice {
  id: string;
  amount_due: number; // in cents
  amount_paid: number; // in cents
  currency: string;
  status: string;
  customer_email?: string;
  created: number;
  due_date?: number;
  hosted_invoice_url?: string;
  invoice_pdf?: string;
  [key: string]: any;
}

interface StripeConnectionResponse {
  success: boolean;
  connected: boolean;
  stripeUserId?: string;
  connectedAt?: string;
  accountType?: string;
  message?: string;
}

interface StripeConnectResponse {
  success: boolean;
  oauthUrl: string;
  message: string;
}

interface StripeConnectCallbackResponse {
  success: boolean;
  stripeUserId: string;
  message: string;
}

interface StripeDisconnectResponse {
  success: boolean;
  message: string;
}

interface StripeInvoiceResponse {
  success: boolean;
  invoice: StripeInvoice;
  message: string;
}

interface StripeInvoicesListResponse {
  success: boolean;
  invoices: StripeInvoice[];
  hasMore: boolean;
  total: number;
}

interface StripeMetricsResponse {
  success: boolean;
  metrics: {
    totalRevenue: number; // in cents
    totalOutstanding: number; // in cents
    totalOverdue: number; // in cents
    invoiceCount: number;
    paidInvoiceCount: number;
    paidPercentage: number;
  };
}

interface StripePdfResponse {
  success: boolean;
  pdfUrl: string;
  hostedInvoiceUrl: string;
}

interface StripeReferralEarning {
  id: number;
  referrer_id: number;
  referee_id: number;
  amount: number;
  status: "pending" | "approved" | "paid";
  subscription_id: string;
  subscription_period_start: string;
  subscription_period_end: string;
  stripe_payout_id?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

interface StripeReferralEarningsResponse {
  success: boolean;
  summary: {
    pending: {
      count: number;
      totalAmount: string;
    };
    approved: {
      count: number;
      totalAmount: string;
    };
    paid: {
      count: number;
      totalAmount: string;
    };
  };
  payout: {
    canRequestPayout: boolean;
    eligibilityMessage: string;
    hasStripeConnection: boolean;
  };
  earnings: {
    pending: StripeReferralEarning[];
    approved: StripeReferralEarning[];
    paid: StripeReferralEarning[];
  };
}

interface StripeAccountVerificationDetails {
  payouts_enabled: boolean;
  has_pending_requirements: boolean;
  has_bank_account: boolean;
  requirements: {
    currently_due: string[];
    past_due: string[];
    disabled_reason?: string;
  };
}

interface StripeReferralPayoutResponse {
  success: boolean;
  message: string;
  error?: string;
  details?:
    | {
        requestedAmount?: string;
        availableAmount?: string;
        shortfall?: string;
      }
    | string;
  verificationDetails?: StripeAccountVerificationDetails;
  payout?: {
    id: string;
    amount: string;
    currency: string;
    status: string;
    estimatedArrival: string | null;
    description: string;
  };
  earnings?: {
    totalCount: number;
    totalAmount: string;
    updatedCount: number;
  };
}

interface StripeReferralPayoutError extends Error {
  error: string;
  details?:
    | {
        requestedAmount?: string;
        availableAmount?: string;
        shortfall?: string;
      }
    | string;
  verificationDetails?: StripeAccountVerificationDetails;
}

// Email Marketing Types
interface EmailMarketingProvider {
  id: string | number;
  provider: string;
  account_name: string;
  email_address: string;
  connected_at: string;
  updated_at: string;
}

interface EmailMarketingConnectionStats {
  total_connections: number;
  connected_providers: Array<{
    provider: string;
    account_name: string;
    connected_at: string;
    is_default: boolean;
  }>;
  default_provider: string | null;
}

interface EmailMarketingConnectionsResponse {
  success: boolean;
  connections: EmailMarketingProvider[];
  stats: EmailMarketingConnectionStats;
}

interface EmailMarketingConnectResponse {
  success: boolean;
  oauthUrl: string;
  state: string;
}

interface EmailMarketingCallbackRequest {
  code: string;
  state: string;
  error?: string;
}

interface EmailMarketingCallbackResponse {
  success: boolean;
  message: string;
  connection: {
    provider: string;
    account_name: string;
    email_address: string;
    connected_at: Date;
  };
}

interface EmailMarketingDisconnectResponse {
  success: boolean;
  message: string;
}

interface EmailMarketingDefaultProviderResponse {
  success: boolean;
  message: string;
}

interface EmailMarketingAudience {
  id: string;
  name: string;
  [key: string]: any;
}

interface EmailMarketingAudienceResponse {
  success: boolean;
  data: EmailMarketingAudience;
}

interface EmailMarketingAudiencesResponse {
  success: boolean;
  data: {
    lists: EmailMarketingAudience[];
    total_items?: number;
  };
}

interface EmailMarketingMember {
  email_address: string;
  status: string;
  [key: string]: any;
}

interface EmailMarketingMembersResponse {
  success: boolean;
  data: {
    members: EmailMarketingMember[];
    total_items?: number;
  };
}

interface EmailMarketingCampaign {
  id: string;
  status: string;
  [key: string]: any;
}

interface EmailMarketingCampaignsResponse {
  success: boolean;
  data: {
    campaigns: EmailMarketingCampaign[];
    total_items?: number;
  };
}

interface EmailMarketingTemplate {
  id: string;
  name: string;
  [key: string]: any;
}

interface EmailMarketingTemplatesResponse {
  success: boolean;
  data: {
    templates: EmailMarketingTemplate[];
    total_items?: number;
  };
}

interface EmailMarketingAutomation {
  id: string;
  status: string;
  [key: string]: any;
}

interface EmailMarketingAutomationsResponse {
  success: boolean;
  data: {
    automations: EmailMarketingAutomation[];
    total_items?: number;
  };
}

interface EmailMarketingReport {
  id: string;
  [key: string]: any;
}

interface EmailMarketingReportsResponse {
  success: boolean;
  data: {
    reports: EmailMarketingReport[];
    total_items?: number;
  };
}

interface EmailMarketingClickDetail {
  id: string;
  url: string;
  total_clicks: number;
  unique_clicks: number;
  unique_subscriber_clicks: number;
  [key: string]: any;
}

interface EmailMarketingClickDetailsResponse {
  success: boolean;
  data: {
    clicks: EmailMarketingClickDetail[];
    total_items?: number;
    [key: string]: any;
  };
}

interface EmailMarketingOpenDetail {
  id: string;
  campaign_id: string;
  list_id: string;
  list_is_active: boolean;
  contact_status: string;
  email_id: string;
  email_address: string;
  merge_fields: Record<string, any>;
  vip: boolean;
  timestamp: string;
  [key: string]: any;
}

interface EmailMarketingOpenDetailsResponse {
  success: boolean;
  data: {
    members: EmailMarketingOpenDetail[];
    campaign_id: string;
    total_items?: number;
    [key: string]: any;
  };
}

interface EmailMarketingUnsubscribe {
  email_id: string;
  email_address: string;
  merge_fields: Record<string, any>;
  vip: boolean;
  timestamp: string;
  reason: string;
  campaign_id: string;
  list_id: string;
  [key: string]: any;
}

interface EmailMarketingUnsubscribesResponse {
  success: boolean;
  data: {
    unsubscribes: EmailMarketingUnsubscribe[];
    campaign_id: string;
    total_items?: number;
    [key: string]: any;
  };
}

interface EmailMarketingAbuseReport {
  id: number;
  campaign_id: string;
  list_id: string;
  email_id: string;
  email_address: string;
  merge_fields: Record<string, any>;
  vip: boolean;
  date: string;
  [key: string]: any;
}

interface EmailMarketingAbuseReportsResponse {
  success: boolean;
  data: {
    abuse_reports: EmailMarketingAbuseReport[];
    campaign_id: string;
    total_items?: number;
    [key: string]: any;
  };
}

interface EmailMarketingMemberActivity {
  action: string;
  timestamp: string;
  url?: string;
  type?: string;
  campaign_id?: string;
  title?: string;
  parent_campaign?: {
    id: string;
    title: string;
  };
  [key: string]: any;
}

interface EmailMarketingMemberActivityResponse {
  success: boolean;
  data: {
    activity: EmailMarketingMemberActivity[];
    email_id: string;
    list_id: string;
    total_items?: number;
    [key: string]: any;
  };
}

interface EmailMarketingMemberEvent {
  id: string;
  event: string;
  occurred_at: string;
  properties: Record<string, any>;
  [key: string]: any;
}

interface EmailMarketingMemberEventsResponse {
  success: boolean;
  data: {
    events: EmailMarketingMemberEvent[];
    total_items?: number;
    [key: string]: any;
  };
}

interface EmailMarketingMemberNote {
  id: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  note: string;
  [key: string]: any;
}

interface EmailMarketingMemberNotesResponse {
  success: boolean;
  data: {
    notes: EmailMarketingMemberNote[];
    total_items?: number;
    [key: string]: any;
  };
}

interface EmailMarketingMemberNoteCreateResponse {
  success: boolean;
  data: EmailMarketingMemberNote;
  message: string;
}

interface EmailMarketingCampaignSendChecklistItem {
  type: string;
  id: number;
  heading: string;
  details: string;
  is_ready: boolean;
  [key: string]: any;
}

interface EmailMarketingCampaignSendChecklistResponse {
  success: boolean;
  data: {
    is_ready: boolean;
    items: EmailMarketingCampaignSendChecklistItem[];
    [key: string]: any;
  };
}

interface EmailConnection {
  id: string | number;
  provider: string;
  email_address: string;
  connected_at: string;
  updated_at: string;
}

interface EmailConnectionsResponse {
  success: boolean;
  connections: EmailConnection[];
}

interface EmailConnectRequest {
  redirectBackTo?: string;
}

interface EmailConnectResponse {
  success: boolean;
  oauthUrl: string;
  state: string;
}

interface EmailCallbackRequest {
  code: string;
  state: string;
  error?: string;
}

interface EmailCallbackResponse {
  success: boolean;
  message: string;
  connection: {
    provider: string;
    email_address: string;
    connected_at: Date;
  };
}

interface EmailDisconnectResponse {
  success: boolean;
  message: string;
}

interface EmailSendRequest {
  recipient: string;
  subject: string;
  body: string;
  provider?: string;
  skipFallback?: string;
  replyTo?: string;
  metadata?: Record<string, any>;
}

interface EmailSendResponse {
  success: boolean;
  message: string;
  provider: string;
  messageId: string;
}

interface EmailQueueRequest {
  taskType: string;
  recipient: string;
  subject: string;
  body: string;
  provider?: string;
  replyTo?: string;
  metadata?: Record<string, any>;
  priority?: number;
  maxAttempts?: number;
  scheduledAt?: string;
}

interface EmailQueueResponse {
  success: boolean;
  message: string;
  taskId: string | number;
}

interface EmailQueueStatusResponse {
  success: boolean;
  status: Record<string, any>;
}

interface EmailDefaultProviderRequest {
  provider?: string;
}

interface EmailDefaultProviderResponse {
  success: boolean;
  message: string;
}

// Calendar Interfaces
interface CalendarConnection {
  id: string | number;
  provider: string;
  email_address: string;
  connected_at: string;
  updated_at: string;
  webhook_setup: boolean;
}

interface CalendarConnectionsResponse {
  success: boolean;
  connections: CalendarConnection[];
}

interface CalendarConnectRequest {
  redirectBackTo?: string;
}

interface CalendarConnectResponse {
  success: boolean;
  oauthUrl: string;
  state: string;
}

interface CalendarCallbackRequest {
  code: string;
  state: string;
  error?: string;
}

interface CalendarCallbackResponse {
  success: boolean;
  message: string;
  connection: {
    provider: string;
    email_address: string;
    connected_at: Date;
    webhook_setup: boolean;
  };
}

interface CalendarDisconnectResponse {
  success: boolean;
  message: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  location?: string;
  attendees?: Array<{
    email: string;
    name?: string;
    status?: string;
  }>;
  [key: string]: any;
}

interface CalendarEventsResponse {
  success: boolean;
  provider: string;
  events: CalendarEvent[];
  count: number;
}

interface CalendarEventsOptions {
  timeMin?: string;
  timeMax?: string;
  maxResults?: number;
}

interface WebhookLogsResponse {
  success: boolean;
  logs: Array<{
    id: string;
    provider: string;
    event_type: string;
    payload: any;
    created_at: string;
  }>;
  count: number;
}

// Unified type for exportCSV configuration
interface ExportCSVConfig {
  mainModel: string;
  columns: {
    key: string;
    source: {
      model?: string;
      field: string;
      type?: "date" | "decimal" | "string";
    };
    label: string;
  }[];
  joins?: {
    model: string;
    alias?: string;
    type: "LEFT" | "INNER" | "RIGHT";
    on: {
      leftField: string;
      rightField: string;
    }[];
  }[];
  filters?: {
    model?: string;
    field: string;
    operator: string;
    value: any;
  }[];
  aggregations?: {
    type: "SUM" | "COUNT" | "AVG" | "MIN" | "MAX";
    field: string;
    alias: string;
  }[];
  groupBy?: string[];
  orderBy?: {
    field: string;
    direction: "ASC" | "DESC";
  }[];
}

// OAuth Types (Google, Microsoft, Apple)
interface OAuthInitiateRequest {
  state?: string;
  scopes?: string[];
}

interface OAuthInitiateResponse {
  success: boolean;
  authorization_url: string;
  state: string;
  provider: string;
}

interface OAuthCallbackRequest {
  code: string;
  state: string;
  error?: string;
  referral_code?: string;
  role?: string;
}

interface OAuthCallbackResponse {
  success: boolean;
  user?: User;
  session?: Session;
  message?: string;
}

interface OAuthStatusResponse {
  success: boolean;
  connected: boolean;
  provider?: string;
  email?: string;
}

interface OAuthDisconnectResponse {
  success: boolean;
  message: string;
}

// Personal Access Token Types
interface PersonalAccessToken {
  id: number;
  user_id: number;
  name: string;
  token?: string; // Only shown on creation/regeneration
  last_four_chars?: string | null; // Last 4 characters for display
  expires_at: string | null;
  last_used_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PATGenerateRequest {
  name: string;
  expires_at?: string;
}

interface PATGenerateResponse {
  success: boolean;
  token: PersonalAccessToken;
  message: string;
}

interface PATListResponse {
  success: boolean;
  tokens: PersonalAccessToken[];
  count: number;
}

interface PATRegenerateResponse {
  success: boolean;
  token: PersonalAccessToken;
  message: string;
}

interface PATRevokeResponse {
  success: boolean;
  message: string;
}

// Google Drive Types
interface GoogleDriveConnectResponse {
  success: boolean;
  authorization_url: string;
  state: string;
}

interface GoogleDriveCallbackResponse {
  success: boolean;
  message: string;
  provider: string;
}

interface GoogleDriveStatusResponse {
  success: boolean;
  connected: boolean;
  provider: string;
}

interface GoogleDriveUploadRequest {
  file: File;
  subFolder?: string;
}

interface GoogleDriveUploadResponse {
  success: boolean;
  fileId: string;
  fileName: string;
  mimeType: string;
  size: number;
  webViewLink?: string;
  webContentLink?: string;
}

interface GoogleDriveShareRequest {
  isPublic: boolean;
}

interface GoogleDriveShareResponse {
  success: boolean;
  fileId: string;
  isPublic: boolean;
  webViewLink?: string;
  webContentLink?: string;
}

interface GoogleDriveFolder {
  id: string;
  name: string;
  mimeType: string;
  parents?: string[];
}

interface GoogleDriveFoldersResponse {
  success: boolean;
  folders: GoogleDriveFolder[];
  count: number;
}

interface GoogleDriveDisconnectResponse {
  success: boolean;
  message: string;
  provider: string;
}

// LLM Types
interface LLMChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface LLMChatRequest {
  messages: LLMChatMessage[];
  provider?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface LLMChatResponse {
  error: boolean;
  message: string;
  data: {
    response: string;
    provider: string;
  };
}

interface LLMTranscribeRequest {
  audio: File;
  provider?: string;
  model?: string;
  temperature?: number;
}

interface LLMTranscribeResponse {
  error: boolean;
  message: string;
  data: string;
}

interface LLMTranslateRequest {
  audio: File;
  provider?: string;
  model?: string;
  temperature?: number;
}

interface LLMTranslateResponse {
  error: boolean;
  message: string;
  data: string;
}

interface LLMTTSRequest {
  text: string;
  provider?: string;
  voice?: string;
  model?: string;
  output_format?: string;
}

// TTS returns a blob/file, so we'll handle it differently

// Policy Types (Role-Based Access Control)
interface PolicyPermissions {
  [tableName: string]: {
    GET?: 0 | 1;
    INSERT?: 0 | 1;
    UPDATE?: 0 | 1;
    DELETE?: 0 | 1;
  };
}

interface Policy {
  id: number;
  role: string;
  permissions: PolicyPermissions;
  created_at: string;
  updated_at: string;
}

interface PolicyResponse {
  success: boolean;
  policy?: Policy;
  policies?: Policy[];
  roles?: string[];
  message?: string;
  policyId?: number;
  action?: "created" | "updated";
  permissions?: PolicyPermissions;
  valid?: boolean;
}

interface PolicyRequest {
  role: string;
  permissions: PolicyPermissions | string;
}

interface PolicyValidateRequest {
  permissions: PolicyPermissions | string;
}

interface PolicyValidateResponse {
  success: boolean;
  message: string;
  permissions?: PolicyPermissions;
  valid?: boolean;
}

// Health Check Types
interface HealthCheckResponse {
  status: string;
}

// =============================================================================
// ENHANCED VCESDK INTERFACE
// =============================================================================

interface VCESDK {
  getClient: () => VCEClient;
  setAccessToken: (token: string | null) => void;
  _makeRequest: (
    endpoint: string,
    options?: RequestInit & { headers?: Record<string, string> },
    skipAuthRedirect?: boolean
  ) => Promise<any>;
  apiRequest: (
    endpoint: string,
    options?: RequestInit & { headers?: Record<string, string> }
  ) => Promise<any>;
  _buildFilterValue: (filter: FilterCondition) => string;
  signUp: (
    email: string,
    password: string,
    options?: SignUpOptions
  ) => Promise<SignUpResponse>;
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signOut: () => Promise<void>;
  refreshToken: (refreshToken: string) => Promise<RefreshTokenResponse>;
  getUser: () => Promise<User>;
  resetPassword: (email: string) => Promise<ResetPasswordResponse>;
  updatePassword: (newPassword: string) => Promise<UpdatePasswordResponse>;
  updateEmail: (newEmail: string) => Promise<UpdateEmailResponse>;
  updateName: (newName: string) => Promise<UpdateNameResponse>;
  confirmResetPassword: (
    token: string,
    newPassword: string
  ) => Promise<ConfirmResetPasswordResponse>;
  fetchRows: (
    table: string,
    options?: FetchRowsOptions
  ) => Promise<{ data: DatabaseRow[]; pagination: Pagination } | DatabaseRow[]>;
  insertRow: (
    table: string,
    payload: object | object[]
  ) => Promise<DatabaseRow[]>;
  updateRow: (
    table: string,
    id: string | number,
    updates: object,
    options?: FetchRowsOptions
  ) => Promise<DatabaseRow[]>;
  deleteRow: (
    table: string,
    id: string | number,
    options?: FetchRowsOptions
  ) => Promise<void>;
  subscribeToTable: (
    table: string,
    onChange: (payload: RealtimePayload) => void
  ) => RealtimeChannel;
  getReferralCode: () => Promise<{ success: boolean; referral_code: string }>;
  uploadFile: (
    files: File[] | FileList,
    options?: FileUploadOptions
  ) => Promise<FileUploadAPIResponse>;
  getFileUrl: (
    fileId?: string | number,
    fileKey?: string,
    expiresIn?: number
  ) => Promise<FileUrlResponse>;
  deleteFile: (
    fileId?: string | number,
    fileKey?: string
  ) => Promise<FileDeleteResponse>;
  listFiles: (options?: FileListOptions) => Promise<FileListResponse>;
  callOpenRouter: (
    model: string,
    messages: OpenRouterMessage[],
    options?: {
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
    }
  ) => Promise<OpenRouterResponse>;
  callGroq: (
    model: string,
    messages: GroqMessage[],
    options?: {
      temperature?: number;
      max_completion_tokens?: number;
      top_p?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
      stream?: boolean;
    }
  ) => Promise<GroqResponse>;

  /**
   * Execute a structured query using the query builder system.
   * This replaces raw SQL with a secure, validated object-based approach.
   *
   * @param query - Structured query definition
   * @param options - Execution options
   * @returns Promise resolving to query results with metadata
   * @throws Error if query validation fails or execution errors occur
   */
  executeStructuredQuery: <T = any>(
    query: QueryBuilder,
    options?: QueryExecutionOptions
  ) => Promise<QueryExecutionResult<T>>;

  /**
   * Validate a structured query without executing it.
   * Useful for query builders and form validation.
   *
   * @param query - Structured query definition
   * @returns Promise resolving to validation result
   */
  validateQuery: (query: QueryBuilder) => Promise<QueryValidationResult>;

  /**
   * Execute multiple queries in a single request (batch execution).
   * Useful for dashboard-style queries that need multiple datasets.
   *
   * @param queries - Array of named queries
   * @param options - Execution options applied to all queries
   * @returns Promise resolving to map of results by query name
   */
  executeBatchQueries: <T = any>(
    queries: { name: string; query: QueryBuilder }[],
    options?: QueryExecutionOptions
  ) => Promise<Record<string, QueryExecutionResult<T>>>;

  /**
   * Export data to CSV based on dynamic configuration
   *
   * @param config - Export configuration with columns, joins, filters, etc.
   * @returns Promise that resolves when the CSV file is downloaded
   */
  exportCSV: (config: ExportCSVConfig) => Promise<void>;
  /**
   * Initiate Stripe Connect OAuth flow
   * @param state - Optional custom state parameter
   * @returns Promise resolving to OAuth URL and connection details
   */
  initiateStripeConnect: (state?: string) => Promise<StripeConnectResponse>;

  /**
   * Handle Stripe Connect OAuth callback
   * @param code - OAuth authorization code from Stripe
   * @param state - State parameter from OAuth flow
   * @returns Promise resolving to connection result
   */
  handleStripeConnectCallback: (
    code: string,
    state: Record<string, any>
  ) => Promise<StripeConnectCallbackResponse>;

  /**
   * Get current Stripe connection status
   * @returns Promise resolving to connection status
   */
  getStripeConnection: () => Promise<StripeConnectionResponse>;

  /**
   * Disconnect Stripe account
   * @returns Promise resolving to disconnection result
   */
  disconnectStripeAccount: () => Promise<StripeDisconnectResponse>;

  /**
   * Create a new Stripe invoice
   * @param invoiceData - Invoice data with customer, items, and metadata
   * @returns Promise resolving to created invoice
   */
  createStripeInvoice: (
    invoiceData: StripeInvoiceData
  ) => Promise<StripeInvoiceResponse>;

  /**
   * List Stripe invoices with pagination
   * @param options - Pagination and filtering options
   * @returns Promise resolving to invoices list
   */
  listStripeInvoices: (options?: {
    limit?: number;
    starting_after?: string;
    ending_before?: string;
  }) => Promise<StripeInvoicesListResponse>;

  /**
   * Get Stripe revenue metrics
   * @returns Promise resolving to revenue metrics
   */
  getStripeMetrics: () => Promise<StripeMetricsResponse>;

  /**
   * Mark a Stripe invoice as paid
   * @param invoiceId - Stripe invoice ID
   * @param actualAmountPaid - Optional actual amount paid in cents (for out-of-band payments)
   * @returns Promise resolving to updated invoice
   */
  markStripeInvoiceAsPaid: (
    invoiceId: string,
    actualAmountPaid?: number
  ) => Promise<StripeInvoiceResponse>;

  /**
   * Send a Stripe invoice to customer
   * @param invoiceId - Stripe invoice ID
   * @returns Promise resolving to sent invoice
   */
  sendStripeInvoice: (invoiceId: string) => Promise<StripeInvoiceResponse>;

  /**
   * Finalize and send a draft Stripe invoice
   * @param invoiceId - Stripe invoice ID
   * @returns Promise resolving to finalized and sent invoice
   */
  finalizeAndSendStripeInvoice: (
    invoiceId: string
  ) => Promise<StripeInvoiceResponse>;

  /**
   * Delete a Stripe invoice (draft only)
   * @param invoiceId - Stripe invoice ID
   * @returns Promise resolving to deletion result
   */
  deleteStripeInvoice: (
    invoiceId: string
  ) => Promise<{ success: boolean; message: string }>;

  /**
   * Get Stripe invoice PDF URL
   * @param invoiceId - Stripe invoice ID
   * @returns Promise resolving to PDF URLs
   */
  getStripeInvoicePdf: (invoiceId: string) => Promise<StripePdfResponse>;

  /**
   * Get referral earnings status and summary
   * @returns Promise resolving to referral earnings status and details
   */
  getStripeReferralEarnings: () => Promise<StripeReferralEarningsResponse>;

  /**
   * Process payout for approved referral earnings
   * @returns Promise resolving to payout result
   */
  processStripeReferralPayout: () => Promise<StripeReferralPayoutResponse>;

  /**
   * Get user's email connections
   * @returns Promise resolving to list of email connections
   */
  getEmailConnections: () => Promise<EmailConnectionsResponse>;

  /**
   * Initiate OAuth flow for email provider
   * @param provider - Email provider (gmail, outlook, zoho)
   * @param options - Optional redirect back URL
   * @returns Promise resolving to OAuth URL and state
   */
  connectEmailProvider: (
    provider: string,
    options?: EmailConnectRequest
  ) => Promise<EmailConnectResponse>;

  /**
   * Handle OAuth callback for email provider
   * @param provider - Email provider (gmail, outlook, zoho)
   * @param callbackData - OAuth callback data (code, state, error)
   * @returns Promise resolving to connection result
   */
  handleEmailProviderCallback: (
    provider: string,
    callbackData: EmailCallbackRequest
  ) => Promise<EmailCallbackResponse>;

  /**
   * Disconnect email provider
   * @param provider - Email provider to disconnect
   * @returns Promise resolving to disconnection result
   */
  disconnectEmailProvider: (
    provider: string
  ) => Promise<EmailDisconnectResponse>;

  /**
   * Send single email
   * @param emailData - Email content and recipient information
   * @returns Promise resolving to send result
   */
  sendEmail: (emailData: EmailSendRequest) => Promise<EmailSendResponse>;

  /**
   * Queue email for later sending
   * @param emailData - Email queue request data
   * @returns Promise resolving to queue result
   */
  queueEmail: (emailData: EmailQueueRequest) => Promise<EmailQueueResponse>;

  /**
   * Get email queue status
   * @returns Promise resolving to queue status
   */
  getEmailQueueStatus: () => Promise<EmailQueueStatusResponse>;

  /**
   * Update default email provider
   * @param providerData - Default provider settings
   * @returns Promise resolving to update result
   */
  setDefaultEmailProvider: (
    providerData: EmailDefaultProviderRequest
  ) => Promise<EmailDefaultProviderResponse>;

  /**
   * Get user's calendar connections
   * @returns Promise resolving to list of calendar connections
   */
  getCalendarConnections: () => Promise<CalendarConnectionsResponse>;

  /**
   * Initiate OAuth flow for calendar provider
   * @param provider - Calendar provider (google_calendar, calendly)
   * @param options - Optional redirect back URL
   * @returns Promise resolving to OAuth URL and state
   */
  connectCalendarProvider: (
    provider: string,
    options?: CalendarConnectRequest
  ) => Promise<CalendarConnectResponse>;

  /**
   * Handle OAuth callback for calendar provider
   * @param provider - Calendar provider (google_calendar, calendly)
   * @param callbackData - OAuth callback data (code, state, error)
   * @returns Promise resolving to connection result
   */
  handleCalendarProviderCallback: (
    provider: string,
    callbackData: CalendarCallbackRequest
  ) => Promise<CalendarCallbackResponse>;

  /**
   * Disconnect calendar provider
   * @param provider - Calendar provider to disconnect
   * @returns Promise resolving to disconnection result
   */
  disconnectCalendarProvider: (
    provider: string
  ) => Promise<CalendarDisconnectResponse>;

  /**
   * Get calendar events from provider
   * @param provider - Calendar provider
   * @param options - Options for fetching events (timeMin, timeMax, maxResults)
   * @returns Promise resolving to list of calendar events
   */
  getCalendarEvents: (
    provider: string,
    options?: CalendarEventsOptions
  ) => Promise<CalendarEventsResponse>;

  /**
   * Get webhook logs for debugging
   * @param options - Filter options for logs
   * @returns Promise resolving to webhook logs
   */
  getCalendarWebhookLogs: (options?: {
    provider?: string;
    eventType?: string;
    limit?: number;
  }) => Promise<WebhookLogsResponse>;

  // Email Marketing Methods
  getEmailMarketingConnections: () => Promise<EmailMarketingConnectionsResponse>;
  connectEmailMarketingProvider: (
    provider: string,
    redirectBackTo?: string
  ) => Promise<EmailMarketingConnectResponse>;
  handleEmailMarketingCallback: (
    provider: string,
    callbackData: EmailMarketingCallbackRequest
  ) => Promise<EmailMarketingCallbackResponse>;
  disconnectEmailMarketingProvider: (
    provider: string
  ) => Promise<EmailMarketingDisconnectResponse>;
  setDefaultEmailMarketingProvider: (
    provider?: string
  ) => Promise<EmailMarketingDefaultProviderResponse>;

  // Email Marketing Audiences
  getEmailMarketingAudiences: (
    provider: string,
    options?: {
      count?: number;
      offset?: number;
      fields?: string;
      exclude_fields?: string;
    }
  ) => Promise<EmailMarketingAudiencesResponse>;
  getEmailMarketingAudience: (
    provider: string,
    audienceId: string
  ) => Promise<EmailMarketingAudienceResponse>;
  createEmailMarketingAudience: (
    provider: string,
    audienceData: any
  ) => Promise<EmailMarketingAudienceResponse>;
  updateEmailMarketingAudience: (
    provider: string,
    audienceId: string,
    updates: any
  ) => Promise<EmailMarketingAudienceResponse>;
  deleteEmailMarketingAudience: (
    provider: string,
    audienceId: string
  ) => Promise<{ success: boolean; message: string }>;

  // Email Marketing Members
  getEmailMarketingMembers: (
    provider: string,
    audienceId: string,
    options?: {
      count?: number;
      offset?: number;
      fields?: string;
      exclude_fields?: string;
      status?: string;
    }
  ) => Promise<EmailMarketingMembersResponse>;
  getEmailMarketingMember: (
    provider: string,
    audienceId: string,
    email: string
  ) => Promise<{ success: boolean; data: EmailMarketingMember }>;
  upsertEmailMarketingMember: (
    provider: string,
    audienceId: string,
    memberData: any
  ) => Promise<{
    success: boolean;
    data: EmailMarketingMember;
    message: string;
  }>;
  updateEmailMarketingMember: (
    provider: string,
    audienceId: string,
    email: string,
    updates: any
  ) => Promise<{
    success: boolean;
    data: EmailMarketingMember;
    message: string;
  }>;
  deleteEmailMarketingMember: (
    provider: string,
    audienceId: string,
    email: string
  ) => Promise<{ success: boolean; message: string }>;

  // Email Marketing Campaigns
  getEmailMarketingCampaigns: (
    provider: string,
    options?: {
      count?: number;
      offset?: number;
      type?: string;
      status?: string;
      before_send_time?: string;
      since_send_time?: string;
    }
  ) => Promise<EmailMarketingCampaignsResponse>;
  getEmailMarketingCampaign: (
    provider: string,
    campaignId: string
  ) => Promise<{ success: boolean; data: EmailMarketingCampaign }>;
  createEmailMarketingCampaign: (
    provider: string,
    campaignData: any
  ) => Promise<{
    success: boolean;
    data: EmailMarketingCampaign;
    message: string;
  }>;
  updateEmailMarketingCampaign: (
    provider: string,
    campaignId: string,
    updates: any
  ) => Promise<{
    success: boolean;
    data: EmailMarketingCampaign;
    message: string;
  }>;
  deleteEmailMarketingCampaign: (
    provider: string,
    campaignId: string
  ) => Promise<{ success: boolean; message: string }>;
  sendEmailMarketingCampaign: (
    provider: string,
    campaignId: string
  ) => Promise<{ success: boolean; data: any; message: string }>;
  scheduleEmailMarketingCampaign: (
    provider: string,
    campaignId: string,
    scheduleTime: string
  ) => Promise<{ success: boolean; data: any; message: string }>;

  // Email Marketing Templates
  getEmailMarketingTemplates: (
    provider: string,
    options?: {
      count?: number;
      offset?: number;
      type?: string;
      category?: string;
      folder_id?: string;
    }
  ) => Promise<EmailMarketingTemplatesResponse>;
  getEmailMarketingTemplate: (
    provider: string,
    templateId: string
  ) => Promise<{ success: boolean; data: EmailMarketingTemplate }>;
  createEmailMarketingTemplate: (
    provider: string,
    templateData: any
  ) => Promise<{
    success: boolean;
    data: EmailMarketingTemplate;
    message: string;
  }>;

  // Email Marketing Automations
  getEmailMarketingAutomations: (
    provider: string,
    options?: {
      count?: number;
      offset?: number;
      status?: string;
      before_create_time?: string;
      since_create_time?: string;
    }
  ) => Promise<EmailMarketingAutomationsResponse>;
  getEmailMarketingAutomation: (
    provider: string,
    automationId: string
  ) => Promise<{ success: boolean; data: EmailMarketingAutomation }>;

  // Email Marketing Reports
  getEmailMarketingReports: (
    provider: string,
    options?: {
      count?: number;
      offset?: number;
      type?: string;
      before_send_time?: string;
      since_send_time?: string;
    }
  ) => Promise<EmailMarketingReportsResponse>;
  getEmailMarketingReport: (
    provider: string,
    campaignId: string
  ) => Promise<{ success: boolean; data: EmailMarketingReport }>;

  // Email Marketing Advanced Analytics & Reporting
  getEmailMarketingCampaignClickDetails: (
    provider: string,
    campaignId: string,
    options?: {
      count?: number;
      offset?: number;
      fields?: string;
      exclude_fields?: string;
    }
  ) => Promise<EmailMarketingClickDetailsResponse>;
  getEmailMarketingCampaignOpenDetails: (
    provider: string,
    campaignId: string,
    options?: {
      count?: number;
      offset?: number;
      fields?: string;
      exclude_fields?: string;
      since?: string;
    }
  ) => Promise<EmailMarketingOpenDetailsResponse>;
  getEmailMarketingCampaignUnsubscribes: (
    provider: string,
    campaignId: string,
    options?: {
      count?: number;
      offset?: number;
      fields?: string;
      exclude_fields?: string;
    }
  ) => Promise<EmailMarketingUnsubscribesResponse>;
  getEmailMarketingCampaignAbuseReports: (
    provider: string,
    campaignId: string,
    options?: {
      count?: number;
      offset?: number;
      fields?: string;
      exclude_fields?: string;
    }
  ) => Promise<EmailMarketingAbuseReportsResponse>;

  // Email Marketing Member Activity & Engagement
  getEmailMarketingMemberActivity: (
    provider: string,
    audienceId: string,
    email: string,
    options?: {
      count?: number;
      offset?: number;
      fields?: string;
      exclude_fields?: string;
    }
  ) => Promise<EmailMarketingMemberActivityResponse>;
  getEmailMarketingMemberEvents: (
    provider: string,
    audienceId: string,
    email: string,
    options?: {
      count?: number;
      offset?: number;
    }
  ) => Promise<EmailMarketingMemberEventsResponse>;
  getEmailMarketingMemberNotes: (
    provider: string,
    audienceId: string,
    email: string,
    options?: {
      count?: number;
      offset?: number;
      fields?: string;
      exclude_fields?: string;
    }
  ) => Promise<EmailMarketingMemberNotesResponse>;
  addEmailMarketingMemberNote: (
    provider: string,
    audienceId: string,
    email: string,
    noteData: { note: string; [key: string]: any }
  ) => Promise<EmailMarketingMemberNoteCreateResponse>;

  // Email Marketing Campaign Validation
  getEmailMarketingCampaignSendChecklist: (
    provider: string,
    campaignId: string
  ) => Promise<EmailMarketingCampaignSendChecklistResponse>;

  // OAuth (Google, Microsoft, Apple)
  /**
   * Initiate OAuth flow for a provider (Google, Microsoft, Apple)
   * @param provider - OAuth provider name
   * @param options - Optional state and scopes
   * @returns Promise resolving to OAuth URL and state
   */
  initiateOAuth: (
    provider: string,
    options?: OAuthInitiateRequest
  ) => Promise<OAuthInitiateResponse>;

  /**
   * Handle OAuth callback (GET)
   * @param provider - OAuth provider name
   * @param callbackData - OAuth callback data
   * @returns Promise resolving to user and session data
   */
  handleOAuthCallback: (
    provider: string,
    callbackData: OAuthCallbackRequest
  ) => Promise<OAuthCallbackResponse>;

  /**
   * Handle OAuth callback (POST - for Apple)
   * @param provider - OAuth provider name
   * @param callbackData - OAuth callback data
   * @returns Promise resolving to user and session data
   */
  handleOAuthCallbackPost: (
    provider: string,
    callbackData: OAuthCallbackRequest
  ) => Promise<OAuthCallbackResponse>;

  /**
   * Check OAuth connection status
   * @param provider - OAuth provider name
   * @returns Promise resolving to connection status
   */
  getOAuthStatus: (provider: string) => Promise<OAuthStatusResponse>;

  /**
   * Disconnect OAuth provider
   * @param provider - OAuth provider name
   * @returns Promise resolving to disconnection result
   */
  disconnectOAuth: (provider: string) => Promise<OAuthDisconnectResponse>;

  // Personal Access Tokens
  /**
   * Generate a new Personal Access Token
   * @param request - PAT generation request
   * @returns Promise resolving to generated token
   */
  generatePAT: (request: PATGenerateRequest) => Promise<PATGenerateResponse>;

  /**
   * List all Personal Access Tokens for the authenticated user
   * @returns Promise resolving to list of tokens
   */
  listPATs: () => Promise<PATListResponse>;

  /**
   * Regenerate a Personal Access Token
   * @param id - Token ID
   * @returns Promise resolving to regenerated token
   */
  regeneratePAT: (id: number) => Promise<PATRegenerateResponse>;

  /**
   * Revoke (delete) a Personal Access Token
   * @param id - Token ID
   * @returns Promise resolving to revocation result
   */
  revokePAT: (id: number) => Promise<PATRevokeResponse>;

  // Google Drive
  /**
   * Initiate Google Drive OAuth flow
   * @returns Promise resolving to OAuth URL and state
   */
  connectGoogleDrive: () => Promise<GoogleDriveConnectResponse>;

  /**
   * Handle Google Drive OAuth callback
   * @param callbackData - OAuth callback data
   * @returns Promise resolving to connection result
   */
  handleGoogleDriveCallback: (callbackData: {
    code: string;
    state: string;
    error?: string;
  }) => Promise<GoogleDriveCallbackResponse>;

  /**
   * Check Google Drive connection status
   * @returns Promise resolving to connection status
   */
  getGoogleDriveStatus: () => Promise<GoogleDriveStatusResponse>;

  /**
   * Upload file to Google Drive
   * @param request - File upload request
   * @returns Promise resolving to uploaded file info
   */
  uploadToGoogleDrive: (
    request: GoogleDriveUploadRequest
  ) => Promise<GoogleDriveUploadResponse>;

  /**
   * Download file from Google Drive
   * @param fileId - Google Drive file ID
   * @returns Promise resolving to file blob
   */
  downloadFromGoogleDrive: (fileId: string) => Promise<Blob>;

  /**
   * Delete file from Google Drive
   * @param fileId - Google Drive file ID
   * @returns Promise resolving to deletion result
   */
  deleteFromGoogleDrive: (
    fileId: string
  ) => Promise<{ success: boolean; message: string }>;

  /**
   * Share or unshare file in Google Drive
   * @param fileId - Google Drive file ID
   * @param request - Share request
   * @returns Promise resolving to share result
   */
  shareGoogleDriveFile: (
    fileId: string,
    request: GoogleDriveShareRequest
  ) => Promise<GoogleDriveShareResponse>;

  /**
   * List folders in Google Drive
   * @returns Promise resolving to list of folders
   */
  listGoogleDriveFolders: () => Promise<GoogleDriveFoldersResponse>;

  /**
   * Disconnect Google Drive account
   * @returns Promise resolving to disconnection result
   */
  disconnectGoogleDrive: () => Promise<GoogleDriveDisconnectResponse>;

  // LLM Services
  /**
   * Chat completion using LLM adapter
   * @param request - Chat request with messages and options
   * @returns Promise resolving to chat response
   */
  chatLLM: (request: LLMChatRequest) => Promise<LLMChatResponse>;

  /**
   * Transcribe audio using LLM adapter
   * @param request - Transcription request with audio file
   * @returns Promise resolving to transcription text
   */
  transcribeAudio: (
    request: LLMTranscribeRequest
  ) => Promise<LLMTranscribeResponse>;

  /**
   * Translate audio using LLM adapter
   * @param request - Translation request with audio file
   * @returns Promise resolving to translated text
   */
  translateAudio: (
    request: LLMTranslateRequest
  ) => Promise<LLMTranslateResponse>;

  /**
   * Text-to-speech using LLM adapter
   * @param request - TTS request with text
   * @returns Promise resolving to audio blob
   */
  textToSpeech: (request: LLMTTSRequest) => Promise<Blob>;

  // Policy Management (Role-Based Access Control)
  /**
   * Get all policies
   * @returns Promise resolving to all policies
   */
  getPolicies: () => Promise<PolicyResponse>;

  /**
   * Get policy for specific role
   * @param role - Role name
   * @returns Promise resolving to policy for role
   */
  getPolicy: (role: string) => Promise<PolicyResponse>;

  /**
   * Create or update policy for a role
   * @param request - Policy request with role and permissions
   * @returns Promise resolving to created/updated policy
   */
  setPolicy: (request: PolicyRequest) => Promise<PolicyResponse>;

  /**
   * Update policy for specific role
   * @param role - Role name
   * @param permissions - Permissions object
   * @returns Promise resolving to updated policy
   */
  updatePolicy: (
    role: string,
    permissions: PolicyPermissions | string
  ) => Promise<PolicyResponse>;

  /**
   * Delete policy for specific role
   * @param role - Role name
   * @returns Promise resolving to deletion result
   */
  deletePolicy: (role: string) => Promise<PolicyResponse>;

  /**
   * Get all unique roles that have policies
   * @returns Promise resolving to list of roles
   */
  getPolicyRoles: () => Promise<PolicyResponse>;

  /**
   * Validate permission JSON structure without saving
   * @param request - Validation request with permissions
   * @returns Promise resolving to validation result
   */
  validatePolicy: (
    request: PolicyValidateRequest
  ) => Promise<PolicyValidateResponse>;

  // Health Check
  /**
   * Check API health status
   * @returns Promise resolving to health status
   */
  healthCheck: () => Promise<HealthCheckResponse>;
}

const createVCESDK = (client: VCEClient): VCESDK => {
  if (
    !client ||
    typeof client.baseUrl === "undefined" ||
    typeof client.apiKey === "undefined"
  ) {
    throw new Error("VCESDK requires a client with baseUrl and apiKey.");
  }

  const sdk: VCESDK = {
    getClient: () => client,
    getReferralCode: async (): Promise<{
      success: boolean;
      referral_code: string;
    }> => {
      return await sdk._makeRequest("/vce/v1/referral-code", {
        method: "GET",
      });
    },
    /**
     * Set access token for authenticated requests
     */
    setAccessToken: (token: string | null): void => {
      // console.log(
      //   "🔑 setAccessToken called with:",
      //   token ? `token (${token.substring(0, 10)}...)` : "null"
      // );
      // console.trace("setAccessToken call stack");
      client.accessToken = token || undefined;
      if (token) {
        localStorage.setItem("accessToken", token);
      } else {
        localStorage.removeItem("accessToken");
      }
    },

    /**
     * Make HTTP request helper
     * @private
     */
    _makeRequest: async (
      endpoint: string,
      options: RequestInit & { headers?: Record<string, string> } = {},
      skipAuthRedirect = false
    ): Promise<any> => {
      if (!client.apiKey) {
        throw new Error(
          "API key not set on client. Initialize VCEClient with an API key."
        );
      }

      const url = `${client.baseUrl}${endpoint}`;
      const headers: Record<string, string> = {
        apikey: client.apiKey,
      };

      // Only set Content-Type if not FormData
      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      // Add authorization header if access token is available
      if (client.accessToken) {
        headers["Authorization"] = `Bearer ${client.accessToken}`;
      }

      // Merge with custom headers
      Object.assign(headers, options.headers || {});

      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // Send cookies for cookie-based auth (e.g. MTP)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => {
          return { error: "Unknown error" };
        });

        // Handle token expiration and authentication errors
        if (
          response.status === 401 ||
          errorData.error === "Authentication failed" ||
          errorData.error === "Authorization token required" ||
          errorData.error === "Unauthorized" ||
          errorData.error === "Invalid or expired token" ||
          errorData.details === "Token expired" ||
          errorData.details === "Invalid token"
        ) {
          if (!skipAuthRedirect) {
            // Import TokenManager dynamically to avoid circular dependency
            const { TokenManager } = await import("@/utils/tokenManager");
            await TokenManager.handleTokenExpiration();
            return; // Don't throw error as TokenManager handles the redirect
          }
        }
        throw errorData;
        // throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    },

    /**
     * Make HTTP request with authentication wrapper
     * This method simply calls _makeRequest for consistency
     */
    apiRequest: async (
      endpoint: string,
      options: RequestInit & { headers?: Record<string, string> } = {}
    ): Promise<any> => {
      return await sdk._makeRequest(endpoint, options);
    },

    /**
     * Sign up a new user
     */
    signUp: async (
      email: string,
      password: string,
      options?: SignUpOptions
    ): Promise<SignUpResponse> => {
      console.log("from sdk");
      console.log({
        email,
        password,
        ...options?.data,
      });
      const data = await sdk._makeRequest(
        "/vce/v1/signup",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            ...options?.data,
          }),
        },
        true
      );

      // Store access token for future requests
      if (data.session?.access_token) {
        sdk.setAccessToken(data.session.access_token);
      }

      return data;
    },

    /**
     * Sign in an existing user
     */
    signIn: async (
      email: string,
      password: string
    ): Promise<SignInResponse> => {
      const data = await sdk._makeRequest(
        "/vce/v1/signin",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
        true
      );

      // Store access token for future requests
      if (data.session?.access_token) {
        sdk.setAccessToken(data.session.access_token);
      }

      return data;
    },

    /**
     * Sign out the current user
     */
    signOut: async (): Promise<void> => {
      await sdk._makeRequest("/vce/v1/signout", {
        method: "POST",
      });

      // Clear stored access token
      sdk.setAccessToken(null);
    },

    /**
     * Refresh access token using refresh token
     */
    refreshToken: async (
      refreshToken: string
    ): Promise<RefreshTokenResponse> => {
      return await sdk._makeRequest("/vce/v1/refresh-token", {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    },

    /**
     * Get the currently signed-in user
     */
    getUser: async (): Promise<User> => {
      return await sdk._makeRequest("/vce/v1/user", {
        method: "GET",
      });
    },

    /**
     * Reset password
     */
    resetPassword: async (email: string): Promise<ResetPasswordResponse> => {
      return await sdk._makeRequest("/vce/v1/reset-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    },

    /**
     * Update Email
     */
    updateEmail: async (newEmail: string): Promise<UpdateEmailResponse> => {
      return await sdk._makeRequest("/vce/v1/update-email", {
        method: "PUT",
        body: JSON.stringify({ email: newEmail }),
      });
    },
    /**
     * Update username
     */
    updateName: async (newName: string): Promise<UpdateNameResponse> => {
      return await sdk._makeRequest("/vce/v1/update-name", {
        method: "PUT",
        body: JSON.stringify({ name: newName }),
      });
    },
    /**
     * Update password
     */
    updatePassword: async (
      newPassword: string
    ): Promise<UpdatePasswordResponse> => {
      return await sdk._makeRequest("/vce/v1/update-password", {
        method: "PUT",
        body: JSON.stringify({ password: newPassword }),
      });
    },

    /**
     * Confirm password reset with token
     */
    confirmResetPassword: async (
      token: string,
      newPassword: string
    ): Promise<ConfirmResetPasswordResponse> => {
      return await sdk._makeRequest("/vce/v1/confirm-reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
      });
    },

    /**
     * Fetch all rows from a table with advanced filtering and ordering
     *
     * @param table - The table name to fetch from
     * @param options - Query options including filters, ordering, and pagination
     *
     * @example
     * // Basic filtering (AND logic)
     * const users = await sdk.fetchRows('users', {
     *   filters: [
     *     { column: 'status', matchType: 'eq', value: 'active' },
     *     { column: 'age', matchType: 'gt', value: 18 }
     *   ]
     * });
     *
     * @example
     * // OR logic filtering
     * const admins = await sdk.fetchRows('users', {
     *   orFilters: [
     *     [
     *       { column: 'role', matchType: 'eq', value: 'admin' },
     *       { column: 'role', matchType: 'eq', value: 'moderator' }
     *     ]
     *   ]
     * });
     *
     * @example
     * // Complex filtering with ordering and pagination
     * const products = await sdk.fetchRows('products', {
     *   filters: [
     *     { column: 'category', matchType: 'eq', value: 'electronics' },
     *     { column: 'price', matchType: 'bt', value: [100, 1000] }
     *   ],
     *   order: [
     *     { column: 'price', direction: 'desc' },
     *     { column: 'name', direction: 'asc' }
     *   ],
     *   page: 1,
     *   pageSize: 20
     * });
     *
     * @example
     * // Using different match types
     * const searchResults = await sdk.fetchRows('articles', {
     *   filters: [
     *     { column: 'title', matchType: 'cs', value: 'javascript' }, // contains
     *     { column: 'status', matchType: 'in', value: ['published', 'draft'] }, // in list
     *     { column: 'deleted_at', matchType: 'is' } // is null
     *   ]
     * });
     */
    fetchRows: async (
      table: string,
      options: FetchRowsOptions = {}
    ): Promise<
      { data: DatabaseRow[]; pagination: Pagination } | DatabaseRow[]
    > => {
      let endpoint = `/vce/v1/fetch-rows/${table}`;

      // Build query parameters
      const queryParams = new VCEURLSearchParams();

      // Add pagination parameters
      if (options.page) queryParams.append("page", options.page.toString());
      if (options.pageSize)
        queryParams.append("pageSize", options.pageSize.toString());

      // Add where conditions as query parameters (backward compatibility)
      if (options.where) {
        Object.entries(options.where).forEach(([key, value]) => {
          queryParams.append(key, value.toString());
        });
      }

      // Add no_user_id parameter
      if (options.no_user_id) {
        queryParams.append("no_user_id", options.no_user_id.toString());
      }

      // Handle new filter system - AND logic (multiple filter params)
      if (options.filters) {
        options.filters.forEach((filter) => {
          const filterValue = `${filter.column},${filter.matchType},${filter.value}`;
          queryParams.append("filter", filterValue);
        });
      }

      // Handle OR logic using numbered filter parameters
      if (options.orFilters) {
        options.orFilters.forEach((filterGroup, groupIndex) => {
          const filterParam = `filter${groupIndex + 1}`;
          filterGroup.forEach((filter) => {
            const filterValue = `${filter.column},${filter.matchType},${filter.value}`;
            queryParams.append(filterParam, filterValue);
          });
        });
      }

      // Handle ordering
      if (options.order) {
        options.order.forEach((orderCondition) => {
          const orderValue = orderCondition.direction
            ? `${orderCondition.column},${orderCondition.direction}`
            : orderCondition.column;
          queryParams.append("order", orderValue);
        });
      }

      const queryString = queryParams.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }

      const data = await sdk._makeRequest(endpoint, {
        method: "GET",
      });

      return data;
    },

    /**
     * Build filter value string for API
     * @private
     */
    _buildFilterValue: (filter: FilterCondition): string => {
      const { column, matchType, value } = filter;

      if (matchType === "is") {
        // For 'is null' we don't need a value
        return `${column},${matchType}`;
      }

      if (matchType === "bt") {
        // Between requires two values
        if (Array.isArray(value) && value.length >= 2) {
          return `${column},${matchType},${value[0]},${value[1]}`;
        }
        throw new Error("Between filter requires array with two values");
      }

      if (matchType === "in" || matchType === "nin") {
        // In/not in requires comma-separated values
        if (Array.isArray(value)) {
          return `${column},${matchType},${value.join(",")}`;
        }
        return `${column},${matchType},${value}`;
      }

      // Standard single value filters
      return `${column},${matchType},${value}`;
    },

    /**
     * Insert a new row or rows
     */
    insertRow: async (
      table: string,
      payload: object | object[]
    ): Promise<DatabaseRow[]> => {
      const data = await sdk._makeRequest(`/vce/v1/insert-row/${table}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // Ensure we always return an array
      return Array.isArray(data) ? data : [data];
    },

    /**
     * Update a row by ID
     */
    updateRow: async (
      table: string,
      id: string | number,
      updates: object,
      options?: FetchRowsOptions
    ): Promise<DatabaseRow[]> => {
      let endpoint = `/vce/v1/update-row/${table}/${id}`;
      if (options?.no_user_id) {
        endpoint += `?no_user_id=${options.no_user_id}`;
      }
      const data = await sdk._makeRequest(endpoint, {
        method: "PUT",
        body: JSON.stringify(updates),
      });

      // Return as array to match Supabase format
      return [data];
    },

    /**
     * Delete a row by ID
     */
    deleteRow: async (
      table: string,
      id: string | number,
      options?: FetchRowsOptions
    ): Promise<void> => {
      let endpoint = `/vce/v1/delete-row/${table}/${id}`;
      if (options?.no_user_id) {
        endpoint += `?no_user_id=${options.no_user_id}`;
      }
      await sdk._makeRequest(endpoint, {
        method: "DELETE",
      });
    },

    /**
     * Subscribe to real-time changes on a table
     */
    subscribeToTable: (
      table: string,
      onChange: (payload: RealtimePayload) => void
    ): RealtimeChannel => {
      // TODO: Implement WebSocket/SSE connection to /subscribe/:table endpoint
      console.warn(
        "subscribeToTable not yet implemented - requires WebSocket/SSE setup"
      );
      return {
        unsubscribe: () => console.log("Unsubscribed from", table),
      };
    },

    /**
     * Upload files to storage
     */
    uploadFile: async (
      files: File[] | FileList,
      options: FileUploadOptions = {}
    ): Promise<FileUploadAPIResponse> => {
      try {
        // Convert FileList to Array if needed
        const fileArray = Array.from(files);

        if (fileArray.length === 0) {
          throw new Error("No files provided for upload");
        }

        if (fileArray.length > 10) {
          throw new Error("Maximum 10 files can be uploaded at once");
        }

        // Create FormData
        const formData = new FormData();

        // Add files to FormData
        fileArray.forEach((file) => {
          formData.append("files", file);
        });

        // Add options to FormData
        if (options.isPublic !== undefined) {
          formData.append("isPublic", String(options.isPublic));
        }

        if (options.description) {
          formData.append("description", options.description);
        }

        const response = await sdk._makeRequest("/vce/v1/upload-file", {
          method: "POST",
          body: formData,
          // Don't set Content-Type header - browser will set it automatically with boundary
        });

        if (!response.success) {
          throw new Error(response.error || "File upload failed");
        }

        return response;
      } catch (error: any) {
        showError(`File upload failed: ${error.message}`);
        throw error;
      }
    },

    /**
     * Get a URL for a file (public URL or signed URL for private files)
     */
    getFileUrl: async (
      fileId?: string | number,
      fileKey?: string,
      expiresIn: number = 3600 // 1 hour
    ): Promise<FileUrlResponse> => {
      try {
        if (!fileId && !fileKey) {
          throw new Error("Either fileId or fileKey must be provided");
        }

        const searchParams = new URLSearchParams();
        searchParams.append("expiresIn", String(expiresIn));
        if (fileId) searchParams.append("fileId", String(fileId));
        if (fileKey) searchParams.append("fileKey", fileKey);

        const response = await sdk._makeRequest(
          `/vce/v1/file-url?${searchParams.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.success) {
          throw new Error(response.error || "Failed to get file URL");
        }

        return response;
      } catch (error: any) {
        showError(`Failed to get file URL: ${error.message}`);
        throw error;
      }
    },

    /**
     * Delete a file from storage
     */
    deleteFile: async (
      fileId?: string | number,
      fileKey?: string
    ): Promise<FileDeleteResponse> => {
      try {
        if (!fileId && !fileKey) {
          throw new Error("Either fileId or fileKey must be provided");
        }

        const body: any = {};
        if (fileId) body.fileId = fileId;
        if (fileKey) body.fileKey = fileKey;

        const response = await sdk._makeRequest("/vce/v1/delete-file", {
          method: "DELETE",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.success) {
          throw new Error(response.error || "File deletion failed");
        }

        return response;
      } catch (error: any) {
        showError(`File deletion failed: ${error.message}`);
        throw error;
      }
    },

    /**
     * List files with pagination and filtering
     */
    listFiles: async (
      options: FileListOptions = {}
    ): Promise<FileListResponse> => {
      try {
        const searchParams = new URLSearchParams();

        if (options.page !== undefined) {
          searchParams.append("page", String(options.page));
        }

        if (options.pageSize !== undefined) {
          searchParams.append(
            "pageSize",
            String(Math.min(options.pageSize, 100))
          );
        }

        if (options.isPublic !== undefined) {
          searchParams.append("isPublic", String(options.isPublic));
        }

        if (options.mimeType) {
          searchParams.append("mimeType", options.mimeType);
        }

        const response = await sdk._makeRequest(
          `/vce/v1/list-files?${searchParams.toString()}`,
          {
            method: "GET",
          }
        );

        if (!response.success) {
          throw new Error(response.error || "Failed to list files");
        }

        return response;
      } catch (error: any) {
        showError(`Failed to list files: ${error.message}`);
        throw error;
      }
    },

    /**
     * Call OpenRouter API for AI chat completions
     */
    callOpenRouter: async (
      model: string,
      messages: OpenRouterMessage[],
      options?: {
        temperature?: number;
        max_tokens?: number;
        top_p?: number;
        frequency_penalty?: number;
        presence_penalty?: number;
      }
    ): Promise<OpenRouterResponse> => {
      if (!client.openRouterApiKey) {
        throw new Error(
          "OpenRouter API key not set on client. Initialize VCEClient with an openRouterApiKey."
        );
      }

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${client.openRouterApiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer":
              typeof window !== "undefined" ? window.location.origin : "",
            "X-Title": "AIRCB App",
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: options?.temperature ?? 0.01,
            max_tokens: options?.max_tokens ?? 128000,
            top_p: options?.top_p ?? 1,
            frequency_penalty: options?.frequency_penalty ?? 0,
            presence_penalty: options?.presence_penalty ?? 0,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(
          `OpenRouter API error: ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      return response.json();
    },
    /**
     * Call Groq API for AI chat completions
     */
    callGroq: async (
      model: string,
      messages: GroqMessage[],
      options?: {
        temperature?: number;
        max_completion_tokens?: number;
        top_p?: number;
        frequency_penalty?: number;
        presence_penalty?: number;
        stream?: boolean;
      }
    ): Promise<GroqResponse> => {
      if (!client.groqApiKey) {
        throw new Error(
          "Groq API key not set on client. Initialize VCEClient with a groqApiKey."
        );
      }

      const groq = new Groq({
        apiKey: client.groqApiKey,
        dangerouslyAllowBrowser: true,
      });

      try {
        const chatCompletion = await groq.chat.completions.create({
          messages,
          model,
          temperature: options?.temperature ?? 0.01,
          max_completion_tokens: options?.max_completion_tokens ?? 16384,
          top_p: options?.top_p ?? 1,
          frequency_penalty: options?.frequency_penalty ?? 0,
          presence_penalty: options?.presence_penalty ?? 0,
          stream: options?.stream ?? false,
        });

        // Handle streaming response
        if (options?.stream) {
          throw new Error(
            "Streaming not yet implemented. Use stream: false or omit the stream option."
          );
        }

        return chatCompletion as GroqResponse;
      } catch (error) {
        throw new Error(
          `Groq API error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },

    /**
     * Execute a structured query using the query builder system.
     * This replaces raw SQL with a secure, validated object-based approach.
     *
     * @param query - Structured query definition
     * @param options - Execution options
     * @returns Promise resolving to query results with metadata
     * @throws Error if query validation fails or execution errors occur
     */
    executeStructuredQuery: async <T = any>(
      query: QueryBuilder,
      options?: QueryExecutionOptions
    ): Promise<QueryExecutionResult<T>> => {
      const payload = {
        query: JSON.stringify(query),
        ...(options?.timeout ? { timeout: options.timeout } : {}),
        ...(options?.maxRows ? { maxRows: options.maxRows } : {}),
        ...(options?.validateOnly ? { validateOnly: true } : {}),
      };

      try {
        const response = await sdk._makeRequest(
          "/vce/v1/execute-structured-query",
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );
        return response;
      } catch (error) {
        if (error.message.includes("Validation failed")) {
          const validationResult = JSON.parse(
            error.message.split("Validation failed: ")[1]
          );
          throw new Error(
            `Query validation failed: ${validationResult.errors.join(", ")}`
          );
        }
        throw error;
      }
    },

    /**
     * Validate a structured query without executing it.
     * Useful for query builders and form validation.
     *
     * @param query - Structured query definition
     * @returns Promise resolving to validation result
     */
    validateQuery: async (
      query: QueryBuilder
    ): Promise<QueryValidationResult> => {
      const payload = {
        query: JSON.stringify(query),
      };
      return await sdk._makeRequest("/vce/v1/validate-structured-query", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    /**
     * Execute multiple queries in a single request (batch execution).
     * Useful for dashboard-style queries that need multiple datasets.
     *
     * @param queries - Array of named queries
     * @param options - Execution options applied to all queries
     * @returns Promise resolving to map of results by query name
     */
    executeBatchQueries: async <T = any>(
      queries: { name: string; query: QueryBuilder }[],
      options?: QueryExecutionOptions
    ): Promise<Record<string, QueryExecutionResult<T>>> => {
      const payload = {
        queries: queries.map((q) => ({
          name: q.name,
          query: JSON.stringify(q.query),
          ...(options?.timeout ? { timeout: options.timeout } : {}),
          ...(options?.maxRows ? { maxRows: options.maxRows } : {}),
          ...(options?.validateOnly ? { validateOnly: true } : {}),
        })),
      };

      return await sdk._makeRequest("/vce/v1/execute-batch-queries", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    /**
     * Export data to CSV based on dynamic configuration
     *
     * @param config - Export configuration with columns, joins, filters, etc.
     * @returns Promise that resolves when the CSV file is downloaded
     */
    exportCSV: async (config: ExportCSVConfig) => {
      // We use custom fetch and download because of _makeReuest which will be refactored later
      if (!client.apiKey) {
        throw new Error(
          "API key not set on client. Initialize VCEClient with an API key."
        );
      }

      const url = `${client.baseUrl}/vce/v1/export-csv-data`;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        apikey: client.apiKey,
      };

      // Add authorization header if access token is available
      if (client.accessToken) {
        headers["Authorization"] = `Bearer ${client.accessToken}`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(config),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => {
          return { error: "Unknown error" };
        });

        // Handle token expiration and authentication errors
        if (
          response.status === 401 ||
          errorData.error === "Authentication failed" ||
          errorData.error === "Authorization token required" ||
          errorData.error === "Unauthorized" ||
          errorData.error === "Invalid or expired token" ||
          errorData.details === "Token expired" ||
          errorData.details === "Invalid token"
        ) {
          // Import TokenManager dynamically to avoid circular dependency
          const { TokenManager } = await import("@/utils/tokenManager");
          await TokenManager.handleTokenExpiration();
          return; // Don't throw error as TokenManager handles the redirect
        }
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `${config.mainModel}-export-${Date.now()}.csv`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create blob and download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    },
    /**
     * Initiate Stripe Connect OAuth flow
     */
    initiateStripeConnect: async (
      state?: string
    ): Promise<StripeConnectResponse> => {
      return await sdk._makeRequest("/api/stripe/v1/connect", {
        method: "POST",
        body: JSON.stringify({ state }),
      });
    },

    /**
     * Handle Stripe Connect OAuth callback
     */
    handleStripeConnectCallback: async (
      code: string,
      state: Record<string, any>
    ): Promise<StripeConnectCallbackResponse> => {
      try {
        const res = await sdk._makeRequest("/api/stripe/v1/connect/callback", {
          method: "POST",
          body: JSON.stringify({ code, state }),
        });
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    /**
     * Get current Stripe connection status
     */
    getStripeConnection: async (): Promise<StripeConnectionResponse> => {
      return await sdk._makeRequest("/api/stripe/v1/connection", {
        method: "GET",
      });
    },

    /**
     * Disconnect Stripe account
     */
    disconnectStripeAccount: async (): Promise<StripeDisconnectResponse> => {
      return await sdk._makeRequest("/api/stripe/v1/disconnect", {
        method: "POST",
      });
    },

    /**
     * Create a new Stripe invoice
     */
    createStripeInvoice: async (
      invoiceData: StripeInvoiceData
    ): Promise<StripeInvoiceResponse> => {
      return await sdk._makeRequest("/api/stripe/v1/invoices", {
        method: "POST",
        body: JSON.stringify(invoiceData),
      });
    },

    /**
     * List Stripe invoices with pagination
     */
    listStripeInvoices: async (options?: {
      limit?: number;
      starting_after?: string;
      ending_before?: string;
    }): Promise<StripeInvoicesListResponse> => {
      let endpoint = "/api/stripe/v1/invoices";
      const queryParams = new URLSearchParams();

      if (options?.limit) {
        queryParams.append("limit", options.limit.toString());
      }
      if (options?.starting_after) {
        queryParams.append("starting_after", options.starting_after);
      }
      if (options?.ending_before) {
        queryParams.append("ending_before", options.ending_before);
      }

      const queryString = queryParams.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }

      return await sdk._makeRequest(endpoint, {
        method: "GET",
      });
    },

    /**
     * Get Stripe revenue metrics
     */
    getStripeMetrics: async (): Promise<StripeMetricsResponse> => {
      return await sdk._makeRequest("/api/stripe/v1/invoices/metrics", {
        method: "GET",
      });
    },

    /**
     * Mark a Stripe invoice as paid
     */
    markStripeInvoiceAsPaid: async (
      invoiceId: string,
      actualAmountPaid?: number
    ): Promise<StripeInvoiceResponse> => {
      const body: any = {};

      // Add actualAmountPaid to request body if provided
      if (actualAmountPaid !== undefined) {
        body.actualAmountPaid = actualAmountPaid;
      }

      return await sdk._makeRequest(
        `/api/stripe/v1/invoices/${invoiceId}/mark-paid`,
        {
          method: "PUT",
          body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
        }
      );
    },

    /**
     * Send a Stripe invoice to customer
     */
    sendStripeInvoice: async (
      invoiceId: string
    ): Promise<StripeInvoiceResponse> => {
      return await sdk._makeRequest(
        `/api/stripe/v1/invoices/${invoiceId}/send`,
        {
          method: "POST",
        }
      );
    },

    /**
     * Finalize and send a draft Stripe invoice
     * @param invoiceId - Stripe invoice ID
     * @returns Promise resolving to finalized and sent invoice
     */
    finalizeAndSendStripeInvoice: async (
      invoiceId: string
    ): Promise<StripeInvoiceResponse> => {
      return await sdk._makeRequest(
        `/api/stripe/v1/invoices/${invoiceId}/finalize-and-send`,
        {
          method: "POST",
        }
      );
    },

    /**
     * Delete a Stripe invoice (draft only)
     */
    deleteStripeInvoice: async (
      invoiceId: string
    ): Promise<{ success: boolean; message: string }> => {
      return await sdk._makeRequest(`/api/stripe/v1/invoices/${invoiceId}`, {
        method: "DELETE",
      });
    },

    /**
     * Get Stripe invoice PDF URL
     */
    getStripeInvoicePdf: async (
      invoiceId: string
    ): Promise<StripePdfResponse> => {
      return await sdk._makeRequest(
        `/api/stripe/v1/invoices/${invoiceId}/pdf`,
        {
          method: "GET",
        }
      );
    },

    /**
     * Get referral earnings status and summary
     */
    getStripeReferralEarnings:
      async (): Promise<StripeReferralEarningsResponse> => {
        return await sdk._makeRequest("/api/stripe/v1/referral-earnings", {
          method: "GET",
        });
      },

    /**
     * Process payout for approved referral earnings
     * @throws {StripeReferralPayoutError} When payout fails with detailed error information
     * @returns {Promise<StripeReferralPayoutResponse>} Payout result with transaction details
     */

    processStripeReferralPayout:
      async (): Promise<StripeReferralPayoutResponse> => {
        return await sdk._makeRequest(
          "/api/stripe/v1/payout/referral-earnings",
          {
            method: "POST",
            body: JSON.stringify({}),
          }
        );
      },
    /**
     * Get user's email connections
     */
    getEmailConnections: async (): Promise<EmailConnectionsResponse> => {
      return await sdk._makeRequest("/api/email/v1/connections", {
        method: "GET",
      });
    },

    /**
     * Initiate OAuth flow for email provider
     */
    connectEmailProvider: async (
      provider: string,
      options?: EmailConnectRequest
    ): Promise<EmailConnectResponse> => {
      return await sdk._makeRequest(`/api/email/v1/connect/${provider}`, {
        method: "POST",
        body: JSON.stringify(options || {}),
      });
    },

    /**
     * Handle OAuth callback for email provider
     */
    handleEmailProviderCallback: async (
      provider: string,
      callbackData: EmailCallbackRequest
    ): Promise<EmailCallbackResponse> => {
      return await sdk._makeRequest(`/api/email/v1/callback/${provider}`, {
        method: "POST",
        body: JSON.stringify(callbackData),
      });
    },

    /**
     * Disconnect email provider
     */
    disconnectEmailProvider: async (
      provider: string
    ): Promise<EmailDisconnectResponse> => {
      return await sdk._makeRequest(`/api/email/v1/disconnect/${provider}`, {
        method: "DELETE",
      });
    },

    /**
     * Send single email
     */
    sendEmail: async (
      emailData: EmailSendRequest
    ): Promise<EmailSendResponse> => {
      return await sdk._makeRequest("/api/email/v1/send", {
        method: "POST",
        body: JSON.stringify(emailData),
      });
    },

    /**
     * Queue email for later sending
     */
    queueEmail: async (
      emailData: EmailQueueRequest
    ): Promise<EmailQueueResponse> => {
      return await sdk._makeRequest("/api/email/v1/queue", {
        method: "POST",
        body: JSON.stringify(emailData),
      });
    },

    /**
     * Get email queue status
     */
    getEmailQueueStatus: async (): Promise<EmailQueueStatusResponse> => {
      return await sdk._makeRequest("/api/email/v1/queue/status", {
        method: "GET",
      });
    },

    /**
     * Update default email provider
     */
    setDefaultEmailProvider: async (
      providerData: EmailDefaultProviderRequest
    ): Promise<EmailDefaultProviderResponse> => {
      return await sdk._makeRequest("/api/email/v1/settings/default-provider", {
        method: "POST",
        body: JSON.stringify(providerData),
      });
    },

    /**
     * Get user's calendar connections
     */
    getCalendarConnections: async (): Promise<CalendarConnectionsResponse> => {
      return await sdk._makeRequest("/api/calendar/v1/connections", {
        method: "GET",
      });
    },

    /**
     * Initiate OAuth flow for calendar provider
     */
    connectCalendarProvider: async (
      provider: string,
      options?: CalendarConnectRequest
    ): Promise<CalendarConnectResponse> => {
      return await sdk._makeRequest(`/api/calendar/v1/connect/${provider}`, {
        method: "POST",
        body: JSON.stringify(options || {}),
      });
    },

    /**
     * Handle OAuth callback for calendar provider
     */
    handleCalendarProviderCallback: async (
      provider: string,
      callbackData: CalendarCallbackRequest
    ): Promise<CalendarCallbackResponse> => {
      return await sdk._makeRequest(`/api/calendar/v1/callback/${provider}`, {
        method: "POST",
        body: JSON.stringify(callbackData),
      });
    },

    /**
     * Disconnect calendar provider
     */
    disconnectCalendarProvider: async (
      provider: string
    ): Promise<CalendarDisconnectResponse> => {
      return await sdk._makeRequest(`/api/calendar/v1/disconnect/${provider}`, {
        method: "DELETE",
      });
    },

    /**
     * Get calendar events from provider
     */
    getCalendarEvents: async (
      provider: string,
      options: CalendarEventsOptions = {}
    ): Promise<CalendarEventsResponse> => {
      const searchParams = new URLSearchParams();

      if (options.timeMin) {
        searchParams.append("timeMin", options.timeMin);
      }
      if (options.timeMax) {
        searchParams.append("timeMax", options.timeMax);
      }
      if (options.maxResults) {
        searchParams.append("maxResults", options.maxResults.toString());
      }

      const queryString = searchParams.toString();
      const endpoint = `/api/calendar/v1/events/${provider}${
        queryString ? `?${queryString}` : ""
      }`;

      return await sdk._makeRequest(endpoint, {
        method: "GET",
      });
    },

    /**
     * Get webhook logs for debugging
     */
    getCalendarWebhookLogs: async (options?: {
      provider?: string;
      eventType?: string;
      limit?: number;
    }): Promise<WebhookLogsResponse> => {
      const searchParams = new URLSearchParams();

      if (options?.provider) {
        searchParams.append("provider", options.provider);
      }
      if (options?.eventType) {
        searchParams.append("eventType", options.eventType);
      }
      if (options?.limit) {
        searchParams.append("limit", options.limit.toString());
      }

      const queryString = searchParams.toString();
      const endpoint = `/api/calendar/v1/webhook-logs${
        queryString ? `?${queryString}` : ""
      }`;

      return await sdk._makeRequest(endpoint, {
        method: "GET",
      });
    },

    // Email Marketing Methods
    getEmailMarketingConnections:
      async (): Promise<EmailMarketingConnectionsResponse> => {
        return await sdk._makeRequest("/api/emailmarketing/v1/connections", {
          method: "GET",
        });
      },

    connectEmailMarketingProvider: async (
      provider: string,
      redirectBackTo?: string
    ): Promise<EmailMarketingConnectResponse> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/connect/${provider}`,
        {
          method: "POST",
          body: JSON.stringify({ redirectBackTo }),
        }
      );
    },

    handleEmailMarketingCallback: async (
      provider: string,
      callbackData: EmailMarketingCallbackRequest
    ): Promise<EmailMarketingCallbackResponse> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/callback/${provider}`,
        {
          method: "POST",
          body: JSON.stringify(callbackData),
        }
      );
    },

    disconnectEmailMarketingProvider: async (
      provider: string
    ): Promise<EmailMarketingDisconnectResponse> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/disconnect/${provider}`,
        {
          method: "DELETE",
        }
      );
    },

    setDefaultEmailMarketingProvider: async (
      provider?: string
    ): Promise<EmailMarketingDefaultProviderResponse> => {
      return await sdk._makeRequest(
        "/api/emailmarketing/v1/settings/default-provider",
        {
          method: "POST",
          body: JSON.stringify({ provider }),
        }
      );
    },

    // Email Marketing Audiences
    getEmailMarketingAudiences: async (
      provider: string,
      options?: {
        count?: number;
        offset?: number;
        fields?: string;
        exclude_fields?: string;
      }
    ): Promise<EmailMarketingAudiencesResponse> => {
      const searchParams = new URLSearchParams();
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }
      const queryString = searchParams.toString();
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}${
          queryString ? `?${queryString}` : ""
        }`,
        { method: "GET" }
      );
    },

    getEmailMarketingAudience: async (
      provider: string,
      audienceId: string
    ): Promise<EmailMarketingAudienceResponse> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}/${audienceId}`,
        { method: "GET" }
      );
    },

    createEmailMarketingAudience: async (
      provider: string,
      audienceData: any
    ): Promise<EmailMarketingAudienceResponse> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}`,
        {
          method: "POST",
          body: JSON.stringify(audienceData),
        }
      );
    },

    updateEmailMarketingAudience: async (
      provider: string,
      audienceId: string,
      updates: any
    ): Promise<EmailMarketingAudienceResponse> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}/${audienceId}`,
        {
          method: "PATCH",
          body: JSON.stringify(updates),
        }
      );
    },

    deleteEmailMarketingAudience: async (
      provider: string,
      audienceId: string
    ): Promise<{ success: boolean; message: string }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}/${audienceId}`,
        { method: "DELETE" }
      );
    },

    // Email Marketing Members
    getEmailMarketingMembers: async (
      provider: string,
      audienceId: string,
      options?: {
        count?: number;
        offset?: number;
        fields?: string;
        exclude_fields?: string;
        status?: string;
      }
    ): Promise<EmailMarketingMembersResponse> => {
      const searchParams = new URLSearchParams();
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }
      const queryString = searchParams.toString();
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members${
          queryString ? `?${queryString}` : ""
        }`,
        { method: "GET" }
      );
    },

    getEmailMarketingMember: async (
      provider: string,
      audienceId: string,
      email: string
    ): Promise<{ success: boolean; data: EmailMarketingMember }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members/${encodeURIComponent(
          email
        )}`,
        { method: "GET" }
      );
    },

    upsertEmailMarketingMember: async (
      provider: string,
      audienceId: string,
      memberData: any
    ): Promise<{
      success: boolean;
      data: EmailMarketingMember;
      message: string;
    }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members`,
        {
          method: "PUT",
          body: JSON.stringify(memberData),
        }
      );
    },

    updateEmailMarketingMember: async (
      provider: string,
      audienceId: string,
      email: string,
      updates: any
    ): Promise<{
      success: boolean;
      data: EmailMarketingMember;
      message: string;
    }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members/${encodeURIComponent(
          email
        )}`,
        {
          method: "PATCH",
          body: JSON.stringify(updates),
        }
      );
    },

    deleteEmailMarketingMember: async (
      provider: string,
      audienceId: string,
      email: string
    ): Promise<{ success: boolean; message: string }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members/${encodeURIComponent(
          email
        )}`,
        { method: "DELETE" }
      );
    },

    // Email Marketing Campaigns
    getEmailMarketingCampaigns: async (
      provider: string,
      options?: {
        count?: number;
        offset?: number;
        type?: string;
        status?: string;
        before_send_time?: string;
        since_send_time?: string;
      }
    ): Promise<EmailMarketingCampaignsResponse> => {
      const searchParams = new URLSearchParams();
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }
      const queryString = searchParams.toString();
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/campaigns/${provider}${
          queryString ? `?${queryString}` : ""
        }`,
        { method: "GET" }
      );
    },

    getEmailMarketingCampaign: async (
      provider: string,
      campaignId: string
    ): Promise<{ success: boolean; data: EmailMarketingCampaign }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/campaigns/${provider}/${campaignId}`,
        { method: "GET" }
      );
    },

    createEmailMarketingCampaign: async (
      provider: string,
      campaignData: any
    ): Promise<{
      success: boolean;
      data: EmailMarketingCampaign;
      message: string;
    }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/campaigns/${provider}`,
        {
          method: "POST",
          body: JSON.stringify(campaignData),
        }
      );
    },

    updateEmailMarketingCampaign: async (
      provider: string,
      campaignId: string,
      updates: any
    ): Promise<{
      success: boolean;
      data: EmailMarketingCampaign;
      message: string;
    }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/campaigns/${provider}/${campaignId}`,
        {
          method: "PATCH",
          body: JSON.stringify(updates),
        }
      );
    },

    deleteEmailMarketingCampaign: async (
      provider: string,
      campaignId: string
    ): Promise<{ success: boolean; message: string }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/campaigns/${provider}/${campaignId}`,
        { method: "DELETE" }
      );
    },

    sendEmailMarketingCampaign: async (
      provider: string,
      campaignId: string
    ): Promise<{ success: boolean; data: any; message: string }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/campaigns/${provider}/${campaignId}/send`,
        { method: "POST" }
      );
    },

    scheduleEmailMarketingCampaign: async (
      provider: string,
      campaignId: string,
      scheduleTime: string
    ): Promise<{ success: boolean; data: any; message: string }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/campaigns/${provider}/${campaignId}/schedule`,
        {
          method: "POST",
          body: JSON.stringify({ schedule_time: scheduleTime }),
        }
      );
    },

    // Email Marketing Templates
    getEmailMarketingTemplates: async (
      provider: string,
      options?: {
        count?: number;
        offset?: number;
        type?: string;
        category?: string;
        folder_id?: string;
      }
    ): Promise<EmailMarketingTemplatesResponse> => {
      const searchParams = new URLSearchParams();
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }
      const queryString = searchParams.toString();
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/templates/${provider}${
          queryString ? `?${queryString}` : ""
        }`,
        { method: "GET" }
      );
    },

    getEmailMarketingTemplate: async (
      provider: string,
      templateId: string
    ): Promise<{ success: boolean; data: EmailMarketingTemplate }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/templates/${provider}/${templateId}`,
        { method: "GET" }
      );
    },

    createEmailMarketingTemplate: async (
      provider: string,
      templateData: any
    ): Promise<{
      success: boolean;
      data: EmailMarketingTemplate;
      message: string;
    }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/templates/${provider}`,
        {
          method: "POST",
          body: JSON.stringify(templateData),
        }
      );
    },

    // Email Marketing Automations
    getEmailMarketingAutomations: async (
      provider: string,
      options?: {
        count?: number;
        offset?: number;
        status?: string;
        before_create_time?: string;
        since_create_time?: string;
      }
    ): Promise<EmailMarketingAutomationsResponse> => {
      const searchParams = new URLSearchParams();
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }
      const queryString = searchParams.toString();
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/automations/${provider}${
          queryString ? `?${queryString}` : ""
        }`,
        { method: "GET" }
      );
    },

    getEmailMarketingAutomation: async (
      provider: string,
      automationId: string
    ): Promise<{ success: boolean; data: EmailMarketingAutomation }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/automations/${provider}/${automationId}`,
        { method: "GET" }
      );
    },

    // Email Marketing Reports
    getEmailMarketingReports: async (
      provider: string,
      options?: {
        count?: number;
        offset?: number;
        type?: string;
        before_send_time?: string;
        since_send_time?: string;
      }
    ): Promise<EmailMarketingReportsResponse> => {
      const searchParams = new URLSearchParams();
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, value.toString());
          }
        });
      }
      const queryString = searchParams.toString();
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/reports/${provider}${
          queryString ? `?${queryString}` : ""
        }`,
        { method: "GET" }
      );
    },

    getEmailMarketingReport: async (
      provider: string,
      campaignId: string
    ): Promise<{ success: boolean; data: EmailMarketingReport }> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/reports/${provider}/${campaignId}`,
        { method: "GET" }
      );
    },

    // Email Marketing Advanced Analytics & Reporting
    getEmailMarketingCampaignClickDetails: async (
      provider: string,
      campaignId: string,
      options?: {
        count?: number;
        offset?: number;
        fields?: string;
        exclude_fields?: string;
      }
    ): Promise<EmailMarketingClickDetailsResponse> => {
      const params = new VCEURLSearchParams();
      if (options?.count) params.append("count", options.count.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.fields) params.append("fields", options.fields);
      if (options?.exclude_fields)
        params.append("exclude_fields", options.exclude_fields);

      const url = `/api/emailmarketing/v1/reports/${provider}/${campaignId}/click-details${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      return await sdk._makeRequest(url, { method: "GET" });
    },

    getEmailMarketingCampaignOpenDetails: async (
      provider: string,
      campaignId: string,
      options?: {
        count?: number;
        offset?: number;
        fields?: string;
        exclude_fields?: string;
        since?: string;
      }
    ): Promise<EmailMarketingOpenDetailsResponse> => {
      const params = new VCEURLSearchParams();
      if (options?.count) params.append("count", options.count.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.fields) params.append("fields", options.fields);
      if (options?.exclude_fields)
        params.append("exclude_fields", options.exclude_fields);
      if (options?.since) params.append("since", options.since);

      const url = `/api/emailmarketing/v1/reports/${provider}/${campaignId}/open-details${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      return await sdk._makeRequest(url, { method: "GET" });
    },

    getEmailMarketingCampaignUnsubscribes: async (
      provider: string,
      campaignId: string,
      options?: {
        count?: number;
        offset?: number;
        fields?: string;
        exclude_fields?: string;
      }
    ): Promise<EmailMarketingUnsubscribesResponse> => {
      const params = new VCEURLSearchParams();
      if (options?.count) params.append("count", options.count.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.fields) params.append("fields", options.fields);
      if (options?.exclude_fields)
        params.append("exclude_fields", options.exclude_fields);

      const url = `/api/emailmarketing/v1/reports/${provider}/${campaignId}/unsubscribes${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      return await sdk._makeRequest(url, { method: "GET" });
    },

    getEmailMarketingCampaignAbuseReports: async (
      provider: string,
      campaignId: string,
      options?: {
        count?: number;
        offset?: number;
        fields?: string;
        exclude_fields?: string;
      }
    ): Promise<EmailMarketingAbuseReportsResponse> => {
      const params = new VCEURLSearchParams();
      if (options?.count) params.append("count", options.count.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.fields) params.append("fields", options.fields);
      if (options?.exclude_fields)
        params.append("exclude_fields", options.exclude_fields);

      const url = `/api/emailmarketing/v1/reports/${provider}/${campaignId}/abuse-reports${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      return await sdk._makeRequest(url, { method: "GET" });
    },

    // Email Marketing Member Activity & Engagement
    getEmailMarketingMemberActivity: async (
      provider: string,
      audienceId: string,
      email: string,
      options?: {
        count?: number;
        offset?: number;
        fields?: string;
        exclude_fields?: string;
      }
    ): Promise<EmailMarketingMemberActivityResponse> => {
      const params = new VCEURLSearchParams();
      if (options?.count) params.append("count", options.count.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.fields) params.append("fields", options.fields);
      if (options?.exclude_fields)
        params.append("exclude_fields", options.exclude_fields);

      const encodedEmail = encodeURIComponent(email);
      const url = `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members/${encodedEmail}/activity${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      return await sdk._makeRequest(url, { method: "GET" });
    },

    getEmailMarketingMemberEvents: async (
      provider: string,
      audienceId: string,
      email: string,
      options?: {
        count?: number;
        offset?: number;
      }
    ): Promise<EmailMarketingMemberEventsResponse> => {
      const params = new VCEURLSearchParams();
      if (options?.count) params.append("count", options.count.toString());
      if (options?.offset) params.append("offset", options.offset.toString());

      const encodedEmail = encodeURIComponent(email);
      const url = `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members/${encodedEmail}/events${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      return await sdk._makeRequest(url, { method: "GET" });
    },

    getEmailMarketingMemberNotes: async (
      provider: string,
      audienceId: string,
      email: string,
      options?: {
        count?: number;
        offset?: number;
        fields?: string;
        exclude_fields?: string;
      }
    ): Promise<EmailMarketingMemberNotesResponse> => {
      const params = new VCEURLSearchParams();
      if (options?.count) params.append("count", options.count.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.fields) params.append("fields", options.fields);
      if (options?.exclude_fields)
        params.append("exclude_fields", options.exclude_fields);

      const encodedEmail = encodeURIComponent(email);
      const url = `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members/${encodedEmail}/notes${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      return await sdk._makeRequest(url, { method: "GET" });
    },

    addEmailMarketingMemberNote: async (
      provider: string,
      audienceId: string,
      email: string,
      noteData: { note: string; [key: string]: any }
    ): Promise<EmailMarketingMemberNoteCreateResponse> => {
      const encodedEmail = encodeURIComponent(email);
      const url = `/api/emailmarketing/v1/audiences/${provider}/${audienceId}/members/${encodedEmail}/notes`;
      return await sdk._makeRequest(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
    },

    // Email Marketing Campaign Validation
    getEmailMarketingCampaignSendChecklist: async (
      provider: string,
      campaignId: string
    ): Promise<EmailMarketingCampaignSendChecklistResponse> => {
      return await sdk._makeRequest(
        `/api/emailmarketing/v1/campaigns/${provider}/${campaignId}/send-checklist`,
        { method: "GET" }
      );
    },

    // =============================================================================
    // OAUTH (GOOGLE, MICROSOFT, APPLE)
    // =============================================================================

    /**
     * Initiate OAuth flow for a provider (Google, Microsoft, Apple)
     */
    initiateOAuth: async (
      provider: string,
      options?: OAuthInitiateRequest
    ): Promise<OAuthInitiateResponse> => {
      return await sdk._makeRequest(`/api/auth/v1/oauth/${provider}/initiate`, {
        method: "POST",
        body: JSON.stringify(options || {}),
      });
    },

    /**
     * Handle OAuth callback (GET)
     */
    handleOAuthCallback: async (
      provider: string,
      callbackData: OAuthCallbackRequest
    ): Promise<OAuthCallbackResponse> => {
      const params = new URLSearchParams();
      params.append("code", callbackData.code);
      params.append("state", callbackData.state);
      if (callbackData.error) params.append("error", callbackData.error);
      if (callbackData.referral_code) {
        params.append("referral_code", callbackData.referral_code);
      }
      if (callbackData.role) {
        params.append("role", callbackData.role);
      }

      const response = await sdk._makeRequest(
        `/api/auth/v1/oauth/${provider}/callback?${params.toString()}`,
        { method: "GET" }
      );

      // Store access token if session is returned
      if (response.session?.access_token) {
        sdk.setAccessToken(response.session.access_token);
      }

      return response;
    },

    /**
     * Handle OAuth callback (POST - for Apple)
     */
    handleOAuthCallbackPost: async (
      provider: string,
      callbackData: OAuthCallbackRequest
    ): Promise<OAuthCallbackResponse> => {
      const response = await sdk._makeRequest(
        `/api/auth/v1/oauth/${provider}/callback`,
        {
          method: "POST",
          body: JSON.stringify(callbackData),
        }
      );

      // Store access token if session is returned
      if (response.session?.access_token) {
        sdk.setAccessToken(response.session.access_token);
      }

      return response;
    },

    /**
     * Check OAuth connection status
     */
    getOAuthStatus: async (provider: string): Promise<OAuthStatusResponse> => {
      return await sdk._makeRequest(`/api/auth/v1/oauth/${provider}/status`, {
        method: "GET",
      });
    },

    /**
     * Disconnect OAuth provider
     */
    disconnectOAuth: async (
      provider: string
    ): Promise<OAuthDisconnectResponse> => {
      return await sdk._makeRequest(
        `/api/auth/v1/oauth/${provider}/disconnect`,
        { method: "DELETE" }
      );
    },

    // =============================================================================
    // PERSONAL ACCESS TOKENS (API Keys)
    // =============================================================================

    /**
     * Generate a new Personal Access Token
     */
    generatePAT: async (
      request: PATGenerateRequest
    ): Promise<PATGenerateResponse> => {
      return await sdk._makeRequest(`/api/auth/v1/pat/generate`, {
        method: "POST",
        body: JSON.stringify(request),
      });
    },

    /**
     * List all Personal Access Tokens for the authenticated user
     */
    listPATs: async (): Promise<PATListResponse> => {
      return await sdk._makeRequest(`/api/auth/v1/pat/list`, {
        method: "GET",
      });
    },

    /**
     * Regenerate a Personal Access Token
     */
    regeneratePAT: async (id: number): Promise<PATRegenerateResponse> => {
      return await sdk._makeRequest(`/api/auth/v1/pat/${id}/regenerate`, {
        method: "PUT",
      });
    },

    /**
     * Revoke (delete) a Personal Access Token
     */
    revokePAT: async (id: number): Promise<PATRevokeResponse> => {
      return await sdk._makeRequest(`/api/auth/v1/pat/${id}`, {
        method: "DELETE",
      });
    },

    // =============================================================================
    // GOOGLE DRIVE
    // =============================================================================

    /**
     * Initiate Google Drive OAuth flow
     */
    connectGoogleDrive: async (): Promise<GoogleDriveConnectResponse> => {
      return await sdk._makeRequest(`/api/storage/v1/googledrive/connect`, {
        method: "POST",
      });
    },

    /**
     * Handle Google Drive OAuth callback
     */
    handleGoogleDriveCallback: async (callbackData: {
      code: string;
      state: string;
      error?: string;
    }): Promise<GoogleDriveCallbackResponse> => {
      const params = new URLSearchParams();
      params.append("code", callbackData.code);
      params.append("state", callbackData.state);
      if (callbackData.error) params.append("error", callbackData.error);

      return await sdk._makeRequest(
        `/api/storage/v1/googledrive/callback?${params.toString()}`,
        { method: "GET" }
      );
    },

    /**
     * Check Google Drive connection status
     */
    getGoogleDriveStatus: async (): Promise<GoogleDriveStatusResponse> => {
      return await sdk._makeRequest(`/api/storage/v1/googledrive/status`, {
        method: "GET",
      });
    },

    /**
     * Upload file to Google Drive
     */
    uploadToGoogleDrive: async (
      request: GoogleDriveUploadRequest
    ): Promise<GoogleDriveUploadResponse> => {
      const formData = new FormData();
      formData.append("file", request.file);
      if (request.subFolder) {
        formData.append("subFolder", request.subFolder);
      }

      return await sdk._makeRequest(`/api/storage/v1/googledrive/upload`, {
        method: "POST",
        body: formData,
      });
    },

    /**
     * Download file from Google Drive
     */
    downloadFromGoogleDrive: async (fileId: string): Promise<Blob> => {
      const response = await fetch(
        `${client.baseUrl}/api/storage/v1/googledrive/download/${fileId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            apikey: client.apiKey,
            ...(client.accessToken
              ? { Authorization: `Bearer ${client.accessToken}` }
              : {}),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Unknown error",
        }));
        throw errorData;
      }

      return await response.blob();
    },

    /**
     * Delete file from Google Drive
     */
    deleteFromGoogleDrive: async (
      fileId: string
    ): Promise<{ success: boolean; message: string }> => {
      return await sdk._makeRequest(
        `/api/storage/v1/googledrive/delete/${fileId}`,
        { method: "DELETE" }
      );
    },

    /**
     * Share or unshare file in Google Drive
     */
    shareGoogleDriveFile: async (
      fileId: string,
      request: GoogleDriveShareRequest
    ): Promise<GoogleDriveShareResponse> => {
      return await sdk._makeRequest(
        `/api/storage/v1/googledrive/share/${fileId}`,
        {
          method: "POST",
          body: JSON.stringify(request),
        }
      );
    },

    /**
     * List folders in Google Drive
     */
    listGoogleDriveFolders: async (): Promise<GoogleDriveFoldersResponse> => {
      return await sdk._makeRequest(`/api/storage/v1/googledrive/folders`, {
        method: "GET",
      });
    },

    /**
     * Disconnect Google Drive account
     */
    disconnectGoogleDrive: async (): Promise<GoogleDriveDisconnectResponse> => {
      return await sdk._makeRequest(`/api/storage/v1/googledrive/disconnect`, {
        method: "DELETE",
      });
    },

    // =============================================================================
    // LLM SERVICES
    // =============================================================================

    /**
     * Chat completion using LLM adapter
     */
    chatLLM: async (request: LLMChatRequest): Promise<LLMChatResponse> => {
      return await sdk._makeRequest(`/api/llm/v1/chat`, {
        method: "POST",
        body: JSON.stringify(request),
      });
    },

    /**
     * Transcribe audio using LLM adapter
     */
    transcribeAudio: async (
      request: LLMTranscribeRequest
    ): Promise<LLMTranscribeResponse> => {
      const formData = new FormData();
      formData.append("audio", request.audio);
      if (request.provider) formData.append("provider", request.provider);
      if (request.model) formData.append("model", request.model);
      if (request.temperature !== undefined)
        formData.append("temperature", request.temperature.toString());

      return await sdk._makeRequest(`/api/llm/v1/audio/transcribe`, {
        method: "POST",
        body: formData,
      });
    },

    /**
     * Translate audio using LLM adapter
     */
    translateAudio: async (
      request: LLMTranslateRequest
    ): Promise<LLMTranslateResponse> => {
      const formData = new FormData();
      formData.append("audio", request.audio);
      if (request.provider) formData.append("provider", request.provider);
      if (request.model) formData.append("model", request.model);
      if (request.temperature !== undefined)
        formData.append("temperature", request.temperature.toString());

      return await sdk._makeRequest(`/api/llm/v1/audio/translate`, {
        method: "POST",
        body: formData,
      });
    },

    /**
     * Text-to-speech using LLM adapter
     */
    textToSpeech: async (request: LLMTTSRequest): Promise<Blob> => {
      const response = await fetch(`${client.baseUrl}/api/llm/v1/audio/tts`, {
        method: "POST",
        credentials: "include",
        headers: {
          apikey: client.apiKey,
          "Content-Type": "application/json",
          ...(client.accessToken
            ? { Authorization: `Bearer ${client.accessToken}` }
            : {}),
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Unknown error",
        }));
        throw errorData;
      }

      return await response.blob();
    },

    // =============================================================================
    // POLICY MANAGEMENT (ROLE-BASED ACCESS CONTROL)
    // =============================================================================

    /**
     * Get all policies
     */
    getPolicies: async (): Promise<PolicyResponse> => {
      return await sdk._makeRequest(`/api/policy/v1/policies`, {
        method: "GET",
      });
    },

    /**
     * Get policy for specific role
     */
    getPolicy: async (role: string): Promise<PolicyResponse> => {
      return await sdk._makeRequest(`/api/policy/v1/policies/${role}`, {
        method: "GET",
      });
    },

    /**
     * Create or update policy for a role
     */
    setPolicy: async (request: PolicyRequest): Promise<PolicyResponse> => {
      return await sdk._makeRequest(`/api/policy/v1/policies`, {
        method: "POST",
        body: JSON.stringify(request),
      });
    },

    /**
     * Update policy for specific role
     */
    updatePolicy: async (
      role: string,
      permissions: PolicyPermissions | string
    ): Promise<PolicyResponse> => {
      return await sdk._makeRequest(`/api/policy/v1/policies/${role}`, {
        method: "PUT",
        body: JSON.stringify({ permissions }),
      });
    },

    /**
     * Delete policy for specific role
     */
    deletePolicy: async (role: string): Promise<PolicyResponse> => {
      return await sdk._makeRequest(`/api/policy/v1/policies/${role}`, {
        method: "DELETE",
      });
    },

    /**
     * Get all unique roles that have policies
     */
    getPolicyRoles: async (): Promise<PolicyResponse> => {
      return await sdk._makeRequest(`/api/policy/v1/roles`, {
        method: "GET",
      });
    },

    /**
     * Validate permission JSON structure without saving
     */
    validatePolicy: async (
      request: PolicyValidateRequest
    ): Promise<PolicyValidateResponse> => {
      return await sdk._makeRequest(`/api/policy/v1/validate`, {
        method: "POST",
        body: JSON.stringify(request),
      });
    },

    // =============================================================================
    // HEALTH CHECK
    // =============================================================================

    /**
     * Check API health status
     */
    healthCheck: async (): Promise<HealthCheckResponse> => {
      const response = await fetch(`${client.baseUrl}/api/health`, {
        method: "GET",
        credentials: "include",
        headers: {
          apikey: client.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
      }

      const text = await response.text();
      return { status: text };
    },
  };

  return sdk;
};

// Export for ES modules
export { createVCESDK };
export type {
  VCEClient,
  VCESDK,
  User,
  Session,
  SignUpResponse,
  SignInResponse,
  DatabaseRow,
  FetchRowsOptions,
  FilterCondition,
  OrderCondition,
  RealtimePayload,
  RealtimeChannel,
  SignUpOptions,
  OpenRouterMessage,
  OpenRouterResponse,
  // Email Marketing types
  EmailMarketingProvider,
  EmailMarketingConnectionStats,
  EmailMarketingConnectionsResponse,
  EmailMarketingConnectResponse,
  EmailMarketingCallbackRequest,
  EmailMarketingCallbackResponse,
  EmailMarketingDisconnectResponse,
  EmailMarketingDefaultProviderResponse,
  EmailMarketingAudience,
  EmailMarketingAudienceResponse,
  EmailMarketingAudiencesResponse,
  EmailMarketingMember,
  EmailMarketingMembersResponse,
  EmailMarketingCampaign,
  EmailMarketingCampaignsResponse,
  EmailMarketingTemplate,
  EmailMarketingTemplatesResponse,
  EmailMarketingAutomation,
  EmailMarketingAutomationsResponse,
  EmailMarketingReport,
  EmailMarketingReportsResponse,
  EmailMarketingClickDetail,
  EmailMarketingClickDetailsResponse,
  EmailMarketingOpenDetail,
  EmailMarketingOpenDetailsResponse,
  EmailMarketingUnsubscribe,
  EmailMarketingUnsubscribesResponse,
  EmailMarketingAbuseReport,
  EmailMarketingAbuseReportsResponse,
  EmailMarketingMemberActivity,
  EmailMarketingMemberActivityResponse,
  EmailMarketingMemberEvent,
  EmailMarketingMemberEventsResponse,
  EmailMarketingMemberNote,
  EmailMarketingMemberNotesResponse,
  EmailMarketingMemberNoteCreateResponse,
  EmailMarketingCampaignSendChecklistItem,
  EmailMarketingCampaignSendChecklistResponse,
  // Stripe types
  StripeCustomer,
  StripeInvoiceItem,
  StripeInvoiceData,
  StripeInvoice,
  StripeConnectionResponse,
  StripeConnectResponse,
  StripeConnectCallbackResponse,
  StripeDisconnectResponse,
  StripeInvoiceResponse,
  StripeInvoicesListResponse,
  StripeMetricsResponse,
  StripePdfResponse,
  StripeReferralEarning,
  StripeReferralEarningsResponse,
  StripeReferralPayoutResponse,
  StripeReferralPayoutError,
  StripeAccountVerificationDetails,
  // Email types
  EmailConnection,
  EmailConnectionsResponse,
  EmailConnectRequest,
  EmailConnectResponse,
  EmailCallbackRequest,
  EmailCallbackResponse,
  EmailDisconnectResponse,
  EmailSendRequest,
  EmailSendResponse,
  EmailQueueRequest,
  EmailQueueResponse,
  EmailQueueStatusResponse,
  EmailDefaultProviderRequest,
  EmailDefaultProviderResponse,
  // Calendar types
  CalendarConnection,
  CalendarConnectionsResponse,
  CalendarConnectRequest,
  CalendarConnectResponse,
  CalendarCallbackRequest,
  CalendarCallbackResponse,
  CalendarDisconnectResponse,
  CalendarEvent,
  CalendarEventsResponse,
  CalendarEventsOptions,
  WebhookLogsResponse,
  // OAuth types
  OAuthInitiateRequest,
  OAuthInitiateResponse,
  OAuthCallbackRequest,
  OAuthCallbackResponse,
  OAuthStatusResponse,
  OAuthDisconnectResponse,
  // Personal Access Token types
  PersonalAccessToken,
  PATGenerateRequest,
  PATGenerateResponse,
  PATListResponse,
  PATRegenerateResponse,
  PATRevokeResponse,
  // Google Drive types
  GoogleDriveConnectResponse,
  GoogleDriveCallbackResponse,
  GoogleDriveStatusResponse,
  GoogleDriveUploadRequest,
  GoogleDriveUploadResponse,
  GoogleDriveShareRequest,
  GoogleDriveShareResponse,
  GoogleDriveFolder,
  GoogleDriveFoldersResponse,
  GoogleDriveDisconnectResponse,
  // LLM types
  LLMChatMessage,
  LLMChatRequest,
  LLMChatResponse,
  LLMTranscribeRequest,
  LLMTranscribeResponse,
  LLMTranslateRequest,
  LLMTranslateResponse,
  LLMTTSRequest,
  // Policy types
  PolicyPermissions,
  Policy,
  PolicyResponse,
  PolicyRequest,
  PolicyValidateRequest,
  PolicyValidateResponse,
  // Health check types
  HealthCheckResponse,
};

// Re-export query builder types and helpers for convenience
export type {
  QueryBuilder,
  QueryExecutionOptions,
  QueryExecutionResult,
  QueryValidationResult,
  TableReference,
  ColumnReference,
  SelectExpression,
  WhereCondition,
  JoinClause,
  CTEDefinition,
  WindowFunction,
  CaseWhen,
  CaseExpression,
  AggregateFunction,
  DateFunction,
  OrderByClause,
  HavingCondition,
  JoinCondition,
} from "./QueryBuilder";

export { QueryBuilders } from "./QueryBuilder";

// Make available on window for browser usage
declare global {
  interface Window {
    createVCESDK: typeof createVCESDK;
  }
}

if (typeof window !== "undefined") {
  window.createVCESDK = createVCESDK;
}
