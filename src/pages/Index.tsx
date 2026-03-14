import { PageSeo } from "@/components/seo/PageSeo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Features } from "@/components/marketing/Features";
import { Pricing } from "@/components/marketing/Pricing";
import { CTA } from "@/components/marketing/CTA";
import { Footer } from "@/components/marketing/Footer";

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
      {/* TODO: Replace title and description with your tool's SEO metadata */}
      <PageSeo
        title="Your Tool Name - My Tech Passport"
        description="Your tool description for SEO. Keep it under 160 characters."
        canonical="/"
      />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
