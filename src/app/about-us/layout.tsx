import type { Metadata } from "next";
import { ogImageUrl } from "@/utils/ogImage";
import { COMPANY_NAME } from "@/resources/constants";

/** The page itself is a client component, so its metadata lives here. */
export const metadata: Metadata = {
    title: "About Us",
    description:
        `${COMPANY_NAME} is a translation service built around one idea: a translation should read the way the ` +
        `original was meant to. Instant AI drafts or specialist translation in 33 languages, priced per word.`,
    alternates: { canonical: "/about-us" },
    openGraph: {
        title: `About ${COMPANY_NAME}`,
        description:
            "Why we built a translation service around accuracy, speed and transparent per-word pricing.",
        url: "/about-us",
        images: [ogImageUrl(`About ${COMPANY_NAME}`, "Why we built a translation service around accuracy, speed and transparent per-word pricing.")],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
