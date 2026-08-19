import { PDFDocument, StandardFonts, rgb, PDFFont } from "pdf-lib";

import {
    BASE_CURRENCY,
    CURRENCY_SIGNS,
    SupportedCurrency,
    formatMoney,
    netFromGross,
    vatFromGross,
    VAT_RATE,
} from "@/utils/money";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_PHONE,
} from "@/resources/constants";

export type InvoiceData = {
    invoiceNumber: string;
    date: Date | string;
    customerName?: string;
    customerEmail: string;
    title: string;
    lines: string[];
    grossAmount: number;
    currency?: SupportedCurrency;
};

const BRAND = rgb(0, 0.482, 1); // #007BFF
const DARK = rgb(0.2, 0.2, 0.2);
const MUTED = rgb(0.45, 0.45, 0.45);
const LINE = rgb(0.85, 0.85, 0.85);

/**
 * StandardFonts only cover WinAnsi. Anything outside it (emoji, arrows, box
 * drawing) makes pdf-lib throw at draw time, so replace known symbols and drop
 * the rest before rendering.
 */
function sanitize(value: string): string {
    return String(value)
        .replace(/→|➔|➜/g, "->")
        .replace(/[’‘]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/–|—/g, "-")
        .replace(/•/g, "-")
        .replace(/[^\x20-\x7E\xA0-\xFF]/g, "")
        .trim();
}

function money(amount: number, currency: SupportedCurrency): string {
    // formatMoney already renders the currency sign; keep it consistent.
    return formatMoney(amount, currency);
}

export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
    const currency = data.currency ?? BASE_CURRENCY;
    const gross = data.grossAmount;
    const net = netFromGross(gross);
    const vat = vatFromGross(gross);

    const doc = await PDFDocument.create();
    const page = doc.addPage([595.28, 841.89]); // A4 portrait
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    const marginX = 50;
    let y = height - 60;

    const drawText = (
        text: string,
        x: number,
        yPos: number,
        opts: { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb> } = {}
    ) => {
        page.drawText(sanitize(text), {
            x,
            y: yPos,
            size: opts.size ?? 10,
            font: opts.font ?? font,
            color: opts.color ?? DARK,
        });
    };

    const drawRight = (
        text: string,
        rightX: number,
        yPos: number,
        opts: { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb> } = {}
    ) => {
        const size = opts.size ?? 10;
        const usedFont = opts.font ?? font;
        const clean = sanitize(text);
        const w = usedFont.widthOfTextAtSize(clean, size);
        page.drawText(clean, {
            x: rightX - w,
            y: yPos,
            size,
            font: usedFont,
            color: opts.color ?? DARK,
        });
    };

    const drawLine = (yPos: number) => {
        page.drawLine({
            start: { x: marginX, y: yPos },
            end: { x: width - marginX, y: yPos },
            thickness: 1,
            color: LINE,
        });
    };

    // Header
    drawText(COMPANY_NAME || "Invoice", marginX, y, { size: 20, font: bold, color: BRAND });
    drawRight("INVOICE", width - marginX, y, { size: 20, font: bold, color: DARK });
    y -= 28;

    const companyLines = [
        COMPANY_LEGAL_NAME || "",
        COMPANY_NUMBER ? `Company No. ${COMPANY_NUMBER}` : "",
        COMPANY_ADDRESS || "",
        COMPANY_EMAIL || "",
        COMPANY_PHONE || "",
    ].filter(Boolean);

    for (const line of companyLines) {
        drawText(line, marginX, y, { size: 9, color: MUTED });
        y -= 13;
    }

    // Invoice meta (right column)
    let metaY = height - 88;
    const issued = new Date(data.date);
    const metaRows: Array<[string, string]> = [
        ["Invoice #", data.invoiceNumber],
        [
            "Date",
            issued.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
            }),
        ],
        ["Status", "Paid"],
    ];
    for (const [label, val] of metaRows) {
        drawText(label, width - marginX - 180, metaY, { size: 9, color: MUTED });
        drawRight(val, width - marginX, metaY, { size: 9, font: bold });
        metaY -= 14;
    }

    y = Math.min(y, metaY) - 14;
    drawLine(y);
    y -= 24;

    // Bill to
    drawText("BILL TO", marginX, y, { size: 9, font: bold, color: MUTED });
    y -= 15;
    if (data.customerName) {
        drawText(data.customerName, marginX, y, { size: 11, font: bold });
        y -= 14;
    }
    drawText(data.customerEmail, marginX, y, { size: 10, color: MUTED });
    y -= 30;

    // Order details heading
    drawText(sanitize(data.title), marginX, y, { size: 12, font: bold });
    y -= 8;
    drawLine(y);
    y -= 18;

    for (const line of data.lines) {
        drawText(`•  ${line}`, marginX, y, { size: 10 });
        y -= 15;
    }

    y -= 14;
    drawLine(y);
    y -= 22;

    // Totals
    const totalsRightLabel = width - marginX - 110;
    const totalsRightValue = width - marginX;

    const totalRow = (label: string, val: string, strong = false) => {
        drawRight(label, totalsRightLabel, y, {
            size: strong ? 11 : 10,
            font: strong ? bold : font,
            color: strong ? DARK : MUTED,
        });
        drawRight(val, totalsRightValue, y, {
            size: strong ? 12 : 10,
            font: strong ? bold : font,
            color: strong ? BRAND : DARK,
        });
        y -= strong ? 20 : 16;
    };

    totalRow(`Subtotal (net)`, money(net, currency));
    totalRow(`VAT (${Math.round(VAT_RATE * 100)}%)`, money(vat, currency));
    totalRow("Total paid", money(gross, currency), true);

    // Footer
    const footerY = 60;
    drawLine(footerY + 24);
    drawText(
        `${COMPANY_NAME || ""}${COMPANY_EMAIL ? ` · ${COMPANY_EMAIL}` : ""}`,
        marginX,
        footerY,
        { size: 8, color: MUTED }
    );
    drawText(
        `All amounts in ${currency} (${CURRENCY_SIGNS[currency]}). Thank you for your business.`,
        marginX,
        footerY - 12,
        { size: 8, color: MUTED }
    );

    return await doc.save();
}

export function buildInvoiceNumber(date: Date = new Date()): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `INV-${y}${m}${d}-${rand}`;
}