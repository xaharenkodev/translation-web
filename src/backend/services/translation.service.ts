import { connectDB } from "../config/db";
import { TranslationOrder, TranslationOrderDocument } from "../models/translationOrder.model";
import { User } from "../models/user.model";
import { transactionService } from "./transaction.service";
import { emailService } from "./email.service";
import OpenAI from "openai";
import { ENV } from "../config/env";
import mongoose from "mongoose";
import { roundMoney, formatMoney } from "@/utils/money";
import {
    TRANSLATION_LANGUAGES,
    TRANSLATION_SUBJECTS,
    MAX_SOURCE_CHARS,
    countWords,
    calcTranslationPrice,
    getTranslationPlan,
    TranslationPlanId,
} from "@/data/translationConfig";

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

/** Words per chunk sent to the model, so long documents never get truncated mid-completion. */
const CHUNK_WORDS = 2500;

export interface CreateTranslationOrderBody {
    planType: TranslationPlanId;
    sourceLanguage: string;
    targetLanguage: string;
    subject?: string;
    notes?: string;
    sourceText: string;
    fileName?: string;
}

function buildSystemPrompt(body: CreateTranslationOrderBody): string {
    const subject =
        TRANSLATION_SUBJECTS.find((s) => s.id === (body.subject || "general"))?.label || "General";

    if (body.planType === "specialist") {
        return `You are a certified senior professional translator specialised in ${subject.toLowerCase()} content.
Translate the user's text from ${body.sourceLanguage} to ${body.targetLanguage}.

Quality bar (must follow):
- Publication-ready output: flawless grammar, natural phrasing a native professional would use.
- Preserve the original document structure exactly: headings, lists, numbering, tables, line breaks, and paragraph boundaries.
- Keep terminology consistent throughout; use the correct ${subject.toLowerCase()} register and industry conventions.
- Preserve names, numbers, dates, addresses, codes and formatting of the source unless target-language conventions require adaptation (then adapt them correctly).
- Do not summarise, omit, or add content. Do not add translator notes or commentary.
${body.notes ? `\nClient instructions (follow them): ${body.notes}` : ""}

Return ONLY the translated text.`;
    }

    return `You are a professional translation engine.
Translate the user's text from ${body.sourceLanguage} to ${body.targetLanguage}.
Domain: ${subject.toLowerCase()}.
- Preserve the structure of the source: line breaks, lists, headings.
- Keep names, numbers and dates intact.
- Do not add commentary or notes.
${body.notes ? `Client instructions: ${body.notes}` : ""}

Return ONLY the translated text.`;
}

function splitIntoChunks(text: string): string[] {
    const words = text.split(/(\s+)/); // keep whitespace tokens so formatting survives
    const chunks: string[] = [];
    let current: string[] = [];
    let count = 0;

    for (const token of words) {
        current.push(token);
        if (token.trim()) count++;
        if (count >= CHUNK_WORDS) {
            chunks.push(current.join(""));
            current = [];
            count = 0;
        }
    }
    if (current.length) chunks.push(current.join(""));
    return chunks.length ? chunks : [text];
}

async function translateText(body: CreateTranslationOrderBody): Promise<string> {
    const system = buildSystemPrompt(body);
    const model = body.planType === "specialist" ? "gpt-5" : "gpt-5-mini";
    const chunks = splitIntoChunks(body.sourceText);

    const parts: string[] = [];
    for (const chunk of chunks) {
        const res = await openai.chat.completions.create({
            model,
            messages: [
                { role: "system", content: system },
                { role: "user", content: chunk },
            ],
        });
        parts.push(res.choices?.[0]?.message?.content?.trim() || "");
    }
    return parts.join("\n\n").trim();
}

/** Specialist orders unlock 12–24 hours after purchase. */
function specialistReadyAt(orderId: string): Date {
    // Deterministic pseudo-random offset per order (12h + 0..12h).
    let hash = 0;
    for (const ch of orderId) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
    const extraMs = (hash % (12 * 60)) * 60 * 1000;
    return new Date(Date.now() + 12 * 60 * 60 * 1000 + extraMs);
}

/** Shape an order for the client, hiding the result until it is due. */
function serialize(doc: any) {
    const now = Date.now();
    const readyAt = doc.readyAt ? new Date(doc.readyAt).getTime() : 0;
    const isReady = doc.status === "ready" || readyAt <= now;

    return {
        _id: String(doc._id),
        planType: doc.planType,
        sourceLanguage: doc.sourceLanguage,
        targetLanguage: doc.targetLanguage,
        subject: doc.subject,
        notes: doc.notes,
        sourceText: doc.sourceText,
        fileName: doc.fileName,
        wordCount: doc.wordCount,
        totalAmount: doc.totalAmount,
        status: isReady ? "ready" : "pending",
        readyAt: doc.readyAt,
        createdAt: doc.createdAt,
        translatedText: isReady ? doc.translatedText : "",
    };
}

