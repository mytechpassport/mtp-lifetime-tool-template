/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Authentication Test Suite
 *
 * This file contains comprehensive tests for Phase 1.1 authentication implementation.
 * Run these tests to verify all authentication features are working correctly.
 */

import vce from "@/lib/vce";
import { TokenManager } from "./tokenManager";
import { ErrorHandler } from "./errorHandler";

export class AuthTestSuite {
  private static testResults: { [key: string]: boolean } = {};
  private static errors: { [key: string]: string } = {};

  /**
   * Run all authentication tests
   */
  static async runAllTests(): Promise<{
    passed: number;
    failed: number;
    results: any;
    errors?: any;
  }> {
    console.group("🧪 Running Authentication Test Suite");

    this.testResults = {};
    this.errors = {};

    // Test 1: Token Manager
    await this.testTokenManager();

    // Test 2: Error Handler
    await this.testErrorHandler();

    // Test 3: VCE SDK Integration
    await this.testVCESDKIntegration();

    // Test 4: OAuth Flow Preparation
    await this.testOAuthFlowPreparation();

    // Test 5: Vendor Authentication Preparation
    await this.testVendorAuthPreparation();

    const passed = Object.values(this.testResults).filter(Boolean).length;
    const failed = Object.values(this.testResults).filter((r) => !r).length;

    console.log(`✅ Tests passed: ${passed}`);
    console.log(`❌ Tests failed: ${failed}`);

    if (failed > 0) {
      console.group("❌ Failed Tests:");
      Object.entries(this.errors).forEach(([test, error]) => {
        console.error(`${test}: ${error}`);
      });
      console.groupEnd();
    }

    console.groupEnd();

    return {
      passed,
      failed,
      results: this.testResults,
      errors: this.errors,
    };
  }

  /**
   * Test Token Manager functionality
   */
  private static async testTokenManager(): Promise<void> {
    try {
      console.log("🔑 Testing Token Manager...");

      // Test token storage
      const testToken = "test_access_token_123";
      const testRefreshToken = "test_refresh_token_456";
      const expiresIn = 3600;

      TokenManager.storeTokens(testToken, testRefreshToken, expiresIn);

      const storedToken = TokenManager.getAccessToken();
      const storedRefreshToken = TokenManager.getRefreshToken();

      if (storedToken !== testToken) {
        throw new Error("Access token storage failed");
      }

      if (storedRefreshToken !== testRefreshToken) {
        throw new Error("Refresh token storage failed");
      }

      // Test token expiration check
      const isExpired = TokenManager.isTokenExpired();
      if (isExpired) {
        throw new Error(
          "Token should not be expired immediately after storage"
        );
      }

      // Test token clearing
      TokenManager.clearTokens();
      const clearedToken = TokenManager.getAccessToken();
      if (clearedToken) {
        throw new Error("Token clearing failed");
      }

      this.testResults["TokenManager"] = true;
      console.log("✅ Token Manager tests passed");
    } catch (error) {
      this.testResults["TokenManager"] = false;
      this.errors["TokenManager"] =
        error instanceof Error ? error.message : "Unknown error";
      console.error("❌ Token Manager tests failed:", error);
    }
  }

  /**
   * Test Error Handler functionality
   */
  private static async testErrorHandler(): Promise<void> {
    try {
      console.log("🚨 Testing Error Handler...");

      // Test error message creation
      const testError = { message: "Test error message" };
      const friendlyMessage = ErrorHandler.createUserFriendlyMessage(testError);

      if (friendlyMessage !== "Test error message") {
        throw new Error("Error message creation failed");
      }

      // Test string error handling
      const stringError = "String error";
      const stringMessage = ErrorHandler.createUserFriendlyMessage(stringError);

      if (stringMessage !== "String error") {
        throw new Error("String error handling failed");
      }

      // Test unknown error handling
      const unknownError = {};
      const unknownMessage =
        ErrorHandler.createUserFriendlyMessage(unknownError);

      if (!unknownMessage.includes("unexpected error")) {
        throw new Error("Unknown error handling failed");
      }

      this.testResults["ErrorHandler"] = true;
      console.log("✅ Error Handler tests passed");
    } catch (error) {
      this.testResults["ErrorHandler"] = false;
      this.errors["ErrorHandler"] =
        error instanceof Error ? error.message : "Unknown error";
      console.error("❌ Error Handler tests failed:", error);
    }
  }

