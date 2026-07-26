"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Testimonials.module.scss";

const REVIEWS = [
    {
        name: "Sofia Lindqvist",
        meta: "HR Manager · Stockholm",
        quote: "We needed 40 pages of HR policies in Swedish by Monday. Ordered the specialist option on Friday evening — everything arrived polished and perfectly formatted.",
        initials: "SL",
    },
    {
        name: "Marco Bianchi",
        meta: "E-commerce founder · Milan",
        quote: "I translate product descriptions weekly with the AI option. Seconds to deliver, and the tone actually matches our brand. The per-word pricing makes budgeting trivial.",
        initials: "MB",
    },
    {
        name: "Olena Shevchenko",
        meta: "Legal assistant · Warsaw",
        quote: "Contracts are where translation mistakes get expensive. The specialist tier keeps defined terms consistent across the whole document — exactly what we needed.",
        initials: "OS",
    },
    {
        name: "James Whitmore",
        meta: "Consultant · London",
        quote: "Uploaded a 60-page PDF report, got the word count and price instantly, and the balance system means my team orders without asking me for a card every time.",
        initials: "JW",
    },
    {
        name: "Amira Haddad",
        meta: "Marketing lead · Dubai",
        quote: "Campaign copy into Arabic that doesn't sound machine-made — finally. The subject-area selection makes a real difference to the result.",
        initials: "AH",
    },
    {
        name: "Petra Novak",
        meta: "PhD researcher · Prague",
        quote: "My abstracts and papers go through the academic setting. Terminology stays consistent and the register is spot on. Saves me hours before every submission.",
        initials: "PN",
    },
];

export default function Testimonials() {
    const doubled = [...REVIEWS, ...REVIEWS];

    return (
        <section className={styles.section}>
            <motion.div
                className={styles.head}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <span className={styles.tagline}>Loved by customers</span>
                <h2 className={styles.title}>Trusted for the documents that matter</h2>
            </motion.div>

            <div className={styles.row}>
                {doubled.map((r, i) => (
                    <article key={`${r.name}-${i}`} className={styles.card}>
                        <div className={styles.stars}>★★★★★</div>
                        <p className={styles.quote}>“{r.quote}”</p>
                        <div className={styles.person}>
                            <span className={styles.avatar}>{r.initials}</span>
                            <div>
                                <div className={styles.personName}>{r.name}</div>
                                <div className={styles.personMeta}>{r.meta}</div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
