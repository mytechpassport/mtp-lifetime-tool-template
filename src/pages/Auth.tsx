import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserRole } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Chrome, Square, Apple } from "lucide-react";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isVendorRoute = location.pathname === "/auth/vendor";

  const [role, setRole] = useState<UserRole>(isVendorRoute ? "vendor" : "user");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup, oauthLogin } = useAuth();
  const { toast } = useToast();

  // Update role when route changes
  useEffect(() => {
    setRole(isVendorRoute ? "vendor" : "user");
  }, [isVendorRoute]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    // Navigate to appropriate route based on role
    if (newRole === "vendor") {
      navigate("/auth/vendor");
    } else {
      navigate("/auth");
    }
  };

  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password, role);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        await signup(email, password, name, role);
        toast({
          title: "Account created!",
          description: "Let's get you set up.",
        });
      }

      // Navigate based on role
      if (role === "user") {
        navigate("/onboarding/department");
      } else {
        navigate("/onboarding/vendor");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (
    provider: "google" | "microsoft" | "apple"
  ) => {
    setLoading(true);

    try {
      // Mock OAuth flow - in real app this would redirect to OAuth provider
      const mockUserData = {
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      };

      await oauthLogin(provider, mockUserData);

      toast({
        title: "Welcome!",
        description: `Successfully signed in with ${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        }.`,
      });

      navigate("/onboarding/department");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const OAuthButton = ({
    provider,
    icon,
  }: {
    provider: "google" | "microsoft" | "apple";
    icon: React.ReactNode;
  }) => (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => handleOAuthLogin(provider)}
      disabled={loading}
    >
      <span className="mr-2">{icon}</span>
      Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent/80">
              <span className="text-2xl font-bold text-accent-foreground">
                M
              </span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">MyTechPassport</CardTitle>
          <CardDescription className="text-center">
            {role === "user"
              ? "Sign in to your account"
              : isLogin
              ? "Vendor Sign In"
              : "Create Vendor Account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role Selection Tabs */}
          <Tabs
            value={role}
            onValueChange={(v) => handleRoleChange(v as UserRole)}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* User OAuth Login */}
          {role === "user" && (
            <div className="space-y-4">
              <OAuthButton
                provider="google"
                icon={<Chrome className="w-4 h-4" />}
              />
              <OAuthButton
                provider="microsoft"
                icon={<Square className="w-4 h-4" />}
              />
              <OAuthButton
                provider="apple"
                icon={<Apple className="w-4 h-4" />}
              />
            </div>
          )}

          {/* Vendor Email/Password Form */}
          {role === "vendor" && (
            <>
              <form onSubmit={handleEmailPasswordSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? "Loading..."
                    : isLogin
                    ? "Sign In"
                    : "Create Account"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-accent hover:underline"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
