import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BuyCreditsModal } from "@/components/dashboard/BuyCreditsModal";
import { useAuth } from "@/hooks/useAuth";
import {
  useToolBySlug,
  useConnectTool,
  usePurchaseTool,
} from "@/hooks/api/useTools";
import { useSubscription } from "@/hooks/api/useSubscription";
import { useCreditBalance } from "@/hooks/api/useCredits";
import { formatCurrency } from "@/lib/format";
import type { ToolCatalogItem } from "@/types/mtp";

export type ToolLandingCTAProps = {
  /** Backend slug for the tool (e.g. "manipulate-images"). Used to fetch live price, ownership, and access data. */
  toolSlug: string;
  /** Route to navigate to after connecting / purchasing. Defaults to "/dashboard". */
  dashboardPath?: string;
};

/** Returns true if the tool is free or exactly $0 with no fractions. */
function isZeroOrFree(tool: ToolCatalogItem): boolean {
  const pricingModel = String(tool.pricingModel ?? "").toLowerCase();
  if (pricingModel === "free") return true;
  if (tool.lifetimePrice === 0 || tool.lifetimePrice == null) return true;
  return false;
}

function isSubscriptionTool(tool: ToolCatalogItem): boolean {
  return String(tool.pricingModel ?? "").toLowerCase() === "subscription";
}

/**
 * Smart CTA button for MTP lifetime tool landing pages.
 *
 * Handles all scenarios:
 * - Not logged in: shows "Buy Now For $X.XX" (paid) or "Use Tool" ($0 / free) → navigates to /dashboard
 * - Logged in, plan includes tool for free (mtpToolsFree / includedInPlan): shows "Use Tool" → connects then redirects.
 *   Also shows "Buy Now For $X.XX" alongside so user can still purchase the tool outright if desired.
 * - Logged in, already purchased / connected: shows "Use Tool" → connects if needed then redirects
 * - Logged in, not purchased, price === $0: shows "Use Tool" → purchases with credits silently then redirects
 * - Logged in, not purchased, price > $0: shows "Buy Now For $X.XX" → opens purchase modal, then redirects on success
 *
 * Plan features are fetched dynamically from the subscription API so admin changes propagate automatically
 * without any frontend code changes.
 *
 * Reusable across all MTP lifetime tool codebases — only `toolSlug` is tool-specific.
 */
