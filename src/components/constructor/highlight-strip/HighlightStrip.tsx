"use client";
import React from "react";
import styles from "./HighlightStrip.module.scss";
import { media as mediaMap } from "@/resources/media";

interface HighlightItem {
    image?: string;  // ключ з media.ts
    icon?: string;   // emoji або svg
    text?: string;
    subtext?: string;
}

interface HighlightStripProps {
    items: HighlightItem[];
}

// Парна кількість однакових груп + зсув рівно на половину треку = безшовний цикл.
const GROUPS = 4;

const HighlightStrip: React.FC<HighlightStripProps> = ({ items }) => {

    const resolveMedia = (key?: string): string | undefined => {
        if (!key) return undefined;
        const v = (mediaMap as Record<string, any>)[key];
        if (!v && process.env.NODE_ENV !== "production") {
            console.warn(`media asset not found: ${key}`);
        }

        if (typeof v === "object" && v?.src) return v.src;

        if (typeof v === "string") return v;

        return undefined;
    };


    return (
        <section className={styles.strip}>
            <div className={styles.marquee}>
                <div className={styles.track}>
                    {Array.from({ length: GROUPS }, (_, g) => (
                    <div key={g} className={styles.group}>
                    {items.map((item, i) => {
                        const resolvedImage = resolveMedia(item.image);
                        return (
                            <div key={i} className={styles.item}>
                                {/* 🖼️ Зображення або іконка */}
                                {(resolvedImage || item.icon) && (
                                    <div className={styles.iconBox}>
                                        {resolvedImage ? (
                                            <img
                                                src={resolvedImage}
                                                alt={item.text || "logo"}
                                                className={styles.logo}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className={styles.emoji}>{item.icon}</span>
                                        )}
                                    </div>
                                )}

                                {/* 🧾 Текст */}
                                {(item.text || item.subtext) && (
                                    <div className={styles.textBlock}>
                                        {item.text && <p className={styles.text}>{item.text}</p>}
                                        {item.subtext && (
                                            <p className={styles.subtext}>{item.subtext}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    </div>
                    ))}
                </div>
            </div>

            {/* Градієнтні тіні */}
            <div className={styles.fadeLeft}></div>
            <div className={styles.fadeRight}></div>
        </section>
    );
};

export default HighlightStrip;
