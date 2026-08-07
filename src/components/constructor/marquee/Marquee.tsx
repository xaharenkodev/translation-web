"use client";
import React from "react";
import styles from "./Marquee.module.scss";

interface MarqueeProps {
    items: { text: string }[];
}

// Парна кількість копій — щоб трек перекривав будь-яку ширину екрана,
// а зсув на -50% залишався безшовним.
const COPIES = 4;

const Marquee: React.FC<MarqueeProps> = ({ items }) => {
    const repeated = Array.from({ length: COPIES }, () => items).flat();

    return (
        <section className={styles.marqueeWrapper}>
            <div className={styles.gradientOverlay} />
            <div className={styles.track}>
                {repeated.map((item, i) => (
                    <span key={i} className={styles.item}>
            {item.text}
          </span>
                ))}
            </div>
        </section>
    );
};

export default Marquee;
