import nodemailer from "nodemailer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const TO = process.argv[2] || "yaroslav7v@gmail.com";
const invoiceNumber = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-TEST1`;

async function buildPdf() {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595.28, 841.89]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const brand = rgb(0, 0.482, 1);
    const dark = rgb(0.2, 0.2, 0.2);
    let y = 780;
    const t = (s, x, yy, o = {}) =>
        page.drawText(s, { x, y: yy, size: o.size ?? 10, font: o.font ?? font, color: o.color ?? dark });
    t(process.env.NEXT_PUBLIC_COMPANY_NAME || "Que Translations", 50, y, { size: 20, font: bold, color: brand });
    t("INVOICE", 460, y, { size: 20, font: bold });
    y -= 26;
    t(process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || "", 50, y, { size: 9 });
    y -= 13;
    t(`Company No. ${process.env.NEXT_PUBLIC_COMPANY_NUMBER || ""}`, 50, y, { size: 9 });
    y -= 40;
    t(`Invoice #: ${invoiceNumber}`, 50, y, { font: bold });
    y -= 16;
    t(`Date: ${new Date().toLocaleDateString("en-GB")}`, 50, y);
    y -= 16;
    t(`Bill to: ${TO}`, 50, y);
    y -= 30;
    t("Order: SMTP test order", 50, y, { font: bold, size: 12 });
    y -= 20;
    t("-  Service: Test email delivery", 50, y);
    y -= 15;
    t("-  Status: Paid", 50, y);
    y -= 30;
    t("Subtotal (net):  GBP 8.33", 360, y);
    y -= 16;
    t("VAT (20%):  GBP 1.67", 360, y);
    y -= 18;
    t("Total paid:  GBP 10.00", 360, y, { font: bold, size: 12, color: brand });
    return Buffer.from(await doc.save());
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

console.log("→ SMTP:", process.env.SMTP_HOST, process.env.SMTP_PORT, "secure:", process.env.SMTP_SECURE);
await transporter.verify();
console.log("✅ SMTP connection OK");

const pdf = await buildPdf();
const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to: TO,
    subject: "Test invoice — Que Translations",
    text: `Hi,\n\nThis is a test email from ${process.env.NEXT_PUBLIC_COMPANY_NAME}.\nInvoice number: ${invoiceNumber}\nA PDF invoice is attached.\n\nBest regards,\nQue Translations`,
    html: `<div style="font-family:Arial,sans-serif;padding:20px;color:#333;">
      <h2 style="color:#007BFF;">Test email from Que Translations</h2>
      <p>SMTP delivery works. Invoice number: <strong>${invoiceNumber}</strong>.</p>
      <p>A PDF invoice (<strong>${invoiceNumber}.pdf</strong>) is attached.</p>
    </div>`,
    attachments: [{ filename: `${invoiceNumber}.pdf`, content: pdf, contentType: "application/pdf" }],
});

console.log("✅ Sent:", info.messageId);
console.log("   accepted:", info.accepted);
console.log("   rejected:", info.rejected);
