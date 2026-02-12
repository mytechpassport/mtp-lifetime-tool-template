# MTP Tool Template

React template for building **MTP Original Tools** (My Tech Passport). Use this repo to start new lifetime, subscription, or free tools that share the same backend and auth.

## What’s included

- **Auth**: Cookie-based auth (same as main MTP). Login/signup, OAuth (Google/Microsoft/Apple), token manager, `AuthContext`, `useAuth`.
- **API layer**: `apiClient` (axios with `credentials: 'include'`), VCE SDK (`vce.ts`, `VCESDK.ts`, `VCEClient.ts`) for backend_simple.
- **User dashboard**: Layout with sidebar; placeholder Dashboard home, Profile, Billing, Support, API Keys (PAT). Credits/Buy Credits in header when applicable.
- **Layouts & UI**: `DashboardLayout`, `ErrorBoundary`, `DefaultErrorFallback`, `MarketingPageLayout`, full `components/ui` (shadcn).
- **Legal/marketing**: Privacy, Terms, e-signature, changelog, etc. under `MarketingPageLayout`.
- **Third-party callback**: `/third-party/:thirdParty/callback` for OAuth/connection callbacks.
- **Services & hooks**: User, profile, tools, support, credits, subscription, affiliate, vendor, workflows (API services kept for same backend; remove or add hooks as needed).

## Reference

- **MTP Original Tools guide**: See `MTP_ORIGINAL_TOOLS_GUIDE_AND_IMPLEMENTATION_PLAN.md` (in backend_simple repo: `mytechpassport/AI-Context/work/TOOLS/`) for:
  - Cookie-based auth and RBAC
  - Tool types and pricing (free, lifetime, subscription)
  - Database (tools registry, tool-specific tables, purchases, subscriptions)
  - Per-tool APIs under `backend_simple/.../tools/v1/<tool-folder>/`
  - Slug-based tool route and access (purchase/subscription checks)
  - Build checklist for any MTP original tool

## Quick start

```bash
npm i
npm run dev
```

- **Landing**: `/` — template hero + CTA.
- **Auth**: `/auth` — user login/signup; `/vendor/auth` — vendor auth (same backend; vendor dashboard routes are not in this template).
- **Dashboard**: `/dashboard` — user app shell; replace the Dashboard home content with your tool UI.

## Building your tool

1. **Backend**: Ensure your tool is registered in `mtp_tools` and, if needed, add per-tool APIs under `backend_simple/.../tools/v1/<tool-folder>/` (see guide §8.2).
2. **Access**: Implement access checks (e.g. purchase or subscription) using the tools API and show purchase/connect flow when the user doesn’t have access.
3. **Dashboard home**: Replace `src/pages/dashboard/user/DashboardHome.tsx` with your tool’s main UI.
4. **Landing**: Customize `Index`, `Hero`, `CTA`, and `Navbar` for your tool’s messaging and add any extra marketing sections.
5. **Env**: Point VCE/API base URL (and any env) to your backend_simple instance.

## Tech stack

- Vite, TypeScript, React
- React Router, TanStack Query
- shadcn/ui, Tailwind CSS
- Axios (apiClient), VCE SDK for backend_simple

## Deploy

Build: `npm run build`. Deploy the `dist` output (e.g. Netlify, Vercel). Ensure cookie domain and CORS match your backend and main MTP app for cross-subdomain auth.
