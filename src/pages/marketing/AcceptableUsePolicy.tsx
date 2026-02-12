import { Link } from "react-router-dom";

const AcceptableUsePolicy = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-14 md:py-20 font-sans text-base text-foreground">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center">
        Acceptable Use Policy
      </h1>
      <p className="mb-4 font-sans">
        MyTechPassport provides services that are used by millions of people,
        and we're proud of the trust placed in us. In exchange, we trust you to
        use our services responsibly.
      </p>
      <p className="mb-6 font-sans">
        You agree not to misuse the MyTechPassport Services or help anyone else
        to do so. For example, you must not even try to do any of the following
        in connection with the MyTechPassport Services:
      </p>
      <ul className="mb-6 list-disc pl-6 space-y-3 font-sans">
        <li>
          Post or transmit abusive messages, defamatory, libelous, false or
          misleading statements, hate speech, or messages that incite or
          threaten violence;
        </li>
        <li>
          Transmit spam, chain letters, or unsolicited messages (including
          email);
        </li>
        <li>
          Impersonate another person, misrepresent your affiliation with another
          person or entity, engage in fraud, or hide or attempt to hide your
          identity;
        </li>
        <li>Access any unauthorized part of the MyTechPassport Services;</li>
        <li>
          Interfere with the normal functioning, integrity or operation of the
          MyTechPassport Services;
        </li>
        <li>
          Upload or transmit invalid data, viruses, worms, harmful code,
          malware, or other software agents;
        </li>
        <li>
          Decipher or decrypt transmissions, circumvent any access,
          authentication or copy restrictions of, or otherwise attempt to
          compromise the security of the MyTechPassport Services (including
          another user’s account);
        </li>
        <li>
          Attempt to probe, scan or test the vulnerability of any part of the
          MyTechPassport Services without proper authorization;
        </li>
        <li>
          Attempt to modify, or gain unauthorized use of or access to, another
          user's account(s), website(s), application(s), system(s), equipment or
          data;
        </li>
        <li>
          Collect or harvest any personally identifiable information, including
          account names, from any other user’s account;
        </li>
        <li>
          Use the MyTechPassport Services in violation of any applicable laws or
          regulations, including privacy laws in applicable jurisdictions; or
        </li>
        <li>
          Upload, use or transmit any content, data or materials that violate
          applicable laws or regulations.
        </li>
      </ul>
      <p className="mb-4 font-sans">
        Without limiting any other remedies available to it, MyTechPassport may
        in its sole discretion suspend or terminate access to the MyTechPassport
        Services for violations of this Acceptable Use Policy, to prevent harm
        to other parties, or to preserve its security, availability or
        integrity.
      </p>
      <p className="mb-10 font-sans">
        Terms not defined in this Acceptable Use Policy will have the meaning
        set forth in the applicable agreement between you and MyTechPassport.
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

export default AcceptableUsePolicy;
