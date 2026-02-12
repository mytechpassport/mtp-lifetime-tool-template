import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div
      id="page-container"
      className="max-w-2xl mx-auto px-4 py-14 md:py-20 font-sans text-base text-foreground"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center">
        TERMS OF SERVICE
      </h1>
      <div className="mb-8 text-center">
        <div className="font-semibold text-lg mb-1">MyTechPassport Inc.</div>
        <div className="text-muted-foreground">
          <span className="font-semibold">Effective Date:</span> July 01 2024
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        1. Introduction
      </h2>
      <p className="mb-5">
        Please read these Terms of Service ("Terms") carefully before using our
        website, products, or services.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        2. Acceptance
      </h2>
      <p className="mb-5">
        By using our services, you agree to be bound by these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        3. Eligibility
      </h2>
      <p className="mb-5">
        Our services are only available to individuals aged 18 or older.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        4. Account Registration
      </h2>
      <p className="mb-5">
        You must provide accurate information when registering for an account.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        5. User Conduct
      </h2>
      <p className="mb-2">You agree to:</p>
      <ul className="list-disc pl-6 mb-5 space-y-2">
        <li>Use our services for lawful purposes only</li>
        <li>Not interfere with or disrupt our services</li>
        <li>Not upload or transmit harmful content</li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        6. Intellectual Property
      </h2>
      <p className="mb-5">
        All intellectual property rights in our services and content are owned
        by us.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        7. Payment Terms
      </h2>
      <h3 className="text-lg font-semibold mt-6 mb-2">Subscription Plans</h3>
      <p className="mb-5">
        We offer monthly and yearly subscription plans (collectively,
        "Subscription Plans") that automatically renew for the same period
        (e.g., month or year) unless terminated by either party in accordance
        with these Terms.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2">
        Downgrade to Free Plan
      </h3>
      <p className="mb-5">
        If you downgrade to our free plan from a paid Subscription Plan, we will
        retain your data for 30 days from the date of downgrade. After this
        30-day period, we reserve the right to delete any data that was used in
        higher-tier Subscription Plans.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2">Refund Policy</h3>
      <p className="mb-5">
        All refunds are handled on a case-by-case basis. If you have a dispute
        regarding a payment or refund, please email our support team at{" "}
        <a
          href="mailto:support@mytechpassport.com"
          className="text-blue-700 underline hover:text-blue-900 transition"
        >
          support@mytechpassport.com
        </a>
        . We will review your case and respond accordingly.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2">
        Additional Legal Terms
      </h3>
      <p className="mb-5">
        By purchasing a Subscription Plan, you acknowledge and agree that we are
        authorized to charge your payment method on a recurring basis until you
        terminate your Subscription Plan.
      </p>
      <p className="mb-5">
        If we are unable to charge your payment method for any reason, we
        reserve the right to suspend or terminate your access to our services.
      </p>
      <p className="mb-5">
        You agree to provide accurate payment information and keep it
        up-to-date.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        8. Termination
      </h2>
      <p className="mb-5">
        We may terminate or suspend your account for violating these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        9. Limitation of Liability
      </h2>
      <p className="mb-5">
        We are not liable for damages arising from your use of our services.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        10. Indemnification
      </h2>
      <p className="mb-5">
        You agree to indemnify us against claims arising from your breach of
        these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        11. Governing Law
      </h2>
      <p className="mb-5">
        These Terms are governed by the laws of Delaware and United States.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        12. Changes to Terms
      </h2>
      <p className="mb-5">We reserve the right to update these Terms.</p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        13. MyTechPassport E-sign
      </h2>
      <p className="mb-5">
        For all e-sign services, please refer to the{" "}
        <Link
          to="/electronic-signature/terms/"
          className="text-blue-700 underline hover:text-blue-900 transition"
        >
          MyTechPassport E-sign Terms of Service
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3 tracking-tight">
        14. Data Processing
      </h2>
      <p className="mb-5">
        For information about how we process personal data, please refer to our{" "}
        <Link
          to="/data-processing-agreement/"
          className="text-blue-700 underline hover:text-blue-900 transition"
        >
          Data Processing Agreement
        </Link>
        . The DPA supplements these Terms and governs how we handle personal
        data in compliance with EU Data Protection Laws, UK GDPR, and Swiss
        Federal Act on Data Protection.
      </p>

      <div className="mx-auto mt-12 mb-2 w-full max-w-lg rounded-[15px] bg-muted/20 p-6 text-center font-sans">
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight font-sans">
          MyTechPassport Terms of Service
        </h3>
        <div className="mb-5">
          <Link
            to="/terms-of-service/"
            className="text-blue-700 underline hover:text-blue-900 font-sans"
          >
            View Terms
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight font-sans">
          Service Specific Terms
        </h3>
        <div className="mb-5">
          <Link
            to="/service-specific-terms/"
            className="text-blue-700 underline hover:text-blue-900 font-sans"
          >
            View Service Specific Terms
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight font-sans">
          Acceptable Use Policy
        </h3>
        <div className="mb-5">
          <Link
            to="/acceptable-use-policy/"
            className="text-blue-700 underline hover:text-blue-900 font-sans"
          >
            View Acceptable Use Policy
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight font-sans">
          Data Processing Agreement
        </h3>
        <div className="mb-5">
          <Link
            to="/data-processing-agreement/"
            className="text-blue-700 underline hover:text-blue-900 font-sans"
          >
            View Data Processing Agreement
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight font-sans">
          MyTechPassport E-sign Terms of Use
        </h3>
        <div className="mb-5">
          <Link
            to="/electronic-signature/terms/"
            className="text-blue-700 underline hover:text-blue-900 font-sans"
          >
            View Terms
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight font-sans">
          MyTechPassport E-sign Legality Statement
        </h3>
        <div>
          <Link
            to="/electronic-signature/legality-statement/"
            className="text-blue-700 underline hover:text-blue-900 font-sans"
          >
            View Legality Statement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
