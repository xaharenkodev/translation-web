import nodemailer from "nodemailer";
import { ENV } from "@/backend/config/env";

export type EmailAttachment = {
    filename: string;
    content: Buffer | Uint8Array;
    contentType?: string;
};

const transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: Number(ENV.SMTP_PORT),
    secure: ENV.SMTP_SECURE,
    auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS,
    },
});

export async function sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
    attachments?: EmailAttachment[]
) {
    try {
        const info = await transporter.sendMail({
            from: ENV.EMAIL_FROM || ENV.SMTP_USER,
            to,
            subject,
            text: text || "",
            html: html || defaultTemplate(subject, text),
            attachments: attachments?.map((attachment) => ({
                filename: attachment.filename,
                content: Buffer.isBuffer(attachment.content)
                    ? attachment.content
                    : Buffer.from(attachment.content),
                contentType: attachment.contentType,
            })),
        });

        console.log("✅ Email sent via SMTP:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ SMTP email failed:", error);
        throw error;
    }
}

function defaultTemplate(title: string, message: string) {
    return `
    <div style="font-family: Arial, sans-serif; background:#f4faff; padding:20px; color:#333;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <h2 style="color:#007BFF; text-align:center;">${title}</h2>
        <p style="font-size:16px; line-height:1.6; color:#333;">
          ${message}
        </p>
        <div style="text-align:center; margin:30px 0;">
          <a href="${ENV.APP_URL}/dashboard"
             style="background:#007BFF; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold;">
             Go to Dashboard
          </a>
        </div>
        <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />
        <p style="font-size:14px; color:#777; text-align:center;">
          © ${new Date().getFullYear()} ${ENV.EMAIL_FROM} – All rights reserved.
        </p>
      </div>
    </div>
  `;
}