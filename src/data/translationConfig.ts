/**
 * Single source of truth for the translation service:
 * plans, per-word pricing, supported languages and subject areas.
 * Imported on both the client (live price preview) and the server
 * (authoritative price calculation) so the two can never drift apart.
 */

export type TranslationPlanId = "ai" | "specialist";

export interface TranslationPlan {
    id: TranslationPlanId;
    title: string;
    badge: string;
    description: string;
    /** Price per word in the base currency (GBP). */
    perWord: number;
    /** Minimum charge per order in the base currency (GBP). */
    minimum: number;
    /** Human-readable delivery estimate shown to the customer. */
    delivery: string;
    features: string[];
}

export const TRANSLATION_PLANS: TranslationPlan[] = [
    {
        id: "ai",
        title: "AI Translation",
        badge: "INSTANT",
        description:
            "Machine translation powered by our AI engine. Ready in seconds — ideal for everyday texts, emails, and drafts.",
        perWord: 0.02,
        minimum: 5,
        delivery: "Instant",
        features: [
            "Delivered in seconds",
            "60+ language pairs",
            "Great for everyday content",
            "Most affordable option",
        ],
    },
    {
        id: "specialist",
        title: "Specialist Translation",
        badge: "PREMIUM",
        description:
            "Your document is handled through our premium workflow with professional review, refined terminology, and polished formatting.",
        perWord: 0.05,
        minimum: 15,
        delivery: "12–24 hours",
        features: [
            "Delivered within 12–24 hours",
            "Professionally reviewed quality",
            "Consistent terminology & style",
            "Polished, publication-ready formatting",
        ],
    },
];

export const getTranslationPlan = (id: string): TranslationPlan | undefined =>
    TRANSLATION_PLANS.find((p) => p.id === id);

export const TRANSLATION_LANGUAGES = [
    "English",
    "Swedish",
    "German",
    "French",
    "Spanish",
    "Italian",
    "Portuguese",
    "Dutch",
    "Polish",
    "Czech",
    "Slovak",
    "Ukrainian",
    "Romanian",
    "Hungarian",
    "Bulgarian",
    "Greek",
    "Danish",
    "Norwegian",
    "Finnish",
    "Estonian",
    "Latvian",
    "Lithuanian",
    "Turkish",
    "Arabic",
    "Hebrew",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Japanese",
    "Korean",
    "Hindi",
    "Vietnamese",
    "Thai",
    "Indonesian",
] as const;

export type TranslationLanguage = (typeof TRANSLATION_LANGUAGES)[number];

export interface TranslationSubject {
    id: string;
    label: string;
    sub: string;
}

export const TRANSLATION_SUBJECTS: TranslationSubject[] = [
    { id: "general", label: "General", sub: "letters, articles, everyday texts" },
    { id: "business", label: "Business", sub: "reports, presentations, HR docs" },
    { id: "legal", label: "Legal", sub: "contracts, certificates, policies" },
    { id: "technical", label: "Technical", sub: "manuals, specifications, IT" },
    { id: "medical", label: "Medical", sub: "records, leaflets, research" },
    { id: "marketing", label: "Marketing", sub: "websites, ads, product copy" },
];

/** Max characters accepted per order (~30k words). */
export const MAX_SOURCE_CHARS = 200_000;

/** Count words the same way on client and server. */
export function countWords(text: string): number {
    if (!text) return 0;
    const matches = text.trim().match(/\S+/g);
    return matches ? matches.length : 0;
}

/** Authoritative order price in the base currency (GBP). */
export function calcTranslationPrice(wordCount: number, planId: TranslationPlanId): number {
    const plan = getTranslationPlan(planId);
    if (!plan || wordCount <= 0) return 0;
    const raw = wordCount * plan.perWord;
    return Math.round(Math.max(raw, plan.minimum) * 100) / 100;
}
