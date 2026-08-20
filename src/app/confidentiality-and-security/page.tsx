import type {Metadata} from "next";
import enConfidentiality from "@/pageSchemas/confidentiality-and-security/confidentiality.en";

import PageCreator from "@/components/utils/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";
import styles from "@/resources/PolicyPage.module.scss";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enConfidentiality.meta);
}

export default function Page() {
    return (
        <div className={styles.privacyContainer}>
            <PageCreator schemaMap={{sv: enConfidentiality, en: enConfidentiality}}/>
        </div>
    );
}
