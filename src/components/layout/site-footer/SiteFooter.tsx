"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaLocationDot, FaArrowRight } from "react-icons/fa6";
import { footerContent } from "@/resources/content";
import visa from "@/assets/cards/visa.svg";
import mastercard from "@/assets/cards/mastercard.svg";
import pciDss from "@/assets/cards/pci-dss-compliant-logo-vector.svg";
import { COMPANY_NAME } from "@/resources/constants";
import { useCookieConsent } from "@/context/CookieConsentContext";
import styles from "./SiteFooter.module.scss";

const LANG_CHIPS = ["EN", "SV", "DE", "FR", "ES", "UA", "PL", "中文", "日本語", "AR"];

/*
 * Card scheme brand marks, reproduced from the official vector artwork:
 * the Visa Blue (#1434CB) brandmark and the Mastercard symbol-and-wordmark
 * lockup. Both brand centres require the mark to appear unaltered, in its
 * approved colour, on a solid light background with clear space around it —
 * so each mark sits alone on an opaque white chip and is never recoloured,
 * outlined or squeezed out of its own aspect ratio.
 */
const PAYMENT_MARKS = [
    { src: visa, alt: "Visa", className: styles.payMarkVisa },
    { src: mastercard, alt: "Mastercard", className: styles.payMarkMastercard },
];

export default function SiteFooter() {
    const { openPreferences } = useCookieConsent();
    const navColumn = footerContent.columns.find((c) => c.title === "Navigate");
    const legalColumn = footerContent.columns.find((c) => c.title === "Legal");
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.topLine} />
            <div className={styles.glow} aria-hidden />

            <div className={styles.inner}>
                <div className={styles.top}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <Link href="/">
                            <Image
                                src={footerContent.logo.src}
                                alt={footerContent.logo.alt}
                                width={180}
                                height={50}
                            />
                        </Link>
                        <p className={styles.brandText}>
                            Professional document and text translation in 33 languages.
                            Instant AI results or specialist quality within 12–24 hours —
                            paid simply from your Account Balance.
                        </p>
                        <div className={styles.langChips}>
                            {LANG_CHIPS.map((l) => (
                                <span key={l} className={styles.langChip}>{l}</span>
                            ))}
                        </div>
                    </div>

                    {/* Navigate */}
                    <div>
                        <div className={styles.colTitle}>Navigate</div>
                        <div className={styles.links}>
                            {navColumn?.links.map((l) => (
                                <Link key={l.href} href={l.href} className={styles.link}>
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <div className={styles.colTitle}>Legal</div>
                        <div className={styles.legalLinks}>
                            {legalColumn?.links.map((l) => (
                                <Link key={l.href} href={l.href} className={styles.link}>
                                    {l.label}
                                </Link>
                            ))}
                            {/* Consent must stay reachable after the first visit. */}
                            <button
                                type="button"
                                className={styles.linkButton}
                                onClick={openPreferences}
                            >
                                Cookie Settings
                            </button>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className={styles.colTitle}>Get in touch</div>
                        {footerContent.contact.email && (
                            <div className={styles.contactItem}>
                                <FaEnvelope />
                                <a href={`mailto:${footerContent.contact.email}`}>{footerContent.contact.email}</a>
                            </div>
                        )}
                        {footerContent.contact.address && (
                            <div className={styles.contactItem}>
                                <FaLocationDot />
                                <span>{footerContent.contact.address}</span>
                            </div>
                        )}

                        <Link href="/dashboard" className={styles.cta}>
                            Order Translation <FaArrowRight />
                        </Link>
                    </div>
                </div>

                <div className={styles.payments}>
                    <span className={styles.payLabel}>Secure payments</span>
                    <div className={styles.payMarks}>
                        {PAYMENT_MARKS.map((m) => (
                            <span key={m.alt} className={styles.payChip}>
                                <Image src={m.src} alt={m.alt} className={m.className} />
                            </span>
                        ))}
                        <span className={styles.payChip}>
                            <Image src={pciDss} alt="PCI DSS compliant" className={styles.payMarkPci} />
                        </span>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <span>© {year} {COMPANY_NAME}. All rights reserved.</span>
                    <div className={styles.legalMeta}>
                        {footerContent.legal.companyName && <span>{footerContent.legal.companyName}</span>}
                        {footerContent.legal.companyNumber && <span>Reg. No. {footerContent.legal.companyNumber}</span>}
                    </div>
                </div>
            </div>
        </footer>
    );
}
