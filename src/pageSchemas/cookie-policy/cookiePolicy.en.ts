import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const cookiePolicyEn: PageSchema = {
    meta: {
        title: `Cookie Policy – ${COMPANY_NAME}`,
        description: "Non-essential cookies must remain disabled until the user has made the consent choice required by applicable law.",
        canonical: "/cookie-policy",
        ogImage: {
            title: `Cookie Policy – ${COMPANY_NAME}`,
            description: "Non-essential cookies must remain disabled until the user has made the consent choice required by applicable law.",
            bg: "#170B33",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Cookie Policy",
            description: "Last updated: 19 August 2026",
        },
        {
            type: "text",
            description: "Non-essential cookies must remain disabled until the user has made the consent choice required by applicable law.",
        },
        {
            type: "text",
            title: "Purpose and Scope",
            description: "Purpose. This Cookie Policy explains how QueTranslations uses cookies and similar technologies on quetranslations.com and how users can control them.",
        },
        {
            type: "text",
            description: "Relationship to Privacy Policy. Cookies that identify or can reasonably be linked to a person are personal data and are handled under the Privacy Policy as well as this Cookie Policy.",
        },
        {
            type: "text",
            title: "What Cookies Are",
            description: "Definition. Cookies are small text files stored on a browser or device. Similar technologies may include local storage, pixels, tags and software development kit identifiers that support comparable functions.",
        },
        {
            type: "text",
            description: "First and third parties. First-party cookies are set for the QueTranslations domain. Third-party cookies or identifiers are set or read by an external provider whose service is integrated into the website.",
        },
        {
            type: "text",
            description: "Session and persistent cookies. Session cookies normally expire when the browser closes. Persistent cookies remain for a defined period or until deleted by the user.",
        },
        {
            type: "text",
            title: "Cookie Categories",
            description: "Strictly necessary. These technologies support essential functions such as secure login, Account sessions, payment flow, fraud prevention, load balancing, language or currency continuity, cookie-consent records and protection against malicious activity. They are used because they are necessary to provide the requested website or service and cannot normally be disabled through the consent tool.",
        },
        {
            type: "text",
            description: "Preference. Preference cookies remember optional choices such as display language, interface settings or similar convenience features. Where required by law, they are used only with consent.",
        },
        {
            type: "text",
            description: "Analytics. Analytics technologies help QueTranslations understand aggregate website use, performance, errors and feature interaction. They are not activated before consent where consent is legally required.",
        },
        {
            type: "text",
            description: "Marketing. Marketing or advertising technologies, if introduced, may measure campaigns or personalise advertising. QueTranslations will not activate them before valid consent where required and will identify them in the Cookie Settings panel.",
        },
        {
            type: "text",
            title: "Current Cookie Information",
            description: "Cookie Settings panel. The current list of non-essential cookies and similar technologies, including provider, purpose, category and lifetime, is made available through the website’s Cookie Settings or consent panel. That live panel forms part of this Cookie Policy because technologies may change as the website is developed.",
        },
        {
            type: "text",
            description: "No silent expansion. A new non-essential cookie category will not be activated for users who have not consented to it. A material change may require QueTranslations to request consent again.",
        },
        {
            type: "text",
            title: "Consent and Control",
            description: "Consent choice. When required, users can accept all optional cookies, reject them or choose categories. Rejecting optional cookies does not prevent access to core translation functions, although some convenience features may be reduced.",
        },
        {
            type: "text",
            description: "Withdrawal. Consent may be withdrawn or changed at any time through the Cookie Settings link on the website. Withdrawal does not affect prior lawful processing.",
        },
        {
            type: "text",
            description: "Browser controls. Browsers also allow users to block or delete cookies. Blocking strictly necessary cookies may prevent login, payment, security or other requested functions from working correctly.",
        },
        {
            type: "text",
            description: "Signals. Where legally required and technically supported, QueTranslations will take account of recognised browser or device privacy signals. Such signals do not necessarily replace choices made in the website consent panel.",
        },
        {
            type: "text",
            title: "Legal Bases and Retention",
            description: "Necessary technologies. Strictly necessary technologies are used to provide requested electronic communications or Services and, where applicable, for QueTranslations’ legitimate interest in security and reliable operation.",
        },
        {
            type: "text",
            description: "Optional technologies. Preference, analytics and marketing technologies are used on the basis of consent where required by applicable law.",
        },
        {
            type: "text",
            description: "Duration. Cookie lifetimes are limited to the period reasonably necessary for the stated purpose and are shown in the Cookie Settings panel. Consent records may be retained for the period necessary to demonstrate compliance and manage user preferences.",
        },
        {
            type: "text",
            title: "Third Parties",
            description: "Third-party responsibility. A third-party cookie provider may process data under its own privacy notice. QueTranslations selects providers appropriate to the intended function and uses contractual and transfer safeguards where required.",
        },
        {
            type: "text",
            description: "Payments. A payment provider may use strictly necessary security, authentication or fraud-prevention technologies during Balance funding. Its technologies may be governed by its own notices displayed in the payment flow.",
        },
        {
            type: "text",
            title: "Changes and Contact",
            description: "Updates. QueTranslations may update this Cookie Policy when technologies, providers or law change. The current version and date will be published on the website.",
        },
        {
            type: "text",
            description: "Questions. Questions about cookies or consent may be sent to info@quetranslations.com.",
        },
    ],
};

export default cookiePolicyEn;
