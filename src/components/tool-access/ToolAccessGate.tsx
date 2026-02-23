import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToolBySlug, useConnectTool } from "@/hooks/api/useTools";
import type { ToolCatalogItem } from "@/types/mtp";

const MTP_BROWSE_URL = "https://mytechpassport.com/dashboard/browse-tools";

type ToolAccessGateProps = {
  slug: string;
  children: React.ReactNode;
  /** When true, tool can be used without login; show dismissible Connect/Buy banner when user present but not connected. */
  noLoginTool?: boolean;
  /** Main app URL for purchase redirect. */
  purchaseBaseUrl?: string;
};

/**
 * Fetches tool by slug and:
 * - Shows loading while fetching.
 * - Blocks with "Tool unavailable" if 404 or disabled.
 * - For login-required tools: blocks with Connect / Buy when no access.
 * - For no-login tools (noLoginTool): always shows children; optional dismissible Connect/Buy banner when logged in but not connected.
 * Use slug from your backend (e.g. free: "timezone-converter", "qr-generator"; paid: "whiteboard", "ai-transcription").
 */
export function ToolAccessGate({
  slug,
  children,
  noLoginTool = false,
  purchaseBaseUrl = MTP_BROWSE_URL,
}: ToolAccessGateProps) {
  const { data: tool, isLoading, isError } = useToolBySlug(slug);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" aria-hidden />
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (isError || !tool) {
    return (
      <div className="container max-w-2xl py-12 px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="rounded-full bg-muted p-4">
            <Wrench className="h-10 w-10 text-muted-foreground" aria-hidden />
          </div>
          <h1 className="text-xl font-semibold">Tool unavailable</h1>
          <p className="text-muted-foreground">
            This tool doesn&apos;t exist or isn&apos;t available right now.
          </p>
          <Button asChild variant="outline">
            <a href={MTP_BROWSE_URL} target="_blank" rel="noopener noreferrer">
              Browse tools
            </a>
          </Button>
        </div>
      </div>
    );
  }

  const hasAccess = Boolean(tool.connected ?? tool.owned ?? tool.includedInPlan);
  const isFree = tool.pricingModel === "free" || (tool.lifetimePrice === 0 || tool.lifetimePrice == null);
  const showBanner =
    noLoginTool && !hasAccess && tool.id && !bannerDismissed;

  return (
    <div className="font-sans bg-canvas min-h-full w-full p-4">
      {showBanner && (
        <ConnectOrBuyBanner
          tool={tool}
          isFree={isFree}
          purchaseBaseUrl={purchaseBaseUrl}
          onDismiss={() => setBannerDismissed(true)}
        />
      )}
      {!noLoginTool && !hasAccess && tool.id ? (
        <BlockedView tool={tool} isFree={isFree} purchaseBaseUrl={purchaseBaseUrl} />
      ) : (
        children
      )}
    </div>
  );
}

function ConnectOrBuyBanner({
  tool,
  isFree,
  purchaseBaseUrl,
  onDismiss,
  user,
  navigate,
}: {
  tool: ToolCatalogItem;
  isFree: boolean;
  purchaseBaseUrl: string;
  onDismiss: () => void;
  user?: { id?: number } | null;
  navigate: (path: string) => void;
}) {
  const connectMutation = useConnectTool();
  const handleConnect = async () => {
    if (isFree && !user) {
      navigate("/dashboard");
      return;
    }
    try {
      await connectMutation.mutateAsync({ toolId: tool.id });
    } catch {
      // useConnectTool shows error
    }
  };
  const purchaseUrl = `${purchaseBaseUrl}?purchase-tool=${tool.slug}`;

  return (
    <Card className="mb-6 border-amber-500/50 bg-amber-500/5 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle className="text-lg pr-8">
          {isFree ? "Connect this tool" : "Purchase to unlock"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isFree
            ? "You can use this tool without an account. Sign in and connect to save it to your account."
            : "Purchase once for lifetime access."}
        </p>
      </CardHeader>
      <CardContent className="flex gap-2">
        {isFree ? (
          <Button onClick={handleConnect} disabled={connectMutation.isPending}>
            {connectMutation.isPending ? "Connecting…" : "Connect"}
          </Button>
        ) : (
          <Button asChild>
            <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
              Buy
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function BlockedView({
  tool,
  isFree,
  purchaseBaseUrl,
}: {
  tool: ToolCatalogItem;
  isFree: boolean;
  purchaseBaseUrl: string;
}) {
  const connectMutation = useConnectTool();
  const purchaseUrl = `${purchaseBaseUrl}?purchase-tool=${tool.slug}`;

  const handleConnect = async () => {
    try {
      await connectMutation.mutateAsync({ toolId: tool.id });
    } catch {
      // useConnectTool shows error
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-lg">
          {isFree ? "Connect this tool" : "Purchase required"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isFree
            ? "Connect this tool to your account to use it."
            : `Purchase once for lifetime access.`}
        </p>
      </CardHeader>
      <CardContent>
        {isFree ? (
          <Button onClick={handleConnect} disabled={connectMutation.isPending}>
            {connectMutation.isPending ? "Connecting…" : "Connect"}
          </Button>
        ) : (
          <Button asChild>
            <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
              Buy on mytechpassport.com
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
