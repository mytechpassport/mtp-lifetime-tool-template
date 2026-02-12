import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ErrorHandler } from "@/utils/errorHandler";
import { Loader2, Mail, User as UserIcon, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const VendorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login, signup, user, loading: authLoading } = useAuth();

  // Set initial mode based on route
  useEffect(() => {
    if (
      location.pathname === "/auth/vendor/signin" ||
      location.pathname === "/vendor/auth/signin"
    ) {
      setIsLogin(true);
    } else if (
      location.pathname === "/auth/vendor/signup" ||
      location.pathname === "/vendor/auth/signup"
    ) {
      setIsLogin(false);
    }
    // For /auth/vendor, keep the default state (true = login)
  }, [location.pathname]);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const handleRoleChange = (newRole: string) => {
    if (newRole === "user") {
      navigate("/auth");
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      navigate(user.role === "vendor" ? "/vendor/dashboard" : "/dashboard");
    }
  }, [authLoading, user, navigate]);

  const onSubmit = async (data: FormData) => {
    
    // Validation checks similar to the original implementation:
    if (!data.email || !data.password || (!isLogin && !data.name)) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
      return;
    }

    if (data.password.length < 6) {
      setError("password", {
        type: "manual",
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(data.email, data.password, "vendor");
        navigate("/vendor/dashboard");
      } else {
        await signup(data.email, data.password, data.name, "vendor");
        navigate("/onboarding/vendor");
      }
    } catch (error) {
      ErrorHandler.logError(error, "vendor authentication");
      // Optionally: ErrorHandler.handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <Link to="/" className="flex items-center justify-center mb-1">
            <img src="/logo-gold.svg" alt="MyTechPassport" className="w-40" />
          </Link>
          <CardDescription className="text-center">
            {isLogin ? "Vendor Sign In" : "Create Vendor Account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role Selection Tabs */}
          <Tabs
            value="vendor"
            onValueChange={handleRoleChange}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
            </TabsList>
          </Tabs>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            disabled={loading}
                            required
                            className="pl-10"
                          />
                          <UserIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          disabled={loading}
                          required
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          disabled={loading}
                          required
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => {
                if (isLogin) {
                  navigate("/vendor/auth/signup");
                } else {
                  navigate("/vendor/auth/signin");
                }
              }}
              className="text-accent hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAuth;
