import type {Metadata} from "next";
import {COMPANY_NAME} from "@/resources/constants";

import TranslationHero from "@/components/sections/translation/TranslationHero";
import LanguageMarquee from "@/components/sections/translation/LanguageMarquee";
import RevealStats from "@/components/sections/translation/RevealStats";
import ComparePlans from "@/components/sections/translation/ComparePlans";
import StepsPath from "@/components/sections/translation/StepsPath";
import UseCases from "@/components/sections/translation/UseCases";
import BigCta from "@/components/sections/translation/BigCta";
import TopUpSection from "@/components/sections/translation/TopUpSection";

import FAQ from "@/components/constructor/faq/FAQ";
import {TRANSLATION_PLANS} from "@/data/translationConfig";

export const metadata: Metadata = {
    title: `${COMPANY_NAME} — Professional Document & Text Translation`,
    description:
        "Translate documents and text online in 33 languages. Choose instant AI translation or specialist translation delivered within 12–24 hours. Upload PDF, DOCX, or paste text and pay from your Account Balance.",
    alternates: {canonical: "/"},
};

const aiPlan = TRANSLATION_PLANS.find((p) => p.id === "ai")!;
const specialistPlan = TRANSLATION_PLANS.find((p) => p.id === "specialist")!;

export default function HomePage() {
    return (
        <>
            <TranslationHero />
            <LanguageMarquee />
            <RevealStats />
            <ComparePlans />
            <StepsPath />
            <UseCases />

            {/* TOP-UP PRICING */}
            <TopUpSection />

            <BigCta />

            {/* FAQ */}
            <FAQ
                items={[
                    {
                        question: "What is the difference between AI and Specialist translation?",
                        answer:
                            "AI translation is generated instantly by our translation engine and is ideal for everyday content. Specialist translation goes through our premium workflow with professional review, refined terminology, and polished formatting, and is delivered within 12–24 hours.",
                    },
                    {
                        question: "Which file formats can I upload?",
                        answer:
                            "You can upload PDF, DOCX, and TXT files up to 15 MB, or simply paste your text directly into the order form. The word count and price are calculated automatically.",
                    },
                    {
                        question: "How is the price calculated?",
                        answer:
                            `Pricing is per word: £${aiPlan.perWord.toFixed(2)} per word for AI translation and £${specialistPlan.perWord.toFixed(2)} per word for specialist translation, with small minimum order amounts. The exact total is always shown before you confirm the order.`,
                    },
                    {
                        question: "How do I pay for translations?",
                        answer:
                            "Translations are paid from your Account Balance. Top up with one of the suggested packages or any custom amount, and the cost of each order is deducted from your balance.",
                    },
                    {
                        question: "Which languages do you support?",
                        answer:
                            "We support 33 languages including English, Swedish, German, French, Spanish, Ukrainian, Polish, Chinese, Japanese, and Arabic — in any combination of source and target language.",
                    },
                ]}
            />
        </>
    );
}
