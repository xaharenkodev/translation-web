import type { Metadata } from "next";
import { ogImageUrl } from "@/utils/ogImage";
import { COMPANY_NAME } from "@/resources/constants";

/** The page itself is a client component, so its metadata lives here. */
export const metadata: Metadata = {
    title: "Pricing & Account Balance",
    description:
        "Transparent per-word pricing for AI and specialist translation. Top up your Account Balance with any " +
        "amount you like and spend it on translation orders — no subscription, no hidden fees.",
    alternates: { canonical: "/pricing" },
    openGraph: {
        title: `Pricing & Account Balance — ${COMPANY_NAME}`,
        description:
            "Per-word pricing for AI and specialist translation. Top up any amount and spend it as you order.",
        url: "/pricing",
        images: [ogImageUrl(`Pricing & Account Balance — ${COMPANY_NAME}`, "Per-word pricing for AI and specialist translation. Top up any amount and spend it as you order.")],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
