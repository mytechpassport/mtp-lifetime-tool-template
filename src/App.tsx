import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContextProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import UserAuth from "./pages/UserAuth";
// import VendorAuth from "./pages/VendorAuth"; // Vendor auth kept for same backend; routes commented out (user-only tools)
import NotFound from "./pages/NotFound";

// User Dashboard
import UserDashboardLayout from "./pages/dashboard/UserDashboardLayout";
import DashboardHome from "./pages/dashboard/user/DashboardHome";
import UserProfile from "./pages/dashboard/user/Profile";
import UserSupport from "./pages/dashboard/user/Support";
import UserBilling from "./pages/dashboard/user/Billing";
import ThirdPartyConnectionCallbackPage from "./pages/ThirdPartyConnectionCallbackPage";
import { PATManager } from "./components/PATManager";
import { Toaster } from "sonner";
import { ErrorBoundary } from "./components/layouts/ErrorBoundary";
import MarketingPageLayout from "./components/layouts/MarketingPageLayout";
import PrivacyPolicy from "./pages/marketing/PrivacyPolicy";
import AcceptableUsePolicy from "./pages/marketing/AcceptableUsePolicy";
import ChangeLog from "./pages/marketing/ChangeLog";
import DataProcessingAgreement from "./pages/marketing/DataProcessingAgreement";
import EsignTerms from "./pages/marketing/EsignTerms";
import EsignLegality from "./pages/marketing/EsignLegality";
import ServiceSpecificTerms from "./pages/marketing/ServiceSpecificTerms";
import TermsOfService from "./pages/marketing/TermsOfService";
import Esignature from "./pages/marketing/Esignature";
import EsignLegalityCountry from "./pages/marketing/EsignLegalityCountry";
import EsignLegalityCountryDetail from "./pages/marketing/EsignLegalityCountryDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <Toaster
              richColors
              position="top-center"
              closeButton
              pauseWhenPageIsHidden
            />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<UserAuth />} />
              {/* Vendor auth routes commented out — user-only tools; VendorAuth page and backend vendor login/signup remain for reuse */}
              {/* <Route path="/vendor/auth" element={<VendorAuth />} /> */}
              {/* <Route path="/vendor/auth/signin" element={<VendorAuth />} /> */}
              {/* <Route path="/vendor/auth/signup" element={<VendorAuth />} /> */}
              {/* <Route path="/auth/vendor" element={<Navigate to="/vendor/auth" replace />} /> */}
              {/* <Route path="/auth/vendor/signin" element={<Navigate to="/vendor/auth/signin" replace />} /> */}
              {/* <Route path="/auth/vendor/signup" element={<Navigate to="/vendor/auth/signup" replace />} /> */}

              {/* Marketing / Legal */}
              <Route element={<MarketingPageLayout />}>
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route
                  path="/acceptable-use-policy"
                  element={<AcceptableUsePolicy />}
                />
                <Route
                  path="/data-processing-agreement"
                  element={<DataProcessingAgreement />}
                />
                <Route
                  path="/electronic-signature/terms"
                  element={<EsignTerms />}
                />
                <Route
                  path="/electronic-signature/legality-statement"
                  element={<EsignLegality />}
                />
                <Route
                  path="/service-specific-terms"
                  element={<ServiceSpecificTerms />}
                />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/electronic-signature" element={<Esignature />} />
                <Route
                  path="/e-signature-legality"
                  element={<EsignLegalityCountry />}
                />
                <Route
                  path="/e-signature-legality/:country"
                  element={<EsignLegalityCountryDetail />}
                />
                <Route path="/changelog" element={<ChangeLog />} />
              </Route>

              {/* User Dashboard (MTP tool app) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireRole="user">
                    <UserDashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route
                  path="pat"
                  element={<Navigate to="/dashboard/api-keys" replace />}
                />
                <Route path="api-keys" element={<PATManager />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="billing" element={<UserBilling />} />
                <Route path="support" element={<UserSupport />} />
              </Route>

              {/* Third-party connection callback */}
              <Route
                path="/third-party/:thirdParty/callback"
                element={<ThirdPartyConnectionCallbackPage />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
