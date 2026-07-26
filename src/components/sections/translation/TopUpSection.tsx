"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

import { topUpPlans, TopUpPlan } from "@/data/topUpPlans";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useCheckoutStore } from "@/utils/store";
import { parseMoneyAmount } from "@/utils/money";
import { TRANSLATION_PLANS } from "@/data/translationConfig";
import styles from "./TopUpSection.module.scss";

const aiPerWord = TRANSLATION_PLANS.find((p) => p.id === "ai")!.perWord;

function Card({ plan, index }: { plan: TopUpPlan; index: number }) {
    const { showAlert } = useAlert();
    const user = useUser();
    const router = useRouter();
    const { sign, currency, convertFromBase, convertToBase } = useCurrency();
    const { setPlan } = useCheckoutStore();

    const isCustom = plan.variant === "custom";
    const popular = plan.variant === "pro";
    const [customAmount, setCustomAmount] = useState("");

    const displayPrice = useMemo(() => {
        if (isCustom) return parseMoneyAmount(customAmount) ?? 0;
        return plan.amounts?.[currency] ?? convertFromBase(plan.amount);
    }, [isCustom, customAmount, plan, currency, convertFromBase]);

    const baseAmount = useMemo(() => convertToBase(displayPrice), [convertToBase, displayPrice]);

    // Rough words estimate at the AI rate, so packages feel tangible.
    const wordsEstimate = Math.floor(baseAmount / aiPerWord);

    const handleBuy = () => {
        if (!user) {
            showAlert("Sign in required", "Please sign in to continue", "info");
            setTimeout(() => router.push("/sign-in"), 1200);
            return;
        }
        if (displayPrice <= 0) {
            showAlert("Enter an amount", "Please enter the amount you would like to add to your balance.", "warning");
            return;
        }

        const selected = {
            title: plan.title,
            basePrice: baseAmount,
            amount: baseAmount,
            displayPrice,
            variant: plan.variant,
            currency,
        };
        setPlan(selected);
        localStorage.setItem("selectedPlan", JSON.stringify(selected));
        router.push("/checkout");
    };

    return (
        <motion.article
            className={`${styles.card} ${popular ? styles.cardPopular : ""}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {popular && <span className={styles.popularBadge}>MOST POPULAR</span>}

            <span className={styles.badge}>{plan.badgeTop}</span>
            <h3 className={styles.cardTitle}>{plan.title}</h3>

            {isCustom ? (
                <div className={styles.customInputWrap}>
                    <span>{sign}</span>
                    <input
                        className={styles.customInput}
                        inputMode="decimal"
                        placeholder="Any amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                    />
                </div>
            ) : (
                <div className={styles.amountRow}>
                    <span className={styles.amount}>
                        {sign}{displayPrice.toFixed(0)}
                    </span>
                    <span className={styles.amountNote}>one-time · incl. VAT</span>
                </div>
            )}

            <p className={styles.cardDesc}>{plan.description}</p>

            {wordsEstimate > 0 && (
                <span className={styles.wordsHint}>≈ {wordsEstimate.toLocaleString()} AI words</span>
            )}

            <button
                type="button"
                className={`${styles.buyBtn} ${popular || isCustom ? styles.buyBtnGradient : ""}`}
                onClick={handleBuy}
            >
                {plan.buttonText} <FaArrowRight />
            </button>
        </motion.article>
    );
}

export default function TopUpSection() {
    return (
        <section className={styles.section}>
            <motion.div
                className={styles.head}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <span className={styles.tagline}>Account balance</span>
                <h2 className={styles.title}>Top up once, translate whenever</h2>
                <p className={styles.desc}>
                    Add funds to your Account Balance and use it for any translation order —
                    no subscription, no repeated checkouts.
                </p>
            </motion.div>

            <div className={styles.grid}>
                {topUpPlans.map((plan, i) => (
                    <Card key={plan.variant} plan={plan} index={i} />
                ))}
            </div>

            <p className={styles.vatNote}>
                All prices include VAT · Funds never expire · PDF receipt for every top-up
            </p>
        </section>
    );
}
