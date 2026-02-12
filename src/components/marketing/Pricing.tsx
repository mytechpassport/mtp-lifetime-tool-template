import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="pt-16"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Start free with 2 workflows for life. Upgrade when you're ready to
            unlock unlimited automation.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Free Plan */}
          <Card className="relative overflow-hidden border-2 p-8">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                Free Forever
              </h3>
              <p className="text-muted-foreground">
                Perfect to get started and see the value
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="mb-8 space-y-4">
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    2 pre-connected workflows
                  </span>{" "}
                  for lifetime
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  Choose your department on signup
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  Access to workflow template directory
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  Connect any MyTechPassport tools
                </span>
              </li>
              <li className="flex gap-3 opacity-50">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Third-party tools
                  {/* Third-party tools (pay per tool to add) */}
                </span>
              </li>
            </ul>

            <Button size="lg" variant="outline" className="w-full">
              Get Started Free
            </Button>
          </Card>

          {/* Paid Plan */}
          <Card className="relative overflow-hidden border-2 border-accent p-8 shadow-xl">
            {/* Popular Badge */}
            <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground">
              Most Popular
            </Badge>

            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                All Bundles
              </h3>
              <p className="text-muted-foreground">
                Unlimited automation for your entire business
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm font-medium text-accent">
                Save $500+/month vs. buying tools separately
              </p>
            </div>

            <ul className="mb-8 space-y-4">
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    ALL department bundles
                  </span>{" "}
                  included
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Unlimited workflows
                  </span>{" "}
                  with one-click connection
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  Create custom workflows
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  Access to all workflow templates
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-muted-foreground">
                  Priority support and onboarding
                </span>
              </li>
            </ul>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80"
            >
              Start 7-Day Free Trial
            </Button>
          </Card>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Questions about pricing?{" "}
            <a
              href="#faq"
              className="font-semibold text-accent hover:underline"
            >
              Check our FAQ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
