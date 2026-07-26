"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import styles from "./TranslationHero.module.scss";

const ROTATING_LANGUAGES = [
    "Swedish", "German", "French", "Spanish", "Ukrainian",
    "Japanese", "Arabic", "Polish", "Italian", "Korean",
];

const SOURCE_WIDTHS = [92, 76, 88, 60, 82, 46];
const TARGET_WIDTHS = [88, 80, 72, 66, 90, 52];

export default function TranslationHero() {
    const [langIndex, setLangIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setLangIndex((i) => (i + 1) % ROTATING_LANGUAGES.length),
            2200
        );
        return () => clearInterval(id);
    }, []);

    return (
        <section className={styles.hero}>
            <div className={styles.aurora} aria-hidden>
                <div className={`${styles.blob} ${styles.blobA}`} />
                <div className={`${styles.blob} ${styles.blobB}`} />
                <div className={`${styles.blob} ${styles.blobC}`} />
            </div>
            <div className={styles.gridOverlay} aria-hidden />

            <div className={styles.inner}>
                {/* ------- copy ------- */}
                <motion.div
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <span className={styles.kicker}>
                        <i className={styles.pulseDot} />
                        Professional Translation Service
                    </span>

                    <h1 className={styles.title}>
                        Translate any document{" "}
                        <span className={styles.gradientText}>into</span>{" "}
                        <span className={styles.langSlot}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={ROTATING_LANGUAGES[langIndex]}
                                    initial={{ opacity: 0, y: 18, rotateX: 60 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, y: -18, rotateX: -60 }}
                                    transition={{ duration: 0.35 }}
                                    style={{ display: "inline-block" }}
                                >
                                    {ROTATING_LANGUAGES[langIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </h1>

                    <p className={styles.subtitle}>
                        Contracts, certificates, websites, and everyday texts — translated in
                        33 languages. Instant AI translation from £0.02 per word, or a
                        specialist-grade translation delivered within 12–24 hours.
                    </p>

                    <div className={styles.ctaRow}>
                        <Link href="/dashboard" className={styles.ctaPrimary}>
                            Order Translation <FaArrowRight />
                        </Link>
                        <Link href="/pricing" className={styles.ctaGhost}>
                            View Pricing
                        </Link>
                    </div>

                    <div className={styles.trustRow}>
                        <span><FaCheck /> No subscription — pay per word</span>
                        <span><FaCheck /> PDF, DOCX & TXT supported</span>
                        <span><FaCheck /> Confidential & secure</span>
                    </div>
                </motion.div>

                {/* ------- mock translation card ------- */}
                <motion.div
                    className={styles.mockWrap}
                    initial={{ opacity: 0, y: 44, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                >
                    <motion.div
                        className={styles.mockCard}
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className={styles.mockHead}>
                            <div className={styles.mockDots}><i /><i /><i /></div>
                            <span className={styles.mockBadge}>TRANSLATING…</span>
                        </div>

                        <div className={styles.mockPanes}>
                            <div className={styles.pane}>
                                <div className={styles.paneLabel}>English · contract.docx</div>
                                {SOURCE_WIDTHS.map((w, i) => (
                                    <div key={i} className={styles.lineRow} style={{ width: `${w}%` }} />
                                ))}
                            </div>

                            <div className={styles.pane}>
                                <div className={styles.paneLabel}>Swedish · translated</div>
                                {TARGET_WIDTHS.map((w, i) => (
                                    <div key={i} className={styles.lineRow} style={{ width: `${w}%` }}>
                                        <motion.div
                                            className={styles.lineFill}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{
                                                duration: 1.1,
                                                delay: 0.9 + i * 0.45,
                                                repeat: Infinity,
                                                repeatDelay: 6.5,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.mockFoot}>
                            <span>1,240 words detected</span>
                            <span className={styles.mockPrice}>£24.80</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className={`${styles.floatChip} ${styles.chipTL}`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    >
                        ⚡ AI — ready in seconds
                    </motion.div>
                    <motion.div
                        className={`${styles.floatChip} ${styles.chipBR}`}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                    >
                        🎓 Specialist — 12–24h
                    </motion.div>
                    <motion.div
                        className={`${styles.floatChip} ${styles.chipMR}`}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                    >
                        🌍 33 languages
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
