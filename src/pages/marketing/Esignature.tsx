const Esignature = () => {
  return (
    <div
      id="page-container"
      className="max-w-2xl mx-auto px-4 py-14 md:py-20 font-sans text-base text-foreground"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center font-sans">
        MyTechPassport E-Signature
      </h1>
      <p className="mb-6 font-sans text-center text-lg">
        <span className="block font-semibold text-xl mb-1">
          Secure and Effortless E-Signatures
        </span>
        Discover MyTechPassport E-Signature – the secure, efficient, and legally
        compliant digital signature solution that streamlines your document
        signing process. Experience superior security and performance over
        traditional competitors.
      </p>
      <p className="mb-10 font-sans text-center text-muted-foreground">
        Seamlessly sign documents with MyTechPassport E-Signature.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-tight font-sans">
          Why Use Our E-Signature Tool?
        </h2>
        <ul className="list-disc pl-8 space-y-2 font-sans mb-4">
          <li>
            <span className="font-semibold">Quick &amp; Easy Signing:</span>{" "}
            Sign documents digitally in just a few clicks.
          </li>
          <li>
            <span className="font-semibold">Top-Notch Security:</span> Advanced
            encryption and secure storage protect your documents.
          </li>
          <li>
            <span className="font-semibold">Legally Compliant:</span> Fully
            adheres to international e-signature laws and industry standards.
          </li>
          <li>
            <span className="font-semibold">
              Seamless Workflow Integration:
            </span>{" "}
            Works smoothly with your existing document management systems.
          </li>
          <li>
            <span className="font-semibold">Unmatched Efficiency:</span>{" "}
            Experience faster processing and a more intuitive interface than
            competitors.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-tight font-sans">
          Advantages Over Competitors
        </h2>
        <ul className="list-disc pl-8 space-y-2 font-sans mb-4">
          <li>
            <span className="font-semibold">Intuitive Experience:</span> A
            user-friendly interface with clear instructions for every step.
          </li>
          <li>
            <span className="font-semibold">Speed &amp; Reliability:</span>{" "}
            Rapid processing that doesn&apos;t compromise on security or
            accuracy.
          </li>
          <li>
            <span className="font-semibold">Enhanced Collaboration:</span>{" "}
            Easily share and approve documents among teams.
          </li>
          <li>
            <span className="font-semibold">Value for Money:</span> Reduce
            overhead costs linked to physical document handling.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-tight font-sans">
          Ready to Transform Your Signing Process?
        </h2>
        <p className="mb-6 font-sans">
          Join the digital revolution.{" "}
          <a
            href="https://app.mytechpassport.com/login"
            className="text-blue-700 underline hover:text-blue-900 transition font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started with MyTechPassport E-Signature
          </a>{" "}
          today and experience digital signing like never before.
        </p>
      </section>
    </div>
  );
};

export default Esignature;
