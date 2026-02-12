import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export type CurrentUser = {
  id: number | string;
  email: string;
  role?: string;
  created_at?: string;
  name?: string;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get<ApiResponse<CurrentUser>>(
    "/vce/v1/user"
  );

  return response.data;
};
