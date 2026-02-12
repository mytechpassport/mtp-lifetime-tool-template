import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ErrorHandler } from "@/utils/errorHandler";
import { Loader2 } from "lucide-react";

/**
 * User-only auth: OAuth options for login. No user/vendor selector (tools are user-only).
 */
const UserAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loadingProvider, setLoadingProvider] = useState<
    null | "google" | "microsoft" | "apple"
  >(null);

  const { oauthLogin, user, loading } = useAuth();
  const referralCode = searchParams.get("ref");

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/dashboard");
    }
  }, [loading, user, navigate]);

  const handleOAuthLogin = async (
    provider: "google" | "microsoft" | "apple"
  ) => {
    setLoadingProvider(provider);
    try {
      const redirectTo = searchParams.get("redirect");
      await oauthLogin(provider, referralCode || undefined, redirectTo || undefined);
    } catch (error) {
      ErrorHandler.logError(error, "OAuth login");
      setLoadingProvider(null);
    }
  };

  const OAuthButton = ({
    provider,
    icon,
  }: {
    provider: "google" | "microsoft" | "apple";
    icon: React.ReactNode;
  }) => {
    const isLoading = loadingProvider === provider;
    return (
      <Button
        variant="outline"
        className="w-full border-[1.2px]"
        onClick={() => handleOAuthLogin(provider)}
        disabled={!!loadingProvider}
      >
        <span className="mr-2">
          {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : icon}
        </span>
        Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </Button>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <Link to="/" className="flex items-center justify-center mb-1">
            <img src="/logo-gold.svg" alt="MTP Tool" className="w-40" />
          </Link>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <OAuthButton
              provider="google"
              icon={
                <img
                  src="/logo/google-icon.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
              }
            />
            <OAuthButton
              provider="microsoft"
              icon={
                <img
                  src="/logo/microsoft-icon.svg"
                  alt="Microsoft"
                  className="w-4 h-4"
                />
              }
            />
            <OAuthButton
              provider="apple"
              icon={
                <img
                  src="/logo/apple-icon.svg"
                  alt="Apple"
                  className="w-4 h-4"
                />
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAuth;
