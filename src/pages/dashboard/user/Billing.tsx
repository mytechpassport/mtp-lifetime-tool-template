import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUtcToUserTimezone } from "@/lib/date-utils";
import {
  createBillingPortalSession,
  getCurrentSubscription,
} from "@/services/api/subscription";
import { Loader2 } from "lucide-react";

const Billing = () => {
  const navigate = useNavigate();
  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await getCurrentSubscription();
      return response.data;
    },
  });

  const portalMutation = useMutation({
    mutationFn: async () => {
      const response = await createBillingPortalSession();
      window.location.href = response.data.url;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your plan and billing details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <Skeleton height={36} width="60%" />
          ) : (
            <div>
              <p className="text-2xl font-bold capitalize">
                {subscription?.plan ?? "entry"} plan
              </p>
              <p className="text-sm text-muted-foreground">
                {subscription?.plan === "entry"
                  ? "Free forever"
                  : subscription?.renewalDate
                  ? `Renews ${formatUtcToUserTimezone(subscription.renewalDate)}`
                  : "Renews on next billing cycle"}
              </p>
            </div>
          )}

          {subscription?.plan === "entry" ? (
            <Button onClick={() => portalMutation.mutate()} disabled={portalMutation.isPending}>
               {portalMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Upgrade to paid plan
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => portalMutation.mutate()}
              disabled={portalMutation.isPending}
            >
              {portalMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Manage billing
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
