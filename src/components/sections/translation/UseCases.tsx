"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    FaScaleBalanced,
    FaBriefcase,
    FaGlobe,
    FaGraduationCap,
    FaHeartPulse,
    FaBullhorn,
} from "react-icons/fa6";
import styles from "./UseCases.module.scss";

const CASES = [
    {
        icon: <FaScaleBalanced />,
        title: "Legal & Official",
        text: "Contracts, agreements, certificates, and policies translated with precise legal terminology and structure preserved to the paragraph.",
        examples: ["Contracts", "Certificates", "NDAs"],
    },
    {
        icon: <FaBriefcase />,
        title: "Business & Corporate",
        text: "Reports, presentations, HR documents, and internal communications that read as if they were written in the target language.",
        examples: ["Reports", "Presentations", "HR docs"],
    },
    {
        icon: <FaGlobe />,
        title: "Websites & Apps",
        text: "Landing pages, product descriptions, and interface copy localised for new markets while keeping your brand voice intact.",
        examples: ["Landing pages", "UI copy", "Product pages"],
    },
    {
        icon: <FaGraduationCap />,
        title: "Academic & Education",
        text: "Papers, abstracts, diplomas, and course materials with correct academic register and consistent terminology throughout.",
        examples: ["Papers", "Abstracts", "Diplomas"],
    },
    {
        icon: <FaHeartPulse />,
        title: "Medical & Health",
        text: "Medical records, patient leaflets, and research summaries handled with the care and accuracy the subject demands.",
        examples: ["Records", "Leaflets", "Research"],
    },
    {
        icon: <FaBullhorn />,
        title: "Marketing & Creative",
        text: "Ad copy, newsletters, and campaigns adapted — not just translated — so the message lands naturally with local audiences.",
        examples: ["Ad copy", "Emails", "Social"],
    },
];

export default function UseCases() {
    return (
        <section className={styles.section}>
            <motion.div
                className={styles.head}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <span className={styles.tagline}>What we translate</span>
                <h2 className={styles.title}>Every kind of document, one simple workflow</h2>
                <p className={styles.desc}>
                    Choose the subject area when ordering and the translation adapts its
                    terminology, register, and formatting to match.
                </p>
            </motion.div>

            <div className={styles.grid}>
                {CASES.map((c, i) => (
                    <motion.article
                        key={c.title}
                        className={styles.card}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
                        onMouseMove={(e) => {
                            const r = e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                            e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                        }}
                    >
                        <div className={styles.icon}>{c.icon}</div>
                        <h3 className={styles.cardTitle}>{c.title}</h3>
                        <p className={styles.cardText}>{c.text}</p>
                        <div className={styles.examples}>
                            {c.examples.map((ex) => (
                                <span key={ex} className={styles.example}>{ex}</span>
                            ))}
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
