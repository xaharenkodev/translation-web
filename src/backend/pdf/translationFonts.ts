/**
 * Font resolution for generated translation PDFs.
 *
 * The built-in PDF fonts (Helvetica & co.) only cover WinAnsi, so anything
 * outside Latin — Cyrillic, Greek, CJK, Arabic, Hebrew, Thai, Devanagari —
 * would render as blank boxes. Each target language is therefore mapped to a
 * Noto face that covers its script. The TTFs are fetched from jsDelivr on first
 * use; @react-pdf/renderer keeps its font store in module scope, so a warm
 * server only downloads each face once.
 */
import { Font } from "@react-pdf/renderer";

const CDN = "https://cdn.jsdelivr.net/npm/@expo-google-fonts";

interface FontSpec {
    /** Family name registered with @react-pdf/renderer. */
    family: string;
    regular: string;
    /** Only the Latin face ships a bold we need; the rest reuse the regular. */
    bold?: string;
    /** Right-to-left script — the body is laid out mirrored. */
    rtl?: boolean;
}

/** Latin, Cyrillic, Greek and Vietnamese all live in this one face. */
const NOTO_SANS: FontSpec = {
    family: "NotoSans",
    regular: `${CDN}/noto-sans/NotoSans_400Regular.ttf`,
    bold: `${CDN}/noto-sans/NotoSans_700Bold.ttf`,
};

/** Target languages whose script is not covered by NotoSans. */
const BY_LANGUAGE: Record<string, FontSpec> = {
    Arabic: {
        family: "NotoSansArabic",
        regular: `${CDN}/noto-sans-arabic/NotoSansArabic_400Regular.ttf`,
        rtl: true,
    },
    Hebrew: {
        family: "NotoSansHebrew",
        regular: `${CDN}/noto-sans-hebrew/NotoSansHebrew_400Regular.ttf`,
        rtl: true,
    },
    "Chinese (Simplified)": {
        family: "NotoSansSC",
        regular: `${CDN}/noto-sans-sc/NotoSansSC_400Regular.ttf`,
    },
    "Chinese (Traditional)": {
        family: "NotoSansTC",
        regular: `${CDN}/noto-sans-tc/NotoSansTC_400Regular.ttf`,
    },
    Japanese: {
        family: "NotoSansJP",
        regular: `${CDN}/noto-sans-jp/NotoSansJP_400Regular.ttf`,
    },
    Korean: {
        family: "NotoSansKR",
        regular: `${CDN}/noto-sans-kr/NotoSansKR_400Regular.ttf`,
    },
    Thai: {
        family: "NotoSansThai",
        regular: `${CDN}/noto-sans-thai/NotoSansThai_400Regular.ttf`,
    },
    Hindi: {
        family: "NotoSansDevanagari",
        regular: `${CDN}/noto-sans-devanagari/NotoSansDevanagari_400Regular.ttf`,
    },
};

const registered = new Set<string>();

function register(spec: FontSpec) {
    if (registered.has(spec.family)) return;
    Font.register({
        family: spec.family,
        fonts: [
            { src: spec.regular, fontWeight: 400 },
            { src: spec.bold || spec.regular, fontWeight: 700 },
        ],
    });
    registered.add(spec.family);
}

export interface ResolvedFonts {
    /** Face used for the translated body text. */
    bodyFamily: string;
    /** Face used for headings and labels, which stay in English. */
    uiFamily: string;
    rtl: boolean;
}

/**
 * Register (once) and return the faces needed to typeset a translation into
 * `targetLanguage`. Headings stay on NotoSans so the English chrome always
 * looks the same regardless of the target script.
 */
export function resolveFonts(targetLanguage: string): ResolvedFonts {
    register(NOTO_SANS);

    const spec = BY_LANGUAGE[targetLanguage];
    if (!spec) {
        return { bodyFamily: NOTO_SANS.family, uiFamily: NOTO_SANS.family, rtl: false };
    }

    register(spec);
    return { bodyFamily: spec.family, uiFamily: NOTO_SANS.family, rtl: Boolean(spec.rtl) };
}

/** Disable hyphenation — splitting translated words is never desirable. */
Font.registerHyphenationCallback((word) => [word]);
