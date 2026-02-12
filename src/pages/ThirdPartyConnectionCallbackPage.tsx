import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";
import vce from "@/lib/vce";
import { TokenManager } from "@/utils/tokenManager";
import { useAuth } from "@/hooks/useAuth";

interface ConnectionState {
  namespace: string;
  userId: number;
  customState?: string;
}

interface ConnectionStatus {
  loading: boolean;
  success: boolean;
  error?: string;
  message?: string;
}

const ThirdPartyConnectionCallbackPage: React.FC = () => {
  const { thirdParty } = useParams<{ thirdParty: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  // Add ref to track if callback has been processed to prevent multiple calls
  const callbackProcessedRef = useRef(false);

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    loading: true,
    success: false,
  });

  const getThirdPartyDisplayName = useCallback((thirdParty: string): string => {
    switch (thirdParty.toLowerCase()) {
      case "google_oauth":
      case "google":
        return "Google";
      case "microsoft_oauth":
      case "microsoft":
        return "Microsoft";
      case "apple_oauth":
      case "apple":
        return "Apple";
      case "google_drive":
        return "Google Drive";
      case "stripe":
        return "Stripe";
      case "gmail":
        return "Gmail";
      case "outlook":
        return "Outlook";
      case "zoho":
        return "Zoho";
      case "google_calendar":
        return "Google Calendar";
      case "calendly":
        return "Calendly";
      case "mailchimp":
        return "Mailchimp";
      default:
        return thirdParty.charAt(0).toUpperCase() + thirdParty.slice(1);
    }
  }, []);

  const getSafeRedirectPath = useCallback((redirectPath?: string) => {
    if (!redirectPath) return "/dashboard";
    if (!redirectPath.startsWith("/") || redirectPath.startsWith("//")) {
      return "/dashboard";
    }
    return redirectPath;
  }, []);

  /**
   * Check if an external redirect URL is from a valid MTP domain.
   * Valid domains are:
   * - Same origin as current window
   * - Subdomains of the main MTP domain (e.g., *.mytechpassport.com for production)
   * - localhost (any port) for development
   */
  const isValidExternalRedirectUrl = useCallback((url: string): boolean => {
    try {
      const redirectUrl = new URL(url);
      const currentUrl = new URL(window.location.href);

      // For development: allow localhost with any port
      if (
        currentUrl.hostname === "localhost" ||
        currentUrl.hostname === "127.0.0.1"
      ) {
        return (
          redirectUrl.hostname === "localhost" ||
          redirectUrl.hostname === "127.0.0.1"
        );
      }

      // For production: extract the root domain (e.g., mytechpassport.com from www.mytechpassport.com)
      const getRootDomain = (hostname: string): string => {
        const parts = hostname.split(".");
        // Handle cases like localhost, IP addresses, or domains with 2+ parts
        if (parts.length >= 2) {
          // Return last 2 parts (e.g., mytechpassport.com)
          return parts.slice(-2).join(".");
        }
        return hostname;
      };

      const currentRootDomain = getRootDomain(currentUrl.hostname);
      const redirectRootDomain = getRootDomain(redirectUrl.hostname);

      // Check if both share the same root domain
      return currentRootDomain === redirectRootDomain;
    } catch (e) {
      console.error("Invalid external redirect URL:", url, e);
      return false;
    }
  }, []);

  const handleStripeCallback = useCallback(async () => {
    try {
      // Get URL parameters
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      // Handle OAuth errors
      if (error) {
        setConnectionStatus({
          loading: false,
          success: false,
          error: errorDescription || `OAuth error: ${error}`,
        });
        return;
      }

      // Validate required parameters
      if (!code || !state) {
        setConnectionStatus({
          loading: false,
          success: false,
          error: "Missing required OAuth parameters",
        });
        return;
      }

      // Parse state parameter
      let parsedState: { customState?: string };
      try {
        parsedState = JSON.parse(decodeURIComponent(state));
      } catch (parseError) {
        console.error("Error parsing state parameter:", parseError);
        setConnectionStatus({
          loading: false,
          success: false,
          error: "Invalid state parameter format",
        });
        return;
      }

      setConnectionStatus((prev) => ({
        ...prev,
        loading: true,
        message: "Connecting Stripe",
      }));

      const response = await vce.handleStripeConnectCallback(code, parsedState);

      if (response.success) {
        setConnectionStatus({
          loading: false,
          success: true,
          message: "Stripe account connected successfully!",
        });

        showSuccess("Stripe account connected successfully!");

        // Redirect to the custom state path or fallback to invoices
        const redirectPath = parsedState.customState || "/invoices";

        // Validate redirect path to prevent open redirects
        const validPaths = [
          "/invoices",
          "/dashboard",
          "/dashboard/profile",
          "/vendor/dashboard/payouts",
          "/settings",
          "/integrations",
        ];
        const redirectPathBase = redirectPath.split("?")[0];
        const finalRedirectPath = validPaths.includes(redirectPathBase)
          ? redirectPath
          : "/invoices";

        // Small delay to show success message
        setTimeout(() => {
          navigate(finalRedirectPath);
        }, 1500);
      } else {
        throw new Error("Connection failed");
      }
    } catch (error) {
      setConnectionStatus({
        loading: false,
        success: false,
        error:
          error?.message ||
          "Failed to connect Stripe account. Please try again.",
      });
    }
  }, [searchParams, navigate]);

  const handleEmailProviderCallback = useCallback(
    async (provider: string) => {
      try {
        // Get URL parameters
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        // Handle OAuth errors
        if (error) {
          setConnectionStatus({
            loading: false,
            success: false,
            error: errorDescription || `OAuth error: ${error}`,
          });
          return;
        }

        // Validate required parameters
        if (!code || !state) {
          setConnectionStatus({
            loading: false,
            success: false,
            error: "Missing required OAuth parameters",
          });
          return;
        }

        // Parse state parameter to get redirect info
        let parsedState: { redirectBackTo?: string };
        try {
          parsedState = JSON.parse(atob(state));
        } catch (parseError) {
          console.error("Error parsing state parameter:", parseError);
          setConnectionStatus({
            loading: false,
            success: false,
            error: "Invalid state parameter format",
          });
          return;
        }

        setConnectionStatus((prev) => ({
          ...prev,
          loading: true,
          message: `Connecting ${getThirdPartyDisplayName(provider)}`,
        }));

        // Call the email provider callback API
        const response = await vce.handleEmailProviderCallback(provider, {
          code,
          state,
          error,
        });

        if (response.success) {
          setConnectionStatus({
            loading: false,
            success: true,
            message: `${getThirdPartyDisplayName(
              provider,
            )} account connected successfully!`,
          });

          showSuccess(
            `${getThirdPartyDisplayName(
              provider,
            )} account connected successfully!`,
          );

          // Determine redirect path from parsed state
          const redirectPath = parsedState.redirectBackTo || "/dashboard";

          // Validate redirect path to prevent open redirects
          const validPaths = [
            "/integrations",
            "/dashboard",
            "/settings",
            "/onboarding-tour",
          ];
          const redirectPathBase = redirectPath.split("?")[0];
          const finalRedirectPath = validPaths.includes(redirectPathBase)
            ? redirectPath
            : "/dashboard";

          // Small delay to show success message
          setTimeout(() => {
            navigate(finalRedirectPath);
          }, 1500);
        } else {
          throw new Error(response.message || "Connection failed");
        }
      } catch (error) {
        console.error(`Error handling ${provider} callback:`, error);
        setConnectionStatus({
          loading: false,
          success: false,
          error:
            error?.message ||
            `Failed to connect ${getThirdPartyDisplayName(
              provider,
            )} account. Please try again.`,
        });
      }
    },
    [searchParams, navigate, getThirdPartyDisplayName],
  );

  const handleCalendarProviderCallback = useCallback(
    async (provider: string) => {
      try {
        // Get URL parameters
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        // Handle OAuth errors
        if (error) {
          setConnectionStatus({
            loading: false,
            success: false,
            error: errorDescription || `OAuth error: ${error}`,
          });
          return;
        }

        // Validate required parameters
        if (!code || !state) {
          setConnectionStatus({
            loading: false,
            success: false,
            error: "Missing required OAuth parameters",
          });
          return;
        }

        // Parse state parameter to get redirect info
        let parsedState: { redirectBackTo?: string };
        try {
          parsedState = JSON.parse(atob(state));
        } catch (parseError) {
          console.error("Error parsing state parameter:", parseError);
          setConnectionStatus({
            loading: false,
            success: false,
            error: "Invalid state parameter format",
          });
          return;
        }

        setConnectionStatus((prev) => ({
          ...prev,
          loading: true,
          message: `Connecting ${getThirdPartyDisplayName(provider)}`,
        }));

        // Call the calendar provider callback API
        const response = await vce.handleCalendarProviderCallback(provider, {
          code,
          state,
          error,
        });

        if (response.success) {
          setConnectionStatus({
            loading: false,
            success: true,
            message: `${getThirdPartyDisplayName(
              provider,
            )} account connected successfully!`,
          });

          showSuccess(
            `${getThirdPartyDisplayName(
              provider,
            )} account connected successfully!`,
          );

          // Determine redirect path from parsed state
          const redirectPath = parsedState.redirectBackTo || "/dashboard";

          // Validate redirect path to prevent open redirects
          const validPaths = [
            "/integrations",
            "/dashboard",
            "/settings",
            "/onboarding-tour",
          ];
          const redirectPathBase = redirectPath.split("?")[0];
          const finalRedirectPath = validPaths.includes(redirectPathBase)
            ? redirectPath
            : "/dashboard";

          // Small delay to show success message
          setTimeout(() => {
            navigate(finalRedirectPath);
          }, 1500);
        } else {
          throw new Error(response.message || "Connection failed");
        }
      } catch (error) {
        console.error(`Error handling ${provider} callback:`, error);
        setConnectionStatus({
          loading: false,
          success: false,
          error:
            error?.message ||
            `Failed to connect ${getThirdPartyDisplayName(
              provider,
            )} account. Please try again.`,
        });
      }
    },
    [searchParams, navigate, getThirdPartyDisplayName],
  );

  const handleEmailMarketingProviderCallback = useCallback(
    async (provider: string) => {
      try {
        // Get URL parameters
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        // Handle OAuth errors
        if (error) {
          setConnectionStatus({
            loading: false,
            success: false,
            error: errorDescription || `OAuth error: ${error}`,
          });
          return;
        }

        // Validate required parameters
        if (!code || !state) {
          setConnectionStatus({
            loading: false,
            success: false,
            error: "Missing required OAuth parameters",
          });
          return;
        }

        // Parse state parameter to get redirect info
        let parsedState: { redirectBackTo?: string; type?: string };
        try {
          parsedState = JSON.parse(atob(state));

          // Validate state type for email marketing
          if (parsedState.type !== "email_marketing") {
            throw new Error("Invalid OAuth state type");
          }
        } catch (parseError) {
          console.error("Error parsing state parameter:", parseError);
          setConnectionStatus({
            loading: false,
            success: false,
            error: "Invalid state parameter format",
          });
          return;
        }

        setConnectionStatus((prev) => ({
          ...prev,
          loading: true,
          message: `Connecting ${getThirdPartyDisplayName(provider)}`,
        }));

        // Call the email marketing provider callback API
        const response = await vce.handleEmailMarketingCallback(provider, {
          code,
          state,
          error,
        });

        if (response.success) {
          setConnectionStatus({
            loading: false,
            success: true,
            message: `${getThirdPartyDisplayName(
              provider,
            )} account connected successfully!`,
          });

          showSuccess(
            `${getThirdPartyDisplayName(
              provider,
            )} account connected successfully!`,
          );

          // Determine redirect path from parsed state
          const redirectPath = parsedState.redirectBackTo || "/integrations";

          // Validate redirect path to prevent open redirects
          const validPaths = [
            "/integrations",
            "/dashboard",
            "/settings",
            "/onboarding-tour",
          ];
          const redirectPathBase = redirectPath.split("?")[0];
          const finalRedirectPath = validPaths.includes(redirectPathBase)
            ? redirectPath
            : "/integrations";

          // Small delay to show success message
          setTimeout(() => {
            navigate(finalRedirectPath);
          }, 1500);
        } else {
          throw new Error(response.message || "Connection failed");
        }
      } catch (error) {
        console.error(`Error handling ${provider} callback:`, error);
        setConnectionStatus({
          loading: false,
          success: false,
          error:
            error?.message ||
            `Failed to connect ${getThirdPartyDisplayName(
              provider,
            )} account. Please try again.`,
        });
      }
    },
    [searchParams, navigate, getThirdPartyDisplayName],
  );

  const handleGoogleDriveCallback = useCallback(async () => {
    try {
      // Get URL parameters
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      // Handle OAuth errors
      if (error) {
        setConnectionStatus({
          loading: false,
          success: false,
          error: errorDescription || `OAuth error: ${error}`,
        });
        return;
      }

      // Validate required parameters
      if (!code || !state) {
        setConnectionStatus({
          loading: false,
          success: false,
          error: "Missing required OAuth parameters",
        });
        return;
      }

      setConnectionStatus((prev) => ({
        ...prev,
        loading: true,
        message: "Connecting Google Drive",
      }));

      // Call the Google Drive callback API
      const response = await vce.handleGoogleDriveCallback({
        code,
        state,
        error,
      });

      if (response.success) {
        setConnectionStatus({
          loading: false,
          success: true,
          message: "Google Drive connected successfully!",
        });

        showSuccess("Google Drive connected successfully!");

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error(response.message || "Connection failed");
      }
    } catch (error) {
      console.error("Error handling Google Drive callback:", error);
      setConnectionStatus({
        loading: false,
        success: false,
        error:
          error?.message ||
          "Failed to connect Google Drive account. Please try again.",
      });
    }
  }, [searchParams, navigate]);

  const handleOAuthCallback = useCallback(
    async (provider: string) => {
      // Prevent multiple calls
      if (callbackProcessedRef.current) {
        return;
      }
      callbackProcessedRef.current = true;

      try {
        // Get URL parameters
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        // Handle OAuth errors
        if (error) {
          setConnectionStatus({
            loading: false,
            success: false,
            error: errorDescription || `OAuth error: ${error}`,
          });
          return;
        }

        // Validate required parameters
        if (!code || !state) {
          setConnectionStatus({
            loading: false,
            success: false,
            error: "Missing required OAuth parameters",
          });
          return;
        }

        setConnectionStatus((prev) => ({
          ...prev,
          loading: true,
          message: `Authenticating with ${getThirdPartyDisplayName(provider)}`,
        }));

        // Parse state to extract redirect and referral code (NO SESSION STORAGE)
        let parsedState: {
          role?: string;
          redirectPath?: string;
          referralCode?: string;
          externalRedirectUrl?: string;
          _csrf?: string;
        } = {};

        try {
          parsedState = JSON.parse(state);
        } catch (e) {
          console.warn("Could not parse state parameter:", e);
        }

        // Handle OAuth callback - get referral code from state, not sessionStorage
        const response = await vce.handleOAuthCallback(provider, {
          code,
          state,
          error,
          referral_code: parsedState.referralCode || undefined,
          role: parsedState.role || "user",
        });

        if (response.success && response.session?.access_token) {
          // Store tokens using TokenManager
          TokenManager.storeTokens(
            response.session.access_token,
            response.session.refresh_token,
            response.session.expires_in,
          );

          await refreshUser();

          setConnectionStatus({
            loading: false,
            success: true,
            message: `Successfully authenticated with ${getThirdPartyDisplayName(
              provider,
            )}!`,
          });

          showSuccess(
            `Successfully signed in with ${getThirdPartyDisplayName(provider)}!`,
          );

          // Check if there's an external redirect URL (from MTP tools)
          // and validate it's from the same domain before redirecting
          if (
            parsedState.externalRedirectUrl &&
            isValidExternalRedirectUrl(parsedState.externalRedirectUrl)
          ) {
            console.log(
              "Redirecting to external MTP tool URL:",
              parsedState.externalRedirectUrl,
            );
            // Redirect to the external tool URL after a short delay
            setTimeout(() => {
              window.location.href = parsedState.externalRedirectUrl!;
            }, 1500);
          } else {
            // Get redirect path from state, not sessionStorage (internal redirect)
            const redirectPath = parsedState.redirectPath || "/dashboard";
            const safeRedirectPath = getSafeRedirectPath(redirectPath);

            // Redirect after a short delay
            setTimeout(() => {
              navigate(safeRedirectPath);
            }, 1500);
          }
        } else {
          throw new Error(response.message || "Authentication failed");
        }
      } catch (error) {
        console.error(`Error handling ${provider} OAuth callback:`, error);
        setConnectionStatus({
          loading: false,
          success: false,
          error:
            error?.message ||
            `Failed to authenticate with ${getThirdPartyDisplayName(
              provider,
            )}. Please try again.`,
        });
      }
    },
    [
      searchParams,
      navigate,
      getThirdPartyDisplayName,
      getSafeRedirectPath,
      isValidExternalRedirectUrl,
      refreshUser,
    ],
  );

  const handleConnectionCallback = useCallback(async () => {
    // Prevent multiple calls
    if (callbackProcessedRef.current) {
      return;
    }

    if (!thirdParty) {
      setConnectionStatus({
        loading: false,
        success: false,
        error: "Invalid third-party service.",
      });
      return;
    }

    try {
      // Handle different third-party services
      switch (thirdParty.toLowerCase()) {
        // OAuth authentication providers
        case "google_oauth":
          await handleOAuthCallback("google");
          break;
        case "microsoft_oauth":
          await handleOAuthCallback("microsoft");
          break;
        case "apple_oauth":
          await handleOAuthCallback("apple");
          break;
        // Google Drive integration
        case "google_drive":
          await handleGoogleDriveCallback();
          break;
        // Existing integrations
        case "stripe":
          await handleStripeCallback();
          break;
        case "gmail":
        case "outlook":
        case "zoho":
          await handleEmailProviderCallback(thirdParty.toLowerCase());
          break;
        case "google_calendar":
        case "calendly":
          await handleCalendarProviderCallback(thirdParty.toLowerCase());
          break;
        case "mailchimp":
          await handleEmailMarketingProviderCallback(thirdParty.toLowerCase());
          break;
        default:
          callbackProcessedRef.current = false; // Reset for unsupported services
          setConnectionStatus({
            loading: false,
            success: false,
            error: `Unsupported third-party service: ${thirdParty}`,
          });
      }
    } catch (error) {
      console.error("Error handling connection callback:", error);
      setConnectionStatus({
        loading: false,
        success: false,
        error: "An unexpected error occurred during connection",
      });
    }
  }, [
    thirdParty,
    handleOAuthCallback,
    handleGoogleDriveCallback,
    handleStripeCallback,
    handleEmailProviderCallback,
    handleCalendarProviderCallback,
    handleEmailMarketingProviderCallback,
  ]);

  useEffect(() => {
    handleConnectionCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  if (!thirdParty) {
    return (
      <div className="container mx-auto py-8 flex flex-col justify-center items-center h-screen">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center text-center">
          <div>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Invalid Connection
            </div>
          </div>
          <div>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No third-party service specified in the URL.
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Button onClick={() => navigate("/dashboard")}>
                Go To Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 flex flex-col justify-center items-center h-screen">
      <div className="max-w-md mx-auto flex flex-col justify-center items-center text-center">
        <div className="flex items-center gap-2 mb-4">
          {connectionStatus.loading ? (
            <div className="h-5 w-5"></div>
          ) : connectionStatus.success ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          {connectionStatus.loading
            ? `Connecting ${getThirdPartyDisplayName(thirdParty)}`
            : connectionStatus.success
              ? `${getThirdPartyDisplayName(thirdParty)} Connected`
              : `Connection Failed`}
        </div>
        <div className="space-y-4">
          {connectionStatus.loading && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                {`Connecting your ${getThirdPartyDisplayName(
                  thirdParty,
                )} account`}
              </p>
            </div>
          )}

          {connectionStatus.success && (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-sm text-green-600 mb-4">
                {connectionStatus.message ||
                  `${getThirdPartyDisplayName(
                    thirdParty,
                  )} account connected successfully!`}
              </p>
              <p className="text-xs text-muted-foreground">Redirecting you</p>
            </div>
          )}

          {connectionStatus.error && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{connectionStatus.error}</AlertDescription>
              </Alert>

              <p>Please start the connection process again.</p>
              <div className="mt-4">
                <Button onClick={() => navigate(-1)}>Go Back</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyConnectionCallbackPage;
