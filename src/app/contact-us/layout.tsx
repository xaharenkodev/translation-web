import type { Metadata } from "next";
import { ogImageUrl } from "@/utils/ogImage";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

/** The page itself is a client component, so its metadata lives here. */
export const metadata: Metadata = {
    title: "Contact & Support",
    description:
        `Questions about an order, a file that will not upload, or your Account Balance? Contact the ` +
        `${COMPANY_NAME} team at ${COMPANY_EMAIL} or through the form on this page.`,
    alternates: { canonical: "/contact-us" },
    openGraph: {
        title: `Contact ${COMPANY_NAME}`,
        description: "Help with translation orders, files, billing and Account Balance.",
        url: "/contact-us",
        images: [ogImageUrl(`Contact ${COMPANY_NAME}`, "Help with translation orders, files, billing and Account Balance.")],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
