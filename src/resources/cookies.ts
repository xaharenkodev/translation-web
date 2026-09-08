/**
 * The single inventory of cookies and similar technologies this website uses.
 *
 * Both the Cookie Settings panel and the table in the Cookie Policy are built
 * from this list, so the published policy cannot drift away from what the
 * consent tool actually offers.
 */

export type CookieCategoryId = "necessary" | "preference" | "analytics" | "marketing";

export interface CookieCategory {
    id: CookieCategoryId;
    title: string;
    description: string;
    /** Strictly necessary technologies cannot be switched off. */
    locked?: boolean;
}

export interface CookieEntry {
    name: string;
    provider: string;
    /** "Cookie" or the similar technology actually used, e.g. local storage. */
    storage: string;
    purpose: string;
    expiry: string;
    category: CookieCategoryId;
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
    {
        id: "necessary",
        title: "Strictly necessary",
        description:
            "Required to sign you in, keep your session and checkout working, remember your consent choice and protect the site against abuse. These cannot be switched off.",
        locked: true,
    },
    {
        id: "preference",
        title: "Preference",
        description:
            "Remember optional display choices so the site looks the way you left it. Not used until you allow them.",
    },
    {
        id: "analytics",
        title: "Analytics",
        description:
            "Help us understand aggregate site use, performance and errors. Nothing analytical is loaded until you allow it.",
    },
    {
        id: "marketing",
        title: "Marketing",
        description:
            "Measure campaigns or personalise advertising. Nothing marketing-related is loaded until you allow it.",
    },
];

export const COOKIE_INVENTORY: CookieEntry[] = [
    {
        name: "access_token",
        provider: "quetranslations.com",
        storage: "Cookie (HttpOnly)",
        purpose:
            "Keeps you signed in and authorises requests to your account, orders and balance.",
        expiry: "7 days",
        category: "necessary",
    },
    {
        name: "refresh_token",
        provider: "quetranslations.com",
        storage: "Cookie (HttpOnly)",
        purpose:
            "Renews your session without asking you to sign in again on every visit.",
        expiry: "30 days",
        category: "necessary",
    },
    {
        name: "qt_cookie_consent",
        provider: "quetranslations.com",
        storage: "Cookie",
        purpose:
            "Records which cookie categories you accepted or rejected, and the version of the notice you saw, so we can honour and evidence your choice.",
        expiry: "12 months",
        category: "necessary",
    },
    {
        name: "selected-currency",
        provider: "quetranslations.com",
        storage: "Local storage",
        purpose:
            "Keeps prices in the currency you selected instead of resetting it on every page.",
        expiry: "Until you clear your browser storage",
        category: "necessary",
    },
    {
        name: "lang",
        provider: "quetranslations.com",
        storage: "Local storage",
        purpose: "Keeps the interface in the display language you selected.",
        expiry: "Until you clear your browser storage",
        category: "necessary",
    },
    {
        name: "selectedPlan",
        provider: "quetranslations.com",
        storage: "Local storage",
        purpose:
            "Holds the top-up amount you chose while you move through the checkout and payment pages.",
        expiry: "Cleared when the top-up completes or is cancelled",
        category: "necessary",
    },
    {
        name: "template-cart",
        provider: "quetranslations.com",
        storage: "Local storage",
        purpose: "Holds the items in your cart between pages so the cart is not lost on navigation.",
        expiry: "Until you clear your browser storage",
        category: "necessary",
    },
];

/**
 * Categories that currently contain no technologies. The consent panel says so
 * rather than presenting an empty toggle with no explanation.
 */
export const cookiesForCategory = (category: CookieCategoryId) =>
    COOKIE_INVENTORY.filter((entry) => entry.category === category);
