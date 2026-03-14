import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

export const Footer = () => {
  const navigate = useNavigate();
  const handleNavLinkClick = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      if (window.location.hash === hash) {
        window.location.hash = "";
        setTimeout(() => {
          window.location.hash = hash;
        }, 0);
      } else {
        window.location.hash = hash;
      }
    } else {
      navigate("/" + hash);
    }
  };
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
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
            </div>
            {/* TODO: Replace with a short description of your tool */}
            <p className="text-sm text-muted-foreground">
              Your tool description here. Pay once, use forever.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="#features"
                  className="hover:text-accent"
                  onClick={handleNavLinkClick("#features")}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#how-it-works"
                  className="hover:text-accent"
                  onClick={handleNavLinkClick("#how-it-works")}
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  to="#pricing"
                  className="hover:text-accent"
                  onClick={handleNavLinkClick("#pricing")}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:support@mytechpassport.com?subject=Support%20Request&body=Hi%20My%20Tech%20Passport%20Team%2C%0A%0AI%20need%20help%20with..."
                  className="hover:text-accent"
                  target="_blank"
                  rel="noopener"
                >
                  Support
                </a>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://mytechpassport.com/about"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-accent"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@mytechpassport.com?subject=General%20Enquiry&body=Hi%20My%20Tech%20Passport%20Team%2C%0A%0A"
                  className="hover:text-accent"
                  target="_blank"
                  rel="noopener"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy-policy" className="hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-accent">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/electronic-signature/terms"
                  className="hover:text-accent"
                >
                  Electronic Signature Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/e-signature-legality" className="hover:text-accent">
                  Electronic Signature Legality Statement
                </Link>
              </li>
              <li>
                <Link to="/acceptable-use-policy" className="hover:text-accent">
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} My Tech Passport. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
