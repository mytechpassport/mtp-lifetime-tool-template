import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TODO: Replace with your tool's feature list
const features = [
  "Feature one",
  "Feature two",
  "Feature three",
  "Feature four",
  "Feature five",
  "Feature six",
  "Lifetime access",
  "All future updates included",
];

export const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-muted/20" id="pricing">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, one-time pricing</h2>
          <p className="text-muted-foreground text-lg">
            Pay once. Use forever. No subscriptions, no renewals.
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="rounded-2xl border-2 border-primary bg-background p-8 text-center shadow-lg">
            <div className="mb-2 text-sm font-medium text-primary uppercase tracking-wide">
              Lifetime Access
            </div>
            {/* TODO: Replace $0 with your tool's price. Use "Always free" for $0 tools, "One-time payment" for paid. */}
            <div className="mb-1 text-5xl font-bold">$0</div>
            <div className="mb-6 text-sm text-muted-foreground">
              Always free
            </div>

            <Button
              className="w-full mb-6"
              size="lg"
              onClick={() => navigate("/dashboard")}
            >
              {/* TODO: Change to "Get Lifetime Access" for paid tools */}
              Get Started Free
            </Button>

            <ul className="space-y-2.5 text-left">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Also included with My Tech Passport paid plans.{" "}
            <a
              href="https://mytechpassport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
