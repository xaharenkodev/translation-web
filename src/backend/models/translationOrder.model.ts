import mongoose, { Schema, Document } from "mongoose";

export interface TranslationOrderDocument extends Document {
    userId: mongoose.Types.ObjectId;
    email: string;

    planType: "ai" | "specialist";
    sourceLanguage: string;
    targetLanguage: string;
    subject: string;
    notes?: string;

    /** Original text submitted for translation (pasted or extracted from a document). */
    sourceText: string;
    /** Original uploaded file name, when the order came from a document. */
    fileName?: string;
    wordCount: number;
    totalAmount: number;

    /** The translated result. Hidden from the client until readyAt for specialist orders. */
    translatedText: string;

    status: "pending" | "ready";
    readyAt: Date;
    createdAt: Date;
}

const translationOrderSchema = new Schema<TranslationOrderDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        email: { type: String, required: true },

        planType: { type: String, enum: ["ai", "specialist"], required: true },
        sourceLanguage: { type: String, required: true },
        targetLanguage: { type: String, required: true },
        subject: { type: String, default: "general" },
        notes: { type: String },

        sourceText: { type: String, required: true },
        fileName: { type: String },
        wordCount: { type: Number, required: true },
        totalAmount: { type: Number, required: true },

        translatedText: { type: String, default: "" },

        status: { type: String, enum: ["pending", "ready"], default: "ready" },
        readyAt: { type: Date },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const TranslationOrder =
    mongoose.models.TranslationOrder ||
    mongoose.model<TranslationOrderDocument>("TranslationOrder", translationOrderSchema);
