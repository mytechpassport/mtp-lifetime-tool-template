import { Button } from "@/components/ui/button";
import { ArrowRight, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16" id="cta">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl border-2 border-accent/20 p-12 text-center lg:p-16"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Minimize2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Ready to get started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
              Sign up now and transform your workflow today. Pay once, use forever.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group h-14 gap-2 bg-gradient-to-r from-accent to-accent/90 px-8 text-lg font-semibold shadow-lg transition-all hover:from-accent/90 hover:to-accent/80 hover:shadow-xl"
                onClick={() => navigate("/auth")}
              >
                Get Started - Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>✓ One-time payment</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ Lifetime access</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ No recurring fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
