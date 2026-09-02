"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Loader2,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    ArrowRight,
    ShieldCheck,
    RefreshCw,
} from "lucide-react";
import styles from "./processing.module.scss";

type PaymentState = "pending" | "captured" | "failed" | "cancelled" | "timeout" | "missing_id";

interface StatusResponse {
    status?: string;
    orderId?: string;
    amount?: number;
    currency?: string;
    message?: string;
}

function ProcessingContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const isCancelled = searchParams.get("cancelled") === "1" || searchParams.get("cancelled") === "true";

    const [paymentState, setPaymentState] = useState<PaymentState>(() => {
        if (isCancelled) return "cancelled";
        if (!orderId) return "missing_id";
        return "pending";
    });

    const [amount, setAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState<string>("GBP");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [attempts, setAttempts] = useState<number>(0);
    const [isPolling, setIsPolling] = useState<boolean>(!isCancelled && Boolean(orderId));

    const checkStatus = useCallback(async () => {
        if (!orderId) return;

        try {
            const res = await fetch(`/api/payment/easytransac/status?orderId=${encodeURIComponent(orderId)}`);
            const data: StatusResponse = await res.json().catch(() => ({}));

            if (data.status === "captured") {
                setPaymentState("captured");
                if (typeof data.amount === "number") setAmount(data.amount);
                if (data.currency) setCurrency(data.currency);
                setIsPolling(false);
            } else if (data.status === "failed") {
                setPaymentState("failed");
                setErrorMessage(data.message || "Payment was declined or could not be processed.");
                setIsPolling(false);
            } else if (data.status === "cancelled") {
                setPaymentState("cancelled");
                setErrorMessage(data.message || "The transaction was cancelled.");
                setIsPolling(false);
            }
        } catch {
            // Keep polling on transient network hiccup
        } finally {
            setAttempts((prev) => prev + 1);
        }
    }, [orderId]);

    // Initial check and periodic polling
    useEffect(() => {
        if (!isPolling || !orderId) return;

        // Run immediately
        checkStatus();

        // Poll every 2.5 seconds
        const interval = setInterval(() => {
            checkStatus();
        }, 2500);

        return () => clearInterval(interval);
    }, [isPolling, orderId, checkStatus]);

    // Timeout after 60 seconds (approx 24 attempts)
    useEffect(() => {
        if (attempts >= 24 && paymentState === "pending") {
            setPaymentState("timeout");
            setIsPolling(false);
        }
    }, [attempts, paymentState]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Payment Verification</h1>
                    <span>Secure Gateway</span>
                </div>

                <div className={styles.body}>
                    {paymentState === "pending" && (
                        <>
                            <div className={`${styles.iconWrapper} ${styles.spinnerIcon}`}>
                                <Loader2 size={42} />
                            </div>

                            <h2 className={styles.title}>Processing Your Payment</h2>
                            <p className={styles.subtitle}>
                                Please keep this page open while we verify your transaction with Easytransac...
                            </p>

                            <div className={styles.steps}>
                                <div className={`${styles.stepItem} ${styles.done}`}>
                                    <span className={`${styles.stepDot} ${styles.doneDot}`} />
                                    <span>Payment session initiated</span>
                                </div>
                                <div className={`${styles.stepItem} ${styles.active}`}>
                                    <span className={`${styles.stepDot} ${styles.activeDot}`} />
                                    <span>Confirming bank authorization...</span>
                                </div>
                                <div className={styles.stepItem}>
                                    <span className={styles.stepDot} />
                                    <span>Crediting account balance</span>
                                </div>
                            </div>

                            {orderId && (
                                <div className={styles.metaBox}>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Order ID:</span>
                                        <span className={styles.metaValue}>{orderId}</span>
                                    </div>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Status:</span>
                                        <span className={styles.metaValue}>Awaiting confirmation</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {paymentState === "captured" && (
                        <>
                            <div className={`${styles.iconWrapper} ${styles.successIcon}`}>
                                <CheckCircle2 size={46} />
                            </div>

                            <h2 className={styles.title}>Payment Successful!</h2>
                            <p className={styles.subtitle}>
                                Your payment was received and your Account Balance has been topped up.
                            </p>

                            <div className={styles.metaBox}>
                                {amount !== null && (
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Amount Added:</span>
                                        <span className={styles.metaValueAmount}>
                                            +{amount.toFixed(2)} {currency}
                                        </span>
                                    </div>
                                )}
                                {orderId && (
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Order Reference:</span>
                                        <span className={styles.metaValue}>{orderId}</span>
                                    </div>
                                )}
                                <div className={styles.metaRow}>
                                    <span className={styles.metaLabel}>Status:</span>
                                    <span style={{ color: "#16a34a", fontWeight: 600 }}>Completed</span>
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <Link href="/profile" className={styles.primaryBtn}>
                                    Go to Account Profile <ArrowRight size={18} />
                                </Link>
                                <Link href="/get-started" className={styles.secondaryBtn}>
                                    Start Translation
                                </Link>
                            </div>
                        </>
                    )}

                    {(paymentState === "failed" || paymentState === "cancelled") && (
                        <>
                            <div className={`${styles.iconWrapper} ${styles.failedIcon}`}>
                                <XCircle size={46} />
                            </div>

                            <h2 className={styles.title}>
                                {paymentState === "cancelled" ? "Payment Cancelled" : "Payment Declined"}
                            </h2>
                            <p className={styles.subtitle}>
                                {errorMessage ||
                                    (paymentState === "cancelled"
                                        ? "The checkout process was cancelled. Your card has not been charged."
                                        : "Your bank or payment provider declined the transaction. Please try another payment method.")}
                            </p>

                            {orderId && (
                                <div className={styles.metaBox}>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Reference:</span>
                                        <span className={styles.metaValue}>{orderId}</span>
                                    </div>
                                </div>
                            )}

                            <div className={styles.actions}>
                                <Link href="/checkout" className={styles.primaryBtn}>
                                    Try Again <RefreshCw size={16} />
                                </Link>
                                <Link href="/contact-us" className={styles.secondaryBtn}>
                                    Contact Support
                                </Link>
                            </div>
                        </>
                    )}

                    {paymentState === "timeout" && (
                        <>
                            <div className={`${styles.iconWrapper} ${styles.spinnerIcon}`}>
                                <AlertTriangle size={42} color="#f59e0b" />
                            </div>

                            <h2 className={styles.title}>Still Processing</h2>
                            <p className={styles.subtitle}>
                                The banking network is taking slightly longer than usual. If your bank confirms the
                                charge, your Account Balance will be credited automatically.
                            </p>

                            {orderId && (
                                <div className={styles.metaBox}>
                                    <div className={styles.metaRow}>
                                        <span className={styles.metaLabel}>Order ID:</span>
                                        <span className={styles.metaValue}>{orderId}</span>
                                    </div>
                                </div>
                            )}

                            <div className={styles.actions}>
                                <Link href="/profile" className={styles.primaryBtn}>
                                    View My Profile
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAttempts(0);
                                        setPaymentState("pending");
                                        setIsPolling(true);
                                    }}
                                    className={styles.secondaryBtn}
                                >
                                    Check Again <RefreshCw size={16} />
                                </button>
                            </div>
                        </>
                    )}

                    {paymentState === "missing_id" && (
                        <>
                            <div className={`${styles.iconWrapper} ${styles.failedIcon}`}>
                                <AlertTriangle size={42} />
                            </div>

                            <h2 className={styles.title}>No Order Found</h2>
                            <p className={styles.subtitle}>
                                We couldn&apos;t find an active transaction reference for this session.
                            </p>

                            <div className={styles.actions}>
                                <Link href="/checkout" className={styles.primaryBtn}>
                                    Go to Checkout
                                </Link>
                            </div>
                        </>
                    )}

                    <div className={styles.footerNote}>
                        <ShieldCheck size={14} />
                        <span>Protected by 256-bit SSL encryption</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProcessingPage() {
    return (
        <Suspense
            fallback={
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.body}>
                            <div className={`${styles.iconWrapper} ${styles.spinnerIcon}`}>
                                <Loader2 size={42} />
                            </div>
                            <h2 className={styles.title}>Loading...</h2>
                        </div>
                    </div>
                </div>
            }
        >
            <ProcessingContent />
        </Suspense>
    );
}
