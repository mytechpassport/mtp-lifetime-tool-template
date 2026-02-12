import { Link } from "react-router-dom";

const DataProcessingAgreement = () => {
  return (
    <div
      id="page-container"
      className="max-w-2xl mx-auto px-4 py-14 md:py-20 font-sans text-base text-foreground"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center">
        Data Processing Agreement
      </h1>
      <div className="mb-8 text-center">
        <div className="font-semibold text-lg mb-1">MyTechPassport Inc.</div>
        <div className="text-muted-foreground">
          <span className="font-semibold">Posted:</span> May 9, 2025
        </div>
        <div className="text-muted-foreground">
          <span className="font-semibold">Effective as of:</span> May 9, 2025
        </div>
      </div>

      <div className="mb-4">
        This Data Processing Agreement (the &ldquo;DPA&rdquo;) supplements the
        applicable services agreement (&ldquo;Agreement&rdquo;) between
        MyTechPassport and the customer that has executed or agreed to the
        Agreement (&ldquo;Customer&rdquo;). Capitalized terms used, but not
        defined, in this DPA are defined in the Agreement.
      </div>

      <ol className="list-decimal pl-6 space-y-5 mb-8">
        <li>
          <span className="font-semibold">
            Nature of the Data and Role of the Parties.
          </span>{" "}
          The rights and obligations in this DPA apply solely to the Processing
          of Personal Data by the MyTechPassport Services on behalf of Customer,
          but does not apply to Beta Releases. For the purposes of this DPA,
          references to Customer Data shall mean any Personal Data incorporated
          in the Customer Data.
        </li>

        <li>
          <span className="font-semibold">Data Processing.</span>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>
              <span className="font-semibold">Instructions.</span> The Agreement
              and this DPA constitute Customer’s instructions to MyTechPassport
              to Process Customer Data. MyTechPassport will use and Process
              Customer Data as Customer instructs in order to deliver
              MyTechPassport Services and to fulfill MyTechPassport’s
              obligations under the Agreement and this DPA. MyTechPassport will
              inform Customer of any legal requirement which prevents it from
              complying with Customer’s instructions, unless prohibited from
              doing so by applicable law or on important grounds of public
              interest.
            </li>
            <li>
              <span className="font-semibold">Processing Activities.</span>{" "}
              MyTechPassport, MyTechPassport personnel, and Sub-processors will
              only Process Customer Data to provide the MyTechPassport Services
              and to fulfill MyTechPassport's obligations in this Agreement. The
              categories of Personal Data to be processed by MyTechPassport and
              the Processing activities to be performed under this Agreement are
              set out in Exhibit A.
            </li>
            <li>
              <span className="font-semibold">Personnel.</span> Any
              MyTechPassport personnel who have access to Customer Data will be
              bound by appropriate confidentiality obligations.
            </li>
          </ol>
        </li>

        <li>
          <span className="font-semibold">Security.</span>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              <span className="font-semibold">Security Measures.</span>{" "}
              MyTechPassport will implement the technical and organizational
              measures set forth in the Agreement for the applicable
              MyTechPassport Services.
            </li>
            <li>
              <span className="font-semibold">Security Incidents.</span>{" "}
              MyTechPassport will promptly, and without undue delay, notify
              Customer in writing at the email address associated with the
              account if a Security Incident occurs, so long as applicable law
              allows this notice. Without limiting the foregoing, MyTechPassport
              will use commercially reasonable efforts to provide this notice
              within 72 hours of confirming the existence of a Security
              Incident. MyTechPassport may limit the scope of, or refrain from
              delivering, any disclosures to the extent reasonably necessary to
              avoid compromising the integrity of MyTechPassport's security, an
              ongoing investigation, or any MyTechPassport customer’s or end
              user’s data.
            </li>
            <li>
              <span className="font-semibold">Notification.</span>{" "}
              MyTechPassport will assist the Customer in ensuring compliance
              with its obligations pursuant to EU Data Protection Laws by
              providing relevant information which may include: (a) the nature
              of the Security Incident, including, where possible, the
              categories and approximate number of personal data records
              concerned; (b) the likely consequences of the Security Incident;
              (c) the measures taken or to be taken to address the Security
              Incident, including, where appropriate, the measures to mitigate
              its possible adverse effects; (d) the name and contact details of
              the Data Protection Officer or other contact from whom more
              information may be obtained; and (e) justifications for any delay
              in notification;. Should it not be feasible for MyTechPassport to
              provide all of the relevant information in its initial
              notification to the Customer, MyTechPassport will provide further
              relevant details without undue delay.
            </li>
          </ul>
        </li>

        <li>
          <span className="font-semibold">Sub-processors.</span>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>
              <span className="font-semibold">
                MyTechPassport Use of Sub-Processors.
              </span>{" "}
              Customer consents to MyTechPassport’s appointment of
              Subcontractors, including Sub-processors, to perform the
              MyTechPassport Services. Where a Sub-processor will process
              Personal Data, MyTechPassport will ensure that the Sub-processor
              is subject to substantially similar data protection obligations as
              those set forth in this DPA regarding Personal Data and which
              satisfy the requirements of EU Data Protection Laws.
              MyTechPassport will remain liable for all acts or omissions of its
              Subcontractors or Sub-processors, and for any subcontracted
              obligations.
            </li>
            <li>
              <span className="font-semibold">Customer Objections.</span>{" "}
              MyTechPassport may add or remove Sub-processors from time to time.
              MyTechPassport will inform Customer in advance of new
              Sub-processors for the applicable MyTechPassport Services as
              described in the list of Sub-processors. If Customer objects to a
              change, it will provide MyTechPassport with notice of its
              objection to{" "}
              <a
                href="mailto:support@mytechpassport.com"
                className="text-blue-700 underline hover:text-blue-900"
              >
                support@mytechpassport.com
              </a>{" "}
              including reasonable detail supporting Customer’s concerns within
              sixty days of receiving notice of a change from MyTechPassport or,
              if Customer has not subscribed to receive this notice, within
              sixty days of MyTechPassport publishing the change. MyTechPassport
              will then use commercially reasonable efforts to review and
              respond to Customer’s objection within thirty days of receipt of
              Customer’s objection. MyTechPassport’s response to Customer’s
              objection will include, at a minimum, reasonable accommodations,
              if any, that Customer or MyTechPassport can take to limit or
              prevent a new Sub-processor from acting as a processor of Customer
              Data when Customer makes use of the MyTechPassport Services. If
              MyTechPassport does not respond to a Customer objection as
              described above, or cannot reasonably accommodate Customer’s
              objection, Customer may terminate the Agreement by providing
              written notice to MyTechPassport: (a) within thirty days of
              receipt of a MyTechPassport response that does not comply with
              this Section 4.2; or (b) if MyTechPassport fails to respond,
              within thirty days of the date MyTechPassport’s response was due.
            </li>
          </ol>
        </li>

        <li>
          <span className="font-semibold">Data Subject Rights.</span> Customer
          is responsible for responding to any request by a data subject to
          exercise their rights under applicable privacy laws. If MyTechPassport
          receives any such request in relation to the Customer Data,
          MyTechPassport will direct the applicable data subject to Customer to
          exercise his or her rights without undue delay after verifying the
          request pertains to Customer Data. MyTechPassport will provide
          Customer with information or tools that are reasonably designed to
          enable Customer to fulfill its obligations to respond to these
          requests through the functionality of the MyTechPassport Services,
          taking into account the nature of the Processing and insofar as this
          is possible.
        </li>

        <li>
          <span className="font-semibold">Compliance Assistance.</span> To
          assist Customer with its compliance obligations under applicable
          privacy laws related to security, data protection impact assessments,
          and prior consultation with supervisory authorities, MyTechPassport
          will make the following available during the Term: (a) the Audit
          Reports; (b) the information contained in Exhibit A; and (c) any
          applicable Security Measures and Security Resources set forth in the
          Agreement. If, after reviewing the aforementioned materials, Customer
          reasonably believes it needs further information in order to meet its
          compliance obligations, MyTechPassport will use commercially
          reasonable efforts to respond to written questions by Customer
          regarding the materials. Without limiting the foregoing,
          MyTechPassport will comply with valid requests from relevant
          supervisory authorities to the extent required by applicable EU Data
          Protection Law.
        </li>

        <li>
          <span className="font-semibold">Deletion.</span> Upon Termination of
          the Agreement and this DPA, MyTechPassport will delete Customer Data
          in Customer’s account in a commercially reasonable period of time
          following receipt of Customer’s request to do so prior to such
          termination. Notwithstanding the foregoing, Customer acknowledges and
          agrees that MyTechPassport may be a controller with respect to certain
          account data, and may retain this data in accordance with applicable
          privacy laws, provided that MyTechPassport is solely responsible for
          its compliance with these laws in connection with its own Processing.
        </li>

        <li>
          <span className="font-semibold">Inspections.</span>
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>
              <span className="font-semibold">Audit Reports.</span>{" "}
              MyTechPassport has completed audits for the MyTechPassport
              Services as set forth in the Agreement and will provide Customer
              with a copy of the Audit Reports as set forth therein.
            </li>
            <li>
              <span className="font-semibold">
                Customer Review of Audit Reports.
              </span>{" "}
              If Customer reasonably believes it needs further information in
              order to confirm MyTechPassport’s compliance with the provisions
              of the Agreement relating to Personal Data, MyTechPassport will
              use commercially reasonable efforts to respond to written
              questions by Customer regarding the Audit Reports.
            </li>
            <li>
              <span className="font-semibold">Customer Inspection.</span> If
              Customer is not satisfied with MyTechPassport’s responses to
              questions provided pursuant to Section 8.2, MyTechPassport will
              permit Customer, or an agreed upon Customer representative,
              subject to appropriate confidentiality obligations, to visit
              MyTechPassport’s premises and discuss MyTechPassport’s responses
              with MyTechPassport personnel.
            </li>
            <li>
              <span className="font-semibold">Process for Inspections.</span>{" "}
              MyTechPassport reserves the right to: (a) charge a separate fee
              for its reasonable costs associated with performing any of its
              obligations in Section 8.2 or 8.3, provided that MyTechPassport
              will provide an estimate of these fees to Customer prior to
              incurring the costs; or (b) object to any Customer representative
              participating in an inspection on the basis that they are not
              qualified, are not bound by an adequate requirement to protect
              confidential MyTechPassport information, or are a competitor of
              MyTechPassport. For Customer inspections pursuant to Section 8.3,
              the Parties will first mutually agree on the scope, timing, and
              duration of the inspection. MyTechPassport reserves the right to
              limit the scope and duration of an inspection to the extent
              reasonably necessary to avoid compromising the integrity of
              MyTechPassport’s security or any MyTechPassport customer’s or end
              user’s data.
            </li>
          </ol>
        </li>

        <li>
          <span className="font-semibold">European Data.</span> Customer agrees
          that MyTechPassport and its Sub-processors may transfer, store, and
          Process Customer Data in locations other than Customer’s country. To
          the extent European Data is Processed outside of the EEA, United
          Kingdom, or Switzerland, this Section 9 applies.
          <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li>
              <span className="font-semibold">Instructions.</span> Customer
              hereby instructs MyTechPassport International to process European
              Data in accordance with this DPA in order to deliver the
              MyTechPassport Services. Customer acknowledges that all
              communication with MyTechPassport US in connection with the
              processing of European Data will be coordinated and directed
              through MyTechPassport International.
            </li>
            <li>
              <span className="font-semibold">Transfers.</span> Customer
              acknowledges and agrees that, to provide the MyTechPassport
              Services, MyTechPassport International may transfer European Data
              to MyTechPassport US and this transfer will be made pursuant to
              the Processor to Processor Standard Contractual Clauses between
              MyTechPassport and MyTechPassport International, or an alternative
              transfer means recognized by EU Data Protection Laws, UK GDPR, or
              Swiss Federal Act on Data Protection, as applicable.
            </li>
          </ol>
        </li>

        <li>
          <span className="font-semibold">Insurance.</span> MyTechPassport
          maintains reasonable coverage for Technology Errors and Omissions
          insurance, which may include coverage for privacy and network security
          liability, losses or damages due to the unauthorized use/access of a
          computer system or database, and defense of any regulatory action
          involving a breach of privacy, as well as other coverage areas. Upon
          Customer's reasonable written request, and no more than once per year,
          MyTechPassport will provide a certificate of insurance evidencing its
          coverages.
        </li>

        <li>
          <span className="font-semibold">Effect of DPA.</span> If a provision
          in this DPA conflicts with a provision in the Agreement, then this DPA
          will control with respect to the processing of Personal Data. The
          Agreement will remain in full force and effect and will be unchanged
          except as modified by this DPA. This DPA will terminate automatically
          upon expiration or termination of the Agreement.
        </li>

        <li>
          <span className="font-semibold">Definitions.</span>
          <div className="pl-4 mt-2 space-y-2">
            <p>
              “Audit Reports” means the Service Organization Control 2 (SOC 2)
              Type II audit reports. “MyTechPassport International” means
              MyTechPassport International Unlimited Company.
            </p>
            <p>“MyTechPassport US” means MyTechPassport, Inc.</p>
            <p>
              “EU Data Protection Laws” means, to the extent in force and
              applicable from time to time, those laws implementing the EU
              General Data Protection Regulation (2016/679) and any implementing
              laws in each EU member state.
            </p>
            <p>
              “European Data” means Personal Data that is subject to EU Data
              Protection Laws, the UK GDPR, or the Swiss Federal Act on Data
              Protection.
            </p>
            <p>
              “Personal Data,” “Process,” and “Processing” have the meaning
              given to those terms in the EU Data Protection Laws, UK GDPR, or
              the Swiss Federal Act on Data Protection.
            </p>
            <p>
              “Security Incident” means any actual unauthorized disclosure of or
              access to Customer Data, or compromise of MyTechPassport’s systems
              that MyTechPassport determines is reasonably likely to result in
              such disclosure or access, caused by failure of MyTechPassport's
              Security Measures and excluding any unauthorized disclosure or
              access that is caused by Customer or its end users, including
              Customer or its end users' failure to adequately secure equipment
              or accounts.
            </p>
            <p>
              “Security Measures” means the technical and organizational
              security measures implemented for MyTechPassport Services
              Services, as may be further described in the Agreement.
            </p>
            <p>
              “Subcontractor” means an entity to whom MyTechPassport
              subcontracts any of its obligations under the Agreement.
            </p>
            <p>
              “Sub-processor” means an entity who agrees to Process Customer
              Data on MyTechPassport’s behalf, or on behalf of another
              MyTechPassport sub-processor, in order to deliver the
              MyTechPassport Services.
            </p>
          </div>
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mt-12 mb-4 tracking-tight">
        Exhibit A
      </h2>
      <div className="mb-5">
        <span className="font-semibold">Details of Processing.</span>
        <ul className="list-disc pl-7 mt-2 space-y-3">
          <li>
            <span className="font-semibold">
              Subject Matter of the Personal Data Processing:
            </span>{" "}
            The provision of the MyTechPassport Services by MyTechPassport to
            Customer.
          </li>
          <li>
            <span className="font-semibold">
              Duration of the Personal Data Processing:
            </span>{" "}
            The Term, and any period after the Term prior to MyTechPassport’s
            deletion of Customer Data.
          </li>
          <li>
            <span className="font-semibold">
              Nature and Purpose of the Personal Data Processing:
            </span>{" "}
            To enable Customer to receive and MyTechPassport to provide the
            MyTechPassport Services.
          </li>
          <li>
            <span className="font-semibold">Categories of Personal Data:</span>{" "}
            The Personal Data that will be included in Customer Data will depend
            upon Customer’s use of the Services. To the extent the Customer Data
            contains Personal Data, it may consist of identifying information of
            end users (such as name, email address, physical address, IP
            address, or other unique identifier), identifying information of
            third parties with whom data is shared or to whom signature requests
            are sent, organization data, and any other Personal Data contained
            in documents, images and other content or data in electronic form
            stored or transmitted by End Users via the MyTechPassport Services.
          </li>
          <li>
            <span className="font-semibold">Data Subjects:</span> The categories
            of data subjects will depend upon Customer’s use of the Services. To
            the extent the Customer Data contains Personal Data, it may concern
            Customer’s End Users including employees, contractors, collaborators
            and customers of the Customer, any individuals collaborating,
            sharing, or transacting with these End Users, or any other
            individual whose information is stored by Customer in the Customer
            Data as identified in records maintained by Customer acting as
            controller pursuant to Article 30 of the GDPR.
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-12 mb-2 w-full max-w-lg rounded-[15px] bg-muted/20 p-6 text-center">
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
          MyTechPassport Terms of Service
        </h3>
        <div className="mb-5">
          <Link
            to="/terms-of-service/"
            className="text-blue-700 underline hover:text-blue-900"
          >
            View Terms
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
          Service Specific Terms
        </h3>
        <div className="mb-5">
          <Link
            to="/service-specific-terms/"
            className="text-blue-700 underline hover:text-blue-900"
          >
            View Service Specific Terms
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
          Acceptable Use Policy
        </h3>
        <div className="mb-5">
          <Link
            to="/acceptable-use-policy/"
            className="text-blue-700 underline hover:text-blue-900"
          >
            View Acceptable Use Policy
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
          Data Processing Agreement
        </h3>
        <div className="mb-5">
          <Link
            to="/data-processing-agreement/"
            className="text-blue-700 underline hover:text-blue-900"
          >
            View Data Processing Agreement
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
          MyTechPassport E-sign Terms of Use
        </h3>
        <div className="mb-5">
          <Link
            to="/electronic-signature/terms/"
            className="text-blue-700 underline hover:text-blue-900"
          >
            View Terms
          </Link>
        </div>
        <h3 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
          MyTechPassport E-sign Legality Statement
        </h3>
        <div>
          <Link
            to="/electronic-signature/legality-statement/"
            className="text-blue-700 underline hover:text-blue-900"
          >
            View Legality Statement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataProcessingAgreement;
