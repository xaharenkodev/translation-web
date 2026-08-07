"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./LanguageMarquee.module.scss";

const ROW_A: Array<[string, string]> = [
    ["Swedish", "Hej"],
    ["German", "Hallo"],
    ["French", "Bonjour"],
    ["Spanish", "Hola"],
    ["Ukrainian", "Привіт"],
    ["Italian", "Ciao"],
    ["Polish", "Cześć"],
    ["Portuguese", "Olá"],
    ["Dutch", "Hallo"],
    ["Greek", "Γεια"],
    ["Turkish", "Merhaba"],
];

const ROW_B: Array<[string, string]> = [
    ["Japanese", "こんにちは"],
    ["Chinese", "你好"],
    ["Korean", "안녕하세요"],
    ["Arabic", "مرحبا"],
    ["Hebrew", "שלום"],
    ["Hindi", "नमस्ते"],
    ["Thai", "สวัสดี"],
    ["Vietnamese", "Xin chào"],
    ["Finnish", "Hei"],
    ["Czech", "Ahoj"],
    ["Romanian", "Salut"],
];

// The track slides by exactly -50% of itself, so the number of identical groups
// must stay even — then the second half is already in place when the animation
// restarts and the seam is invisible. How many groups are actually needed
// depends on the viewport, so it is measured instead of hardcoded.
const INITIAL_GROUPS = 4;

function Row({
    items,
    speed,
    reverse,
}: {
    items: Array<[string, string]>;
    speed: number; // px per second
    reverse?: boolean;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [groups, setGroups] = useState(INITIAL_GROUPS);
    const [groupWidth, setGroupWidth] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        const container = track?.parentElement;
        if (!track || !container) return;

        const measure = () => {
            const group = track.firstElementChild as HTMLElement | null;
            const width = group?.getBoundingClientRect().width ?? 0;
            if (!width) return;
            setGroupWidth(width);
            // After the -50% shift only half the groups are left covering the
            // screen, so half must already outrun the container width.
            const halfNeeded = Math.ceil(container.getBoundingClientRect().width / width) + 1;
            setGroups(Math.max(2, halfNeeded * 2));
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        return () => observer.disconnect();
    }, [items]);

    // Distance travelled per cycle is half the track, so scale the duration with
    // it to keep the speed constant no matter how many groups were needed.
    const duration = groupWidth ? ((groups / 2) * groupWidth) / speed : 0;

    return (
        <div
            ref={trackRef}
            className={`${styles.row} ${reverse ? styles.rowReverse : ""}`}
            style={duration ? { animationDuration: `${duration}s` } : undefined}
        >
            {Array.from({ length: groups }, (_, g) => (
                <div key={g} className={styles.group}>
                    {items.map(([lang, hello], i) => (
                        <span key={`${lang}-${i}`} className={styles.chip}>
                            <span className={styles.native}>{hello}</span>
                            {lang}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default function LanguageMarquee() {
    return (
        <div className={styles.marquee} aria-hidden>
            <Row items={ROW_A} speed={42} />
            <Row items={ROW_B} speed={34} reverse />
        </div>
    );
}
