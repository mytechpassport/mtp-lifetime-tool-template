import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCreditBalance } from "@/hooks/api/useCredits";

const CreditsDisplay = () => {
  const { data } = useCreditBalance();
  return (
    <span className="text-sm text-muted-foreground hidden sm:inline">
      Credits: {(data?.balance ?? 0).toFixed(2)}
    </span>
  );
};

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              {/* TODO: Replace Zap with a relevant icon for your tool */}
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              {/* TODO: Replace "Your Tool Name" with the actual tool name */}
              <span className="font-bold text-foreground hidden sm:block">
                Your Tool Name
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                by My Tech Passport
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <CreditsDisplay />
                <Button
                  size="sm"
                  onClick={handleAuthClick}
                  className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80"
                >
                  Use Tool
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <a
                  href="#features"
                  className="py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it works
                </a>
                <a
                  href="#pricing"
                  className="py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {user ? (
                  <>
                    <CreditsDisplay />
                    <Button
                      size="sm"
                      onClick={handleAuthClick}
                      className="justify-start bg-gradient-to-r from-accent to-accent/90"
                    >
                      Use Tool
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate("/auth");
                        setMobileMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        navigate("/auth");
                        setMobileMenuOpen(false);
                      }}
                      className="justify-start bg-gradient-to-r from-accent to-accent/90"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
