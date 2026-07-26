"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./RevealStats.module.scss";

interface Stat {
    value: number;
    suffix: string;
    label: string;
    sub: string;
}

const STATS: Stat[] = [
    { value: 33, suffix: "+", label: "Languages supported", sub: "Any source-target combination" },
    { value: 12, suffix: "s", label: "Average AI delivery", sub: "From upload to result" },
    { value: 24, suffix: "h", label: "Specialist turnaround", sub: "Reviewed, publication-ready" },
    { value: 98, suffix: "%", label: "Customer satisfaction", sub: "Across all order types" },
];

function CountUp({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;
        const duration = 1400;
        const t0 = performance.now();
        let raf: number;

        const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, target]);

    return (
        <span className={styles.value}>
            {value}
            {suffix}
        </span>
    );
}

export default function RevealStats() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.grid}>
                {STATS.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        className={styles.card}
                        initial={{ opacity: 0, y: 36 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
                    >
                        <CountUp target={stat.value} suffix={stat.suffix} start={inView} />
                        <div className={styles.label}>{stat.label}</div>
                        <div className={styles.sub}>{stat.sub}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
