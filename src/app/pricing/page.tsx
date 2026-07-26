"use client";

import FAQ from "@/components/constructor/faq/FAQ";
import PromoSection from "@/components/sections/promo-section/PromoSection";
import TopUpSection from "@/components/sections/translation/TopUpSection";
import ComparePlans from "@/components/sections/translation/ComparePlans";
import BigCta from "@/components/sections/translation/BigCta";

export default function PricingPage() {
    return (
        <>
            <PromoSection
                title="Top Up Your"
                highlight="Balance"
                description="Add funds to your Account Balance, choose any amount you like, and use your balance for AI and specialist translation orders."
            />

            <TopUpSection />

            <ComparePlans />

            <BigCta />

            <FAQ
                items={[
                    {
                        question: "What is my Account Balance used for?",
                        answer:
                            "Your Account Balance is store credit used to pay for translation services on this website. It is non-transferable, is not cryptocurrency, is not tradable and is not redeemable for cash.",
                    },
                    {
                        question: "Is there a minimum top-up?",
                        answer:
                            "No. There is no minimum or maximum top-up amount, and no minimum transaction amount for card payments. The fixed packages are offered for convenience only — you can enter any custom amount instead.",
                    },
                    {
                        question: "Can I enter a custom amount?",
                        answer:
                            "Yes. Choose the Custom option and enter any amount you want to add to your Account Balance.",
                    },
                    {
                        question: "How are prices in EUR and USD calculated?",
                        answer:
                            "GBP is the base currency. EUR and USD prices are calculated from the GBP price using a fixed reference rate we maintain, with no conversion fee or surcharge added by us. Your bank or card issuer may apply its own rate and fees. See the Payment and Account Balance Policy for details.",
                    },
                    {
                        question: "When is my balance available?",
                        answer:
                            "Successful top-ups are credited to your Account Balance immediately after checkout, and a confirmation email with a receipt reference is sent to you.",
                    },
                ]}
            />
        </>
    );
}
