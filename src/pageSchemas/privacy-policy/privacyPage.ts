import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const privacyPageEn: PageSchema = {
    meta: {
        title: `Privacy Policy – ${COMPANY_NAME}`,
        description: "This Policy explains how QUENTICS OÜ processes personal data in connection with QueTranslations.",
        canonical: "/privacy-policy",
        ogImage: {
            title: `Privacy Policy – ${COMPANY_NAME}`,
            description: "This Policy explains how QUENTICS OÜ processes personal data in connection with QueTranslations.",
            bg: "#170B33",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Privacy Policy",
            description: "Last updated: 19 August 2026",
        },
        {
            type: "text",
            description: "This Policy explains how QUENTICS OÜ processes personal data in connection with QueTranslations.",
        },
        {
            type: "text",
            title: "Who We Are",
            description: "Controller. QUENTICS OÜ, registration number 17569282, Rotermanni tn 6, Kesklinna linnaosa, 10111 Tallinn, Harju maakond, Estonia, is the controller of personal data processed for operating accounts, payments, customer support, website administration and its own legal obligations.",
        },
        {
            type: "text",
            description: "Service-related roles. When a business customer submits personal data contained in documents solely for translation, QueTranslations may act as a processor on that customer’s behalf. The parties may enter into a separate Data Processing Addendum where Article 28 of the GDPR applies.",
        },
        {
            type: "text",
            description: "Contact. Privacy questions and data-subject requests may be sent to info@quetranslations.com.",
        },
        {
            type: "text",
            title: "Scope",
            description: "Coverage. This Privacy Policy applies to quetranslations.com, Accounts, Balance transactions, AI Translation, Human Translation, uploaded files, translated files, support communications and related technical records.",
        },
        {
            type: "text",
            description: "Third-party services. Third-party websites, banks, card issuers and services linked from the website are governed by their own privacy notices. QueTranslations is responsible only for processing within its control.",
        },
        {
            type: "text",
            title: "Personal Data We Process",
            description: "Account and contact data. This may include name, email address, authentication identifiers, organisation details, country, preferred language and Account settings.",
        },
        {
            type: "text",
            description: "Order data. This includes source and target languages, selected AI or Human Translation, word count, pricing, status, delivery information, instructions, revision requests and complaint history.",
        },
        {
            type: "text",
            description: "Customer Content. Uploaded and translated files may contain names, contact details, identification data, employment information, financial information or other personal data relating to the user or third parties. QueTranslations does not intentionally require special-category or highly sensitive data unless it is genuinely necessary for the requested translation.",
        },
        {
            type: "text",
            description: "Payment data. QueTranslations receives transaction references, currency, amount, payment status, limited card metadata and refund or chargeback information. Full payment-card details are generally collected directly by the payment processor rather than stored by QueTranslations.",
        },
        {
            type: "text",
            description: "Technical data. This may include IP address, device and browser information, timestamps, security logs, cookie identifiers, consent choices and diagnostic events.",
        },
        {
            type: "text",
            description: "Communications. QueTranslations processes emails, support requests, feedback, notices, identity-verification information and records needed to address complaints or exercise legal rights.",
        },
        {
            type: "text",
            title: "How We Obtain Data",
            description: "Direct collection. Most data is provided when a user creates or uses an Account, adds funds, uploads a file, confirms an Order, requests support, seeks a refund or changes cookie preferences.",
        },
        {
            type: "text",
            description: "Automatic collection. Technical and cookie data may be collected automatically when the website or Services are used, subject to consent requirements described in the Cookie Policy.",
        },
        {
            type: "text",
            description: "Third-party data. Payment processors, fraud-prevention providers and infrastructure providers may return transaction, security or service status information. Customer Content may also contain data about individuals who are not the Account holder.",
        },
        {
            type: "text",
            title: "Purposes and Legal Bases",
            description: "Contract performance. Account administration, Balance management, Order processing, translation, delivery, revision, support and refunds are processed because they are necessary to enter into or perform a contract with the user.",
        },
        {
            type: "text",
            description: "Legal obligations. Transaction, tax, accounting, sanctions, consumer-complaint and regulatory data may be processed to comply with legal duties binding on QueTranslations.",
        },
        {
            type: "text",
            description: "Legitimate interests. QueTranslations may process limited data to secure the Services, prevent fraud, investigate misuse, maintain business records, improve reliability, establish or defend legal claims and understand service performance, provided those interests are not overridden by individual rights.",
        },
        {
            type: "text",
            description: "Consent. Consent is used where required for non-essential cookies or optional communications. Consent may be withdrawn at any time without affecting processing already carried out lawfully.",
        },
        {
            type: "text",
            description: "Special-category data. Where Customer Content contains special-category data, QueTranslations processes it only to the extent a lawful Article 9 GDPR condition applies or, when acting as a processor, under the documented instructions and responsibility of the relevant controller.",
        },
        {
            type: "text",
            title: "AI Translation",
            description: "Automated processing. For AI Translation, necessary portions of Customer Content are transmitted to third-party AI infrastructure and model providers to generate the requested translation. The output is then returned to QueTranslations and made available to the user.",
        },
        {
            type: "text",
            description: "No training use. QueTranslations does not use Customer Content or translations to train AI models and does not opt in to provider programmes that share API content for model training.",
        },
        {
            type: "text",
            description: "Provider retention. Depending on the technical endpoint and contractual controls used, an AI provider may temporarily retain prompts, outputs or related security metadata for service operation, abuse monitoring or legal compliance. QueTranslations seeks to minimise submitted data and uses available contractual and technical controls appropriate to the service.",
        },
        {
            type: "text",
            description: "No significant automated decisions. AI Translation generates language output but is not used by QueTranslations to make decisions producing legal or similarly significant effects about an individual.",
        },
        {
            type: "text",
            title: "Human Translation",
            description: "EEA translators. Human Translation is performed by translators located within the European Economic Area. They receive only the Customer Content and instructions reasonably necessary for the assigned Order.",
        },
        {
            type: "text",
            description: "Confidentiality. Human translators are subject to contractual confidentiality and data-protection obligations and may not use Customer Content for their own purposes.",
        },
        {
            type: "text",
            title: "Recipients",
            description: "Service providers. Personal data may be disclosed to hosting and storage providers, AI infrastructure providers, payment processors, email and support providers, security and fraud-prevention providers, analytics providers used with valid consent, and professional advisers where necessary.",
        },
        {
            type: "text",
            description: "Authorities and transactions. Data may be disclosed to courts, regulators, law-enforcement bodies or other authorities where legally required, and to a buyer or successor in a genuine corporate transaction subject to appropriate confidentiality safeguards.",
        },
        {
            type: "text",
            description: "No sale. QueTranslations does not sell Customer Content or personal data for money and does not permit human translators to exploit it independently.",
        },
        {
            type: "text",
            title: "International Transfers",
            description: "EEA and other locations. Although human translators are located within the EEA, some technology providers or their subprocessors may process data outside the EEA. Where the destination is not covered by an adequacy decision, QueTranslations relies on an approved transfer mechanism such as Standard Contractual Clauses and supplementary safeguards where required.",
        },
        {
            type: "text",
            description: "Further information. Users may request information about the relevant transfer safeguards by contacting info@quetranslations.com. Confidential or commercially sensitive details may be redacted where permitted.",
        },
        {
            type: "text",
            title: "Retention",
            description: "Files and translations. Customer files and completed translations may remain available in the Account while it is active. They are automatically deleted after 24 consecutive months of Account inactivity and may be deleted earlier through Account controls or a valid request, unless temporary preservation is necessary for an active dispute, security incident or legal obligation.",
        },
        {
            type: "text",
            description: "Provider and backup copies. Deletion from active systems does not always remove residual encrypted backup copies immediately. Such copies are isolated from ordinary use and removed through the applicable backup cycle. AI providers may retain limited content or logs for their own defined security or legal periods as described above.",
        },
        {
            type: "text",
            description: "Account data. Core Account data is retained while the Account remains open and for a reasonable period after closure to complete deletion, prevent fraud, resolve disputes and comply with law.",
        },
        {
            type: "text",
            description: "Transaction records. Accounting, tax, payment and business records may be retained for at least seven years where required under Estonian law, even if associated files are deleted.",
        },
        {
            type: "text",
            description: "Support and claims. Support correspondence and complaint records are retained for as long as reasonably necessary to resolve the matter and establish, exercise or defend legal claims.",
        },
        {
            type: "text",
            title: "Security",
            description: "Safeguards. QueTranslations uses proportionate technical and organisational measures designed to protect personal data against accidental loss, unauthorised access, alteration, disclosure and destruction. Measures are reviewed in light of the sensitivity of Customer Content, available technology and implementation cost.",
        },
        {
            type: "text",
            description: "No absolute guarantee. No internet service can guarantee absolute security. Users should protect Account credentials, avoid unnecessary sensitive data, maintain local copies and notify QueTranslations promptly of suspected compromise.",
        },
        {
            type: "text",
            title: "Individual Rights",
            description: "GDPR rights. Subject to applicable conditions, an individual may request access, correction, deletion, restriction, portability or objection, and may withdraw consent at any time.",
        },
        {
            type: "text",
            description: "How to exercise rights. Requests should be sent to info@quetranslations.com. QueTranslations may request proportionate information to verify identity and authority, particularly where Customer Content concerns third parties or a business customer controls the data.",
        },
        {
            type: "text",
            description: "Limitations. A request may be limited or refused where permitted by law, including where retention is legally required, disclosure would adversely affect another person’s rights, or QueTranslations processes the data solely on documented instructions of another controller.",
        },
        {
            type: "text",
            description: "Complaint. Individuals may lodge a complaint with the Estonian Data Protection Inspectorate at https://www.aki.ee/en or with the competent supervisory authority in their EU or EEA country of residence or work.",
        },
        {
            type: "text",
            title: "Children",
            description: "Age restriction. The Services are intended for adults and are not directed to persons under 18. QueTranslations does not knowingly create Accounts for children. A parent or guardian who believes a child has submitted personal data should contact QueTranslations.",
        },
        {
            type: "text",
            title: "Changes and Contact",
            description: "Updates. This Privacy Policy may be updated to reflect legal, technical or service changes. The current version and date will be published on the website, and material changes will be communicated where reasonably appropriate.",
        },
        {
            type: "text",
            description: "Contact details. Privacy correspondence may be sent to QUENTICS OÜ at info@quetranslations.com or Rotermanni tn 6, Kesklinna linnaosa, 10111 Tallinn, Harju maakond, Estonia.",
        },
    ],
};

export default privacyPageEn;
