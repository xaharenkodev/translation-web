import type { Metadata } from "next";

import FAQ, { type FAQCard } from "@/components/constructor/faq/FAQ";
import { COMPANY_NAME } from "@/resources/constants";
import { metadataFromSchema } from "@/utils/fromSchema";
import { faqCategories, faqItems } from "@/data/faq";

const faqMeta = {
    title: `FAQ — ${COMPANY_NAME} Translation Services`,
    description: `Frequently asked questions about ordering translations, account balance, payments, delivery times, and supported languages on ${COMPANY_NAME}.`,
    keywords: [
        "translation FAQ",
        "document translation",
        "AI translation",
        "specialist translation",
        "translate pdf",
        "translate docx",
    ],
    canonical: "/faq",
    ogImage: {
        title: `${COMPANY_NAME} — Translation FAQ`,
        description:
            "Answers about translation orders, balance system, delivery, and supported languages.",
        bg: "#170B33",
        color: "#ffffff",
    },
};

/* Each card filters the list below to the topic it advertises. */
const faqCards: FAQCard[] = [
    {
        icon: "book",
        title: "Getting Started",
        description:
            "Learn how the service works, how to order your first translation, and how to get started quickly.",
        linkText: "Explore basics",
        category: "General",
    },
    {
        icon: "payments",
        title: "Payments & Balance",
        description:
            "Understand how your balance works, how to top up, and how orders are charged.",
        linkText: "View payment help",
        category: "Payments",
    },
    {
        icon: "downloads",
        title: "Delivery & Results",
        description:
            "Find answers about delivery times, downloading results, and order status.",
        linkText: "See delivery answers",
        category: "Delivery",
    },
];

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(faqMeta);
}

export default function Page() {
    return (
        <FAQ
            title="Frequently Asked Questions"
            description="Find answers about ordering translations, account balance, delivery times, and how the service works."
            items={faqItems}
            categories={faqCategories}
            cards={faqCards}
            contactCta={{
                title: "Still need help?",
                description:
                    "Our support team can help with orders, balance, delivery, and any questions before or after ordering a translation.",
                buttonText: "Contact Support",
                href: "/contact-us",
            }}
        />
    );
}