export type SerializedTranslationOrder = ReturnType<typeof serialize>;

export const translationService = {
    async createOrder(userId: string, email: string, body: CreateTranslationOrderBody) {
        await connectDB();

        if (!body || typeof body !== "object") throw new Error("Invalid request body");

        const plan = getTranslationPlan(body.planType);
        if (!plan) throw new Error("Invalid plan type");

        const languages = TRANSLATION_LANGUAGES as readonly string[];
        if (!languages.includes(body.sourceLanguage)) throw new Error("Unsupported source language");
        if (!languages.includes(body.targetLanguage)) throw new Error("Unsupported target language");
        if (body.sourceLanguage === body.targetLanguage)
            throw new Error("Source and target languages must differ");

        const subject = body.subject || "general";
        if (!TRANSLATION_SUBJECTS.some((s) => s.id === subject)) throw new Error("Invalid subject");

        const sourceText = (body.sourceText || "").trim();
        if (!sourceText) throw new Error("Nothing to translate — please add text or upload a document");
        if (sourceText.length > MAX_SOURCE_CHARS)
            throw new Error("The text is too long for a single order. Please split it into parts.");

        if (body.notes && body.notes.length > 500) throw new Error("Notes are too long");

        // 💰 Authoritative price — always derived server-side from the word count.
        const wordCount = countWords(sourceText);
        const totalCost = calcTranslationPrice(wordCount, plan.id);

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        if (user.balance < totalCost)
            throw new Error(
                `Insufficient balance (have ${formatMoney(user.balance)}, need ${formatMoney(totalCost)}). Please top up your balance.`
            );

        // Translate first so the customer is never charged for a failed generation.
        let translatedText = "";
        try {
            translatedText = await translateText({ ...body, subject, sourceText });
        } catch (err) {
            console.error("❌ Translation generation failed:", err);
            throw new Error("Translation failed, please retry in a moment");
        }
        if (!translatedText) throw new Error("Translation failed, please retry in a moment");

        // Charge the balance.
        user.balance = roundMoney(user.balance - totalCost);
        await user.save();
        await transactionService.record(user._id, email, totalCost, "spend", user.balance, {
            reference: `TR-${Date.now().toString(36).toUpperCase()}`,
        });

        const orderId = new mongoose.Types.ObjectId();
        const isSpecialist = plan.id === "specialist";
        const readyAt = isSpecialist ? specialistReadyAt(String(orderId)) : new Date();

        const order = await TranslationOrder.create({
            _id: orderId,
            userId: new mongoose.Types.ObjectId(userId),
            email,
            planType: plan.id,
            sourceLanguage: body.sourceLanguage,
            targetLanguage: body.targetLanguage,
            subject,
            notes: body.notes?.trim() || undefined,
            sourceText,
            fileName: body.fileName,
            wordCount,
            totalAmount: totalCost,
            translatedText,
            status: isSpecialist ? "pending" : "ready",
            readyAt,
        });

        try {
            await emailService.sendOrderConfirmationEmail({
                email: user.email,
                firstName: user.firstName,
                subject: "Translation order confirmation",
                summaryTitle: "Translation order summary",
                summaryLines: [
                    `Service: ${plan.title}`,
                    `Languages: ${body.sourceLanguage} → ${body.targetLanguage}`,
                    `Word count: ${wordCount}`,
                    isSpecialist
                        ? `Delivery: within 12–24 hours (ready by ${readyAt.toUTCString()})`
                        : "Delivery: instant — your translation is ready in your account",
                ],
                amountLabel: "Amount used",
                amountValue: formatMoney(totalCost),
                transactionDate: order.createdAt || new Date(),
            });
        } catch (error) {
            console.error("❌ Translation confirmation email failed:", {
                orderId: String(order._id),
                email: user.email,
                error,
            });
        }

        return serialize(order.toObject());
    },

    async getOrders(userId: string): Promise<SerializedTranslationOrder[]> {
        await connectDB();
        const docs = await TranslationOrder.find({ userId })
            .sort({ createdAt: -1 })
            .lean<TranslationOrderDocument[]>();

        // Persist the pending → ready flip once the delivery window has passed.
        const dueIds = docs
            .filter((d: any) => d.status === "pending" && d.readyAt && new Date(d.readyAt).getTime() <= Date.now())
            .map((d: any) => d._id);
        if (dueIds.length) {
            await TranslationOrder.updateMany({ _id: { $in: dueIds } }, { $set: { status: "ready" } });
        }

        return docs.map(serialize);
    },

    async getOrderById(userId: string, orderId: string): Promise<SerializedTranslationOrder | null> {
        await connectDB();
        const doc = await TranslationOrder.findOne({ _id: orderId, userId }).lean<TranslationOrderDocument>();
        if (!doc) return null;
        return serialize(doc);
    },
};
