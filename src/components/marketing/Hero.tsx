import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle2 } from "lucide-react";
import { ToolLandingCTA } from "@/components/marketing/ToolLandingCTA";

// TODO: Replace with your tool's slug (e.g. "ai-writer", "qr-generator")
const TOOL_SLUG = "your-tool-slug";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="mb-6 animate-fade-in px-5 py-2 text-sm font-medium"
          >
            {/* TODO: Replace Zap with a relevant icon for your tool */}
            <Zap className="mr-2 h-4 w-4" />
            {/* TODO: Replace badge text - e.g. "Lifetime Access - Pay Once" or "Free Lifetime Access" */}
            Lifetime Access - Pay Once
          </Badge>

          {/* TODO: Replace with your tool's headline */}
          <h1 className="mb-4 max-w-4xl animate-fade-in text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Your Tool Headline{" "}
            <span className="text-primary">Goes Here</span>
          </h1>

          {/* TODO: Replace with a short subtitle */}
          <p
            className="mb-4 text-lg font-medium text-primary animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Short subtitle describing the core value
          </p>

          {/* TODO: Replace with a longer description */}
          <p className="mb-8 max-w-2xl animate-fade-in text-lg text-muted-foreground md:text-xl">
            Longer description of what your tool does and who it is for. Keep it
            to 1-2 sentences. Focus on the outcome for the user.
          </p>

          {/* TODO: Replace feature pill text with your tool's key features */}
          <div
            className="mb-8 flex flex-wrap justify-center gap-2 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {[
              "Feature one",
              "Feature two",
              "Feature three",
              "Feature four",
              "Pay once, use forever",
            ].map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <CheckCircle2 className="h-3 w-3 text-primary" />
                {f}
              </span>
            ))}
          </div>

          <div
            className="mb-6 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <ToolLandingCTA toolSlug={TOOL_SLUG} />
          </div>

          {/* TODO: Replace with relevant bottom text */}
          <p
            className="text-sm text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            One-time payment - Unlimited use - Lifetime access
          </p>
        </div>

        {/* TODO: Replace the 3 feature cards with your tool's key features */}
        <div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="rounded-xl border border-border bg-background/80 backdrop-blur p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Feature Card 1</h3>
            <p className="text-sm text-muted-foreground">
              Short description of this key feature or benefit.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background/80 backdrop-blur p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Feature Card 2</h3>
            <p className="text-sm text-muted-foreground">
              Short description of this key feature or benefit.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background/80 backdrop-blur p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Feature Card 3</h3>
            <p className="text-sm text-muted-foreground">
              Short description of this key feature or benefit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
