import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreditPacks, usePurchaseCredits } from "@/hooks/api/useCredits";
import { toast } from "sonner";
import { Check, Gift, Loader2, Zap } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface BuyCreditsModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onPurchaseComplete?: () => void;
}

export const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({
  children,
  open,
  onOpenChange,
  onPurchaseComplete,
}) => {
  const { data: packs, isLoading } = useCreditPacks();
  const purchaseCredits = usePurchaseCredits();
  const [selectedPackId, setSelectedPackId] = useState<number | null>(null);

  const selectedPack = useMemo(
    () => packs?.find((pack) => pack.id === selectedPackId) ?? packs?.[0],
    [packs, selectedPackId],
  );

  const handlePurchase = async () => {
    if (!selectedPack) return;

    try {
      const response = await purchaseCredits.mutateAsync({
        packId: selectedPack.id,
        paymentMethodType: "card",
      });

      const checkoutUrl =
        (response as { data?: { checkoutUrl?: string; url?: string } })?.data
          ?.checkoutUrl ||
        (response as { data?: { checkoutUrl?: string; url?: string } })?.data
          ?.url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error("Unable to start credit purchase.");
      }
    } catch (error) {
      toast.error("Unable to start credit purchase.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Buy AI Credits
          </DialogTitle>
          <DialogDescription>
            Purchase credits to perform AI actions
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <Gift className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">First Purchase Bonus:</span> Your
            first credit purchase includes an extra 10 credits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={`pack-skeleton-${index}`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-4">
                    <Skeleton height={20} width={100} />
                    <Skeleton height={20} width={60} />
                    <Skeleton height={20} width={80} />
                    <Skeleton height={20} width={70} />
                  </div>
                </CardContent>
              </Card>
            ))}

          {!isLoading &&
            packs?.map((pack) => (
              <Card
                key={pack.id}
                className={`cursor-pointer transition-all ${
                  selectedPack?.id === pack.id
                    ? "ring-2 ring-primary shadow-md"
                    : "hover:shadow-sm"
                }`}
                onClick={() => setSelectedPackId(pack.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg font-bold">
                        {pack.credits}
                        {pack.bonusCredits ? (
                          <span className="text-sm font-medium text-emerald-600 ml-1">
                            +{pack.bonusCredits}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        credits
                      </span>
                      {pack.bonusCredits ? (
                        <Badge className="bg-emerald-500 text-white text-xs">
                          +{pack.bonusCredits} bonus
                        </Badge>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        ${(pack.price / 100 / pack.credits).toFixed(2)}/credit
                      </span>
                      <span className="text-base font-bold">
                        ${(pack.price / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            Use across all MTP lifetime tools
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            No expiration
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={purchaseCredits.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePurchase}
            className="min-w-[200px]"
            disabled={!selectedPack || purchaseCredits.isPending}
          >
            {purchaseCredits.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {selectedPack
              ? `Purchase ${selectedPack.credits} Credits for $${(
                  selectedPack.price / 100
                ).toFixed(2)}`
              : "Select a pack"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
