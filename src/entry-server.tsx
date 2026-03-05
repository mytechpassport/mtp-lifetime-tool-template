/**
 * entry-server.tsx
 *
 * SSR entry used ONLY at build time by scripts/prerender.ts.
 * It renders public marketing pages with StaticRouter (no BrowserRouter).
 *
 * Why AuthProvider is included:
 *   Navbar calls useAuth() to conditionally show "Dashboard" vs "Login".
 *   During renderToString, all useEffect hooks are skipped — so AuthProvider
 *   initializes with user=null (no API calls, no localStorage access).
 *   This gives the correct unauthenticated pre-render state for public pages.
 *
 * Gray-matter / import.meta.glob are transformed by Vite's SSR build
 * so getAllBlogPosts() and getAllCountries() work fine in Node.
 */

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContextProvider";

// Layouts
import MarketingPageLayout from "./components/layouts/MarketingPageLayout";

// Public pages
import Index from "./pages/Index";
import Blog from "./pages/marketing/Blog";
import BlogDetail from "./pages/marketing/BlogDetail";
import AboutUs from "./pages/marketing/AboutUs";
import BecomeAVendor from "./pages/marketing/BecomeAVendor";
import ChangeLog from "./pages/marketing/ChangeLog";
import Esignature from "./pages/marketing/Esignature";
import EsignLegality from "./pages/marketing/EsignLegality";
import EsignLegalityCountry from "./pages/marketing/EsignLegalityCountry";
import EsignLegalityCountryDetail from "./pages/marketing/EsignLegalityCountryDetail";
import EsignTerms from "./pages/marketing/EsignTerms";
import PrivacyPolicy from "./pages/marketing/PrivacyPolicy";
import TermsOfService from "./pages/marketing/TermsOfService";
import AcceptableUsePolicy from "./pages/marketing/AcceptableUsePolicy";
import DataProcessingAgreement from "./pages/marketing/DataProcessingAgreement";
import ServiceSpecificTerms from "./pages/marketing/ServiceSpecificTerms";

export interface RenderResult {
  html: string;
  helmet: HelmetServerState;
}

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        {/* AuthProvider needed because Navbar calls useAuth().
            During SSR (renderToString), useEffect is skipped so
            the auth API is never called — user initializes as null. */}
        <AuthProvider>
          <StaticRouter location={url}>
            <Routes>
              {/* Homepage */}
              <Route path="/" element={<Index />} />

              {/* All marketing pages share the layout (Navbar + Footer) */}
              <Route element={<MarketingPageLayout />}>
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/become-a-vendor" element={<BecomeAVendor />} />
                <Route path="/changelog" element={<ChangeLog />} />
                <Route path="/electronic-signature" element={<Esignature />} />
                <Route
                  path="/electronic-signature/legality-statement"
                  element={<EsignLegality />}
                />
                <Route
                  path="/electronic-signature/terms"
                  element={<EsignTerms />}
                />
                <Route
                  path="/e-signature-legality"
                  element={<EsignLegalityCountry />}
                />
                <Route
                  path="/e-signature-legality/:country"
                  element={<EsignLegalityCountryDetail />}
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route
                  path="/acceptable-use-policy"
                  element={<AcceptableUsePolicy />}
                />
                <Route
                  path="/data-processing-agreement"
                  element={<DataProcessingAgreement />}
                />
                <Route
                  path="/service-specific-terms"
                  element={<ServiceSpecificTerms />}
                />
              </Route>
            </Routes>
          </StaticRouter>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>,
  );

  return {
    html,
    helmet: helmetContext.helmet as HelmetServerState,
  };
}
