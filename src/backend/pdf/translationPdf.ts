import { renderToBuffer } from "@react-pdf/renderer";
import { TranslationDocument, TranslationPdfData } from "./translationDocument";

/** Safe, readable file name for the attachment. */
function buildFileName(data: TranslationPdfData): string {
    const base = (data.fileName || "translation")
        .replace(/\.[a-z0-9]+$/i, "")
        .replace(/[^\w\-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60) || "translation";

    const language = data.targetLanguage
        .replace(/[^\w]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

    return `${base}-${language}.pdf`;
}

export interface TranslationPdfAttachment {
    filename: string;
    content: Buffer;
    contentType: string;
}

/** Render the finished translation as a PDF ready to attach to an email. */
export async function buildTranslationPdf(
    data: TranslationPdfData
): Promise<TranslationPdfAttachment> {
    const content = await renderToBuffer(TranslationDocument(data));
    return { filename: buildFileName(data), content, contentType: "application/pdf" };
}
