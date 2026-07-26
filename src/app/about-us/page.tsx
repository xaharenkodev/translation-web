"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FaArrowRight,
    FaBolt,
    FaFileLines,
    FaGlobe,
    FaLock,
    FaScaleBalanced,
    FaWallet,
    FaWandMagicSparkles,
    FaHeart,
} from "react-icons/fa6";

import RevealStats from "@/components/sections/translation/RevealStats";
import LanguageMarquee from "@/components/sections/translation/LanguageMarquee";
import BigCta from "@/components/sections/translation/BigCta";
import styles from "./AboutPage.module.scss";

const STORY_POINTS = [
    {
        icon: <FaFileLines />,
        title: "Faithful to the source",
        text: "Structure, numbering, names, dates, and formatting are preserved exactly — the translation mirrors the original document.",
    },
    {
        icon: <FaScaleBalanced />,
        title: "Subject-aware terminology",
        text: "Legal, medical, technical, business, or marketing — the register and terminology adapt to the subject you select.",
    },
    {
        icon: <FaLock />,
        title: "Confidential by default",
        text: "Your documents are used only to produce your translation. They are never shared, published, or reused.",
    },
];

const PRINCIPLES = [
    {
        icon: <FaWallet />,
        title: "Transparent pricing",
        text: "A clear per-word rate and the exact total shown before you pay. No quotes, no hidden fees, no surprises.",
    },
    {
        icon: <FaBolt />,
        title: "Speed where it counts",
        text: "Instant AI results when you need them now, and a 12–24 hour specialist window when quality needs extra care.",
    },
    {
        icon: <FaLock />,
        title: "Privacy first",
        text: "Documents stay between you and us. Confidentiality is built into how the service works, not added on top.",
    },
    {
        icon: <FaHeart />,
        title: "Obsessed with language",
        text: "Terminology, register, and the small details that make a translation read like an original — we care about all of it.",
    },
];

export default function AboutPage() {
    return (
        <>
            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.heroGlow} aria-hidden />
                <div className={styles.heroInner}>
                    <motion.div
                        initial={{ opacity: 0, y: 34 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <span className={styles.kicker}>About us</span>
                        <h1 className={styles.heroTitle}>
                            Translation without <span>borders or bottlenecks</span>
                        </h1>
                        <p className={styles.heroText}>
                            We built this service around a simple idea: getting a professional
                            translation should be as easy as sending an email. No quote requests,
                            no waiting days for a reply — upload your document, see the price,
                            and get the result.
                        </p>

                        <div className={styles.heroActions}>
                            <Link href="/dashboard" className={styles.heroPrimary}>
                                Order Translation <FaArrowRight />
                            </Link>
                            <Link href="/pricing" className={styles.heroGhost}>
                                View Pricing
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.heroVisual}
                        initial={{ opacity: 0, y: 44 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                    >
                        {[
                            {
                                icon: <FaBolt />,
                                title: "AI Translation Engine",
                                text: "Accurate results in seconds, across 33 languages",
                            },
                            {
                                icon: <FaWandMagicSparkles />,
                                title: "Specialist Workflow",
                                text: "Professional review & polished formatting in 12–24h",
                            },
                            {
                                icon: <FaGlobe />,
                                title: "Any Language Pair",
                                text: "From Swedish to Japanese, Ukrainian to Arabic",
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={card.title}
                                className={styles.glassCard}
                                animate={{ y: [0, i % 2 ? 8 : -8, 0] }}
                                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className={styles.glassIcon}>{card.icon}</span>
                                <div>
                                    <strong>{card.title}</strong>
                                    <span>{card.text}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <LanguageMarquee />

            {/* STORY */}
            <section className={styles.story}>
                <motion.div
                    initial={{ opacity: 0, x: -36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.storyTagline}>Our approach</span>
                    <h2 className={styles.storyTitle}>
                        Quality is a process, not a promise
                    </h2>
                    <p className={styles.storyText}>
                        Every order — instant or specialist — runs through a workflow designed
                        for accuracy, consistency, and confidentiality. We combine a powerful
                        AI translation engine with a premium review process, so you can choose
                        the right balance of speed and polish for every document.
                    </p>
                    <p className={styles.storyText}>
                        The result: translations that keep the meaning, the structure, and the
                        voice of the original — whether it&apos;s a one-line message or a
                        hundred-page contract.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.storyPoints}
                    initial={{ opacity: 0, x: 36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {STORY_POINTS.map((p) => (
                        <div key={p.title} className={styles.storyPoint}>
                            <span className={styles.pointIcon}>{p.icon}</span>
                            <div>
                                <strong>{p.title}</strong>
                                <p>{p.text}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>

            <RevealStats />

            {/* PRINCIPLES */}
            <section className={styles.principles}>
                <motion.div
                    className={styles.principlesHead}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.storyTagline}>Our principles</span>
                    <h2 className={styles.storyTitle}>What we stand for</h2>
                </motion.div>

                <div className={styles.principlesGrid}>
                    {PRINCIPLES.map((p, i) => (
                        <motion.article
                            key={p.title}
                            className={styles.principleCard}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <span className={styles.principleIcon}>{p.icon}</span>
                            <h3>{p.title}</h3>
                            <p>{p.text}</p>
                        </motion.article>
                    ))}
                </div>
            </section>

            <BigCta />
        </>
    );
}
