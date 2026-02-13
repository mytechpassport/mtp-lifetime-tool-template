/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ReactNode } from "react";
import vce from "@/lib/vce";
import { toast } from "sonner";
import { TokenManager } from "@/utils/tokenManager";
import { ErrorHandler } from "@/utils/errorHandler";
import { AuthContext } from "./AuthContext";

export type UserRole = "user" | "vendor";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  companyName?: string;
  companyDescription?: string;
  onboarded: boolean;
  credits?: number;
  isFirstCreditPurchase?: boolean;
  purchasedTools?: string[];
  purchasedBundles?: string[];
  created_at?: string;
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
  updateUser: (updates: Partial<User>) => Promise<void>;
  updateCredits: (amount: number) => void;
  purchaseTool: (toolId: string, cost?: number) => void;
  purchaseBundle: (bundleId: string) => void;
  refreshUser: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize token manager
        TokenManager.initialize();

        // Try to get current user from backend (cookie-based auth takes precedence)
        // The backend will authenticate via cookie (mtp_auth_token) or Bearer token
        try {
          const currentUser = await vce.getUser();
          if (currentUser) {
            // User is authenticated (either via cookie or localStorage token)
            const mappedUser: User = {
              id: currentUser.id,
              email: currentUser.email,
              role: (currentUser.role as UserRole) || "user",
              name: currentUser.email.split("@")[0], // Fallback name
              onboarded: true, // Will be updated based on backend data
              created_at: currentUser.created_at,
            };
            setUser(mappedUser);

            // If we have a user but no localStorage token, the cookie is working
            // This is the expected behavior for cookie-based auth
            const hasLocalToken = TokenManager.getAccessToken();
            if (!hasLocalToken) {
              console.log("✅ Authenticated via cookie (mtp_auth_token)");
            }
          } else {
            // No user found, clear any stale tokens
            TokenManager.clearTokens();
          }
        } catch (error: any) {
          // If 401, user is not authenticated - clear tokens
          if (error?.status === 401 || error?.message?.includes("401")) {
            TokenManager.clearTokens();
          } else {
            // Other errors (network, etc.) - don't clear tokens yet
            console.error("Auth check failed (non-401):", error);
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

      if (response.session?.access_token) {
        // Store tokens (Bearer); backend also sets HttpOnly cookie for MTP cross-subdomain auth
        TokenManager.storeTokens(
          response.session.access_token,
          response.session.refresh_token,
          response.session.expires_in,
        );

        // Map backend user to frontend user interface
        const mappedUser: User = {
          id: response.user.id,
          email: response.user.email,
          role: (response.user.role as UserRole) || role,
          name: response.user.email.split("@")[0], // Fallback name
          onboarded: true, // Will be updated based on backend data
          created_at: response.user.created_at,
        };

        setUser(mappedUser);
        toast.success(`Welcome back ${mappedUser.name}!`);
      } else {
        throw new Error("Authentication failed");
      }
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

      // Only add referral code for user role
      if (role === "user" && referralCode) {
        signupData.referral_code = referralCode;
      }

      const response = await vce.signUp(email, password, { data: signupData });

      if (response.session?.access_token) {
        // Store tokens using TokenManager
        TokenManager.storeTokens(
          response.session.access_token,
          response.session.refresh_token,
          response.session.expires_in,
        );

        // Map backend user to frontend user interface
        const mappedUser: User = {
          id: response.user?.id,
          email,
          name,
          role,
          onboarded: false, // New users need onboarding
          created_at: response.user?.created_at,
          ...(role === "user" && {
            credits: 0,
            isFirstCreditPurchase: true,
            purchasedTools: [],
            purchasedBundles: [],
          }),
        };

        setUser(mappedUser);
        toast.success("Account created successfully!");
      } else {
        throw new Error("Account creation failed");
      }
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
      // Always clear local state regardless of backend response
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
      // Build the external redirect URL to redirect back to this tool after OAuth
      // Use window.location.origin so if the base URL changes, we don't need to update code
      const externalRedirectUrl = `${window.location.origin}/dashboard`;

      // Prepare complete state object with all necessary info (NO SESSION STORAGE)
      // Include externalRedirectUrl so MTP Main knows to redirect back to this tool
      const stateObject = {
        role: "user", // OAuth is only for users
        referralCode: referralCode || undefined,
        redirectPath: redirectPath || undefined,
        externalRedirectUrl, // MTP Main will redirect to this URL after auth
        timestamp: Date.now(),
      };

      // Initiate OAuth flow with state containing all necessary info including externalRedirectUrl
      const oauthResponse = await vce.initiateOAuth(provider, {
        state: JSON.stringify(stateObject),
      });

      if (oauthResponse.authorization_url) {
        // NO MORE SESSION STORAGE - everything is in state
        // Redirect to OAuth provider
        window.location.href = oauthResponse.authorization_url;
      } else {
        throw new Error("Failed to initiate OAuth flow");
      }
    } catch (error) {
      ErrorHandler.logError(error, "OAuth login");
      ErrorHandler.handleApiError(error);
      throw error;
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      // Update user data via backend APIs
      if (updates.name && updates.name !== user.name) {
        await vce.updateName(updates.name);
      }

      if (updates.email && updates.email !== user.email) {
        await vce.updateEmail(updates.email);
      }

      // Update local user state
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      toast.success("Profile updated successfully");
    } catch (error) {
      ErrorHandler.logError(error, "update user");
      ErrorHandler.handleApiError(error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await vce.getUser();
      if (currentUser) {
        const mappedUser: User = {
          id: currentUser.id,
          email: currentUser.email,
          role: (currentUser.role as UserRole) || "user",
          name: user?.name || currentUser.email.split("@")[0],
          onboarded: user?.onboarded || true,
          created_at: currentUser.created_at,
          // Preserve frontend-specific fields
          credits: user?.credits,
          isFirstCreditPurchase: user?.isFirstCreditPurchase,
          purchasedTools: user?.purchasedTools,
          purchasedBundles: user?.purchasedBundles,
        };
        setUser(mappedUser);
      }
    } catch (error) {
      console.error("Refresh user error:", error);
      // Don't throw error, just log it
    }
  };

  const updateCredits = (amount: number) => {
    if (user && user.role === "user") {
      const updatedUser = {
        ...user,
        credits: (user.credits || 0) + amount,
        isFirstCreditPurchase: false,
      };
      setUser(updatedUser);
      localStorage.setItem("mockUser", JSON.stringify(updatedUser));

      // Update in users list
      const usersKey = `mockUsers_${user.role}`;
      const users = JSON.parse(localStorage.getItem(usersKey) || "[]");
      const updatedUsers = users.map((u: User) =>
        u.id === user.id ? updatedUser : u,
      );
      localStorage.setItem(usersKey, JSON.stringify(updatedUsers));
    }
  };

  const purchaseTool = (toolId: string, cost?: number) => {
    if (
      user &&
      user.role === "user" &&
      !user.purchasedTools?.includes(toolId)
    ) {
      // Check if user has enough credits (if cost is provided)
      if (cost && (user.credits || 0) < cost) {
        throw new Error("Insufficient credits");
      }

      const updatedUser = {
        ...user,
        purchasedTools: [...(user.purchasedTools || []), toolId],
        ...(cost && { credits: (user.credits || 0) - cost }),
      };
      setUser(updatedUser);
      localStorage.setItem("mockUser", JSON.stringify(updatedUser));

      // Update in users list
      const usersKey = `mockUsers_${user.role}`;
      const users = JSON.parse(localStorage.getItem(usersKey) || "[]");
      const updatedUsers = users.map((u: User) =>
        u.id === user.id ? updatedUser : u,
      );
      localStorage.setItem(usersKey, JSON.stringify(updatedUsers));
    }
  };

  const purchaseBundle = (bundleId: string) => {
    if (
      user &&
      user.role === "user" &&
      !user.purchasedBundles?.includes(bundleId)
    ) {
      const updatedUser = {
        ...user,
        purchasedBundles: [...(user.purchasedBundles || []), bundleId],
      };
      setUser(updatedUser);
      localStorage.setItem("mockUser", JSON.stringify(updatedUser));

      // Update in users list
      const usersKey = `mockUsers_${user.role}`;
      const users = JSON.parse(localStorage.getItem(usersKey) || "[]");
      const updatedUsers = users.map((u: User) =>
        u.id === user.id ? updatedUser : u,
      );
      localStorage.setItem(usersKey, JSON.stringify(updatedUsers));
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
        updateUser,
        updateCredits,
        purchaseTool,
        purchaseBundle,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
