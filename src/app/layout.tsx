import "./globals.css";
import type {Metadata} from "next";
import {COMPANY_NAME} from "@/resources/constants";
import {authWrapper} from "@/utils/authWrapper";
import {AlertProvider} from "@/context/AlertContext";
import PageWrapper from "@/components/layout/page-wrapper/PageWrapper";
import Header from "@/components/layout/header/Header";
import SiteFooter from "@/components/layout/site-footer/SiteFooter";
import ProtectedRoute from "@/components/utils/protected-route/ProtectedRoute";
import {currentFont} from "@/resources/styles-config";
import {I18nProvider} from "@/context/i18nContext";
import {AllOrdersProvider} from "@/context/AllOrdersContext";
import {CurrencyProvider} from "@/context/CurrencyContext";
import {CookieConsentProvider} from "@/context/CookieConsentContext";
import CookieConsent from "@/components/layout/cookie-consent/CookieConsent";
import SupportChat from "@/components/widgets/support-chat/SupportChat";

const siteUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
const siteDescription =
    "Translate documents and text online in 33 languages. Instant AI translation, or specialist " +
    "translation delivered within 12–24 hours. Upload PDF, DOCX or paste text — pay from your Account Balance.";

/**
 * Site-wide defaults. Individual pages override title/description; anything they
 * leave out (Open Graph image, site name, locale) is inherited from here, so a
 * shared link always renders a complete preview.
 */
export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: `${COMPANY_NAME} — Professional Document & Text Translation`,
        template: `%s — ${COMPANY_NAME}`,
    },
    description: siteDescription,
    applicationName: COMPANY_NAME,
    openGraph: {
        type: "website",
        siteName: COMPANY_NAME,
        locale: "en_GB",
        url: siteUrl,
        title: `${COMPANY_NAME} — Professional Document & Text Translation`,
        description: siteDescription,
        images: [
            {
                url: "/api/og",
                width: 1200,
                height: 630,
                alt: `${COMPANY_NAME} — document and text translation in 33 languages`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${COMPANY_NAME} — Professional Document & Text Translation`,
        description: siteDescription,
        images: ["/api/og"],
    },
};

function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link href={currentFont.url} rel="stylesheet"/>
            <style>{`:root { --font-family: ${currentFont.css}; }`}</style>
        </head>
        <body>
        <I18nProvider>
            <AlertProvider>
                <AllOrdersProvider>
                    <ProtectedRoute>
                        <CurrencyProvider>
                            <CookieConsentProvider>
                                <Header/>
                                <PageWrapper>
                                    {children}
                                </PageWrapper>
                                <SiteFooter/>
                                <SupportChat/>
                                <CookieConsent/>
                            </CookieConsentProvider>
                        </CurrencyProvider>
                    </ProtectedRoute>
                </AllOrdersProvider>
            </AlertProvider>
        </I18nProvider>
        </body>
        </html>
    );
}

export default authWrapper(Layout);