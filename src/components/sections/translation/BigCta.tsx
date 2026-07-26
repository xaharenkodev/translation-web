"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./BigCta.module.scss";

const GLYPHS = [
    { char: "文", cls: "g1" },
    { char: "Ä", cls: "g2" },
    { char: "ع", cls: "g3" },
    { char: "Й", cls: "g4" },
] as const;

export default function BigCta() {
    return (
        <section className={styles.wrap}>
            <motion.div
                className={styles.banner}
                initial={{ opacity: 0, y: 50, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <div className={styles.glow} aria-hidden />
                {GLYPHS.map((g, i) => (
                    <motion.span
                        key={g.cls}
                        className={`${styles.glyph} ${styles[g.cls]}`}
                        aria-hidden
                        animate={{ y: [0, i % 2 ? 14 : -14, 0] }}
                        transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {g.char}
                    </motion.span>
                ))}

                <div className={styles.content}>
                    <h2 className={styles.title}>Your translation is one upload away</h2>
                    <p className={styles.desc}>
                        Join customers translating contracts, websites, and documents every
                        day. Top up once, order in seconds, and get quality you can publish.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/dashboard" className={styles.primary}>
                            Start Translating <FaArrowRight />
                        </Link>
                        <Link href="/pricing" className={styles.secondary}>
                            Top Up Balance
                        </Link>
                    </div>

                    <p className={styles.note}>
                        No subscription · Pay per word · VAT included in all prices
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
