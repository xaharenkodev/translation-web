"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaWallet, FaFileArrowUp, FaWandMagicSparkles, FaDownload } from "react-icons/fa6";
import styles from "./StepsPath.module.scss";

const STEPS = [
    {
        icon: <FaWallet />,
        title: "Top up your balance",
        text: "Create a free account and add funds — pick one of the packages or enter any custom amount. Your balance covers all future orders, no subscription required.",
        hint: "Takes ~1 minute",
    },
    {
        icon: <FaFileArrowUp />,
        title: "Add your text or document",
        text: "Paste text directly or upload a PDF, DOCX, or TXT file up to 15 MB. We extract the content, count the words, and show the exact price before you confirm.",
        hint: "PDF · DOCX · TXT",
    },
    {
        icon: <FaWandMagicSparkles />,
        title: "Choose your service level",
        text: "Instant AI translation for speed and value, or a specialist-grade translation with professional review, consistent terminology, and polished formatting.",
        hint: "AI or Specialist",
    },
    {
        icon: <FaDownload />,
        title: "Receive your translation",
        text: "AI results appear in seconds; specialist orders unlock within 12–24 hours. Read online, copy to clipboard, or download the finished file from your account.",
        hint: "Stored in your account",
    },
];

export default function StepsPath() {
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start 75%", "end 55%"],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section className={styles.section}>
            <motion.div
                className={styles.head}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <span className={styles.tagline}>How it works</span>
                <h2 className={styles.title}>From document to translation in four steps</h2>
                <p className={styles.desc}>
                    No quotes, no emails back and forth. The whole process happens in your
                    account — with the price visible before you spend anything.
                </p>
            </motion.div>

            <div className={styles.track} ref={trackRef}>
                <div className={styles.line}>
                    <motion.div className={styles.lineFill} style={{ scaleY: lineScale }} />
                </div>

                {STEPS.map((step, i) => (
                    <motion.div
                        key={step.title}
                        className={styles.step}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.55, delay: i * 0.1 }}
                    >
                        <div className={styles.stepNum}>{i + 1}</div>
                        <div className={styles.stepBody}>
                            <h3 className={styles.stepTitle}>
                                <span className={styles.stepIcon}>{step.icon}</span>
                                {step.title}
                            </h3>
                            <p className={styles.stepText}>{step.text}</p>
                            <span className={styles.stepHint}>{step.hint}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
