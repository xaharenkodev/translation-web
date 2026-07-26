"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaLocationDot, FaArrowRight } from "react-icons/fa6";
import { footerContent } from "@/resources/content";
import { COMPANY_NAME } from "@/resources/constants";
import styles from "./SiteFooter.module.scss";

const LANG_CHIPS = ["EN", "SV", "DE", "FR", "ES", "UA", "PL", "中文", "日本語", "AR"];

export default function SiteFooter() {
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
                        {footerContent.contact.phone && (
                            <div className={styles.contactItem}>
                                <FaPhone />
                                <a href={`tel:${footerContent.contact.phone}`}>{footerContent.contact.phone}</a>
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
