/**
 * Server-side PDF of a finished translation, attached to the delivery email.
 * Rendered with @react-pdf/renderer so the layout survives any script — see
 * ./translationFonts for how the body face is chosen per target language.
 */
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { resolveFonts } from "./translationFonts";
import {
    COMPANY_NAME,
    COMPANY_EMAIL,
    COMPANY_WEBSITE,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
} from "@/resources/constants";

export interface TranslationPdfData {
    orderId: string;
    planTitle: string;
    sourceLanguage: string;
    targetLanguage: string;
    subjectLabel: string;
    wordCount: number;
    fileName?: string;
    createdAt: Date;
    translatedText: string;
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 48,
        paddingBottom: 64,
        paddingHorizontal: 52,
        fontSize: 10.5,
        color: "#1c2333",
    },
    brand: { fontSize: 15, fontWeight: 700, color: "#170B33" },
    brandSub: { fontSize: 9, color: "#6b7280", marginTop: 3 },
    title: { fontSize: 19, fontWeight: 700, marginTop: 26 },
    meta: { marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
    metaRow: { flexDirection: "row", marginBottom: 4 },
    metaLabel: { width: 110, fontSize: 9, color: "#6b7280" },
    metaValue: { flex: 1, fontSize: 9 },
    bodyStart: { marginTop: 22, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
    /** Blank source lines become a small gap instead of a full empty paragraph. */
    spacer: { height: 6 },
    paragraph: { fontSize: 11, lineHeight: 1.55, marginBottom: 9 },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 52,
        right: 52,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 8,
        color: "#9ca3af",
    },
});

/** Keep blank lines as paragraph breaks so the source structure survives. */
function toParagraphs(text: string): string[] {
    return text
        .replace(/\r\n/g, "\n")
        .split(/\n/)
        .map((line) => line.trimEnd());
}

function formatDate(date: Date): string {
    return new Date(date).toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    });
}

export function TranslationDocument(data: TranslationPdfData) {
    const { bodyFamily, uiFamily, rtl } = resolveFonts(data.targetLanguage);
    const companyName = COMPANY_NAME || "Translation Service";
    const paragraphs = toParagraphs(data.translatedText);

    const bodyStyle = [
        styles.paragraph,
        {
            fontFamily: bodyFamily,
            ...(rtl ? { textAlign: "right" as const, direction: "rtl" as const } : {}),
        },
    ];

    const metaRows: Array<[string, string]> = [
        ["Order", data.orderId],
        ["Service", data.planTitle],
        // No arrow glyph here: the Noto text faces do not cover U+2192.
        ["Languages", `${data.sourceLanguage} to ${data.targetLanguage}`],
        ["Subject area", data.subjectLabel],
        ["Word count", String(data.wordCount)],
        ...(data.fileName ? ([["Source file", data.fileName]] as Array<[string, string]>) : []),
        ["Completed", `${formatDate(data.createdAt)} UTC`],
    ];

    return (
        <Document
            title={`Translation ${data.sourceLanguage} → ${data.targetLanguage}`}
            author={companyName}
            creator={companyName}
        >
            <Page size="A4" style={[styles.page, { fontFamily: uiFamily }]} wrap>
                <View fixed={false}>
                    <Text style={styles.brand}>{companyName}</Text>
                    {COMPANY_WEBSITE ? <Text style={styles.brandSub}>{COMPANY_WEBSITE}</Text> : null}
                    <Text style={styles.title}>Translation</Text>
                </View>

                <View style={styles.meta}>
                    {metaRows.map(([label, value]) => (
                        <View key={label} style={styles.metaRow}>
                            <Text style={styles.metaLabel}>{label}</Text>
                            <Text style={styles.metaValue}>{value}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.bodyStart}>
                    {paragraphs.map((paragraph, index) =>
                        paragraph ? (
                            <Text key={index} style={bodyStyle}>
                                {paragraph}
                            </Text>
                        ) : (
                            <View key={index} style={styles.spacer} />
                        )
                    )}
                </View>

                <View style={styles.footer} fixed>
                    <Text>
                        {[COMPANY_LEGAL_NAME, COMPANY_NUMBER ? `Company No. ${COMPANY_NUMBER}` : "", COMPANY_EMAIL]
                            .filter(Boolean)
                            .join(" · ")}
                    </Text>
                    <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
                </View>
            </Page>
        </Document>
    );
}
