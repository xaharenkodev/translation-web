"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiCheck, FiSettings, FiX } from "react-icons/fi";

import {
    ALLOW_ALL,
    ConsentState,
    DENY_ALL,
    useCookieConsent,
} from "@/context/CookieConsentContext";
import { COOKIE_CATEGORIES, cookiesForCategory } from "@/resources/cookies";
import styles from "./CookieConsent.module.scss";

/**
 * First-visit banner plus the Cookie Settings panel it opens. Non-essential
 * categories stay off until the visitor chooses, and the same panel is reachable
 * afterwards from the footer link, so consent can be changed or withdrawn.
 */
export default function CookieConsent() {
    const {
        consent,
        isBannerVisible,
        isPreferencesOpen,
        openPreferences,
        closePreferences,
        acceptAll,
        rejectAll,
        save,
    } = useCookieConsent();

    const [draft, setDraft] = useState<ConsentState>(DENY_ALL);

    // Open the panel showing what is currently stored, not a stale draft.
    useEffect(() => {
        if (isPreferencesOpen) {
            setDraft(consent ?? DENY_ALL);
        }
    }, [consent, isPreferencesOpen]);

    // Escape closes the panel only once a choice exists, so the first visit
    // cannot dismiss the notice without answering it.
    useEffect(() => {
        if (!isPreferencesOpen || consent === null) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closePreferences();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [closePreferences, consent, isPreferencesOpen]);

    if (!isBannerVisible && !isPreferencesOpen) {
        return null;
    }

    if (isPreferencesOpen) {
        return (
            <div className={styles.overlay} role="presentation">
                <div
                    className={styles.panel}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cookie-settings-title"
                >
                    <div className={styles.panelHead}>
                        <h2 id="cookie-settings-title" className={styles.panelTitle}>
                            Cookie settings
                        </h2>
                        {consent !== null && (
                            <button
                                type="button"
                                className={styles.close}
                                onClick={closePreferences}
                                aria-label="Close cookie settings"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>

                    <p className={styles.panelIntro}>
                        Choose which categories you allow. Strictly necessary technologies
                        keep sign-in, checkout and security working and cannot be switched
                        off. Everything else stays inactive until you allow it, and you can
                        change or withdraw your choice at any time from this panel.
                    </p>

                    <div className={styles.categories}>
                        {COOKIE_CATEGORIES.map((category) => {
                            const entries = cookiesForCategory(category.id);
                            const checked = category.locked || draft[category.id];

                            return (
                                <div key={category.id} className={styles.category}>
                                    <label className={styles.categoryHead}>
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            disabled={category.locked}
                                            onChange={(event) =>
                                                setDraft((prev) => ({
                                                    ...prev,
                                                    [category.id]: event.target.checked,
                                                }))
                                            }
                                        />
                                        <span className={styles.categoryTitle}>
                                            {category.title}
                                            {category.locked && (
                                                <span className={styles.always}>Always active</span>
                                            )}
                                        </span>
                                    </label>

                                    <p className={styles.categoryText}>{category.description}</p>

                                    {entries.length > 0 ? (
                                        <ul className={styles.entries}>
                                            {entries.map((entry) => (
                                                <li key={entry.name}>
                                                    <code>{entry.name}</code>
                                                    <span>{entry.storage} · {entry.expiry}</span>
                                                    <span>{entry.purpose}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className={styles.empty}>
                                            No technologies in this category are in use today. If any
                                            are introduced they will be listed here and will not run
                                            until you allow this category.
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.panelActions}>
                        <button type="button" className={styles.secondary} onClick={() => save(DENY_ALL)}>
                            Reject optional
                        </button>
                        <button type="button" className={styles.secondary} onClick={() => save(draft)}>
                            Save my choice
                        </button>
                        <button type="button" className={styles.primary} onClick={() => save(ALLOW_ALL)}>
                            <FiCheck aria-hidden="true" /> Accept all
                        </button>
                    </div>

                    <p className={styles.panelFoot}>
                        Full detail is in the <Link href="/cookie-policy">Cookie Policy</Link> and the{" "}
                        <Link href="/privacy-policy">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Cookie notice">
            <div className={styles.bannerInner}>
                <div className={styles.bannerText}>
                    <strong>We use cookies</strong>
                    <p>
                        Strictly necessary cookies keep sign-in, checkout and security
                        working. Preference, analytics and marketing technologies stay off
                        until you allow them. See the{" "}
                        <Link href="/cookie-policy">Cookie Policy</Link> for the full list.
                    </p>
                </div>

                <div className={styles.bannerActions}>
                    <button type="button" className={styles.ghost} onClick={openPreferences}>
                        <FiSettings aria-hidden="true" /> Manage
                    </button>
                    <button type="button" className={styles.secondary} onClick={rejectAll}>
                        Reject optional
                    </button>
                    <button type="button" className={styles.primary} onClick={acceptAll}>
                        Accept all
                    </button>
                </div>
            </div>
        </div>
    );
}
