"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { COOKIE_CATEGORIES, CookieCategoryId } from "@/resources/cookies";

export const CONSENT_COOKIE_NAME = "qt_cookie_consent";

/**
 * Bump when the categories or the wording materially change: a stored record
 * from an older version is treated as no choice, so the banner asks again
 * instead of silently relying on consent given to a different notice.
 */
export const CONSENT_VERSION = 1;

const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months

export type ConsentState = Record<CookieCategoryId, boolean>;

interface StoredConsent {
    v: number;
    at: string;
    categories: ConsentState;
}

export const DENY_ALL: ConsentState = {
    necessary: true,
    preference: false,
    analytics: false,
    marketing: false,
};

export const ALLOW_ALL: ConsentState = {
    necessary: true,
    preference: true,
    analytics: true,
    marketing: true,
};

interface CookieConsentValue {
    /** Null until the visitor has made a choice under the current version. */
    consent: ConsentState | null;
    /** Non-essential categories stay off until a choice exists. */
    effectiveConsent: ConsentState;
    /** True once the stored choice has been read on the client. */
    ready: boolean;
    isBannerVisible: boolean;
    isPreferencesOpen: boolean;
    openPreferences: () => void;
    closePreferences: () => void;
    acceptAll: () => void;
    rejectAll: () => void;
    save: (categories: ConsentState) => void;
}

const CookieConsentContext = createContext<CookieConsentValue | null>(null);

function readStoredConsent(): ConsentState | null {
    if (typeof document === "undefined") return null;

    const raw = document.cookie
        .split("; ")
        .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`))
        ?.slice(CONSENT_COOKIE_NAME.length + 1);

    if (!raw) return null;

    try {
        const parsed = JSON.parse(decodeURIComponent(raw)) as StoredConsent;
        if (parsed?.v !== CONSENT_VERSION || !parsed.categories) return null;

        // Normalise against the current category list so a stored record that
        // predates a new category does not imply consent to it.
        return COOKIE_CATEGORIES.reduce<ConsentState>((acc, category) => {
            acc[category.id] = category.locked
                ? true
                : parsed.categories[category.id] === true;
            return acc;
        }, { ...DENY_ALL });
    } catch {
        return null;
    }
}

function writeStoredConsent(categories: ConsentState) {
    const payload: StoredConsent = {
        v: CONSENT_VERSION,
        at: new Date().toISOString(),
        categories,
    };
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
        `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(payload))}` +
        `; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsent] = useState<ConsentState | null>(null);
    const [ready, setReady] = useState(false);
    const [isPreferencesOpen, setPreferencesOpen] = useState(false);

    // Read on the client only: the server render must not assume a choice.
    useEffect(() => {
        setConsent(readStoredConsent());
        setReady(true);
    }, []);

    const commit = useCallback((categories: ConsentState) => {
        const next: ConsentState = { ...categories, necessary: true };
        writeStoredConsent(next);
        setConsent(next);
        setPreferencesOpen(false);
    }, []);

    const value = useMemo<CookieConsentValue>(() => ({
        consent,
        effectiveConsent: consent ?? DENY_ALL,
        ready,
        isBannerVisible: ready && consent === null && !isPreferencesOpen,
        isPreferencesOpen,
        openPreferences: () => setPreferencesOpen(true),
        closePreferences: () => setPreferencesOpen(false),
        acceptAll: () => commit(ALLOW_ALL),
        rejectAll: () => commit(DENY_ALL),
        save: commit,
    }), [commit, consent, isPreferencesOpen, ready]);

    return (
        <CookieConsentContext.Provider value={value}>
            {children}
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent() {
    const ctx = useContext(CookieConsentContext);
    if (!ctx) {
        throw new Error("useCookieConsent must be used inside CookieConsentProvider");
    }
    return ctx;
}
