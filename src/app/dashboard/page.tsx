import React from 'react';
import type { Metadata } from "next";
import { COMPANY_NAME } from "@/resources/constants";
import TranslationOrder from "@/components/widgets/translation-order/TranslationOrder";

export const metadata: Metadata = {
    title: `Order a Translation — ${COMPANY_NAME}`,
    description:
        "Order an instant AI translation or a specialist translation delivered within 12–24 hours. Upload a document or paste text and pay from your Account Balance.",
    alternates: { canonical: "/dashboard" },
};

const Page = () => {
    return (
        <TranslationOrder />
    );
};

export default Page;
