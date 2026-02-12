import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  // Helper for scrolling to anchors on homepage from any page
  const handleNavLinkClick = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    // If we're already on home, just set location hash
    if (window.location.pathname === "/") {
      // If already at same hash, force scroll/reload by resetting hash
      if (window.location.hash === hash) {
        window.location.hash = "";
        setTimeout(() => {
          window.location.hash = hash;
        }, 0);
      } else {
        window.location.hash = hash;
      }
    } else {
      // Otherwise, navigate to home with hash
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
              <img src="/logo-gold.svg" alt="MyTechPassport" className="w-40" />
              {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent/80">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <span className="text-lg font-bold text-foreground">MyTechPassport</span> */}
            </div>
            <p className="text-sm text-muted-foreground">
              Automate Your Business in One Click.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="#bundles"
                  className="hover:text-accent"
                  onClick={handleNavLinkClick("#bundles")}
                >
                  Bundles
                </Link>
              </li>
              <li>
                <Link
                  to="#lifetime-software"
                  className="hover:text-accent"
                  onClick={handleNavLinkClick("#lifetime-software")}
                >
                  Lifetime Software
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
              <li>
                <Link
                  to="#"
                  className="hover:text-accent"
                  onClick={handleNavLinkClick("#workflow-templates")}
                >
                  Workflow Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-accent">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent">
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="#faq"
                  className="hover:text-accent"
                  onClick={handleNavLinkClick("#faq")}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent">
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
                <Link to="#" className="hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-accent">
                  Contact
                </Link>
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
            &copy; {new Date().getFullYear()} MyTechPassport. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
