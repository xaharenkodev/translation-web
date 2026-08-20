import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const acceptableUseEn: PageSchema = {
    meta: {
        title: `Acceptable Use and Uploaded Content Policy – ${COMPANY_NAME}`,
        description: "This Policy protects users, translators, service providers and third parties while preserving legitimate translation use cases.",
        canonical: "/acceptable-use",
        ogImage: {
            title: `Acceptable Use and Uploaded Content Policy – ${COMPANY_NAME}`,
            description: "This Policy protects users, translators, service providers and third parties while preserving legitimate translation use cases.",
            bg: "#170B33",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Acceptable Use and Uploaded Content Policy",
            description: "Last updated: 19 August 2026",
        },
        {
            type: "text",
            description: "This Policy protects users, translators, service providers and third parties while preserving legitimate translation use cases.",
        },
        {
            type: "text",
            title: "General Standard",
            description: "Lawful and authorised use. Users may submit Customer Content only for lawful purposes and only where they have the rights, permissions and lawful basis necessary for translation and disclosure.",
        },
        {
            type: "text",
            description: "Context matters. QueTranslations recognises that legitimate translation may involve reporting, research, evidence, literature or other material that describes harmful conduct. Content is assessed by purpose and context, not merely by isolated words.",
        },
        {
            type: "text",
            title: "Prohibited Content and Conduct",
            description: "Illegal activity. Users may not use the Services to plan, facilitate, conceal or promote unlawful activity, fraud, phishing, identity theft, trafficking, extortion, credible threats or evasion of legal obligations.",
        },
        {
            type: "text",
            description: "Child exploitation. Content involving child sexual abuse material, grooming, sexual exploitation of minors or instructions facilitating such abuse is strictly prohibited and may be reported where law requires.",
        },
        {
            type: "text",
            description: "Malware and security abuse. Users may not upload malware, attempt unauthorised access, probe vulnerabilities, disrupt the Services, bypass security controls, scrape protected areas or misuse Accounts, payment functions or APIs.",
        },
        {
            type: "text",
            description: "Rights violations. Content may not unlawfully infringe copyright, trademark, privacy, data-protection, publicity, confidentiality or contractual rights.",
        },
        {
            type: "text",
            description: "Harassment and harm. The Services may not be used to facilitate targeted harassment, unlawful discrimination, non-consensual intimate content, doxxing, stalking or instructions intended to cause serious physical harm.",
        },
        {
            type: "text",
            description: "Deception. Users may not misrepresent an AI Translation as human-translated, represent a non-certified deliverable as certified, impersonate QueTranslations or another person, or remove notices in order to mislead a recipient.",
        },
        {
            type: "text",
            description: "Regulated reliance. Users may not present QueTranslations as providing legal advice, medical advice, clinical translation, sworn translation, notarisation or official certification.",
        },
        {
            type: "text",
            description: "Sanctions and location restrictions. Users may not access or use the Services from a restricted country listed in the Terms, on behalf of a sanctioned person or in a manner that would cause QueTranslations to violate sanctions or trade controls.",
        },
        {
            type: "text",
            title: "Customer Content Responsibilities",
            description: "Minimisation. Users should remove personal data, secrets and irrelevant sensitive material that is not necessary for translation.",
        },
        {
            type: "text",
            description: "Third-party data. Where a document contains another person’s data, the user must have authority to disclose it and must provide any legally required privacy notice.",
        },
        {
            type: "text",
            description: "Backups. Users should keep their own source and final copies. QueTranslations’ Account storage is provided for convenience and is not an archival or disaster-recovery service.",
        },
        {
            type: "text",
            description: "Instructions. Users must provide accurate language selections, terminology and context and must not intentionally submit misleading instructions designed to produce harmful or unlawful output.",
        },
        {
            type: "text",
            title: "Review and Enforcement",
            description: "Automated and manual review. QueTranslations may use proportionate automated security scanning and limited authorised review where necessary to investigate malware, abuse, fraud, sanctions concerns or a legal request. Such review does not create a general duty to monitor all Customer Content.",
        },
        {
            type: "text",
            description: "Action. QueTranslations may reject or pause an Order, remove unsafe files, restrict features, suspend or close an Account, preserve evidence or report conduct where reasonably necessary and legally permitted.",
        },
        {
            type: "text",
            description: "Proportionality. Where feasible, QueTranslations will consider the seriousness, context, user history and risk before acting and may request clarification. Immediate action may be taken where delay would create legal, security or safety risk.",
        },
        {
            type: "text",
            description: "Payments. Enforcement does not permit QueTranslations to confiscate unused paid Balance. Such Balance remains refundable unless repayment is prohibited by law or is subject to a legitimate payment, sanctions or fraud investigation.",
        },
        {
            type: "text",
            title: "Reporting and Appeals",
            description: "Report. Suspected abuse, rights infringement or unsafe content may be reported to info@quetranslations.com with sufficient detail to identify the relevant material or Account.",
        },
        {
            type: "text",
            description: "Appeal. A user affected by an enforcement action may request review by explaining the context and providing supporting evidence. QueTranslations will assess the request in good faith but may maintain restrictions required by law or security.",
        },
        {
            type: "text",
            title: "Changes",
            description: "Policy updates. This Policy may be updated to reflect service, risk or legal developments. Material restrictions apply prospectively unless immediate action is necessary to protect users, QueTranslations or third parties.",
        },
    ],
};

export default acceptableUseEn;
