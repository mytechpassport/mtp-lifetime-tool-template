import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { UserRole } from "@/contexts/AuthContextProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: UserRole | UserRole[]; // Accept string or array of strings
  requireOnboarded?: boolean;
}

function roleMatches(
  userRole: string,
  requireRole?: UserRole | UserRole[]
): boolean {
  if (!requireRole) return true;
  if (Array.isArray(requireRole)) {
    return requireRole.includes(userRole as UserRole);
  }
  return userRole === requireRole;
}

export const ProtectedRoute = ({
  children,
  requireRole,
  requireOnboarded = false,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check role requirements
  if (requireRole && !roleMatches(user.role, requireRole)) {
    // If requireRole is or includes "vendor", redirect to vendor auth
    const isVendorRequired =
      (Array.isArray(requireRole) && requireRole.includes("vendor")) ||
      requireRole === "vendor";
    if (isVendorRequired) {
      return <Navigate to="/vendor/auth" replace />;
    }
    // Else redirect to default auth
    return <Navigate to="/auth" replace />;
  }

  // Check onboarding requirements
  if (requireOnboarded && !user.onboarded) {
    if (user.role === "vendor") {
      return <Navigate to="/onboarding/vendor" replace />;
    }
    // For users, we might implement onboarding later
    // For now, assume users are onboarded after OAuth
  }

  return <>{children}</>;
};
