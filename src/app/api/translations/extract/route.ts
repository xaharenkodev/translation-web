import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { countWords, MAX_SOURCE_CHARS } from "@/data/translationConfig";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB

const SUPPORTED = [".txt", ".md", ".pdf", ".docx"];

async function extractText(fileName: string, buffer: Buffer, mime: string): Promise<string> {
    const lower = fileName.toLowerCase();

    if (lower.endsWith(".pdf") || mime === "application/pdf") {
        const { PDFParse } = await import("pdf-parse");
        const parser = new PDFParse({ data: new Uint8Array(buffer) });
        try {
            const result = await parser.getText();
            return result.text || "";
        } finally {
            await parser.destroy().catch(() => {});
        }
    }

    if (
        lower.endsWith(".docx") ||
        mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ buffer });
        return result.value || "";
    }

    if (lower.endsWith(".txt") || lower.endsWith(".md") || mime.startsWith("text/")) {
        return buffer.toString("utf-8");
    }

    throw new Error(`Unsupported file type. Supported formats: ${SUPPORTED.join(", ")}`);
}

export async function POST(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (!user?.sub)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const formData = await req.formData();
        const file = formData.get("file");
        if (!file || !(file instanceof File))
            return NextResponse.json({ message: "No file provided" }, { status: 400 });

        if (file.size > MAX_FILE_BYTES)
            return NextResponse.json({ message: "File is too large (max 15 MB)" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const text = (await extractText(file.name, buffer, file.type || "")).trim();

        if (!text)
            return NextResponse.json(
                { message: "Could not extract any text from this document" },
                { status: 400 }
            );

        if (text.length > MAX_SOURCE_CHARS)
            return NextResponse.json(
                { message: "The document is too long for a single order. Please split it into parts." },
                { status: 400 }
            );

        return NextResponse.json({
            fileName: file.name,
            text,
            wordCount: countWords(text),
        });
    } catch (err: any) {
        return NextResponse.json({ message: err.message || "Extraction failed" }, { status: 400 });
    }
}
