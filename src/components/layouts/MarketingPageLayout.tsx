import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

const MarketingPageLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MarketingPageLayout;
