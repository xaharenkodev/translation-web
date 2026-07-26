"use client";

import React from "react";
import TranslationOrders from "@/components/widgets/translation-orders/TranslationOrders";
import TransactionHistory from "@/components/widgets/all-transactions/AllTransactions";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
    return (
        <section className={styles.dashboard}>
            <div className={styles.header}>
                <div className={styles.copy}>
                    <span className={styles.kicker}>Translations & billing</span>
                    <h2 className={styles.title}>Your translations and account history</h2>
                    <p className={styles.subtitle}>
                        Ordered translations and wallet activity are organized below in the same clean billing workspace.
                    </p>
                </div>
            </div>

            <div className={styles.stack}>
                <TranslationOrders />
                <TransactionHistory />
            </div>
        </section>
    );
}
