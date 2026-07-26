import type { Metadata } from "next";

import FAQ, {
    type FAQCard,
    type FAQCategory,
    type FAQItem,
} from "@/components/constructor/faq/FAQ";
import { COMPANY_EMAIL, COMPANY_NAME } from "@/resources/constants";
import { metadataFromSchema } from "@/utils/fromSchema";
import { TRANSLATION_PLANS } from "@/data/translationConfig";

const aiPlan = TRANSLATION_PLANS.find((p) => p.id === "ai")!;
const specialistPlan = TRANSLATION_PLANS.find((p) => p.id === "specialist")!;

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
        bg: "#111827",
        color: "#ffffff",
    },
};

const faqCategories: FAQCategory[] = [
    "General",
    "Payments",
    "Translations",
    "Delivery",
    "Account",
];

const faqCards: FAQCard[] = [
    {
        icon: "book",
        title: "Getting Started",
        description:
            "Learn how the service works, how to order your first translation, and how to get started quickly.",
        linkText: "Explore basics",
        href: "/contact-us",
    },
    {
        icon: "payments",
        title: "Payments & Balance",
        description:
            "Understand how your balance works, how to top up, and how orders are charged.",
        linkText: "View payment help",
        href: "/contact-us",
    },
    {
        icon: "downloads",
        title: "Delivery & Results",
        description:
            "Find answers about delivery times, downloading results, and order status.",
        linkText: "Contact support",
        href: "/contact-us",
    },
];

const faqItems: FAQItem[] = [
    {
        category: "General",
        question: `What is ${COMPANY_NAME}?`,
        answer: `${COMPANY_NAME} is an online translation service for documents and text. You can order an instant AI translation or a specialist translation with professional review, in 30+ languages.`,
    },
    {
        category: "General",
        question: "How does the process work?",
        answer:
            "You create an account, top up your Account Balance, then place an order: choose the service level, set the language pair, and paste your text or upload a document. The cost is deducted from your balance and the finished translation appears in your account.",
    },
    {
        category: "Translations",
        question: "What is the difference between AI and Specialist translation?",
        answer:
            "AI translation is generated instantly by our translation engine — ideal for everyday texts, emails, and drafts. Specialist translation goes through our premium workflow with professional review, consistent terminology, and polished formatting, and is delivered within 12–24 hours.",
    },
    {
        category: "Translations",
        question: "How is the price calculated?",
        answer: `Pricing is per word: £${aiPlan.perWord.toFixed(2)} per word for AI translation (minimum £${aiPlan.minimum.toFixed(2)}) and £${specialistPlan.perWord.toFixed(2)} per word for specialist translation (minimum £${specialistPlan.minimum.toFixed(2)}). The word count and exact total are shown before you confirm the order.`,
    },
    {
        category: "Translations",
        question: "Which file formats can I upload?",
        answer:
            "PDF, DOCX, and TXT files up to 15 MB. You can also paste text directly into the order form. The text is extracted automatically and the word count is calculated for you.",
    },
    {
        category: "Translations",
        question: "Which languages do you support?",
        answer:
            "We support 30+ languages including English, Swedish, German, French, Spanish, Italian, Polish, Ukrainian, Chinese, Japanese, Korean, and Arabic — in any combination of source and target language.",
    },
    {
        category: "Translations",
        question: "Can I give special instructions?",
        answer:
            "Yes. Every order has an instructions field where you can request a formal tone, ask to keep brand names untranslated, specify regional spelling, and similar preferences.",
    },
    {
        category: "Payments",
        question: "What is Account Balance?",
        answer:
            "Account Balance is store credit recorded in your account and used to pay for translation orders on this website. It is non-transferable, is not cryptocurrency, is not tradable and is not redeemable for cash. Full rules are in the Payment and Account Balance Policy.",
    },
    {
        category: "Payments",
        question: "Is there a minimum top-up?",
        answer:
            "No. There is no minimum or maximum top-up amount, and no minimum transaction amount for card payments. The fixed packages are offered for convenience only — you can enter any custom amount instead.",
    },
    {
        category: "Payments",
        question: "Do the prices include VAT?",
        answer:
            "Yes. Every price shown on the website is VAT-inclusive. The Top-Up Summary page shows the net amount and the VAT included before you confirm payment.",
    },
    {
        category: "Payments",
        question: "How are prices in EUR and USD calculated?",
        answer:
            "GBP is the base currency. EUR and USD prices are calculated from the GBP price using a fixed reference rate we maintain, with no conversion fee or surcharge added by us. Your bank or card issuer may apply its own exchange rate and fees. See the Payment and Account Balance Policy for details.",
    },
    {
        category: "Payments",
        question: "Do I need to pay every time I order a translation?",
        answer:
            "No. You add funds to your Account Balance and then place orders without repeating the full checkout — each order is simply deducted from your balance.",
    },
    {
        category: "Delivery",
        question: "When do I get my translation?",
        answer:
            "AI translations are ready in seconds and appear in your account immediately. Specialist translations are delivered within 12–24 hours — you will see the expected time on the order, and the result unlocks in your account automatically.",
    },
    {
        category: "Delivery",
        question: "Where can I find my finished translations?",
        answer:
            "Every order is listed in your account under Your Translations, where you can read the result online, copy it, or download it as a text file at any time.",
    },
    {
        category: "Delivery",
        question: "My specialist translation is still pending — is that normal?",
        answer:
            "Yes. Specialist orders include professional review and are delivered within 12–24 hours of ordering. If more than 24 hours have passed and the order is still pending, please contact support and we will look into it right away.",
    },
    {
        category: "Account",
        question: "Can I get a refund?",
        answer:
            "Digital services are covered by specific rules. Because you ask us to begin work immediately, your statutory right of withdrawal ends once processing begins. Refunds for non-delivery, duplicate charges, material defects and other cases are set out in the Refund and Cancellation Policy.",
    },
    {
        category: "Account",
        question: "Do I get a receipt?",
        answer:
            "Yes. A confirmation email is sent after every transaction, and a PDF receipt is available to download from the Transaction History in your account.",
    },
    {
        category: "Account",
        question: "Do I need an account to order translations?",
        answer:
            "Yes. An account is required to manage your balance, orders, and finished translations.",
    },
    {
        category: "Account",
        question: "Are my documents kept confidential?",
        answer:
            "Yes. Your documents and texts are used only to produce your translation and are never shared or published. See the Privacy Policy for details.",
    },
    {
        category: "Account",
        question: "How can I contact support?",
        answer:
            `You can contact us via the support page or email at ${COMPANY_EMAIL}. Our team will respond as soon as possible.`,
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
