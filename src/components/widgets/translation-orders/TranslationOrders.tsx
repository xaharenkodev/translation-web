"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAllOrders } from "@/context/AllOrdersContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAlert } from "@/context/AlertContext";
import { getTranslationPlan } from "@/data/translationConfig";
import { TranslationOrderType } from "@/types/translation.types";
import styles from "./TranslationOrders.module.scss";

function formatDate(dateStr?: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function hoursLeft(readyAt?: string): number {
    if (!readyAt) return 0;
    return Math.max(0, Math.ceil((new Date(readyAt).getTime() - Date.now()) / (60 * 60 * 1000)));
}

function downloadTxt(order: TranslationOrderType) {
    const blob = new Blob([order.translatedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const base = order.fileName?.replace(/\.[^.]+$/, "") || "translation";
    a.href = url;
    a.download = `${base}-${order.targetLanguage}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

const TranslationOrders: React.FC = () => {
    const { translationOrders, loading, refreshOrders } = useAllOrders();
    const { sign, currency, convertFromBase } = useCurrency();
    const { showAlert } = useAlert();
    const [openId, setOpenId] = useState<string | null>(null);

    if (loading) {
        return <p className={styles.loading}>Loading your translations…</p>;
    }

    if (translationOrders.length === 0) {
        return (
            <section className={styles.section}>
                <header className={styles.header}>
                    <div>
                        <h3>Your Translations</h3>
                        <p>Ordered translations will appear here — instant AI results and specialist deliveries.</p>
                    </div>
                </header>

                <div className={styles.emptyState}>
                    <p>No translations yet.</p>
                    <Link href="/dashboard" className={styles.primaryLink}>
                        Order your first translation
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <div>
                    <h3>Your Translations</h3>
                    <p>Instant AI translations are available right away. Specialist orders unlock within 12–24 hours.</p>
                </div>
                <button type="button" className={styles.refreshButton} onClick={refreshOrders}>
                    Refresh
                </button>
            </header>

            <div className={styles.list}>
                {translationOrders.map((order) => {
                    const plan = getTranslationPlan(order.planType);
                    const isReady = order.status === "ready";
                    const open = openId === order._id;
                    const remaining = hoursLeft(order.readyAt);

                    return (
                        <article key={order._id} className={styles.card}>
                            <button
                                type="button"
                                className={styles.cardHead}
                                onClick={() => setOpenId(open ? null : order._id)}
                            >
                                <div className={styles.headMain}>
                                    <span className={styles.langPair}>
                                        {order.sourceLanguage} → {order.targetLanguage}
                                        {order.fileName ? ` · ${order.fileName}` : ""}
                                    </span>
                                    <span className={styles.headMeta}>
                                        <span>{formatDate(order.createdAt)}</span>
                                        <span>{order.wordCount} words</span>
                                        <span>
                                            {sign}{convertFromBase(order.totalAmount).toFixed(2)} {currency}
                                        </span>
                                    </span>
                                </div>

                                <div className={styles.headRight}>
                                    <span className={`${styles.badge} ${styles.badgePlan}`}>
                                        {plan?.title ?? order.planType}
                                    </span>
                                    <span className={`${styles.badge} ${isReady ? styles.badgeReady : styles.badgePending}`}>
                                        {isReady ? "Ready" : "In progress"}
                                    </span>
                                    <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>▾</span>
                                </div>
                            </button>

                            {open && (
                                <div className={styles.cardBody}>
                                    {isReady ? (
                                        <>
                                            <span className={styles.resultLabel}>Translated text</span>
                                            <div className={styles.resultBox}>{order.translatedText}</div>
                                            <div className={styles.actions}>
                                                <button
                                                    type="button"
                                                    className={`${styles.actionBtn} ${styles.actionPrimary}`}
                                                    onClick={() => downloadTxt(order)}
                                                >
                                                    Download .txt
                                                </button>
                                                <button
                                                    type="button"
                                                    className={styles.actionBtn}
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(order.translatedText);
                                                        showAlert("Copied", "Translation copied to clipboard.", "success");
                                                    }}
                                                >
                                                    Copy to clipboard
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className={styles.pendingNote}>
                                            Your document is being handled by a specialist. The finished translation will
                                            appear here {remaining > 0 ? `within ~${remaining} hour${remaining === 1 ? "" : "s"}` : "shortly"}
                                            {order.readyAt ? ` (expected by ${formatDate(order.readyAt)})` : ""}. We&apos;ll also
                                            keep it available in your account history.
                                        </div>
                                    )}
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default TranslationOrders;
