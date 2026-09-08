import OpenAI from "openai";

import { faqKnowledgeBase } from "@/data/faq";
import { COMPANY_EMAIL, COMPANY_NAME } from "@/resources/constants";
import { TRANSLATION_PLANS } from "@/data/translationConfig";

/*
 * Read the key straight from the environment rather than through the shared ENV
 * object: ENV validates every key the app has ever needed at import time and
 * throws if any is missing, which would take the support widget down over an
 * unrelated setting.
 */
const apiKey = process.env.OPENAI_API_KEY ?? "";

const openai = new OpenAI({ apiKey: apiKey || "missing" });

export type SupportChatRole = "user" | "assistant";

export interface SupportChatMessage {
    role: SupportChatRole;
    content: string;
}

/** Keeps a single request bounded regardless of what the client sends. */
const MAX_HISTORY = 12;
const MAX_MESSAGE_CHARS = 1500;

export const SUPPORT_ESCALATION = `If you cannot answer, say so plainly and point the customer to ${COMPANY_EMAIL} or the contact page at /contact-us.`;

function buildSystemPrompt(): string {
    const plans = TRANSLATION_PLANS.map(
        (plan) =>
            `- ${plan.title}: £${plan.perWord.toFixed(2)} per word, minimum £${plan.minimum.toFixed(2)}.`,
    ).join("\n");

    return [
        `You are the support assistant for ${COMPANY_NAME}, an online document and text translation service operated by QUENTICS OÜ.`,
        "",
        "Answer customer questions about the service: how ordering works, AI versus specialist translation, supported languages and file formats, pricing, Account Balance and top-ups, delivery times, refunds, accounts and confidentiality.",
        "",
        "Rules:",
        "- Answer only from the reference material below and from what the customer tells you. Never invent prices, delivery times, policy terms, discounts or features.",
        "- If the answer is not in the reference material, say you do not have that detail and hand the customer over to a human.",
        "- Never ask for, and never accept, card numbers, CVV codes, passwords or full identity-document details. If a customer starts to share them, tell them to stop and to use the secure payment page instead.",
        "- You cannot see the customer's account, orders or balance, and you cannot make refunds, cancel orders or change account data. For anything account-specific, hand over to a human.",
        "- Keep answers short: two or three sentences, or a short list. Reply in the customer's language.",
        `- ${SUPPORT_ESCALATION}`,
        "",
        "Pricing reference:",
        plans,
        "",
        "Reference material (published FAQ):",
        faqKnowledgeBase,
    ].join("\n");
}

export const supportChatService = {
    isConfigured(): boolean {
        return Boolean(apiKey && apiKey !== "none" && apiKey.trim().length > 0);
    },

    async reply(messages: SupportChatMessage[]): Promise<string> {
        const history = messages
            .filter((m) => m && typeof m.content === "string" && m.content.trim())
            .filter((m) => m.role === "user" || m.role === "assistant")
            .slice(-MAX_HISTORY)
            .map((m) => ({
                role: m.role,
                content: m.content.trim().slice(0, MAX_MESSAGE_CHARS),
            }));

        if (history.length === 0) {
            throw new Error("No message to answer.");
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.2,
            max_tokens: 400,
            messages: [
                { role: "system", content: buildSystemPrompt() },
                ...history,
            ],
        });

        return (
            completion.choices[0]?.message?.content?.trim() ||
            `Sorry — I could not produce an answer just then. Please email ${COMPANY_EMAIL} and our team will help.`
        );
    },
};
