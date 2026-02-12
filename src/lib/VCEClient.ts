/* eslint-disable @typescript-eslint/no-explicit-any */
// Type definitions
interface VCEClientConfig {
  baseUrl: string;
  apiKey: string;
}

interface RequestParams {
  [key: string]: string | number | boolean;
}

interface MatchFilter {
  [key: string]: string | number | boolean;
}

interface RequestOptions {
  body?: any;
  params?: RequestParams;
  match?: MatchFilter;
}

interface VCEResponse<T = any> {
  data: T;
  error: any;
}

interface TableOperations {
  select: (params?: RequestParams) => Promise<VCEResponse<any[]>>;
  insert: (rows: any | any[]) => Promise<VCEResponse<any[]>>;
  update: (updates: any, match: MatchFilter) => Promise<VCEResponse<any[]>>;
  delete: (match: MatchFilter) => Promise<VCEResponse<any[]>>;
}

interface VCEClient {
  baseUrl: string;
  apiKey: string;
  from: (table: string) => TableOperations;
}

export function createClient(baseUrl: string, apiKey: string): VCEClient {
  const defaultHeaders: Record<string, string> = {
    apikey: apiKey,
    "Content-Type": "application/json",
  };

  const request = async (
    method: "GET" | "POST" | "PATCH" | "DELETE",
    table: string,
    { body, params, match }: RequestOptions = {}
  ): Promise<VCEResponse> => {
    const url = new URL(`${baseUrl}/rest/v1/${table}`);

    // Add filters as query params
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    // Add match filter for update/delete
    if (match) {
      Object.entries(match).forEach(([key, value]) => {
        url.searchParams.append(key, `eq.${value}`);
      });
    }

    // Get access token from localStorage if available
    const accessToken = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {
      ...defaultHeaders,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const res = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    return { data, error: res.ok ? null : data };
  };

  return {
    baseUrl: baseUrl,
    apiKey: apiKey,
    from: (table: string): TableOperations => ({
      select: (params: RequestParams = {}): Promise<VCEResponse<any[]>> =>
        request("GET", table, { params: { select: "*", ...params } }),

      insert: (rows: any | any[]): Promise<VCEResponse<any[]>> =>
        request("POST", table, { body: rows }),

      update: (updates: any, match: MatchFilter): Promise<VCEResponse<any[]>> =>
        request("PATCH", table, { body: updates, match }),

      delete: (match: MatchFilter): Promise<VCEResponse<any[]>> =>
        request("DELETE", table, { match }),
    }),
  };
}

// Export types for use in other files
export type {
  VCEClient,
  VCEClientConfig,
  VCEResponse,
  TableOperations,
  RequestParams,
  MatchFilter,
};
