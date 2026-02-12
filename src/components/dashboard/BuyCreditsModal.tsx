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
import { Check, CreditCard, Gift, Loader2, Zap } from "lucide-react";
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
    [packs, selectedPackId]
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
        toast.success("Credit purchase started.");
      }

      onPurchaseComplete?.();
      onOpenChange?.(false);
    } catch (error) {
      toast.error("Unable to start credit purchase.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children ? <DialogTrigger asChild>{children}</DialogTrigger> : null}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Buy AI Credits
          </DialogTitle>
          <DialogDescription>
            Purchase credits to unlock premium features and tools
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
          <Gift className="w-6 h-6 text-amber-600" />
          <div>
            <p className="font-semibold text-amber-900">
              First Purchase Bonus
            </p>
            <p className="text-sm text-amber-700">
              Your first credit purchase includes an extra +10 credits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={`pack-skeleton-${index}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Skeleton height={22} width={140} />
                      <Skeleton height={14} width={180} />
                    </div>
                    <Skeleton height={22} width={70} />
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton height={32} width={120} />
                    <Skeleton height={12} width={60} />
                  </div>
                  <div className="text-center">
                    <Skeleton height={24} width={80} />
                    <Skeleton height={12} width={120} />
                  </div>
                  <div className="space-y-2">
                    <Skeleton height={14} width="80%" />
                    <Skeleton height={14} width="70%" />
                    <Skeleton height={14} width="60%" />
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
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedPackId(pack.id)}
              >
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      {/* <h3 className="text-xl font-bold">
                        {pack.credits} Credits
                      </h3> */}
                     
                    </div>
                    {pack.bonusCredits ? (
                      <Badge className="bg-emerald-500 text-white">
                        +{pack.bonusCredits} bonus
                      </Badge>
                    ) : null}
                  </div>

                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold">
                      {pack.credits}
                      {pack.bonusCredits ? (
                        <span className="text-lg text-emerald-600">
                          +{pack.bonusCredits}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm text-muted-foreground">Credits</p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      ${(pack.price / 100).toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ${(pack.price / 100 / pack.credits).toFixed(2)} per credit
                    </p>
                  </div>

                
                </CardContent>
              </Card>
            ))}
        </div>
  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      Use across all MTP lifetime tools
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
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
            className="min-w-[220px]"
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
