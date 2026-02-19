import vce from "@/lib/vce";
import { toast } from "sonner";

export class TokenManager {
  private static readonly ACCESS_TOKEN_KEY = "accessToken";
  private static readonly REFRESH_TOKEN_KEY = "refreshToken";
  private static readonly TOKEN_EXPIRY_KEY = "tokenExpiry";

  /**
   * Store tokens securely
   */
  static storeTokens(
    accessToken: string,
    refreshToken?: string,
    expiresIn?: number
  ) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);

    if (refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    if (expiresIn) {
      const expiryTime = Date.now() + expiresIn * 1000;
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
    }

    // Set token in VCE SDK
    vce.setAccessToken(accessToken);
  }

  /**
   * Get stored access token
   */
  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get stored refresh token
   */
  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(): boolean {
    const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiryTime) {
      return false; // If no expiry time, assume token is valid
    }

    return Date.now() > parseInt(expiryTime);
  }

  /**
   * Check if token will expire soon (within 5 minutes)
   */
  static isTokenExpiringSoon(): boolean {
    const expiryTime = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiryTime) {
      return false;
    }

    const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
    return parseInt(expiryTime) < fiveMinutesFromNow;
  }

  /**
   * Clear all stored tokens
   */
  static clearTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    vce.setAccessToken(null);
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      // Import vce here to avoid circular dependency
      const vce = (await import("@/lib/vce")).default;

      // Call refresh token endpoint
      const response = await vce.refreshToken(refreshToken);

      if (response.session?.access_token) {
        // Store new tokens
        this.storeTokens(
          response.session.access_token,
          response.session.refresh_token,
          response.session.expires_in
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  }

  /**
   * Validate current token by making a test API call
   * Note: This validates localStorage token. Cookie-based auth (mtp_auth_token)
   * is validated separately by the backend and doesn't require localStorage tokens.
   */
  static async validateToken(): Promise<boolean> {
    try {
      const token = this.getAccessToken();
      if (!token) {
        // No localStorage token - but cookie might still be valid
        // Try to get user to check if cookie auth is working
        try {
          await vce.getUser();
          // Cookie auth is working even without localStorage token
          return true;
        } catch {
          // Neither localStorage token nor cookie auth is working
          return false;
        }
      }

      // Try to get current user to validate token
      await vce.getUser();
      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  }

  /**
   * Handle token expiration
   * Called from VCESDK _makeRequest on 401. Avoid calling vce.getUser() when there is
   * no refresh token, or we get an infinite loop (getUser -> 401 -> handleTokenExpiration -> getUser -> 401 -> ...).
   */
  static async handleTokenExpiration(): Promise<void> {
    // Try to refresh token first
    const hadRefreshToken = !!this.getRefreshToken();
    const refreshed = await this.refreshAccessToken();

    if (!refreshed) {
      // Only check cookie auth if we had a refresh token that failed to refresh.
      // If we had no refresh token at all, we're already in "no credentials" state -
      // calling getUser() would get 401 again and cause handleTokenExpiration to run again (infinite loop).
      if (hadRefreshToken) {
        try {
          await vce.getUser();
          // Cookie auth is still valid - just clear localStorage tokens
          console.log("✅ Cookie auth still valid after localStorage token expiration");
          this.clearTokens();
          return;
        } catch {
          // Cookie auth also failed - fall through to clear + redirect
        }
      }

      // No valid auth: clear and redirect (or stay on auth page / OAuth callback page)
      const currentPath = window.location.pathname;
      const isAuthPage =
        currentPath.startsWith("/auth") ||
        currentPath.startsWith("/vendor/auth") ||
        currentPath.startsWith("/auth/vendor");
      // OAuth callback page: user is mid-flow (no session yet); don't redirect or show session expired
      const isThirdPartyCallbackPage =
        currentPath.startsWith("/third-party/") && currentPath.includes("/callback");
      // Public pages (e.g. video view by link) do not require login
      const isPublicPage = currentPath.startsWith("/public/");
      // Marketing (non-dashboard) pages should NOT redirect after clearing tokens
      const isDashboardPage = currentPath.startsWith("/dashboard");

      this.clearTokens();
      if (
        !isAuthPage &&
        !isThirdPartyCallbackPage &&
        !isPublicPage &&
        isDashboardPage // only redirect if on dashboard page
      ) {
        toast.error("Your session has expired. Please sign in again.");
        const isVendor = currentPath.startsWith("/vendor");
        const authPath = isVendor ? "/vendor/auth" : "/auth";
        window.location.href =
          authPath + "?redirect=" + encodeURIComponent(currentPath);
      }
    }
  }

  /**
   * Setup automatic token validation
   * Note: With cookie-based auth, this primarily maintains localStorage tokens
   * The cookie (mtp_auth_token) is managed by the browser and backend
   */
  static setupTokenValidation() {
    // Check token validity every 5 minutes
    setInterval(async () => {
      const token = this.getAccessToken();
      
      // If no localStorage token, check if cookie auth is working
      if (!token) {
        try {
          await vce.getUser();
          // Cookie auth is working - no action needed
          return;
        } catch {
          // Neither localStorage nor cookie auth is working
          // User will be redirected to login when they try to access protected resources
          return;
        }
      }

      if (this.isTokenExpired()) {
        await this.handleTokenExpiration();
        return;
      }

      if (this.isTokenExpiringSoon()) {
        const refreshed = await this.refreshAccessToken();
        if (!refreshed) {
          // Check if cookie auth is still working
          try {
            await vce.getUser();
            // Cookie auth is working - just clear localStorage tokens
            this.clearTokens();
          } catch {
            // Cookie auth also failed
            toast.warning(
              "Your session will expire soon. Please save your work."
            );
          }
        }
      }
    }, 5 * 60 * 1000); // 5 minutes
  }

  /**
   * Initialize token manager
   */
  static initialize() {
    const token = this.getAccessToken();
    if (token) {
      vce.setAccessToken(token);
    }

    this.setupTokenValidation();
  }
}
