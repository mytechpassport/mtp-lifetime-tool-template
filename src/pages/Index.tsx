import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { CTA } from "@/components/marketing/CTA";
import { Footer } from "@/components/marketing/Footer";

/**
 * Landing page for the MTP tool template.
 * Customize Hero, CTA, and add sections (e.g. HowItWorks, FAQ) as needed for your tool.
 */
const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
