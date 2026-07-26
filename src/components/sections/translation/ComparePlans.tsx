"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaBolt, FaClock } from "react-icons/fa6";
import { TRANSLATION_PLANS } from "@/data/translationConfig";
import { useCurrency } from "@/context/CurrencyContext";
import styles from "./ComparePlans.module.scss";

export default function ComparePlans() {
    const { sign, currency, convertFromBase } = useCurrency();
    const fmt = (v: number) => `${sign}${convertFromBase(v).toFixed(2)}`;

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.head}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.tagline}>Two service levels</span>
                    <h2 className={styles.title}>Instant AI or Specialist quality — you choose</h2>
                    <p className={styles.desc}>
                        Both services support every language pair and file format. The difference
                        is speed, depth of review, and polish of the final document.
                    </p>
                </motion.div>

                <div className={styles.cards}>
                    {TRANSLATION_PLANS.map((plan, i) => {
                        const premium = plan.id === "specialist";
                        return (
                            <motion.article
                                key={plan.id}
                                className={`${styles.card} ${premium ? styles.cardPremium : ""}`}
                                initial={{ opacity: 0, y: 44 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                style={{ overflow: "hidden" }}
                            >
                                {premium && <div className={styles.ribbon}>PREMIUM</div>}

                                <span className={styles.planBadge}>{plan.badge}</span>
                                <h3 className={styles.planTitle}>{plan.title}</h3>
                                <p className={styles.planDesc}>{plan.description}</p>

                                <div className={styles.priceRow}>
                                    <span className={styles.perWord}>{fmt(plan.perWord)}</span>
                                    <span className={styles.perWordUnit}>/ word · {currency}</span>
                                </div>
                                <span className={styles.minNote}>Minimum order {fmt(plan.minimum)}</span>

                                <ul className={styles.features}>
                                    {plan.features.map((f) => (
                                        <li key={f} className={styles.feature}>
                                            <span className={styles.featureIcon}><FaCheck /></span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/dashboard"
                                    className={`${styles.cta} ${premium ? styles.ctaGradient : styles.ctaLight}`}
                                >
                                    {premium ? "Order Specialist Translation" : "Translate Instantly"}
                                    <FaArrowRight />
                                </Link>

                                <span className={styles.deliveryTag}>
                                    {premium ? <FaClock /> : <FaBolt />}
                                    Delivery: {plan.delivery}
                                </span>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
