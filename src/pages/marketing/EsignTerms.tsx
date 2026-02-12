import { Link } from "react-router-dom";

const listCommon =
  "list-disc pl-6 mb-5 space-y-2 font-sans text-base text-foreground";
const sectionHeading =
  "text-2xl font-semibold mt-10 mb-3 tracking-tight font-sans";
const subHeading = "text-xl font-semibold mt-10 mb-3 tracking-tight font-sans";
const subSubHeading = "font-semibold text-lg mb-1 font-sans";
const bold = "font-semibold";
const pClass = "mb-5 font-sans";
const pTight = "mb-2 font-sans";
const mainTitle =
  "text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center font-sans";
const container =
  "max-w-2xl mx-auto px-4 py-14 md:py-20 font-sans text-base text-foreground";
const dateMeta = "text-muted-foreground";
const italic = "italic";

const EsignTerms = () => {
  return (
    <div id="page-container" className={container}>
      <h1 className={mainTitle}>MyTechPassport E-Sign Terms of Service</h1>
      <div className="mb-8 text-center">
        <div className={subSubHeading}>MyTechPassport Inc.</div>
        <div className={dateMeta}>
          <span className={bold}>Posted:</span> May 9, 2025
        </div>
        <div className={dateMeta}>
          <span className={bold}>Effective as of:</span> May 9, 2025
        </div>
      </div>
      {/* Introduction */}
      <p className={pClass}>
        These MyTechPassport E-Sign Terms of Service (the “Terms” or the
        “Agreement”) govern access to and use of the MyTechPassport E-Sign,
        MyTechPassport Forms, and MyTechPassport Fax websites and services
        (collectively “MyTechPassport E-Sign Services”). You may be considered a
        visitor to our properties (“Site Visitor”), or an individual and/or
        entity that creates an account or purchases/uses the MyTechPassport
        E-Sign Services (collectively “Customer”). Customers and Site Visitors
        may be referred to in these Terms as “you” and “your” as applicable.
        These Terms are an agreement between you and one of the entities
        identified below (each, “MyTechPassport,” “we” or “us” for purposes of
        these terms). Please note that we may modify these Terms as further
        described in the amendments section below, so you should make sure to
        check this page from time to time. Our{" "}
        <Link to="/privacy-policy/">Privacy Policy</Link> explains how we
        collect and use your information, our{" "}
        <Link to="/acceptable-use-policy/">Acceptable Use Policy</Link> outlines
        your responsibilities when using our Services, and our{" "}
        <Link to="/service-specific-terms/">Service-Specific Terms</Link>{" "}
        contains terms that may be applicable to particular services. By using
        our Services, you’re agreeing to be bound by these Terms, our{" "}
        <Link to="/privacy-policy/">Privacy Policy</Link>, our{" "}
        <Link to="/acceptable-use-policy/">Acceptable Use Policy</Link>, and the{" "}
        <Link to="/service-specific-terms/">Service-Specific Terms</Link>.
      </p>
      <p className={pClass}>
        If you are agreeing to these Terms and, if applicable, the Data
        Processing Agreement, for use of the MyTechPassport E-Sign Services by
        an organization, you are agreeing on behalf of that organization. You
        must have the authority to bind that organization to these terms,
        otherwise you must not sign up for the MyTechPassport E-Sign Services.
      </p>
      <p className={pClass}>
        For purposes of these Terms, MyTechPassport refers to:
      </p>
      <ul className={listCommon + " mb-10"}>
        <li>
          <span className={bold}>MyTechPassport, Inc.,</span> if: you are a Site
          Visitor or a customer that is based in the United States, its
          territories and possessions, Canada or Mexico or a customer that is
          based outside the United States, its territories and possessions,
          Canada or Mexico.
        </li>
      </ul>

      <h2 className={sectionHeading}>
        1.&nbsp;&nbsp;OVERVIEW OF THE MyTechPassport E-Sign SERVICES
      </h2>
      <p className={pClass}>
        MyTechPassport provides a suite of products and services that allow
        Customers to streamline complex transactions through innovative digital
        solutions such as{" "}
        <a
          className="underline"
          href="https://app.mytechpassport.com/detail/29/"
          target="_blank"
          rel="noopener noreferrer"
        >
          electronic signature
        </a>
        , and workflow automation. MyTechPassport also provides application
        programming interfaces (the “API”) that allow Customers to build
        integrated fax, signature or workflow automation solutions within a
        Customer’s websites, applications, or other properties (“Customer
        Properties”).
      </p>

      <h2 className={sectionHeading}>‍2.&nbsp;&nbsp;SERVICE SPECIFIC TERMS</h2>
      <p className={pClass}>
        Certain MyTechPassport E-Sign Services have specific terms (“Service
        Specific Terms”), which are currently available{" "}
        <Link to="/service-specific-terms/">here</Link>. In case of a conflict
        between the applicable Service Specific Terms for a certain product and
        these Terms, the Service Specific Terms will control.
      </p>

      <h2 className={sectionHeading}>
        ‍3.&nbsp;&nbsp;ACCOUNT REGISTRATION AND USE
      </h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>3.1</span> &nbsp; Customer and its Authorized
          Users (as defined below) may need to register for a MyTechPassport
          E-Sign account to place orders or to access or use a MyTechPassport
          E-Sign Service. MyTechPassport may create an account for users in
          order to use the MyTechPassport E-Sign Service. Account information
          must be accurate, current, and complete, and will be governed by the
          MyTechPassport Privacy Policy for the MyTechPassport E-Sign Services
          (currently available at{" "}
          <Link to="/privacy-policy/">mytechpassport.com/privacy-policy/</Link>
          ). Customer agrees to keep this information up-to-date so that
          MyTechPassport may send notices, statements, and other information by
          email or through the MyTechPassport E-Sign Services. Customer must
          ensure that any passwords, and other access credentials (such as API
          tokens) for the MyTechPassport E-Sign Services are kept strictly
          confidential and not shared with any unauthorized person. If any
          Authorized User stops working for Customer, Customer must immediately
          terminate that person’s access to its account and any MyTechPassport
          E-Sign Service. Customer will be responsible for any and all actions
          taken using its and its users’ accounts, passwords or access
          credentials. Customer must notify MyTechPassport immediately of any
          breach of security or unauthorized use of its account. Accounts are
          granted to specific Customers and must not be shared with others. You
          may only use this Site and the MyTechPassport E-Sign Services if you
          are 18 years of age or older, able to legally agree to these Terms,
          and not a competitor to MyTechPassport (or developing any competing
          and/or similar products or services). You may also allow your
          Authorized Users (as defined below) to use and access the
          MyTechPassport E-Sign Services on your behalf.
        </li>
        <li>
          <span className={bold}>3.2</span> &nbsp; An “Authorized User” is
          defined as an individual person (e.g. employee, contractor, agent of a
          Customer) who is registered and permitted by a Customer to use the
          MyTechPassport E-Sign Services subject to these Terms and any
          restrictions in an applicable Subscription Plan (as defined below).
          Customer shall ensure that its Authorized Users comply with these
          Terms and Customer is responsible for all actions of its Authorized
          Users.
        </li>
      </ul>

      <h2 className={sectionHeading}>‍4.&nbsp;&nbsp;USE AND ACCESS RIGHTS</h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>4.1&nbsp;Limited License.</span> Subject to
          these Terms, MyTechPassport grants to Customer a limited,
          non-exclusive, non-transferable license to use and access the
          MyTechPassport E-Sign Services for its business purposes as expressly
          permitted in these Terms. Your use and access to the MyTechPassport
          E-Sign Services are subject to any limitations set forth in an
          applicable order form, online plan or the Service Specific Terms
          (whether paid or free, collectively “Subscription Plan”).
        </li>
        <li>
          <span className={bold}>4.2&nbsp;General Restrictions.</span> Customer
          must not (and must not allow any third party to):
          <ul className="list-decimal pl-8 mt-2 space-y-2 font-sans">
            <li>
              rent, lease, copy, transfer, resell, sublicense, lease,
              time-share, or otherwise provide access to the MyTechPassport
              E-Sign Services to a third party (except Authorized Users or as
              permitted under the Service Specific Terms);
            </li>
            <li>
              incorporate the MyTechPassport E-Sign Services (or any portion of
              such) with, or use it with or to provide, any site, product, or
              service, other than on sites/applications owned-and-operated by
              Customer and as specifically permitted herein;
            </li>
            <li>
              publicly disseminate information regarding the performance of the
              MyTechPassport E-Sign Services (which is deemed MyTechPassport’s
              Confidential Information);
            </li>
            <li>
              modify or create a derivative work of the MyTechPassport E-Sign
              Services or any portion of it;
            </li>
            <li>
              reverse engineer, disassemble, decompile, translate, or otherwise
              seek to obtain or derive the source code, underlying ideas,
              algorithms, file formats, or non-public APIs to any MyTechPassport
              E-Sign Service, except to the extent expressly permitted by
              applicable law and then only with advance notice to
              MyTechPassport;
            </li>
            <li>
              break or circumvent any security measures, rate limits, or usage
              tracking (such as event tracking) of the MyTechPassport E-Sign
              Service, or configure the MyTechPassport E-Sign Services (or any
              component thereof) to avoid sending events or transactions or to
              otherwise avoid incurring fees;
            </li>
            <li>
              distribute any portion of the MyTechPassport E-Sign Services
              except as permitted herein;
            </li>
            <li>
              access the MyTechPassport E-Sign Services for the purpose of
              building a competitive product or service or copying its features
              or user interface;
            </li>
            <li>
              use the MyTechPassport E-Sign Services for purposes of product
              evaluation, benchmarking, or other comparative analysis intended
              for publication without MyTechPassport’s prior written consent;
            </li>
            <li>
              remove or obscure any proprietary or other notices contained in
              the MyTechPassport E-Sign Service, including in any reports or
              output obtained from the MyTechPassport E-Sign Service.
            </li>
            <li>
              use or permit the MyTechPassport E-Sign Services to be used for
              any illegal or misleading purpose, or any manner inconsistent with
              these Terms.
            </li>
            <li>
              store, transmit or otherwise process any information via the
              MyTechPassport E-Sign Services that falls within the definition of
              “Protected Health Information” under the HIPAA Privacy Rule (45
              C.F.R. Section 164.051), unless Customer and MyTechPassport
              separately enter into a HIPAA Business Associate Agreement.
            </li>
          </ul>
        </li>
        <li>
          <span className={bold}>
            4.3&nbsp;Beta Releases and Free Access Subscriptions.
          </span>{" "}
          MyTechPassport may provide Customer with access to the MyTechPassport
          E-Sign Services for free or on a trial basis (a “Free Access
          Subscriptions”) or with “alpha”, “beta”, or other early-stage
          MyTechPassport E-Sign Services, integrations, or features (“Beta
          Releases”), which are optional for Customer to use. This Section will
          apply to any Free Access Subscriptions or Beta Releases (even if Beta
          Releases are provided for a fee or counts towards Customer’s
          Subscription Plan) and supersedes any contrary provision in these
          Terms. MyTechPassport may use good faith efforts in its discretion to
          assist Customer with Free Access Subscriptions or Beta Releases.
          Nevertheless, and without limiting the other disclaimers and
          limitations in these Terms, CUSTOMER AGREES THAT ANY FREE ACCESS
          SUBSCRIPTION OR BETA RELEASES ARE PROVIDED ON AN “AS IS” AND “AS
          AVAILABLE” BASIS WITHOUT ANY WARRANTY, SUPPORT, MAINTENANCE, STORAGE,
          SLA, OR INDEMNITY OBLIGATIONS OF ANY KIND. WITH RESPECT TO BETA
          RELEASES, CUSTOMER FURTHER ACKNOWLEDGES AND AGREES THAT BETA RELEASES
          MAY NOT BE COMPLETE OR FULLY FUNCTIONAL AND MAY CONTAIN BUGS, ERRORS,
          OMISSIONS, AND OTHER PROBLEMS FOR WHICH MYTECHPASSPORT WILL NOT BE
          RESPONSIBLE. ACCORDINGLY, ANY USE OF BETA RELEASES ARE AT CUSTOMER’S
          SOLE RISK. MyTechPassport makes no promises that future versions of
          Beta Releases will be released or will be available under the same
          commercial or other terms. MyTechPassport may terminate Customer’s
          right to use any Free Access Subscriptions or Beta Releases at any
          time for any reason or no reason in MyTechPassport’s sole discretion,
          without liability.
        </li>
      </ul>

      {/* Section 5 */}
      <h2 className={sectionHeading}>5.&nbsp;&nbsp;OWNERSHIP AND FEEDBACK</h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>5.1&nbsp;Customer Data.</span> As between the
          parties, Customer retains all right, title, and interest (including
          any intellectual property rights) in and to the content and documents
          that Customer uploads into the MyTechPassport E-Sign Services
          (excluding any MyTechPassport intellectual property) (the “Customer
          Data”). Customer hereby grants MyTechPassport a non-exclusive,
          worldwide, royalty-free right and license to collect, use, copy,
          store, transmit, modify, and create derivative works of the Customer
          Data to the extent necessary to provide the MyTechPassport E-Sign
          Services or as otherwise permitted in these Terms. Customer expressly
          authorizes MyTechPassport to use and process Customer Data (including
          any Confidential Information contained therein) as described in these
          Terms and in the MyTechPassport E-Sign Privacy Policy, which provides
          for, but is not limited to, delivering and sharing of content and
          documents as directed by Customer’s use of the MyTechPassport E-Sign
          Services with third parties (e.g. individuals/legal entities) that
          Customer invites to view, approve or sign such contents and documents.
          These licenses and permissions extend to our affiliates and trusted
          third parties we work with.
        </li>
        <li>
          <span className={bold}>5.2&nbsp;Aggregate/Anonymous Data.</span>{" "}
          Customer agrees that MyTechPassport will have the right to generate
          aggregate or anonymous data and that aggregate or anonymous data is
          owned by MyTechPassport, which MyTechPassport may use for any business
          purpose during or after the term of this Agreement (including without
          limitation to develop and improve MyTechPassport’s products and
          services and to create and distribute reports and other materials).
          For clarity, MyTechPassport will only disclose aggregate or anonymous
          data externally in a de-identified (anonymous) form that does not
          identify Customer, Authorized Users, or end users, and that is
          stripped of all persistent or personal identifiers. Customer is not
          responsible for MyTechPassport’s use of aggregate or anonymous data.
        </li>
        <li>
          <span className={bold}>
            5.3&nbsp;MyTechPassport Intellectual Property.
          </span>{" "}
          This is a subscription agreement for access to and use of the
          MyTechPassport E-Sign Services. Customer acknowledges that it is
          obtaining only a limited right to use the MyTechPassport E-Sign
          Services and that irrespective of any use of the words “purchase”,
          “sale” or similar terms, no ownership rights are transferred to
          Customer (or its Authorized Users or end users) under these Terms.
          Customer agrees that MyTechPassport (and its suppliers) retain all
          rights, title and interest (including all intellectual property
          rights) in and to all MyTechPassport E-Sign Services, and all related
          or underlying documentation, technology, code, know-how, logos,
          templates, anything delivered as part of support of other services,
          and any updates, modifications, or derivative works of any of the
          foregoing (all of which is deemed MyTechPassport’s Confidential
          Information) and that MyTechPassport reserves any licenses not
          specifically granted in these Terms. Other than the applicable mobile
          applications and APIs, the MyTechPassport E-Sign Services are offered
          as an online, hosted product. Accordingly, Customer acknowledges and
          agrees that it has no right to obtain a copy of the software behind
          any MyTechPassport E-Sign Services and that MyTechPassport at its
          option may make updates, bug fixes, modifications or improvements to
          the MyTechPassport E-Sign Services from time-to-time.
        </li>
        <li>
          <span className={bold}>5.4&nbsp;Feedback.</span> If Customer elects to
          provide any suggestions, comments, improvements, information, ideas or
          other feedback or related materials to MyTechPassport (collectively,
          “Feedback”), Customer hereby grants MyTechPassport a worldwide,
          perpetual, non-revocable, sublicensable, royalty-free right and
          license to use, copy, disclose, license, distribute, and exploit any
          Feedback in any format and in any manner without any obligation,
          payment, or restriction based on intellectual property rights or
          otherwise. Nothing in these Terms limits MyTechPassport’s right to
          independently use, develop, evaluate, or market products, whether
          incorporating Feedback or otherwise.‍
        </li>
      </ul>

      {/* Section 6 */}
      <h2 className={sectionHeading}>6.&nbsp;&nbsp;PRIVACY &amp; SECURITY‍</h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>
            6.1&nbsp;MyTechPassport E-Sign Privacy Policy.
          </span>{" "}
          The information you provide to us or that we collect will be used as
          described in these Terms and in the MyTechPassport E-Sign Privacy
          Policy (currently available at{" "}
          <Link to="/privacy-policy/">Mytechpassport.com/privacy</Link>). Please
          carefully read the MyTechPassport E-Sign Privacy Policy as it contains
          important details about our collection, use and retention of
          information.‍
        </li>
        <li>
          <span className={bold}>6.2&nbsp;Security.</span> MyTechPassport
          protects your information from unauthorized use or disclosure by
          taking reasonable technical and organizational measures designed to
          secure our systems from unauthorized access, use or modification.‍
        </li>
        <li>
          <span className={bold}>6.3&nbsp;Customer data limitations.</span> This
          Agreement constitutes Customer’s instructions to MyTechPassport to
          Process Customer Data. MyTechPassport, MyTechPassport personnel and
          its Subcontractors will only Process, access, use, store, and transfer
          Customer Data as Customer instructs in order to deliver the
          MyTechPassport E-Sign Services and to fulfill MyTechPassport’s
          obligations in the Agreement. The categories of Personal Data to be
          processed by MyTechPassport and the processing activities to be
          performed under this Agreement are set out in the Data Processing
          Agreement. MyTechPassport will inform Customer of any legal
          requirement which prevents it from complying with Customer’s
          instructions, unless prohibited from doing so by applicable law or on
          important grounds of public interest. Any MyTechPassport personnel who
          have access to Customer Data will be bound by appropriate
          confidentiality obligations.‍
        </li>
        <li>
          <span className={bold}>6.4&nbsp;Data Transfers</span>
          <ul className="list-decimal pl-8 mt-2 space-y-2 font-sans">
            <li>
              <span className={bold}>Data Transfer.</span> Customer agrees that
              MyTechPassport and its Subcontractors may transfer Customer Data
              to and access, use, and store Customer Data in locations other
              than Customer's country.‍
            </li>
            <li>
              <span className={bold}>Data Processing Agreement.</span> To the
              extent Customer Data is subject to EU Data Protection Laws and is
              processed by MyTechPassport on Customer's behalf, Customer and
              MyTechPassport agree to the Data Processing Agreement. The Data
              Processing Agreement applies only to the MyTechPassport E-Sign
              Services, and does not apply to Beta Services.‍
              <br />-{" "}
              <span className={italic}>“Data Processing Agreement"</span> means
              the agreement with MyTechPassport related to compliance with EU
              Data Protection Laws set forth at the following{" "}
              <Link to="/data-processing-agreement/">link</Link> or other link
              that MyTechPassport may provide.‍
            </li>
            <li>
              <span className={bold}>
                EU-U.S. and Swiss-U.S. Privacy Shield Programs.
              </span>{" "}
              MyTechPassport is certified and complies with the EU-U.S. and
              Swiss-U.S. Privacy Shield Programs, as set forth by the U.S.
              Department of Commerce regarding the collection, use, and
              retention of Personal Data transferred from the EEA, Switzerland,
              and the United Kingdom (to the extent it is no longer part of the
              EEA) to the United States in reliance on Privacy Shield. If the
              Privacy Shield Programs are invalidated, MyTechPassport will use
              commercially reasonable efforts to comply with alternate or
              successor data transfer mechanisms.‍
            </li>
          </ul>
        </li>
      </ul>

      {/* Section 7 */}
      <h2 className={sectionHeading}>7.&nbsp;&nbsp;CUSTOMER OBLIGATIONS‍</h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>7.1</span>&nbsp; Customer agrees to: (i)
          maintain a legally-adequate privacy policy on its Customer Properties,
          and provide all required disclosures; (ii) obtain all necessary
          rights, releases, and consents to allow Customer Data or other
          information (including any personal information) to be collected,
          used, and disclosed in the manner contemplated by these Terms and to
          grant MyTechPassport the rights and licenses set out in these Terms;
          (iii) use the MyTechPassport E-Sign Services in compliance with the
          MyTechPassport E-Sign Services’ then-current Acceptable Use Policy
          (currently available <Link to="/acceptable-use-policy/">here</Link>);
          and (iv) not take any action that would cause MyTechPassport, the
          MyTechPassport E-Sign Services or APIs to become subject to any
          third-party terms (including open source license terms).‍
        </li>
        <li>
          <span className={bold}>7.2</span>&nbsp; Customer represents and
          warrants that its Customer Properties, and the collection, use, and
          disclosure of Customer Data will not violate any third-party rights,
          including intellectual property, privacy and publicity rights.
          Customer further represents and warrants that its collection and use
          of any personal information or data provided to MyTechPassport
          complies with all applicable data protection laws, rules, and
          regulations. If Customer receives any take down requests or
          infringement notices related to Customer Data, it must promptly: (i)
          stop using the related item with the MyTechPassport E-Sign Service;
          and (ii) notify MyTechPassport. If MyTechPassport receives any take
          down requests or infringement notices related to Customer Data,
          MyTechPassport may respond in accordance with its policies, and will
          notify and consult with the Customer on next steps.‍
        </li>
        <li>
          <span className={bold}>
            7.3&nbsp;Electronic signature responsibilities:
          </span>{" "}
          Customer acknowledges and agrees that: (i) as between MyTechPassport
          and Customer, Customer has exclusive control and responsibility for
          the content of all Customer Data, including any documents used with
          the MyTechPassport E-Sign Services; and,(ii) certain types of
          documents, agreements, or contracts may be excluded from general
          electronic signature laws (such as wills, trusts, court orders, or
          family law matters), or may have specific regulations that are
          applicable to them; and, (iii) Customer is solely responsible for
          ensuring that the documents, agreements or contracts it uses with the
          MyTechPassport E-Sign Services are appropriate for electronic
          signatures, and MyTechPassport is not responsible or liable for any
          such determination or use; and, (iv) Consumer protection laws or
          regulations may impose specific requirements for electronic
          transactions involving consumers, Customer is solely responsible for
          ensuring it complies with all such laws/regulations, and
          MyTechPassport has no obligations to make such determination or assist
          with fulfilling any requirements therein. If Customer is using an API
          or other service that allows Customer to perform any end
          user/participant/signer authentication, then Customer is solely
          responsible and liable for such authentication.‍
        </li>
        <li>
          <span className={bold}>7.4&nbsp;Use of Templates and Forms:</span> The
          MyTechPassport E-Sign Services may include sample templates and forms
          (“Templates”).&nbsp;The Templates are for informational purposes only.
          We are not attorneys or a law firm, and our Templates are not a
          substitute for the advice or services of an attorney. Customer
          acknowledges that MyTechPassport is not providing Customer with legal
          advice or acting as Customer’s attorney or agent, and Customer assumes
          full responsibility for any outcomes or costs associated with
          Customer’s use of our Templates.&nbsp;
          <ul className="list-disc pl-8 mt-2 font-sans">
            <li>
              MyTechPassport does not claim that documents based on the
              Templates are complete and suitable for use in all situations and
              jurisdictions. Customer should consult with an attorney about
              Customer’s specific situation before relying on the Templates for
              any contract, agreement or transaction. Customer hereby
              acknowledges that MyTechPassport is not a party to any agreement
              that Customer enters into as a result of the use of any document
              that Customer creates or uses through the MyTechPassport E-Sign
              Services. Use of the MyTechPassport E-Sign Services and any
              document (including any document based on the Templates) does not
              constitute an attorney-client relationship, joint venture or
              partnership between MyTechPassport and any Customer or third
              party. Communications between Customer and MyTechPassport are
              governed by these Terms and our{" "}
              <Link to="/privacy-policy/">Privacy Policy</Link> but are not
              protected by the attorney-client privilege or as work
              product.&nbsp;
            </li>
            <li>
              We hope you’re satisfied with the Templates. If you have any
              concerns, please click <Link to="/#faq">here</Link> for more
              information and instructions on how to contact us at{" "}
              <a className="underline" href="mailto:support@mytechpassport.com">
                support@mytechpassport.com
              </a>
              .&nbsp;
            </li>
            <li>
              The disclaimers of warranties and limitations of liability below
              in Sections 11 and 13 do not apply to consumers in North Carolina
              when using the Templates.
            </li>
          </ul>
        </li>
      </ul>

      {/* Section 8 */}
      <h2 className={sectionHeading}>8.&nbsp;&nbsp;PAYMENT TERMS‍</h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>8.1&nbsp;Subscription Plan.</span> The prices,
          features, and options of the MyTechPassport E-Sign Services depend on
          the Subscription Plan selected by Customer (including any usage or
          overage fees). MyTechPassport does not guarantee that your particular
          Subscription Plan will be offered indefinitely. We reserve the right
          to change the prices, features, or options included in a particular
          Subscription Plan without notice, provided that such changes shall not
          take effect until your next applicable Subscription Term (as defined
          below).‍
        </li>
        <li>
          <span className={bold}>8.2&nbsp;Recurring Charges and Upgrades.</span>{" "}
          By signing up for a Subscription Plan, Customer authorizes
          MyTechPassport to charge Customer’s payment method on a recurring
          basis (e.g. monthly, quarterly, or yearly depending on Customer’s
          Subscription Plan) without an invoice. Customer expressly authorizes
          MyTechPassport to charge its payment method (such as a credit card)
          for the applicable Subscription Plan charges, any usage or overage
          charges, and any and all applicable taxes and fees. Such authorization
          is effective until the end of the Subscription Term (as defined below)
          and any applicable Renewal Term, or until Customer cancels all of its
          subscriptions.
          <p className="mt-2">
            If Customer exceeds their Subscription Plan’s usage limits, Customer
            will be automatically upgraded into the next highest Subscription
            Plan and Customer expressly acknowledges and agrees that it will pay
            for the upgraded Subscription Plan. All upgrade fees and charges are
            non-refundable, even if Customer did not use the full usage
            allotment of the applicable Subscription Plan.‍
          </p>
        </li>
        <li>
          <span className={bold}>8.3&nbsp;Taxes.</span> MyTechPassport’s fees
          are exclusive of all taxes, and Customer must pay any applicable
          sales, use, VAT, GST, excise, withholding, or similar taxes or levies,
          whether domestic or foreign, other than taxes based on the income of
          MyTechPassport. Customer will not deduct any applicable taxes from the
          payments to MyTechPassport, except as required by law. If such
          deduction is required by law, Customer will increase the amount
          payable as necessary so that after making all required deductions and
          withholdings, MyTechPassport receives and retains (free from any such
          liabilities) an amount equal to the amount it would have received had
          no such deductions or withholdings been made.‍
        </li>
        <li>
          <span className={bold}>8.4&nbsp;Auto-renewals and Trials.</span> IF
          YOUR ACCOUNT IS SET TO AUTO-RENEWAL OR IS IN A TRIAL PERIOD AND YOU
          HAVE PROVIDED A METHOD OF PAYMENT TO MYTECHPASSPORT FOR THE
          MyTechPassport E-Sign SERVICES, MYTECHPASSPORT MAY CHARGE YOU
          AUTOMATICALLY AT THE END OF THE TRIAL OR FOR THE RENEWAL, UNLESS YOU
          NOTIFY MYTECHPASSPORT THAT YOU WANT TO CANCEL YOUR SUBSCRIPTION.‍
        </li>
        <li>
          <span className={bold}>8.5&nbsp;Purchase Orders.</span> Customer
          agrees that it will pay all amounts owed, including recurring charges,
          without requiring any purchase orders or reference(s) to purchase
          order numbers. If a purchase order is required, then Customer will
          promptly notify MyTechPassport at least thirty (30) days prior to such
          requirement and the parties will cooperate in good faith in
          implementing a billing process that includes references such purchase
          order numbers. Customer agrees that any purchase orders are for
          administrative purposes only and that any non-administrative terms
          (including, but not limited to legal, security, privacy, or finance
          terms) contained in its purchase order(s) do not apply to its purchase
          or use of MyTechPassport services.‍
        </li>
        <li>
          <span className={bold}>8.6&nbsp;No Refunds.</span> Subscription and
          usage or overage fees (and any other fees associated with the
          MyTechPassport E-Sign Services, including higher subscription fees for
          upgrades) are non-refundable and non-creditable, except where required
          by law. MyTechPassport E-Sign Services subscriptions may be cancelled,
          and such cancellations take effect at the end of your then-current
          Subscription Term (for example, if you are on a paid monthly
          subscription the cancellation will take effect the following month,
          but if you are on a paid yearly subscription the cancellation will
          take effect the following year). Once your cancellation is effective,
          you will be downgraded to a free plan and will lose subscription
          features and functionality. If you don’t pay for your subscription(s)
          on time, we reserve the right to suspend you or remove subscription
          features.
        </li>
        <li>
          <span className={bold}>
            8.7&nbsp;Late Fees &amp; Collection Costs.
          </span>{" "}
          Late payments may be subject to a service charge equal to the lesser
          of 1.5% per month of the amount due or the maximum amount allowed by
          law. You agree to reimburse MyTechPassport for any costs or expenses
          incurred by MyTechPassport to collect amounts that remain unpaid after
          the due date. Amounts due to MyTechPassport E-Sign may not be withheld
          of offset by you against amounts due for any reason.
        </li>
      </ul>

      {/* Section 9 */}
      <h2 className={sectionHeading}>9.&nbsp;&nbsp;TERM AND TERMINATION‍</h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>9.1&nbsp;Term.&nbsp;</span>These Terms are
          effective until the subscription term for all Subscription
          Plans&nbsp;purchased or otherwise ordered or enabled by Customer
          (each, a “Subscription Term”) have expired or are terminated as
          expressly permitted herein.‍
        </li>
        <li>
          <span className={bold}>9.2&nbsp;Subscription Term and Renewals.</span>{" "}
          Customer agrees to pay applicable fees for the entire Subscription
          Term. Customer cannot cancel or terminate a Subscription Term except
          as expressly permitted by Section 9.4 (Termination for Cause). If no
          subscription start date is specified on the applicable order form, the
          subscription starts when Customer first obtains access to the
          applicable MyTechPassport E-Sign Service. Each Subscription Term will
          automatically renew for additional successive periods equal to the
          initial subscription (e.g. if Customer has an annual plan then the
          subscription will renewal for an additional 12 month term, if Customer
          has a monthly plan then the subscription will renewal for additional
          month terms) unless: (i) otherwise stated on the applicable order
          form; or (ii) either party gives written notice of non-renewal
          (including partial non-renewal to reduce quantities of the purchased
          Subscription Plan) at least thirty (30) days before the end of the
          then-current Subscription Term. Pricing for any Subscription Term
          renewal, new order form, or order form changes will be at
          MyTechPassport’s then-applicable rates.‍
        </li>
        <li>
          <span className={bold}>9.3&nbsp;Suspension of Service.</span>{" "}
          MyTechPassport may suspend Customer’s access to the MyTechPassport
          E-Sign Services if: (i) Customer’s account is overdue; or (ii)
          Customer has exceeded its service allocations / service limits.
          MyTechPassport may also suspend Customer’s access to the
          MyTechPassport E-Sign Services or remove Customer Data if it
          determines that: (a) Customer has breached any portion of these Terms,
          or (b) suspension is necessary to prevent harm or liability to other
          customers or third parties, or to preserve the security, stability,
          availability or integrity of the MyTechPassport E-Sign Service.
          MyTechPassport will have no liability for taking action as permitted
          above. For the avoidance of doubt, Customer will remain responsible
          for payment of fees during any suspension period under this Section
          9.3. However, unless these Terms have been terminated, MyTechPassport
          will cooperate with Customer to promptly restore access to the
          MyTechPassport E-Sign Services once we verify that Customer has
          resolved the condition requiring suspension.‍
        </li>
        <li>
          <span className={bold}>9.4&nbsp;Termination for Cause.</span> Either
          party may terminate these Terms, including any related order form, if
          the other party: (i) fails to cure any material breach of these Terms
          (including a failure to pay undisputed fees) within thirty (30) days
          after written notice detailing the breach; (ii) ceases operation
          without a successor; or (iii) if permitted by applicable law, seeks
          protection under any bankruptcy, receivership, trust deed, creditors’
          arrangement, composition, or comparable proceeding, or if any of these
          proceedings are instituted against that party (and not dismissed
          within sixty (60) days thereafter).‍
        </li>
        <li>
          <span className={bold}>9.5&nbsp;Effect of Termination.</span> Upon any
          expiration or termination of these Terms or an order form: (i)
          Customer’s license rights terminate and it must promptly: (a) stop use
          of the applicable MyTechPassport E-Sign Service; (b) delete (or, at
          MyTechPassport’s request, return) any and all copies of any
          MyTechPassport code, documentation, passwords or access codes, and any
          other MyTechPassport Confidential Information in Customer’s
          possession, custody, or control; and (ii) Customer’s right to access
          any Customer Data in the applicable MyTechPassport E-Sign Services
          will cease and MyTechPassport may delete the Customer Data at any time
          after 30 days from the date of termination. If MyTechPassport
          terminates these Terms for cause as provided in Section 9.4
          (Termination for Cause), any payments for the remaining portion of the
          Subscription Term will become due and must be paid immediately by
          Customer. Except where these Terms specifies an exclusive remedy, all
          remedies under these Terms, including termination or suspension, are
          cumulative and not exclusive of any other rights or remedies that may
          be available to a party.‍
        </li>
        <li>
          <span className={bold}>9.6&nbsp;Survival.</span> The following
          Sections survive any expiration or termination of these Terms: 3
          (Account Registration and Use); 4.2 (General Restrictions); 4.3 (Beta
          Releases and Free Access Subscriptions); 5 (Ownership and Feedback);
          7.4 (Use of Templates &amp; Forms); 8 (Payment Terms); 9 (Term and
          Termination); 11 (Warranties and Disclaimers); 12 (Indemnification
          Obligations); 13 (Limitations of Liability); 14 (Third-Party Products
          and Integrations); and 15 (General).
        </li>
      </ul>

      {/* Section 10 */}
      <h2 className={sectionHeading}>
        10.&nbsp;&nbsp;CONFIDENTIAL INFORMATION‍
      </h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>10.1&nbsp;Confidential Information</span>{" "}
          “Confidential Information” means (a) for MyTechPassport, the
          MyTechPassport E-Sign Services and Documentation; (b) for Customer,
          Customer Data; (c) any other information of a party that is disclosed
          in writing or orally and is designated as confidential or proprietary
          at the time of disclosure (and, in the case of oral disclosures,
          summarized in writing within thirty (30) days of the initial
          disclosure and delivered to the recipient), or that due to the nature
          of the information the recipient would clearly understand it to be
          confidential information of the disclosing party; and (d) the specific
          terms and conditions of these Terms, and any amendment and attachment
          thereof, between the parties.‍
        </li>
        <li>
          <span className={bold}>10.2&nbsp;Confidentiality Obligation.</span>{" "}
          Each party (as the receiving party) must: (i) hold in confidence and
          not disclose the other party’s Confidential Information to third
          parties except as permitted by these Terms; and (ii) only use the
          other party’s Confidential Information to fulfill its obligations and
          exercise its rights under these Terms. Each party may share the other
          party’s Confidential Information with its, and its Affiliates’,
          employees, agents or contractors having a legitimate need to know
          (which, for MyTechPassport, includes providing the MyTechPassport
          E-Sign Services and sharing with the subcontractors referenced herein)
          provided that the party remains responsible for any recipient’s
          compliance with the terms of this Section 10 and that these recipients
          are bound to confidentiality obligations no less protective than these
          Terms.‍
        </li>
        <li>
          <span className={bold}>10.3&nbsp;Exclusions.</span> These
          confidentiality obligations do not apply to (and Confidential
          Information does not include) information that: (i) is or becomes
          public knowledge through no fault of the receiving party; (ii) was
          known by the receiving party before it received the Confidential
          Information; (iii) is rightfully obtained by the receiving party from
          a third party without breach of any confidentiality obligation; or
          (iv) is independently developed by the receiving party without using
          the disclosing party’s Confidential Information. A party may also
          disclose the other party’s Confidential Information to the extent
          required by law or court order, provided it gives advance notice (if
          permitted by law) and cooperates in any effort by the other party to
          obtain confidential treatment for the information.‍
        </li>
        <li>
          <span className={bold}>10.4&nbsp;Remedies.</span> The parties
          acknowledge that disclosing Confidential Information may cause
          substantial harm for which damages alone may be an insufficient
          remedy, and so on breach of this Section 10, each party is entitled to
          seek appropriate equitable relief in addition to any other remedies it
          may have at law.
        </li>
      </ul>

      {/* Section 11 */}
      <h2 className={sectionHeading}>
        11.&nbsp;&nbsp;WARRANTIES AND DISCLAIMERS‍
      </h2>
      <p className={pClass}>
        ALL MyTechPassport E-Sign SERVICES, DOCUMENTATION, AND SITES ARE
        PROVIDED “AS IS” AND ON AN “AS AVAILABLE” BASIS. NEITHER MYTECHPASSPORT
        NOR ITS SUPPLIERS MAKE ANY WARRANTIES, EXPRESS OR IMPLIED, STATUTORY OR
        OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
        TITLE, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        MYTECHPASSPORT MAKES NO REPRESENTATION, WARRANTY OR GUARANTEE THAT
        MyTechPassport E-Sign SERVICES WILL MEET CUSTOMER’S REQUIREMENTS OR
        EXPECTATIONS, THAT CUSTOMER DATA WILL BE ACCURATE, COMPLETE, OR
        PRESERVED WITHOUT LOSS, OR THAT MyTechPassport E-Sign SERVICES WILL BE
        TIMELY, UNINTERRUPTED OR ERROR-FREE. MYTECHPASSPORT DOES NOT GUARANTEE
        THAT SECURITY MEASURES WILL BE ERROR-FREE AND WILL NOT BE RESPONSIBLE OR
        LIABLE FOR UNAUTHORIZED ACCESS BEYOND ITS REASONABLE CONTROL.
        MYTECHPASSPORT WILL NOT BE RESPONSIBLE OR LIABLE IN ANY MANNER FOR ANY
        CUSTOMER PROPERTIES, CUSTOMER DATA, THIRD-PARTY PRODUCTS, THIRD-PARTY
        CONTENT, OR NON-MyTechPassport E-Sign SERVICES (INCLUDING FOR ANY
        DELAYS, INTERRUPTIONS, TRANSMISSION ERRORS, SECURITY FAILURES, AND OTHER
        PROBLEMS CAUSED BY THESE ITEMS), FOR THE COLLECTION, OR THE USE AND
        DISCLOSURE OF CUSTOMER DATA AUTHORIZED BY THESE TERMS. THE DISCLAIMERS
        IN THIS SECTION 11 WILL APPLY TO THE MAXIMUM EXTENT PERMITTED BY
        APPLICABLE LAW. CUSTOMER AND SITE VISITORS MAY HAVE OTHER STATUTORY
        RIGHTS, HOWEVER, ANY STATUTORILY REQUIRED WARRANTIES UNDER APPLICABLE
        LAW, IF ANY, WILL BE LIMITED TO THE SHORTEST PERIOD AND MAXIMUM EXTENT
        PERMITTED BY LAW.
      </p>

      {/* Section 12 */}
      <h2 className={sectionHeading}>
        12.&nbsp;&nbsp;INDEMNIFICATION OBLIGATIONS‍
      </h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>12.1</span>&nbsp; Customer agrees to defend,
          indemnify, and hold MyTechPassport, our affiliates, officers,
          directors, employees, suppliers, consultants, and agents harmless from
          any and all third party claims, liability, damages, and costs
          (including, but not limited to, attorneys' fees) arising from or
          related to, as applicable: (a) Customer’s access to and use of the
          Site; (b) violation of these Terms by Customer or its Authorized
          Users, as applicable; (c) infringement of any intellectual property or
          other right of any person or entity by Customer; (d) the nature and
          content of all Customer Data processed by the MyTechPassport E-Sign
          Service; (e) Customer’s authentication of end user(s), participant(s)
          or, signer(s), or (f) any products or services purchased or obtained
          by Customer.‍
        </li>
        <li>
          <span className={bold}>12.2</span>&nbsp; MyTechPassport retains the
          exclusive right to settle, compromise and pay, without Customer’s
          prior consent, any and all claims or causes of action which are
          brought against us. MyTechPassport reserves the right, at Customer’s
          expense, to assume the exclusive defense and control of any matter for
          which Customer is required to indemnify MyTechPassport and Customer
          agrees to cooperate with our defense of these claims. Customer agrees
          not to settle any matter in which we are named as a defendant and/or
          for which Customer has indemnity obligations without our prior written
          consent. MyTechPassport will use reasonable efforts to notify Customer
          of any such claim, action or proceeding upon becoming aware of it.
        </li>
      </ul>

      {/* Section 13 */}
      <h2 className={sectionHeading}>
        13.&nbsp;&nbsp;LIMITATIONS OF LIABILITY‍
      </h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>
            13.1&nbsp;Disclaimer of Consequential Damages.
          </span>{" "}
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL
          MYTECHPASSPORT OR ITS SUPPLIERS BE LIABLE FOR ANY LOSS OF USE, LOST OR
          INACCURATE DATA, INTERRUPTION OF BUSINESS, LOST PROFITS, COSTS OF
          DELAY, REPUTATIONAL HARM, OR ANY INDIRECT, SPECIAL, INCIDENTAL, COVER,
          RELIANCE OR CONSEQUENTIAL DAMAGES OF ANY KIND HOWEVER CAUSED, EVEN IF
          INFORMED IN ADVANCE OF THE POSSIBILITY OF THESE DAMAGES.‍
        </li>
        <li>
          <span className={bold}>13.2&nbsp;Cap on Damages.</span>{" "}
          MyTechPassport’S AND ITS SUPPLIERS’ TOTAL LIABILITY WILL NOT EXCEED IN
          AGGREGATE THE AMOUNT ACTUALLY PAID BY CUSTOMER TO MYTECHPASSPORT FOR
          THE APPLICABLE MyTechPassport E-Sign SERVICES OR RELATED SERVICES IN
          THE TWELVE (12) MONTHS PRECEDING THE CLAIM. FOR FREE ACCESS
          SUBSCRIPTIONS OR BETA RELEASES, MyTechPassport’S TOTAL LIABILITY WILL
          NOT EXCEED IN AGGREGATE FIFTY U.S. DOLLARS ($50 US).‍
        </li>
        <li>
          <span className={bold}>13.3&nbsp;Exceptions.</span> NOTWITHSTANDING
          THE FOREGOING, NONE OF THE LIMITATIONS IN THIS SECTION 13 EXCLUDES
          EITHER PARTY’S LIABILITY FOR FRAUD OR FOR DEATH OR PERSONAL INJURY TO
          THE EXTENT CAUSED BY A PARTY’S NEGLIGENCE. IN ADDITION, THE LAWS IN
          SOME JURISDICTIONS MAY NOT ALLOW SOME OF THE LIMITATIONS OF LIABILITY
          IN THIS SECTION 13. IF ANY OF THESE LAWS IS FOUND TO APPLY TO THESE
          TERMS, THIS SECTION 13 WILL APPLY TO THE MAXIMUM EXTENT PERMITTED BY
          LAW.‍
        </li>
        <li>
          <span className={bold}>13.4&nbsp;Failure of Essential Purpose.</span>{" "}
          EACH PARTY ACKNOWLEDGES AND AGREES THAT THIS SECTION 13 IS A
          FUNDAMENTAL BASIS OF THE BARGAIN AND A REASONABLE ALLOCATION OF RISK
          BETWEEN THE PARTIES AND WILL SURVIVE AND APPLY TO ANY CLAIMS ARISING
          OUT OF OR RELATED TO THESE TERMS, ANY MYTECHPASSPORT SERVICE OR ANY
          RELATED SERVICES, REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT,
          TORT, STRICT LIABILITY OR OTHERWISE), EVEN IF ANY LIMITED REMEDY IN
          THESE TERMS IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
        </li>
      </ul>

      {/* Section 14 */}
      <h2 className={sectionHeading}>
        14.&nbsp;&nbsp;THIRD PARTY PRODUCTS AND CONTENT
      </h2>
      <p className={pClass}>
        MyTechPassport may provide, or third parties may provide, links to other
        third-party websites, services, or resources that are beyond our
        control. MyTechPassport is not responsible for these third-party
        products or content. MyTechPassport makes no representations or
        warranties as to the quality, suitability, functionality, or legality of
        any third-party products or third-party content to which links may be
        provided, and you hereby waive any claim you might have against us with
        respect to such. Customer agrees that MyTechPassport is not responsible
        or liable for any loss or damage of any sort incurred as the result of
        any such dealings or as the result of the presence of such third-party
        products or third-party content.‍
      </p>

      {/* Section 15 */}
      <h2 className={sectionHeading}>15.&nbsp;&nbsp;GENERAL</h2>
      <ul className={listCommon}>
        <li>
          <span className={bold}>15.1&nbsp;Assignment.</span> These Terms will
          bind and inure to the benefit of each party’s permitted successors and
          assigns. Neither party may assign these Terms without the advance
          written consent of the other party, except that MyTechPassport may
          assign these Terms without consent to an Affiliate or in connection
          with a merger, reorganization, acquisition, or other transfer of all
          or substantially all of its assets or voting securities. Any attempt
          to transfer or assign these Terms except as expressly authorized under
          this Section 15.1 will be void.‍
        </li>
        <li>
          <span className={bold}>15.2&nbsp;Notices.</span> Any notice or
          communication under these Terms must be in writing. Customer must send
          any notices under these Terms (including breach notices) to
          MyTechPassport, in English, at the following address,{" "}
          <a className="underline" href="mailto:support@mytechpassport.com">
            support@mytechpassport.com
          </a>
          , and include “Attention: Legal Department” in the subject line.
          MyTechPassport may send notices to the email addresses on Customer’s
          account or, at MyTechPassport’s option, to Customer’s last-known
          postal address. MyTechPassport may also provide operational notices
          regarding the MyTechPassport E-Sign Services or other business-related
          notices through conspicuous posting of the notice on MyTechPassport’s
          website or the MyTechPassport E-Sign Service. Each party consents to
          receiving electronic notices. MyTechPassport is not responsible for
          any automatic filtering Customer or its network provider may apply to
          emails.‍
        </li>
        <li>
          <span className={bold}>15.3&nbsp;Publicity.</span> Unless otherwise
          specified in an applicable Order Form, MyTechPassport may use
          Customer’s name, logo, and marks to identify Customer as a
          MyTechPassport customer on MyTechPassport’s website and other
          marketing materials.‍
        </li>
        <li>
          <span className={bold}>15.4&nbsp;Subcontractors.</span> MyTechPassport
          may use subcontractors and permit them to exercise the rights granted
          to MyTechPassport in order to provide the MyTechPassport E-Sign
          Services and related services. These subcontractors may include, for
          example, MyTechPassport’s hosted service and email providers. However,
          subject to all terms and conditions of these Terms, MyTechPassport
          will remain responsible for: (i) compliance of its subcontractors with
          the terms of these Terms; and (ii) the overall performance of the
          MyTechPassport E-Sign Services if and as required under these Terms.‍
        </li>
        <li>
          <span className={bold}>15.5&nbsp;Subpoenas.</span> Nothing in these
          Terms prevents MyTechPassport from disclosing Customer Data to the
          extent required by law, subpoenas, or court orders, but MyTechPassport
          will use good faith efforts to notify Customer where permitted to do
          so.‍
        </li>
        <li>
          <span className={bold}>15.6&nbsp;Independent Contractors.</span> The
          parties to these Terms are independent contractors, and these Terms
          does not create a partnership, joint venture, employment, franchise,
          or agency relationship. Neither party has the power to bind the other
          or incur obligations on the other party’s behalf without the other
          party’s prior written consent. Non-parties do not benefit from and
          cannot enforce these terms. There are no third-party beneficiaries to
          these Terms. Customer must not represent to anyone that it is an agent
          of MyTechPassport or is otherwise authorized to bind or commit
          MyTechPassport in any way without MyTechPassport’s prior written
          authorization.‍
        </li>
        <li>
          <span className={bold}>15.7&nbsp;Force Majeure.</span> Neither party
          will be liable for any delay or failure to perform its obligation
          under these Terms (except payment obligations) if the delay or failure
          is due to causes beyond its reasonable control, such as a strike,
          blockade, war, act of terrorism, riot, natural disaster, failure or
          reduction of power or telecommunications or data networks or services,
          or government act.‍
        </li>
        <li>
          <span className={bold}>15.8&nbsp;Export Control.</span> Customer
          acknowledges that the MyTechPassport E-Sign Services, documentation,
          website, and all related products, information, technology, and
          software are subject to export control laws and regulations of the
          United States (including, but not limited to, the US Export
          Administration Act, sanction regulations from the U.S. Department of
          Treasury Office of Foreign Assets Control [“OFAC”]), and of other
          jurisdictions. Customer is responsible for obtaining any required
          export or import authorizations for use of the MyTechPassport E-Sign
          Services. Customer represents and warrants that it, its Affiliates,
          and its Authorized Users are not on any U.S. government list of
          prohibited or restricted parties or located in (or a national of) a
          country subject to a U.S. government embargo or that has been
          designated by the U.S. government as a “terrorist supporting” country.
          Customer must not access or use the MyTechPassport E-Sign Services in
          violation of any U.S. export embargo, prohibition or restriction.‍
        </li>
        <li>
          <span className={bold}>
            15.9&nbsp;MANDATORY ARBITRATION; WAIVER OF CLASS ACTIONS.
          </span>{" "}
          IF YOU ARE A U.S. RESIDENT, YOU ALSO AGREE TO THE FOLLOWING MANDATORY
          ARBITRATION PROVISIONS:
          <ol className="list-decimal pl-8 mt-2 space-y-2 font-sans">
            <li>
              <span className={bold}>We Both Agree to Arbitrate.</span> You and
              MyTechPassport agree to resolve any claims relating to these Terms
              or the MyTechPassport E-Sign Services through final and binding
              arbitration by a single arbitrator, except as set forth under
              Exceptions to Agreement to Arbitrate below. This includes disputes
              arising out of or relating to interpretation or application of
              this “Mandatory Arbitration Provisions” section, including its
              enforceability, revocability, or validity.
            </li>
            <li>
              <span className={bold}>Opt-out of Agreement to Arbitrate.</span>{" "}
              You can decline this agreement to arbitrate within 30 days of
              first registering your account by contacting us at{" "}
              <a className="underline" href="mailto:support@mytechpassport.com">
                support@mytechpassport.com
              </a>
              .
            </li>
            <li>
              <span className={bold}>Arbitration Procedures and Fees.</span> The
              American Arbitration Association (AAA) will administer the
              arbitration under its Commercial Arbitration Rules and the
              Supplementary Procedures for Consumer Related Disputes. The
              arbitration will be held in the United States county where you
              live or work, San Francisco (CA), or any other location we agree
              to. For North Carolina consumers, with respect to claims relating
              to or arising out of use of the Templates, the arbitration will be
              held in North Carolina or any other location we agree to. The AAA
              rules will govern payment of all arbitration fees.
            </li>
            <li>
              <span className={bold}>
                Exceptions to Agreement to Arbitrate.
              </span>{" "}
              Either you or MyTechPassport may assert claims, if they qualify,
              in small claims court in San Francisco (CA) or any United States
              county where you live or work. Either party may bring a lawsuit
              solely for injunctive relief to stop unauthorized use or abuse of
              the MyTechPassport E-Sign Services, or intellectual property
              infringement (for example, trademark, trade secret, copyright, or
              patent rights) without first engaging in arbitration or the
              informal dispute-resolution process described above. If the
              agreement to arbitrate is found not to apply to you or your claim,
              you agree to the exclusive jurisdiction of the state and federal
              courts in San Francisco County, California to resolve your claim.
              This exclusive jurisdiction provision does not apply to North
              Carolina consumers with respect to claims relating to or arising
              out of use of the Templates.
            </li>
            <li>
              <span className={bold}>NO CLASS ACTIONS.</span> You may only
              resolve disputes with us on an individual basis, and may not bring
              a claim as a plaintiff or a class member in a class, consolidated,
              or representative action. Class arbitrations, class actions,
              private attorney general actions, and consolidation with other
              arbitrations aren’t allowed. If this specific paragraph is held
              unenforceable, then the entirety of this “Mandatory Arbitration
              Provisions” section will be deemed void.
            </li>
          </ol>
        </li>
        <li>
          <span className={bold}>15.10&nbsp;Amendments; Waivers.</span> Any
          modification or amendment to these Terms must be made in writing and
          executed by an authorized representative of each party. However, if
          MyTechPassport modifies these Terms or any applicable Service Specific
          Terms during Customer’s Subscription Term, the modified version will
          take effect upon Customer’s next Subscription Term renewal. In
          addition: (a) If MyTechPassport launches new products or optional
          features that require opt-in acceptance of new terms, those terms will
          apply upon Customer’s acceptance or use; (b) changes to any terms will
          take effect immediately for Free Access Subscriptions; and (c) during
          a Subscription Term, MyTechPassport may update MyTechPassport’s
          Security page, Privacy Policy, Acceptable Use Policy, and Service
          Specific Terms from time-to-time to reflect process improvements or
          changing practices, and these changes will take effect thirty (30)
          days from the date of posting so long as they do not substantially
          diminish Customer’s rights or create substantial additional Customer
          obligations during a Subscription Term. MyTechPassport’s documentation
          is available online and constantly being developed and improved, and
          as a result, during a Subscription Term MyTechPassport may update the
          documentation to reflect best practice with the relevant
          MyTechPassport E-Sign Service, provided that these changes do not
          substantially diminish Customer’s rights or create substantial
          Customer obligations. In the event of any conflict between these Terms
          and any order form, these Terms will take precedence unless otherwise
          expressly provided. No waiver will be implied from conduct or failure
          to enforce or exercise rights under these Terms. Waivers must be made
          in writing and executed by an authorized representative of the waiving
          party. The waiver by either you or MyTechPassport of any breach of any
          provision of these Terms does not waive any other breach. The failure
          of any party to these Terms to insist on strict performance of any
          covenant or obligation in accordance with these Terms will not be a
          waiver of such party’s right to demand strict compliance in the
          future, nor will the same be construed as a novation of these Terms.‍‍
        </li>
        <li>
          <span className={bold}>15.11&nbsp;Severability.</span> If any
          provision of these Terms is found by any court of competent
          jurisdiction to be unenforceable or invalid, that provision will be
          limited to the minimum extent necessary so that these Terms may
          otherwise remain in effect.‍‍
        </li>
        <li>
          <span className={bold}>15.12&nbsp;No Third-Party Rights.</span>{" "}
          Nothing in these Terms confers on any third party the right to enforce
          any provision of these Terms. Customer acknowledges that each Order
          Form only permits use by and for the legal entity or entities
          identified in the Order Form(s) as the Customer, and not any Customer
          Affiliates.‍‍
        </li>
        <li>
          <span className={bold}>15.13&nbsp;Entire Agreement.</span> These Terms
          represents the parties’ complete and exclusive understanding relating
          to the subject matter of these Terms. It supersedes all prior or
          contemporaneous oral or written communications, proposals and
          representations with respect to the MyTechPassport E-Sign Services or
          any other subject matter covered by these Terms. The terms of the
          United Nations Convention on Contracts for the Sale of Goods do not
          apply to these Terms. Any terms provided by Customer (including as
          part of any purchase order or other business form used by Customer)
          are for administrative purposes only, and have no legal effect.‍‍
        </li>
        <li>
          <span className={bold}>15.14&nbsp;Governing Law &amp; Venue.</span>{" "}
          These terms will be interpreted, construed, and enforced in all
          respects in accordance with the local laws of the State of California,
          U.S.A., without reference to its choice of law rules to the contrary.
          The parties agree to submit to the exclusive jurisdiction of, and
          venue in the federal or state court of competent jurisdiction located
          in San Francisco, California, U.S.A. This exclusive jurisdiction and
          venue provision does not apply to North Carolina consumers with
          respect to claims relating to or arising out of use of the
          Templates.‍‍
        </li>
        <li>
          <span className={bold}>15.15&nbsp;Language and Translations.</span>{" "}
          MyTechPassport may provide translations of these Terms or other terms
          or policies. Translations are provided for informational purposes and
          if there is an inconsistency or conflict between a translation and the
          English version, the English version will control.
        </li>
      </ul>

      {/* Footer Links */}
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

export default EsignTerms;
