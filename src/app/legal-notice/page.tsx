import type {Metadata} from "next";
import enLegalNotice from "@/pageSchemas/legal-notice/legalNotice.en";

import PageCreator from "@/components/utils/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";
import styles from "@/resources/PolicyPage.module.scss";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enLegalNotice.meta);
}

export default function Page() {
    return (
        <div className={styles.privacyContainer}>
            <PageCreator schemaMap={{sv: enLegalNotice, en: enLegalNotice}}/>
        </div>
    );
}
