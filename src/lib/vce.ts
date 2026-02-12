import { createVCESDK, VCEClient } from "./VCESDK";

const baseUrl =
  typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : "https://be.mytechpassport.com";
// const baseUrl = "http://localhost:3001";
const apiKey =
  "NmQ3NDcwN2UzMTM3MzYzMjMyMzQzMTMzMzMzMzJkNjUzNTY2MzEzNzY1NjY2NTM1NjU2MzM1";
const openRouterApiKey =
  typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_OPENROUTER_API_KEY
    ? import.meta.env.VITE_OPENROUTER_API_KEY
    : "";

const groqApiKey =
  typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_GROQ_API_KEY
    ? import.meta.env.VITE_GROQ_API_KEY
    : "";

const vceClient: VCEClient = {
  baseUrl,
  apiKey,
  openRouterApiKey,
  groqApiKey,
};

const vce = createVCESDK(vceClient); // Initialize the VCE SDK

// Cookie-based authentication (primary method for MTP):
// - Backend sets HttpOnly cookie (mtp_auth_token) on sign-in/sign-up for namespace 'mtp'
// - Cookie is automatically sent with all requests via credentials: "include" in fetch
// - Cookie works across subdomains (e.g. www.mytechpassport.com, tool.mytechpassport.com)
// - For localhost, cookie is host-only (no domain attribute)
//
// localStorage tokens (secondary/fallback):
// - Still stored for backward compatibility and explicit token-based auth
// - Used when Bearer token is explicitly needed (e.g. mobile apps, external integrations)
// - Backend accepts both: (1) Cookie first, then (2) Authorization Bearer header
//
// Authentication priority in backend:
// 1. Cookie (mtp_auth_token) - for browser-based cross-subdomain SSO
// 2. Authorization: Bearer <token> - for explicit token-based auth
// 3. Personal Access Token (PAT) - for API integrations
if (typeof window !== "undefined") {
  const storedAccessToken = localStorage.getItem("accessToken");
  if (storedAccessToken) {
    vce.setAccessToken(storedAccessToken);
  }
} else {
  console.log("🖥️ Server environment detected, skipping storage check");
}

console.log("✅ VCE SDK initialization complete");

export default vce;
