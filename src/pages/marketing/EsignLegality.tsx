import { Link } from "react-router-dom";

const EsignLegality = () => {
  return (
    <div
      id="page-container"
      className="max-w-2xl mx-auto px-4 py-14 md:py-20 font-sans text-base text-foreground"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center font-sans">
        MyTechPassport E-sign Legality Statement
      </h1>
      <h2 className="text-2xl font-semibold mt-10 mb-6 tracking-tight font-sans">
        ELECTRONIC SIGNATURES ARE LEGAL‍
      </h2>

      <p className="mb-5 font-sans">
        MyTechPassport provides you with a legally binding eSignature solution
        for your contract needs. MyTechPassport complies with the requirements
        of the U.S. Electronic Signature in Global and National Commerce Act of
        2000 (ESIGN), the Uniform Electronic Transactions Act (UETA), and the
        European Union eIDAS (EU No.910/2014) regarding electronic signatures
        and transmissions, thus making eSignatures fast, easy, and legally
        binding.
      </p>
      <p className="mb-5 font-sans">
        Electronic signatures are valid and legally binding in a majority of
        countries around the world. Most countries have realized how burdensome
        ink signatures have become in our fast-paced and globalized economy: ink
        signatures slow down the contracting process and create a paper
        management problem.
      </p>
      <p className="mb-5 font-sans">
        When selecting an eSignature provider, consider:
        <span className="sr-only">‍‍</span>
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-6 tracking-tight font-sans">
        SIGNATURE AUTHENTICATION‍
      </h2>
      <p className="mb-5 font-sans">
        MyTechPassport authenticates document signers so you know who is signing
        your documents. Any person signing a document via MyTechPassport must
        either have login information for MyTechPassport, or have received in
        their email account a request for signature. To protect MyTechPassport
        user accounts, all user information transferred is protected by 128-bit
        or higher Advanced Encryption Standard (AES) encryption, including
        usernames and passwords. We also seek to prevent others from accessing
        or using your account by imposing automated session time-outs, and
        emailing you every time a document is sent to, received by, or signed
        under your account.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-6 tracking-tight font-sans">
        ‍SIGNATURE AFFIXATION‍
      </h2>
      <p className="mb-5 font-sans">
        Each signature on a document is imposed and affixed to the document.
        When you request a signature, MyTechPassport affixes an audit trail
        cover page to the document itself. The audit trail contains a globally
        unique identifier, or GUID, that can be used to look up a record in our
        database, which shows who signed a document and when they signed it.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-6 tracking-tight font-sans">
        DOCUMENT AUTHENTICITY‍
      </h2>
      <p className="mb-5 font-sans">
        MyTechPassport is designed to keep your documents secure and prevent
        tampering during and after the signing process. Utilizing hashing
        technology, MyTechPassport creates a unique record of the underlying
        document before either party signs it and then creates a separate unique
        record of the underlying document that contains all of the signatures.
        If you ever need to prove there was no tampering between the pre and
        post-signed documents, MyTechPassport can provide you with the two
        unique document records. MyTechPassport utilizes the same technology to
        help protect your eSignatures.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-6 tracking-tight font-sans">
        AUDIT TRAILS‍
      </h2>
      <p className="mb-5 font-sans">
        MyTechPassport creates a comprehensive audit trail between signing
        parties. To provide you with a transaction history, we track and
        timestamp various information from the moment the document is submitted
        for signature to when it is completely signed and secured, such as IP
        information and UserAgent information. To help ensure that any tampering
        of the audit trail is detectable, we process the audit trail with
        hashing technology. Should you ever need to rely on an audit trail, we
        are right by your side to assist you.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-6 tracking-tight font-sans">
        SECURE RECORDS‍
      </h2>
      <p className="mb-5 font-sans">
        We take information security seriously, which is why sensitive
        communications with MyTechPassport are protected with SSL encryption.
        Additionally, we encrypt all of your statically-stored files and
        signature information in Amazon's S3 servers, which are housed in an ISO
        27001 certified data center, and restrict physical and employee access
        to it.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-6 tracking-tight font-sans">
        ACCESIBLE SOLUTION‍
      </h2>
      <p className="mb-5 font-sans">
        MyTechPassport is a universally accessible solution, as only an Internet
        connection and a major web browser is required to sign a document. This
        means that just about anybody you request a signature from can access
        and sign the documents you send them. You can also easily download and
        access documents that are processed through MyTechPassport, as we
        provide all documents in PDF format.
      </p>

      <p className="mb-6 font-sans">
        MyTechPassport looks forward to being your eSignature solution and
        providing you with the most user friendly platform available.
      </p>
      <div className="max-w-lg mx-auto text-center mt-14 space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-1 font-sans">
            MyTechPassport Terms of Service
          </h3>
          <Link
            to="/terms-of-service/"
            className="text-blue-700 underline hover:text-blue-900 transition font-sans"
          >
            View Terms
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 font-sans">
            Service Specific Terms
          </h3>
          <Link
            to="/service-specific-terms/"
            className="text-blue-700 underline hover:text-blue-900 transition font-sans"
          >
            View Service Specific Terms
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 font-sans">
            Acceptable Use Policy
          </h3>
          <Link
            to="/acceptable-use-policy/"
            className="text-blue-700 underline hover:text-blue-900 transition font-sans"
          >
            View Acceptable Use Policy
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 font-sans">
            Data Processing Agreement
          </h3>
          <Link
            to="/data-processing-agreement/"
            className="text-blue-700 underline hover:text-blue-900 transition font-sans"
          >
            View Data Processing Agreement
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 font-sans">
            MyTechPassport E-sign Terms of Use
          </h3>
          <Link
            to="/electronic-signature/terms/"
            className="text-blue-700 underline hover:text-blue-900 transition font-sans"
          >
            View Terms
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 font-sans">
            MyTechPassport E-sign Legality Statement
          </h3>
          <Link
            to="/electronic-signature/legality-statement/"
            className="text-blue-700 underline hover:text-blue-900 transition font-sans"
          >
            View Legality Statement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EsignLegality;
