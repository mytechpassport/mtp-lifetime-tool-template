/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProfile, updateProfile } from "@/services/api/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import vce from "@/lib/vce";
import { useNavigate } from "react-router-dom";

type PayoutDetails = Record<string, string>;

const payoutDefaults: Record<string, PayoutDetails> = {
  bank: {
    account_name: "",
    account_number: "",
    routing_number: "",
    bank_name: "",
    swift: "",
  },
  airwallex: {
    account_name: "",
    account_number: "",
    iban: "",
    bic: "",
  },
  stripe: {},
};

const Profile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getProfile();
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated.");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => toast.error("Failed to update profile."),
  });

  const [payoutMethodType, setPayoutMethodType] = useState<
    "bank" | "airwallex" | "stripe" | ""
  >("");
  const [payoutDetails, setPayoutDetails] = useState<PayoutDetails>({});
  const [defaultPaymentMethodType, setDefaultPaymentMethodType] = useState<
    "card" | "credits" | ""
  >("");
  const [companyName, setCompanyName] = useState("");
  const [stripeStatus, setStripeStatus] = useState<{
    connected: boolean;
    loading: boolean;
  }>({ connected: false, loading: false });
  const [isConnectingStripe, setIsConnectingStripe] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setPayoutMethodType((profile.payoutMethodType ?? "") as any);
    setPayoutDetails(profile.payoutMethodDetails ?? {});
    setDefaultPaymentMethodType(
      (profile.defaultPaymentMethodType ?? "") as any,
    );
    setCompanyName(profile.companyName ?? "");
  }, [profile]);

  const currentPayoutDetails = useMemo(() => {
    if (!payoutMethodType) return {};
    return { ...payoutDefaults[payoutMethodType], ...payoutDetails };
  }, [payoutDetails, payoutMethodType]);

  const updateDetail = (key: string, value: string) => {
    setPayoutDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    mutation.mutate({
      companyName,
      payoutMethodType: payoutMethodType || null,
      payoutMethodDetails:
        payoutMethodType &&
        payoutMethodType !== "stripe" &&
        Object.keys(payoutDetails).length > 0
          ? payoutDetails
          : undefined,
      defaultPaymentMethodType: defaultPaymentMethodType || null,
    });
  };

  const handleConnectStripe = async () => {
    try {
      setIsConnectingStripe(true);
      const response = await vce.initiateStripeConnect("/dashboard/profile");
      window.location.href = response.oauthUrl;
    } catch (error) {
      toast.error("Unable to start Stripe connection.");
      setIsConnectingStripe(false);
    }
  };

  useEffect(() => {
    if (payoutMethodType !== "stripe") return;
    let isMounted = true;

    const fetchStatus = async () => {
      try {
        setStripeStatus((prev) => ({ ...prev, loading: true }));
        const response = await vce.getStripeConnection();
        if (!isMounted) return;
        setStripeStatus({ connected: response.connected, loading: false });
      } catch (error) {
        if (!isMounted) return;
        setStripeStatus({ connected: false, loading: false });
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, [payoutMethodType]);

  const renderPayoutForm = () => {
    if (!payoutMethodType) return null;

    if (payoutMethodType === "bank") {
      return (
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Account name</Label>
              <Input
                value={currentPayoutDetails.account_name}
                onChange={(event) =>
                  updateDetail("account_name", event.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Account number</Label>
              <Input
                value={currentPayoutDetails.account_number}
                onChange={(event) =>
                  updateDetail("account_number", event.target.value)
                }
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Routing number</Label>
              <Input
                value={currentPayoutDetails.routing_number}
                onChange={(event) =>
                  updateDetail("routing_number", event.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Bank name</Label>
              <Input
                value={currentPayoutDetails.bank_name}
                onChange={(event) =>
                  updateDetail("bank_name", event.target.value)
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>SWIFT / BIC</Label>
            <Input
              value={currentPayoutDetails.swift}
              onChange={(event) => updateDetail("swift", event.target.value)}
            />
          </div>
        </div>
      );
    }

    if (payoutMethodType === "airwallex") {
      return (
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Account name</Label>
              <Input
                value={currentPayoutDetails.account_name}
                onChange={(event) =>
                  updateDetail("account_name", event.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Account number</Label>
              <Input
                value={currentPayoutDetails.account_number}
                onChange={(event) =>
                  updateDetail("account_number", event.target.value)
                }
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>IBAN</Label>
              <Input
                value={currentPayoutDetails.iban}
                onChange={(event) => updateDetail("iban", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>BIC</Label>
              <Input
                value={currentPayoutDetails.bic}
                onChange={(event) => updateDetail("bic", event.target.value)}
              />
            </div>
          </div>
        </div>
      );
    }

    if (payoutMethodType === "stripe") {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant={stripeStatus.connected ? "default" : "secondary"}>
              {stripeStatus.connected ? "Stripe connected" : "Not connected"}
            </Badge>
            {stripeStatus.loading ? (
              <span className="text-xs text-muted-foreground">
                Checking status...
              </span>
            ) : null}
          </div>
          <Button
            variant="outline"
            onClick={handleConnectStripe}
            disabled={isConnectingStripe}
          >
            {isConnectingStripe && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {stripeStatus.connected ? "Reconnect Stripe" : "Connect Stripe"}
          </Button>
          <p className="text-xs text-muted-foreground">
            You will be redirected to Stripe to securely connect your payout
            account.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and payout preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Basic account details (read-only)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton height={40} />
              <Skeleton height={40} />
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={profile?.email ?? ""} disabled />
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={profile?.name ?? ""} disabled />
              </div>
              {/* <div className="space-y-2">
                <Label>Company name</Label>
                <Input
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  placeholder="Optional"
                />
              </div> */}
            </>
          )}
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Payout Method (Affiliate Earnings)</CardTitle>
          <CardDescription>
            Configure how you receive affiliate payouts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Payout method</Label>
          <Select
            value={payoutMethodType || undefined}
            onValueChange={(value) => {
              const nextValue = value as "bank" | "airwallex" | "stripe";
              setPayoutMethodType(nextValue);
              setPayoutDetails(payoutDefaults[nextValue] ?? {});
            }}
          >
              <SelectTrigger>
                <SelectValue placeholder="Select payout method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="airwallex">Airwallex</SelectItem>
                <SelectItem value="stripe">Stripe Connect</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {renderPayoutForm()}
        </CardContent>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Default Payment Method</CardTitle>
          <CardDescription>
            Choose how you prefer to pay for tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={defaultPaymentMethodType || undefined}
            onValueChange={(value) =>
              setDefaultPaymentMethodType(value as "card" | "credits")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select default payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">Card (Stripe)</SelectItem>
              <SelectItem value="credits">Credits</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Developer Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/api-keys")}
          >
            Manage API Keys
          </Button>
          {/* <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save changes
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
