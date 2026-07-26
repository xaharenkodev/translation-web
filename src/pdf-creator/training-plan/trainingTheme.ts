import { StyleSheet } from "@react-pdf/renderer";

const colors = {
    primary: "#0B3B8C", // deep blue
    accent: "#7C3AED",  // blue
    light: "#F8FAFF",   // almost white-blue
    text: "#0F172A",    // slate-900
    muted: "#475569",   // slate-600
    border: "#CBD5E1",  // slate-300
    chipBg: "#E8F0FF",
    noteBg: "#EEF2FF",
};

export const trainingTheme = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: colors.light,
        fontFamily: "Helvetica",
        fontSize: 11.5,
        lineHeight: 1.6,
        color: colors.text,
    },

    header: {
        borderBottomWidth: 2,
        borderBottomColor: colors.accent,
        paddingBottom: 12,
        marginBottom: 18,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.primary,
    },

    meta: {
        marginTop: 6,
        fontSize: 10,
        color: colors.muted,
    },

    chipsRow: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },

    chip: {
        backgroundColor: colors.chipBg,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
        fontSize: 9.5,
        color: colors.primary,
    },

    sectionTitle: {
        marginTop: 18,
        marginBottom: 8,
        fontSize: 13.5,
        fontWeight: "bold",
        color: colors.accent,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 4,
        textTransform: "uppercase",
    },

    paragraph: {
        fontSize: 11.3,
        marginBottom: 8,
        lineHeight: 1.7,
    },

    list: {
        marginBottom: 6,
    },

    bulletItem: {
        fontSize: 11.3,
        marginBottom: 4,
        paddingLeft: 14,
        lineHeight: 1.5,
    },

    boldInline: {
        fontWeight: "bold",
        color: colors.primary,
    },

    coachNoteBox: {
        marginTop: 14,
        padding: 12,
        backgroundColor: colors.noteBg,
        borderLeftWidth: 4,
        borderLeftColor: colors.accent,
        borderRadius: 4,
    },

    coachNoteTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 6,
    },

    footer: {
        marginTop: 28,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 10,
        textAlign: "center",
    },

    footerText: {
        fontSize: 9,
        color: colors.muted,
    },
});