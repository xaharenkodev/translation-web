"use client";

import React from "react";
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

function Row({ items, reverse }: { items: Array<[string, string]>; reverse?: boolean }) {
    // Duplicate the list so the -50% translation loops seamlessly.
    const doubled = [...items, ...items];
    return (
        <div className={`${styles.row} ${reverse ? styles.rowReverse : ""}`}>
            {doubled.map(([lang, hello], i) => (
                <span key={`${lang}-${i}`} className={styles.chip}>
                    <span className={styles.native}>{hello}</span>
                    {lang}
                </span>
            ))}
        </div>
    );
}

export default function LanguageMarquee() {
    return (
        <div className={styles.marquee} aria-hidden>
            <Row items={ROW_A} />
            <Row items={ROW_B} reverse />
        </div>
    );
}
