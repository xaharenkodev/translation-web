import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const confidentialityEn: PageSchema = {
    meta: {
        title: `Confidentiality and Data Security Statement – ${COMPANY_NAME}`,
        description: "QueTranslations applies a need-to-know, purpose-limited approach to Customer Content.",
        canonical: "/confidentiality-and-security",
        ogImage: {
            title: `Confidentiality and Data Security Statement – ${COMPANY_NAME}`,
            description: "QueTranslations applies a need-to-know, purpose-limited approach to Customer Content.",
            bg: "#170B33",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Confidentiality and Data Security Statement",
            description: "Last updated: 19 August 2026",
        },
        {
            type: "text",
            description: "QueTranslations applies a need-to-know, purpose-limited approach to Customer Content.",
        },
        {
            type: "text",
            title: "Commitment",
            description: "Purpose. QueTranslations recognises that source documents and translations may contain private, commercial or personal information. This Statement describes the measures and limits applicable to confidential handling.",
        },
        {
            type: "text",
            description: "Scope. The commitment applies to Customer Content, Order instructions, translation output and support material received through the Services.",
        },
        {
            type: "text",
            title: "Limited Use and Access",
            description: "Purpose limitation. Customer Content is used only to provide, secure and support the requested Services, administer the Account, comply with law and resolve disputes. It is not used for unrelated marketing or sold to third parties.",
        },
        {
            type: "text",
            description: "Need-to-know access. Access is restricted to authorised personnel, assigned translators and service providers that need the information for a defined operational purpose.",
        },
        {
            type: "text",
            description: "Human translators. Human Translation is performed by translators located within the EEA and subject to confidentiality and data-protection obligations. They may not retain, publish, reuse or disclose Customer Content for their own purposes.",
        },
        {
            type: "text",
            description: "AI providers. For AI Translation, necessary content is transmitted to third-party model and infrastructure providers. QueTranslations does not opt in to using Customer Content for model training. Providers may temporarily process or retain limited data for technical, security, abuse-prevention or legal purposes.",
        },
        {
            type: "text",
            title: "Safeguards",
            description: "Organisational measures. QueTranslations applies role-based access, confidentiality commitments, provider assessment, access review, incident procedures and data-retention rules appropriate to the nature of the Services.",
        },
        {
            type: "text",
            description: "Technical measures. QueTranslations uses commercially reasonable technical controls designed to protect transmission, authentication, storage and system access. Specific controls may evolve as technology and risk change.",
        },
        {
            type: "text",
            description: "Data minimisation. Only content reasonably necessary for the selected translation and related support is provided to a translator or AI service.",
        },
        {
            type: "text",
            description: "Retention control. Files are removed after 24 consecutive months of Account inactivity or earlier on valid request, subject to backup cycles, active disputes and legal retention. Payment and accounting records are retained separately where required.",
        },
        {
            type: "text",
            title: "User Security Responsibilities",
            description: "Credentials. Users must protect passwords and devices, avoid sharing Accounts and notify QueTranslations promptly of suspected unauthorised access.",
        },
        {
            type: "text",
            description: "Sensitive content. Users should not include unnecessary sensitive data and should consider redaction or anonymisation before upload where identity is irrelevant to the translation.",
        },
        {
            type: "text",
            description: "Local copies. Users must keep independent copies of important files. QueTranslations is not a permanent archive, records-management provider or backup service.",
        },
        {
            type: "text",
            description: "Secure communication. Users should avoid sending passwords, full card details or unrelated confidential material by ordinary email.",
        },
        {
            type: "text",
            title: "Permitted Disclosures",
            description: "Legal requirements. QueTranslations may disclose information where required by law, court order or binding authority request and may preserve relevant material to establish, exercise or defend legal claims.",
        },
        {
            type: "text",
            description: "Emergency and security. Limited disclosure may occur where reasonably necessary to address fraud, a serious security incident, imminent harm or prohibited content, subject to applicable law.",
        },
        {
            type: "text",
            description: "Corporate transaction. Information may be disclosed under confidentiality to advisers or a genuine purchaser in a merger, financing, reorganisation or sale, with continued protection required from any successor.",
        },
        {
            type: "text",
            title: "Security Incidents",
            description: "Response. QueTranslations maintains procedures to assess, contain, investigate and remediate suspected personal-data breaches and security incidents.",
        },
        {
            type: "text",
            description: "Notification. Affected users and supervisory authorities will be notified without undue delay where notification is required by applicable law. A notice may describe the nature of the incident, likely consequences and measures taken or recommended.",
        },
        {
            type: "text",
            title: "Limitations",
            description: "No absolute security. No online system or transmission method can be guaranteed completely secure. This Statement describes a risk-based commitment and does not create an absolute warranty against every unauthorised event.",
        },
        {
            type: "text",
            description: "Not a separate NDA. This public Statement does not replace a negotiated non-disclosure agreement or Data Processing Addendum where a business customer requires additional contractual protections.",
        },
        {
            type: "text",
            title: "Contact",
            description: "Requests. Confidentiality questions, security reports and deletion requests should be sent to info@quetranslations.com.",
        },
    ],
};

export default confidentialityEn;
