import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Template hero. Customize headline and copy for your MTP tool.
 */
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="mb-8 animate-fade-in px-6 py-2 text-sm font-medium"
          >
            <Zap className="mr-2 h-4 w-4" />
            MTP Tool Template
          </Badge>

          <h1 className="mb-4 max-w-5xl animate-fade-in text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Build your MTP tool on a solid foundation
          </h1>
          <p
            className="mb-6 text-lg font-medium text-primary animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Auth, billing, and dashboard ready — add your tool UI
          </p>

          <p className="mb-10 max-w-2xl animate-fade-in text-lg text-muted-foreground md:text-xl">
            This template includes cookie-based auth, user dashboard, profile, billing, support, and API keys. Same backend (backend_simple) and MTP tool conventions.
          </p>

          <div className="mb-5 flex gap-4 animate-fade-in flex-row">
            <Button
              size="default"
              className="text-base font-semibold shadow-lg h-10 px-4 py-2 lg:h-12 lg:rounded-lg lg:px-8 lg:text-base"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
            <Button
              size="default"
              variant="outline"
              className="text-base font-semibold h-10 px-4 py-2 lg:h-12 lg:rounded-lg lg:px-8 lg:text-base"
              onClick={() => navigate("/dashboard")}
            >
              Sign in to Dashboard
            </Button>
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export { Hero };
