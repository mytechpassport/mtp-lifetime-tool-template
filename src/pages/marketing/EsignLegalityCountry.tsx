import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCountries } from "@/utils/esignLegalityContent";

export default function EsignLegalityCountry() {
  const navigate = useNavigate();

  // Get all countries from the utility function
  const allCountries = useMemo(() => {
    return getAllCountries().sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Handle country selection
  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = e.target.value;
    if (selectedSlug) {
      navigate(`/e-signature-legality/${selectedSlug}`);
    }
  };

  return (
    <div className="legality-page font-sans text-[#1f2937] bg-white leading-relaxed">
      {/* 1. Hero Section */}
      <section className="legality-hero bg-gradient-to-b from-[#f0fdf9] to-white py-20 px-6 text-center">
        <div className="legality-container max-w-[1000px] mx-auto px-6">
          <h1 className="text-[3rem] font-extrabold tracking-tight mb-4 text-[#111827] sm:text-2xl">
            Global e-Signature Legality Guide
          </h1>
          <p className="text-xl text-[#6b7280] max-w-xl mx-auto">
            Comprehensive guide to e-signature legality across differnet
            countries. Secure, compliant, and legally binding worldwide.
          </p>
        </div>
      </section>

      <main className="legality-container max-w-[1000px] mx-auto px-6">
        {/* 2. Core Policy Content (From your index.md) */}
        {/* We hardcode this structure for better design control than Markdown */}

        <div className="policy-section flex flex-col gap-6 mb-16 p-8 bg-white border border-[#e5e7eb] rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#00C897] transition-transform transition-shadow transition-colors duration-200">
          <h2 className="text-2xl font-bold text-[#111827] mb-2 relative pl-4 flex items-center before:content-[''] before:absolute before:left-0 before:top-[10%] before:bottom-[10%] before:w-1 before:bg-[#00C897] before:rounded-sm">
            Electronic Signatures Are Legal
          </h2>
          <p className="text-[#374151] mb-4">
            My Tech Passport E-sign provides you with a legally binding
            eSignature solution for your contract needs. We comply with the
            requirements of the <strong>U.S. ESIGN Act of 2000</strong>, the{" "}
            <strong>UETA</strong>, and the{" "}
            <strong>EU eIDAS (No. 910/2014)</strong> regarding electronic
            signatures and transmissions.
          </p>
          <p className="text-[#374151] mb-4">
            Electronic signatures are valid and legally binding in a majority of
            countries around the world. Most countries have realized how
            burdensome ink signatures have become in our fast-paced and
            globalized economy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="policy-section flex flex-col gap-6 mb-0 p-8 bg-white border border-[#e5e7eb] rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#00C897] transition-transform transition-shadow transition-colors duration-200">
            <h2 className="text-2xl font-bold text-[#111827] mb-2 relative pl-4 flex items-center before:content-[''] before:absolute before:left-0 before:top-[10%] before:bottom-[10%] before:w-1 before:bg-[#00C897] before:rounded-sm">
              Signature Authentication
            </h2>
            <p className="text-[#374151] mb-4">
              We authenticate document signers so you know exactly who is
              signing. All user information transferred is protected by 128-bit
              or higher AES encryption. We invoke automated session time-outs
              and email notifications for every document event to ensure account
              security.
            </p>
          </div>

          <div className="policy-section flex flex-col gap-6 mb-0 p-8 bg-white border border-[#e5e7eb] rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#00C897] transition-transform transition-shadow transition-colors duration-200">
            <h2 className="text-2xl font-bold text-[#111827] mb-2 relative pl-4 flex items-center before:content-[''] before:absolute before:left-0 before:top-[10%] before:bottom-[10%] before:w-1 before:bg-[#00C897] before:rounded-sm">
              Signature Affixation
            </h2>
            <p className="text-[#374151] mb-4">
              Each signature is imposed and affixed to the document with an
              audit trail cover page. The audit trail contains a globally unique
              identifier (GUID) used to look up records in our database, proving
              who signed and when.
            </p>
          </div>
        </div>

        <div className="policy-section flex flex-col gap-6 mb-16 p-8 bg-white border border-[#e5e7eb] rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#00C897] transition-transform transition-shadow transition-colors duration-200">
          <h2 className="text-2xl font-bold text-[#111827] mb-2 relative pl-4 flex items-center before:content-[''] before:absolute before:left-0 before:top-[10%] before:bottom-[10%] before:w-1 before:bg-[#00C897] before:rounded-sm">
            Document Authenticity &amp; Audit Trails
          </h2>
          <p className="text-[#374151] mb-4">
            Utilizing hashing technology, we create a unique record of the
            underlying document before and after signing to prevent tampering.
          </p>
          <p className="text-[#374151] mb-4">
            Our comprehensive audit trail tracks and timestamps information from
            submission to completion, including IP addresses and UserAgent data.
          </p>
        </div>

        <div className="policy-section flex flex-col gap-6 mb-16 p-8 bg-white border border-[#e5e7eb] rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#00C897] transition-transform transition-shadow transition-colors duration-200">
          <h2 className="text-2xl font-bold text-[#111827] mb-2 relative pl-4 flex items-center before:content-[''] before:absolute before:left-0 before:top-[10%] before:bottom-[10%] before:w-1 before:bg-[#00C897] before:rounded-sm">
            Secure &amp; Accessible
          </h2>
          <p className="text-[#374151] mb-4">
            Sensitive communications are SSL encrypted. Statically-stored files
            are encrypted in ISO 27001 certified data centers (Amazon S3).
          </p>
          <p className="text-[#374151] mb-4">
            My Tech Passport E-sign is universally accessible—only an internet
            connection and browser are required.
          </p>
        </div>

        {/* 3. Global Country Explorer */}
        <section className="country-explorer mt-20 mb-20">
          <div className="explorer-header flex flex-wrap justify-between items-center mb-8 gap-4 sm:flex-col sm:items-stretch">
            <div>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">
                Global Legality Guide
              </h2>
              <p className="text-[#6b7280]">
                Select a country to learn about its local framework
              </p>
            </div>
            <select
              className="search-input py-3 px-4 min-w-[300px] border border-[#e5e7eb] rounded-lg text-base transition-colors duration-200 focus:outline-none focus:border-[#00C897] focus:shadow-[0_0_0_3px_rgba(0,200,151,.1)] sm:w-full bg-white cursor-pointer"
              onChange={handleCountrySelect}
              defaultValue=""
            >
              <option value="" disabled>
                Select a country
              </option>
              {allCountries.map((country) => (
                <option key={country.slug} value={country.slug}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="countries-grid grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {allCountries.map((country) => (
              <Link
                to={`/e-signature-legality/${country.slug}`}
                key={country.slug}
                className="country-card block p-4 bg-[#f9fafb] rounded-lg no-underline text-[#1f2937] font-medium border border-transparent transition-all duration-200 hover:bg-[#ecfdf5] hover:text-[#00a078] hover:border-[#00C897]"
              >
                {country.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 4. Footer Links (From your index.md) */}
      <footer className="legality-footer border-t border-[#e5e7eb] py-12 text-center bg-[#fafafa]">
        <div className="legality-container max-w-[1000px] mx-auto px-6">
          <h3 className="text-lg font-semibold mb-4">Legal Resources</h3>
          <p className="text-sm text-[#6b7280] mb-6 max-w-2xl mx-auto">
            Disclaimer: This information is intended for general informational
            purposes only and should not be considered legal advice.
          </p>

          <div className="footer-links flex flex-wrap justify-center gap-8 mt-6">
            <Link
              to="/terms-of-service/"
              className="footer-link text-[#6b7280] no-underline text-sm transition-colors duration-200 hover:text-[#00C897] hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              to="/service-specific-terms/"
              className="footer-link text-[#6b7280] no-underline text-sm transition-colors duration-200 hover:text-[#00C897] hover:underline"
            >
              Service Specific Terms
            </Link>
            <Link
              to="/acceptable-use-policy/"
              className="footer-link text-[#6b7280] no-underline text-sm transition-colors duration-200 hover:text-[#00C897] hover:underline"
            >
              Acceptable Use Policy
            </Link>
            <Link
              to="/element-signature/terms/"
              className="footer-link text-[#6b7280] no-underline text-sm transition-colors duration-200 hover:text-[#00C897] hover:underline"
            >
              E-sign Terms of Use
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