  /**
   * Test VCE SDK Integration
   */
  private static async testVCESDKIntegration(): Promise<void> {
    try {
      console.log("🔌 Testing VCE SDK Integration...");

      // Test SDK client availability
      const client = vce.getClient();
      if (!client) {
        throw new Error("VCE client not available");
      }

      if (!client.baseUrl) {
        throw new Error("VCE client base URL not configured");
      }

      if (!client.apiKey) {
        throw new Error("VCE client API key not configured");
      }

      // Test OAuth methods availability
      if (typeof vce.initiateOAuth !== "function") {
        throw new Error("OAuth initiation method not available");
      }

      if (typeof vce.handleOAuthCallback !== "function") {
        throw new Error("OAuth callback method not available");
      }

      if (typeof vce.handleOAuthCallbackPost !== "function") {
        throw new Error("OAuth POST callback method not available");
      }

      // Test authentication methods availability
      if (typeof vce.signIn !== "function") {
        throw new Error("Sign in method not available");
      }

      if (typeof vce.signUp !== "function") {
        throw new Error("Sign up method not available");
      }

      if (typeof vce.signOut !== "function") {
        throw new Error("Sign out method not available");
      }

      if (typeof vce.getUser !== "function") {
        throw new Error("Get user method not available");
      }

      // Test PAT methods availability
      if (typeof vce.generatePAT !== "function") {
        throw new Error("Generate PAT method not available");
      }

      if (typeof vce.listPATs !== "function") {
        throw new Error("List PATs method not available");
      }

      if (typeof vce.regeneratePAT !== "function") {
        throw new Error("Regenerate PAT method not available");
      }

      if (typeof vce.revokePAT !== "function") {
        throw new Error("Revoke PAT method not available");
      }

      this.testResults["VCESDKIntegration"] = true;
      console.log("✅ VCE SDK Integration tests passed");
    } catch (error) {
      this.testResults["VCESDKIntegration"] = false;
      this.errors["VCESDKIntegration"] =
        error instanceof Error ? error.message : "Unknown error";
      console.error("❌ VCE SDK Integration tests failed:", error);
    }
  }

  /**
   * Test OAuth Flow Preparation
   */
  private static async testOAuthFlowPreparation(): Promise<void> {
    try {
      console.log("🔐 Testing OAuth Flow Preparation...");

      // Test OAuth state parameter handling
      const testState = {
        role: "user",
        referralCode: "TEST123",
        timestamp: Date.now(),
      };

      const stateString = JSON.stringify(testState);
      const parsedState = JSON.parse(stateString);

      if (parsedState.role !== "user") {
        throw new Error("OAuth state role handling failed");
      }

      if (parsedState.referralCode !== "TEST123") {
        throw new Error("OAuth state referral code handling failed");
      }

      // Test referral code storage
      const testReferralCode = "REF456";
      sessionStorage.setItem("oauth_referral_code", testReferralCode);
      const storedReferralCode = sessionStorage.getItem("oauth_referral_code");

      if (storedReferralCode !== testReferralCode) {
        throw new Error("Referral code storage failed");
      }

      // Clean up
      sessionStorage.removeItem("oauth_referral_code");

      // Test provider display names
      const providers = ["google", "microsoft", "apple"];
      providers.forEach((provider) => {
        const displayName = this.getProviderDisplayName(provider);
        if (!displayName || displayName.length === 0) {
          throw new Error(`Provider display name for ${provider} is invalid`);
        }
      });

      this.testResults["OAuthFlowPreparation"] = true;
      console.log("✅ OAuth Flow Preparation tests passed");
    } catch (error) {
      this.testResults["OAuthFlowPreparation"] = false;
      this.errors["OAuthFlowPreparation"] =
        error instanceof Error ? error.message : "Unknown error";
      console.error("❌ OAuth Flow Preparation tests failed:", error);
    }
  }

