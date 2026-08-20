import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const legalNoticeEn: PageSchema = {
    meta: {
        title: `Legal Notice and Company Information – ${COMPANY_NAME}`,
        description: "This page identifies the operator of QueTranslations and provides key service, payment and consumer information.",
        canonical: "/legal-notice",
        ogImage: {
            title: `Legal Notice and Company Information – ${COMPANY_NAME}`,
            description: "This page identifies the operator of QueTranslations and provides key service, payment and consumer information.",
            bg: "#170B33",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Legal Notice and Company Information",
            description: "Last updated: 19 August 2026",
        },
        {
            type: "text",
            description: "This page identifies the operator of QueTranslations and provides key service, payment and consumer information.",
        },
        {
            type: "text",
            title: "Company Information",
            description: "Legal name. QUENTICS OÜ.",
        },
        {
            type: "text",
            description: "Registration number. 17569282.",
        },
        {
            type: "text",
            description: "Registered address. Rotermanni tn 6, Kesklinna linnaosa, 10111 Tallinn, Harju maakond, Estonia.",
        },
        {
            type: "text",
            description: "Website. https://quetranslations.com/.",
        },
        {
            type: "text",
            description: "Email. info@quetranslations.com.",
        },
        {
            type: "text",
            title: "Service Information",
            description: "Service. QueTranslations provides online AI Translation and Human Translation. Users choose the service type before confirming an Order.",
        },
        {
            type: "text",
            description: "Human translators. Human Translation is performed by translators located within the European Economic Area.",
        },
        {
            type: "text",
            description: "Excluded services. QueTranslations does not provide certified, sworn, notarised, legal or medical translation services.",
        },
        {
            type: "text",
            description: "Delivery. AI Translation is normally delivered within several minutes. Human Translation up to 5,000 source words is normally delivered within 24 to 48 hours. Larger Human Translation Orders receive a separate estimate before confirmation.",
        },
        {
            type: "text",
            title: "Prices and Payments",
            description: "Currencies. Services and Account funding are available in EUR, GBP and USD.",
        },
        {
            type: "text",
            description: "Cards. Supported card brands are Visa and Mastercard, processed through a third-party payment provider.",
        },
        {
            type: "text",
            description: "Balance. Users add funds to an Account Balance and translation prices are deducted from that Balance when an Order is confirmed. There are no recurring subscriptions.",
        },
        {
            type: "text",
            description: "Refunds. Unused paid Balance may be refunded at any time on request to info@quetranslations.com. A valid refund is initiated to the original payment method in the original currency within 14 days, without a refund fee charged by QueTranslations.",
        },
        {
            type: "text",
            description: "Taxes. Applicable taxes are displayed before the relevant transaction where required.",
        },
        {
            type: "text",
            title: "Geographic Availability",
            description: "Available markets. The Services are intended to be available internationally except where access is restricted by these policies, technical controls or applicable law.",
        },
        {
            type: "text",
            description: "Excluded countries. The Services are unavailable in Afghanistan, Belarus, Central African Republic, Cuba, Democratic Republic of the Congo, Haiti, Iran, Iraq, Mali, Myanmar (Burma), North Korea, Russia, Somalia, South Sudan, Sudan, Syria, Venezuela, Yemen and Zimbabwe.",
        },
        {
            type: "text",
            description: "Sanctions. Access is also prohibited where service would violate sanctions or trade restrictions binding on QUENTICS OÜ.",
        },
        {
            type: "text",
            title: "Website and Intellectual Property",
            description: "Ownership. Unless otherwise indicated, the website, QueTranslations name, interface, original text, design, software and platform materials are owned by or licensed to QUENTICS OÜ and may not be copied or exploited without permission.",
        },
        {
            type: "text",
            description: "Customer rights. Rights in source documents remain with the user or relevant rights holder. Rights in deliverables are addressed in the Terms and Conditions.",
        },
        {
            type: "text",
            description: "External links. Links to third-party websites are provided for convenience and do not constitute endorsement or responsibility for their content.",
        },
        {
            type: "text",
            title: "Consumer Complaints and Redress",
            description: "Complaint first. Consumers should first send a written complaint to info@quetranslations.com. QUENTICS OÜ will respond to written consumer complaints within 15 days.",
        },
        {
            type: "text",
            description: "Estonian Consumer Disputes Committee. An eligible consumer who cannot resolve a contractual dispute directly may apply to the Consumer Disputes Committee operating through the Estonian Consumer Protection and Technical Regulatory Authority. Information is available at https://ttja.ee/en/consumer-disputes-committee.",
        },
        {
            type: "text",
            description: "Cross-border assistance. A consumer residing in another EU or EEA country may contact the European Consumer Centre in their country for assistance with a cross-border dispute.",
        },
        {
            type: "text",
            description: "ODR platform. The former European Online Dispute Resolution platform was discontinued in 2025 and is not used as a complaint channel.",
        },
        {
            type: "text",
            title: "Applicable Policies",
            description: "Policy set. Use of the website and Services is governed by the Terms and Conditions, Privacy Policy, Cookie Policy, Refund, Cancellation and Balance Policy, Service Delivery, Revisions and Complaints Policy, Acceptable Use and Uploaded Content Policy, and Confidentiality and Data Security Statement.",
        },
        {
            type: "text",
            description: "Current versions. The current versions and effective dates are published on quetranslations.com. If policies conflict, mandatory law prevails, followed by any specific written agreement and then the more specific policy for the issue.",
        },
        {
            type: "text",
            title: "Governing Law and Contact",
            description: "Law. The Services and policies are governed by Estonian law, without depriving consumers of mandatory protection applicable in their country of habitual residence.",
        },
        {
            type: "text",
            description: "Contact. Formal notices and general enquiries may be sent to info@quetranslations.com or to QUENTICS OÜ, Rotermanni tn 6, Kesklinna linnaosa, 10111 Tallinn, Harju maakond, Estonia.",
        },
    ],
};

export default legalNoticeEn;
