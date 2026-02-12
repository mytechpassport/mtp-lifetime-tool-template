import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/**
 * Template navbar. Add links to landing sections (e.g. #features, #pricing) as you add them to Index.
 */
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
            <img src="/logo-gold.svg" alt="MTP Tool" className="w-40" />
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <Button
                size="sm"
                onClick={handleAuthClick}
                className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
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
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 pt-2">
                {user ? (
                  <Button
                    size="sm"
                    onClick={handleAuthClick}
                    className="justify-start bg-gradient-to-r from-accent to-accent/90"
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/auth")}
                      className="justify-start"
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate("/auth")}
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