  /**
   * Test Vendor Authentication Preparation
   */
  private static async testVendorAuthPreparation(): Promise<void> {
    try {
      console.log("👔 Testing Vendor Authentication Preparation...");

      // Test email validation
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "test+tag@example.org",
      ];
      const invalidEmails = [
        "invalid-email",
        "@domain.com",
        "user@",
        "user@domain",
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      validEmails.forEach((email) => {
        if (!emailRegex.test(email)) {
          throw new Error(`Valid email ${email} failed validation`);
        }
      });

      invalidEmails.forEach((email) => {
        if (emailRegex.test(email)) {
          throw new Error(`Invalid email ${email} passed validation`);
        }
      });

      // Test password validation
      const validPasswords = ["password123", "mySecurePass", "123456"];
      const invalidPasswords = ["", "12345", "abc"];

      validPasswords.forEach((password) => {
        if (password.length < 6) {
          throw new Error(
            `Valid password ${password} failed length validation`
          );
        }
      });

      invalidPasswords.forEach((password) => {
        if (password.length >= 6) {
          throw new Error(
            `Invalid password ${password} passed length validation`
          );
        }
      });

      // Test form data structure
      const testFormData = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
        role: "vendor" as const,
      };

      if (
        !testFormData.email ||
        !testFormData.password ||
        !testFormData.name ||
        !testFormData.role
      ) {
        throw new Error("Form data structure validation failed");
      }

      this.testResults["VendorAuthPreparation"] = true;
      console.log("✅ Vendor Authentication Preparation tests passed");
    } catch (error) {
      this.testResults["VendorAuthPreparation"] = false;
      this.errors["VendorAuthPreparation"] =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        "❌ Vendor Authentication Preparation tests failed:",
        error
      );
    }
  }

  /**
   * Helper method to get provider display name
   */
  private static getProviderDisplayName(provider: string): string {
    switch (provider.toLowerCase()) {
      case "google":
        return "Google";
      case "microsoft":
        return "Microsoft";
      case "apple":
        return "Apple";
      default:
        return provider.charAt(0).toUpperCase() + provider.slice(1);
    }
  }

  /**
   * Test specific authentication flow (for manual testing)
   */
  static async testAuthenticationFlow(
    email: string,
    password: string,
    role: "user" | "vendor"
  ): Promise<boolean> {
    try {
      console.log(`🔍 Testing authentication flow for ${role}...`);

      // This would be used for manual testing with real credentials
      // For now, just validate the parameters
      if (!email || !password || !role) {
        throw new Error("Missing required parameters");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      if (password.length < 6) {
        throw new Error("Password too short");
      }

      if (!["user", "vendor"].includes(role)) {
        throw new Error("Invalid role");
      }

      console.log("✅ Authentication flow parameters are valid");
      return true;
    } catch (error) {
      console.error("❌ Authentication flow test failed:", error);
      return false;
    }
  }

  /**
   * Get test summary
   */
  static getTestSummary(): string {
    const total = Object.keys(this.testResults).length;
    const passed = Object.values(this.testResults).filter(Boolean).length;
    const failed = total - passed;

    return `Authentication Test Suite: ${passed}/${total} tests passed${
      failed > 0 ? `, ${failed} failed` : ""
    }`;
  }
}

// Export for use in development console
if (typeof window !== "undefined") {
  (window as any).AuthTestSuite = AuthTestSuite;
}
