import { TranslationPlanId } from "@/data/translationConfig";

export interface TranslationOrderType {
    _id: string;
    planType: TranslationPlanId;
    sourceLanguage: string;
    targetLanguage: string;
    subject: string;
    notes?: string;
    sourceText: string;
    fileName?: string;
    wordCount: number;
    totalAmount: number;
    status: "pending" | "ready";
    readyAt?: string;
    createdAt: string;
    /** Empty until the order is ready (specialist orders unlock after 12–24h). */
    translatedText: string;
}
