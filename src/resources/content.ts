import {media} from "@/resources/media";
import {FaTwitter, FaFacebook, FaLinkedin} from "react-icons/fa";
import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_LEGAL_NAME,
    COMPANY_NAME,
    COMPANY_NUMBER
} from "@/resources/constants";

export const baseURL =
    typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const headerContent = {
    logo: {
        src: media.logo.src,
        alt: `${COMPANY_NAME} logo`,
        href: "/"
    },
    links: [
        {label: `About Us`, href: "/about-us"},
        {label: "Pricing", href: "/pricing"},
        {label: "Faq", href: "/faq"},
        {label: "Support", href: "/contact-us"},

    ]
};

export const footerContent = {
    logo: {src: media.logo_white.src, alt: `${COMPANY_NAME} logo`, href: "/"},
    columns: [
        {
            title: "Navigate",
            links: [
                {label: "Order Translation", href: "/dashboard"},
                {label: `About Us`, href: "/about-us"},
                {label: "Pricing", href: "/pricing"},
                {label: "Faq", href: "/faq"},
                {label: "Support", href: "/contact-us"},
            ]
        },
        {
            title: "Legal",
            links: [
                {label: "Terms & Conditions", href: "/terms-and-conditions"},
                {label: "Privacy Policy", href: "/privacy-policy"},
                {label: "Cookie Policy", href: "/cookie-policy"},
                {label: "Refunds & Balance", href: "/refund-policy"},
                {label: "Delivery Policy", href: "/delivery-policy"},
                {label: "Acceptable Use", href: "/acceptable-use"},
                {label: "Confidentiality", href: "/confidentiality-and-security"},
                {label: "Legal Notice", href: "/legal-notice"},
            ],
        },
    ],
    contact: {
        email: COMPANY_EMAIL,
        address: COMPANY_ADDRESS,
    },

    legal: {
        companyName: COMPANY_LEGAL_NAME,
        companyNumber: COMPANY_NUMBER,
        address: COMPANY_ADDRESS,
        email: COMPANY_EMAIL,
    },
    socials: [],
};