export function ToolLandingCTA({
  toolSlug,
  dashboardPath = "/dashboard",
}: ToolLandingCTAProps) {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const isLoggedIn = Boolean(user);

  // Tool data — by-slug uses optionalAuth so works for both logged-in and anonymous users
  const toolQuery = useToolBySlug(toolSlug);
  const tool = toolQuery.data ?? null;

  // Subscription / plan features — only fetched when user is logged in
  const subscriptionQuery = useSubscription();
  const planData = subscriptionQuery.data?.data ?? null;

  const creditBalanceQuery = useCreditBalance();

  const connectMutation = useConnectTool();
  const purchaseMutation = usePurchaseTool();

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showBuyCredits, setShowBuyCredits] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credits" | "card">(
    "card",
  );
  const [selectedTier, setSelectedTier] = useState<string>("");

  // ── Loading states ──────────────────────────────────────────────────────────
  const isToolLoading = toolQuery.isLoading;
  const isSubscriptionLoading = isLoggedIn && subscriptionQuery.isLoading;
  const isInitializing = authLoading || isToolLoading || isSubscriptionLoading;

  // ── Access checks ───────────────────────────────────────────────────────────
  const toolType = String(tool?.toolType ?? "").toLowerCase();

  /**
   * Dynamic plan-feature check: plan features are controlled by admins via the admin hub.
   * mtpToolsFree → user's plan covers MTP original tools at no extra cost.
   * The subscription API reflects the latest admin-configured plan features, so no
   * frontend code changes are needed when plan features are updated.
   */
  const accessViaPlanFeatures =
    isLoggedIn &&
    planData !== null &&
    ((toolType === "mtp_original" && Boolean(planData.mtpToolsFree)) ||
      // includedInPlan is already computed server-side combining all feature flags
      Boolean(tool?.includedInPlan));

  // Whether user can access the tool at all (any reason)
  const hasAccess = Boolean(
    tool?.connected ||
    tool?.owned ||
    tool?.includedInPlan ||
    accessViaPlanFeatures,
  );

  // Whether user's access comes from their subscription plan (NOT from a direct purchase/subscription).
  // purchasedDirectly is a backend-computed field: true only when an actual purchase or tool subscription
  // record exists. tool.owned is true for BOTH cases (plan access and purchase), so we cannot use it here.
  // When hasPlanOnlyAccess is true, show "Use Tool" + "Buy Now" side-by-side so the user can still
  // purchase the tool outright even though their plan already gives them access.
  const hasPlanOnlyAccess =
    isLoggedIn &&
    !tool?.purchasedDirectly &&
    Boolean(tool?.includedInPlan || accessViaPlanFeatures);

  const toolIsFree = tool ? isZeroOrFree(tool) : false;
  const isSubscription = tool ? isSubscriptionTool(tool) : false;
  const price = tool?.lifetimePrice ?? 0;
  const formattedPrice = formatCurrency(price);

  // Show "Buy Now" button alongside "Use Tool" only when:
  // - user has plan-only access (not purchased), AND
  // - tool has a real price (not free / $0), AND
  // - tool is not subscription-based
  const showBuyAlongside = hasPlanOnlyAccess && !toolIsFree && !isSubscription;

  // ── Button label (for the primary / single button) ──────────────────────────
  const getButtonLabel = (): string => {
    if (!tool) return "Use Tool";

    if (!isLoggedIn) {
      if (toolIsFree) return "Use Tool";
      if (isSubscription) {
        const firstTier = tool.pricingTiers?.[0];
        return firstTier
          ? `Subscribe from ${formatCurrency(firstTier.price)}`
          : "Subscribe";
      }
      return `Buy Now For ${formattedPrice}`;
    }

    // Logged in: has access (via plan, purchase, or existing connection)
    if (hasAccess) return "Use Tool";

    // Logged in, no access yet
    if (toolIsFree) return "Use Tool"; // $0 tool — silent credits purchase on click
    if (isSubscription) {
      const firstTier = tool.pricingTiers?.[0];
      return firstTier
        ? `Subscribe from ${formatCurrency(firstTier.price)}`
        : "Subscribe";
    }
    return `Buy Now For ${formattedPrice}`;
  };

  // ── Click handler — "Use Tool" ──────────────────────────────────────────────
  const handleClick = async () => {
    // Not logged in → send to dashboard (login page)
    if (!isLoggedIn) {
      navigate(dashboardPath);
      return;
    }

    if (!tool) {
      navigate(dashboardPath);
      return;
    }

    // Already has access (plan / purchased / connected)
    if (hasAccess) {
      if (!tool.connected) {
        try {
          await connectMutation.mutateAsync({ toolId: tool.id });
        } catch {
          // useConnectTool already shows an error toast
          return;
        }
      }
      navigate(dashboardPath);
      return;
    }

    // No access yet — free / $0 tool: purchase silently with credits (no modal)
    if (toolIsFree) {
      try {
        const response = await purchaseMutation.mutateAsync({
          toolId: tool.id,
          paymentMethodType: "credits",
        });
        const data = (response as { data?: Record<string, unknown> })?.data;
        const checkoutUrl =
          (data?.checkoutUrl as string | undefined) ||
          (data?.url as string | undefined);
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
        navigate(dashboardPath);
      } catch {
        // usePurchaseTool already shows an error toast
      }
      return;
    }

    // No access, paid or subscription tool → open purchase modal
    if (isSubscription) {
      const firstTier = tool.pricingTiers?.[0];
      setSelectedTier(firstTier?.tier ?? "");
    }
    setShowPurchaseModal(true);
  };

  // ── Click handler — "Buy Now" (alongside Use Tool for plan-access users) ────
  const handleBuyAside = () => {
    if (!tool) return;
    if (isSubscription) {
      const firstTier = tool.pricingTiers?.[0];
      setSelectedTier(firstTier?.tier ?? "");
    }
    setShowPurchaseModal(true);
  };

  // ── Purchase modal confirm ──────────────────────────────────────────────────
  const handlePurchase = async () => {
    if (!tool) return;

    // Subscription purchase — card only
    if (isSubscription) {
      const tier = selectedTier || (tool.pricingTiers?.[0]?.tier ?? "");
      if (!tier) return;
      try {
        const response = await purchaseMutation.mutateAsync({
          toolId: tool.id,
          paymentMethodType: "card",
          tier,
        } as Parameters<typeof purchaseMutation.mutateAsync>[0]);
        const data = (response as { data?: Record<string, unknown> })?.data;
        const checkoutUrl =
          (data?.checkoutUrl as string | undefined) ||
          (data?.url as string | undefined);
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
        setShowPurchaseModal(false);
        navigate(dashboardPath);
      } catch {
        // usePurchaseTool already shows an error toast
      }
      return;
    }

    // Lifetime purchase — check credit balance first if paying with credits
    if (paymentMethod === "credits") {
      const balance = creditBalanceQuery.data?.balance ?? 0;
      if (balance < price) {
        setShowBuyCredits(true);
        return;
      }
    }

    try {
      const response = await purchaseMutation.mutateAsync({
        toolId: tool.id,
        paymentMethodType: paymentMethod,
      });
      const data = (response as { data?: Record<string, unknown> })?.data;
      const checkoutUrl =
        (data?.checkoutUrl as string | undefined) ||
        (data?.url as string | undefined);
      const toolRedirectUrl = data?.toolRedirectUrl as
        | string
        | null
        | undefined;

      if (checkoutUrl) {
        // Stripe card checkout — redirect to Stripe, success handled on return
        window.location.href = checkoutUrl;
        return;
      }

      if (toolRedirectUrl && typeof toolRedirectUrl === "string") {
        window.location.href = toolRedirectUrl;
        return;
      }

      // Credits purchase success — close modal and go to dashboard
      setShowPurchaseModal(false);
      setPaymentMethod("card");
      navigate(dashboardPath);
    } catch {
      // usePurchaseTool already shows an error toast
    }
  };

  const isActionPending =
    connectMutation.isPending || purchaseMutation.isPending;
  const buttonLabel = getButtonLabel();

  return (
    <>
      {/* ── CTA button(s) ── */}
      {showBuyAlongside ? (
        // Plan-only access: "Use Tool" + "Buy Now" side by side
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            size="default"
            variant="default"
            onClick={handleClick}
            disabled={isInitializing || isActionPending}
          >
            {/* {(isInitializing || connectMutation.isPending) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            )} */}
            {isInitializing ? "Loading…" : "Use Tool"}
          </Button>
          <Button
            size="default"
            variant="outline"
            onClick={handleBuyAside}
            disabled={isInitializing || isActionPending}
          >
            {purchaseMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            )}
            {`Buy Now For ${formattedPrice}`}
          </Button>
        </div>
      ) : (
        // Standard: single button
        <Button
          size="default"
          variant="default"
          onClick={handleClick}
          disabled={isInitializing || isActionPending}
        >
          {/* {(isInitializing || isActionPending) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
          )} */}
          {isInitializing ? "Loading…" : buttonLabel}
        </Button>
      )}

      {/* ── Purchase modal — mirrors BrowseTools.tsx purchase dialog ── */}
      <Dialog
        open={showPurchaseModal}
        onOpenChange={(open) => {
          if (!open && !purchaseMutation.isPending) {
            setShowPurchaseModal(false);
            setPaymentMethod("card");
            setSelectedTier("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isSubscription
                ? `Subscribe to ${tool?.name ?? "Tool"}`
                : `Purchase ${tool?.name ?? "Tool"}`}
            </DialogTitle>
          </DialogHeader>

          {isSubscription ? (
            // Subscription: tier selector
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose a subscription plan. Payment is recurring and can be
                cancelled at any time.
              </p>
              {(tool?.pricingTiers ?? []).length > 0 ? (
                <RadioGroup
                  value={selectedTier || (tool?.pricingTiers?.[0]?.tier ?? "")}
                  onValueChange={setSelectedTier}
                  className="space-y-3"
                >
                  {(tool?.pricingTiers ?? []).map((tier) => (
                    <div
                      key={tier.tier}
                      className="flex items-start space-x-2 border rounded-md p-3"
                    >
                      <RadioGroupItem
                        value={tier.tier}
                        id={`cta-tier-${tier.tier}`}
                        className="mt-0.5"
                      />
                      <Label
                        htmlFor={`cta-tier-${tier.tier}`}
                        className="cursor-pointer flex-1"
                      >
                        <span className="font-medium">
                          {tier.name || tier.tier}
                        </span>
                        <span className="ml-2 text-muted-foreground">
                          {formatCurrency(tier.price)}/
                          {tier.interval ?? "month"}
                        </span>
                        {(tier.features?.length ?? 0) > 0 && (
                          <ul className="mt-1 text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                            {tier.features.slice(0, 3).map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <p className="text-sm text-destructive">
                  No subscription plans configured.
                </p>
              )}
            </div>
          ) : (
            // Lifetime: payment method + price description
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {tool?.lifetimePrice && Number(tool.lifetimePrice) > 0
                  ? `One-time payment of ${formatCurrency(Number(tool.lifetimePrice))}. Yours forever.`
                  : "This tool is free — just confirm to activate it."}
              </p>
              {tool?.lifetimePrice && Number(tool.lifetimePrice) > 0 && (
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(value as "credits" | "card")
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="tool-cta-pay-card" />
                    <Label htmlFor="tool-cta-pay-card">
                      Pay With Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credits" id="tool-cta-pay-credits" />
                    <Label htmlFor="tool-cta-pay-credits">
                      Pay With Credits (Balance:{" "}
                      {(creditBalanceQuery.data?.balance ?? 0).toFixed(2)})
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPurchaseModal(false);
                setPaymentMethod("card");
                setSelectedTier("");
              }}
              disabled={purchaseMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={purchaseMutation.isPending}
            >
              {purchaseMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              )}
              Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BuyCreditsModal
        open={showBuyCredits}
        onOpenChange={setShowBuyCredits}
        onPurchaseComplete={() => {
          setShowBuyCredits(false);
          setShowPurchaseModal(false);
        }}
      />
    </>
  );
}
