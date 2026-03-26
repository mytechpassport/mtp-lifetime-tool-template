import { useEffect, useState, type ReactNode } from "react";
import type { User as VCEUser } from "@/lib/VCESDK";
import vce from "@/lib/vce";
import { toast } from "sonner";
import { TokenManager } from "@/utils/tokenManager";
import { ErrorHandler } from "@/utils/errorHandler";
import { AuthContext } from "./AuthContext";

export type UserRole = "user" | "vendor";

const normalizeBoolean = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    return value === "1" || value.toLowerCase() === "true";
  }
  return false;
};

const normalizeUserRole = (value: unknown): UserRole =>
  value === "vendor" ? "vendor" : "user";

const getDisplayName = (serverUser: VCEUser) => {
  const metaName = serverUser.user_meta?.name?.trim();
  if (metaName) return metaName;

  const topLevelName =
    typeof serverUser.name === "string" ? serverUser.name.trim() : "";
  if (topLevelName) return topLevelName;

  return serverUser.email.split("@")[0];
};

export interface User extends Omit<VCEUser, "role" | "name"> {
  role: UserRole;
  name: string;
  onboarded: boolean;
  companyName?: string | null;
  companyDescription?: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    referralCode?: string,
  ) => Promise<void>;
  oauthLogin: (
    provider: "google" | "microsoft" | "apple",
    referralCode?: string,
    redirectPath?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const mapServerUserToAuthUser = (serverUser: VCEUser): User => {
  const role = normalizeUserRole(serverUser.role ?? serverUser.user_meta?.role);
  const onboarded = normalizeBoolean(serverUser.user_meta?.onboarded);

  return {
    ...serverUser,
    id: Number(serverUser.id),
    role,
    name: getDisplayName(serverUser),
    onboarded,
    companyName: serverUser.user_meta?.company_name ?? null,
    companyDescription: serverUser.user_meta?.company_description ?? null,
    user_meta: serverUser.user_meta ?? null,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAuthenticatedUser = async () => {
    const currentUser = await vce.getUser();
    if (!currentUser) {
      setUser(null);
      return null;
    }

    const mappedUser = mapServerUserToAuthUser(currentUser);
    setUser(mappedUser);
    return mappedUser;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        TokenManager.initialize();

        try {
          const authenticatedUser = await loadAuthenticatedUser();
          if (authenticatedUser) {
            const hasLocalToken = TokenManager.getAccessToken();
            if (!hasLocalToken) {
              console.log("Authenticated via cookie (mtp_auth_token)");
            }
          } else {
            TokenManager.clearTokens();
          }
        } catch (error: unknown) {
          if (
            typeof error === "object" &&
            error !== null &&
            ("status" in error || "message" in error)
          ) {
            const authError = error as { status?: number; message?: string };
            if (
              authError.status === 401 ||
              authError.message?.includes("401")
            ) {
              TokenManager.clearTokens();
            } else {
              console.error("Auth check failed (non-401):", error);
            }
          } else {
            console.error("Auth check failed:", error);
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      const response = await vce.signIn(email, password);

      if (!response.session?.access_token) {
        throw new Error("Authentication failed");
      }

      TokenManager.storeTokens(
        response.session.access_token,
        response.session.refresh_token,
        response.session.expires_in,
      );

      const hydratedUser = await loadAuthenticatedUser();
      toast.success(`Welcome back ${hydratedUser?.name ?? email}!`);
    } catch (error) {
      ErrorHandler.logError(error, "login");
      ErrorHandler.handleApiError(error);
      throw error;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    referralCode?: string,
  ) => {
    try {
      const signupData: Record<string, string> = {
        name,
        role,
      };

      if (role === "user" && referralCode) {
        signupData.referral_code = referralCode;
      }

      const response = await vce.signUp(email, password, { data: signupData });

      if (!response.session?.access_token) {
        throw new Error("Account creation failed");
      }

      TokenManager.storeTokens(
        response.session.access_token,
        response.session.refresh_token,
        response.session.expires_in,
      );

      await loadAuthenticatedUser();

      toast.success("Account created successfully!");
    } catch (error) {
      ErrorHandler.logError(error, "signup");
      ErrorHandler.handleApiError(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await vce.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      TokenManager.clearTokens();
      toast.success("Logged out successfully");
    }
  };

  const oauthLogin = async (
    provider: "google" | "microsoft" | "apple",
    referralCode?: string,
    redirectPath?: string,
  ) => {
    try {
      const externalRedirectUrl = `${window.location.origin}/dashboard`;
      const stateObject = {
        role: "user",
        referralCode: referralCode || undefined,
        redirectPath: redirectPath || undefined,
        externalRedirectUrl,
        timestamp: Date.now(),
      };

      const oauthResponse = await vce.initiateOAuth(provider, {
        state: JSON.stringify(stateObject),
      });

      if (!oauthResponse.authorization_url) {
        throw new Error("Failed to initiate OAuth flow");
      }

      window.location.href = oauthResponse.authorization_url;
    } catch (error) {
      ErrorHandler.logError(error, "OAuth login");
      ErrorHandler.handleApiError(error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      await loadAuthenticatedUser();
    } catch (error) {
      console.error("Refresh user error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        oauthLogin,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
