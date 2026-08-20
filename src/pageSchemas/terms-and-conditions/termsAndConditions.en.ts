import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const termsAndConditionsEn: PageSchema = {
    meta: {
        title: `Terms and Conditions – ${COMPANY_NAME}`,
        description: "These Terms govern accounts, prepaid balances, AI Translation, Human Translation and all related use of QueTranslations.",
        canonical: "/terms-and-conditions",
        ogImage: {
            title: `Terms and Conditions – ${COMPANY_NAME}`,
            description: "These Terms govern accounts, prepaid balances, AI Translation, Human Translation and all related use of QueTranslations.",
            bg: "#170B33",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Terms and Conditions",
            description: "Last updated: 19 August 2026",
        },
        {
            type: "text",
            description: "These Terms govern accounts, prepaid balances, AI Translation, Human Translation and all related use of QueTranslations.",
        },
        {
            type: "text",
            title: "About These Terms",
            description: "Operator. The QueTranslations website and translation services are operated by QUENTICS OÜ, an Estonian private limited company with registration number 17569282 and registered address at Rotermanni tn 6, Kesklinna linnaosa, 10111 Tallinn, Harju maakond, Estonia (\"QueTranslations\", \"we\", \"us\" or \"our\").",
        },
        {
            type: "text",
            description: "Agreement. These Terms and Conditions govern access to quetranslations.com, user accounts, account balances, orders, AI Translation, Human Translation and related support. By creating an account, adding funds, submitting an order or otherwise using the Services, the user agrees to these Terms and the policies incorporated by reference.",
        },
        {
            type: "text",
            description: "Priority of mandatory law. Nothing in these Terms excludes or restricts rights that cannot lawfully be excluded, including mandatory consumer rights applicable in the user’s country of residence.",
        },
        {
            type: "text",
            title: "Definitions",
            description: "Account. An individual profile used to access the Services, store files and translations, maintain a Balance and view order history.",
        },
        {
            type: "text",
            description: "AI Translation. A translation produced primarily through automated artificial-intelligence models and delivered without human review unless a separate Human Translation service is purchased.",
        },
        {
            type: "text",
            description: "Human Translation. A translation produced or substantively reviewed by a human translator engaged by QueTranslations and located within the European Economic Area.",
        },
        {
            type: "text",
            description: "Balance. Prepaid value credited to an Account and usable only to purchase QueTranslations services. A Balance is not a bank account, deposit, payment account or general-purpose payment instrument.",
        },
        {
            type: "text",
            description: "Customer Content. Any text, document, image, file, instruction, personal data or other material submitted by or for a user, together with any content generated as part of an order.",
        },
        {
            type: "text",
            description: "Order. A request for a selected translation service confirmed after the applicable price is deducted from the user’s Balance.",
        },
        {
            type: "text",
            description: "User. Any person or organisation accessing or using the Services, including a consumer and a business customer.",
        },
        {
            type: "text",
            title: "Eligibility and Accounts",
            description: "Eligibility. A user must be at least 18 years old and legally capable of entering into a binding agreement. A person using the Services for an organisation confirms that they are authorised to bind that organisation.",
        },
        {
            type: "text",
            description: "Account information. Users must provide accurate, current and complete account information and keep it updated. Accounts may not be sold, transferred, shared in a manner that compromises security, or created using another person’s identity without lawful authority.",
        },
        {
            type: "text",
            description: "Account security. Users are responsible for protecting their credentials and for activity performed through their Accounts. Suspected unauthorised access must be reported promptly to info@quetranslations.com.",
        },
        {
            type: "text",
            description: "No subscriptions. The Services are offered through individual Orders funded from the Balance. QueTranslations does not charge recurring subscription fees unless a separate written agreement expressly provides otherwise.",
        },
        {
            type: "text",
            title: "Translation Services",
            description: "User selection. Before confirming an Order, the user selects either AI Translation or Human Translation. The selected service type, source and target language, calculated volume, price and estimated delivery time are shown or otherwise communicated before confirmation.",
        },
        {
            type: "text",
            description: "AI Translation. AI Translation is automated, may be delivered within minutes and may contain omissions, mistranslations, formatting changes, inconsistent terminology or context errors. It is not represented as equivalent to professional human translation and is not human-reviewed unless expressly stated.",
        },
        {
            type: "text",
            description: "Human Translation. Human Translation is performed by translators located within the EEA. QueTranslations may assign an Order to an appropriate translator and may use secure internal tools to support formatting, terminology management and quality control.",
        },
        {
            type: "text",
            description: "Excluded professional services. QueTranslations does not provide certified, sworn, notarised, legal or medical translation services. Deliverables must not be represented as certified or relied on as legal advice, medical advice, a clinical translation, an official filing or a substitute for review by an appropriately qualified professional.",
        },
        {
            type: "text",
            description: "Language and format availability. Available language pairs, file formats and technical limits are those displayed through the Services at the time of an Order. QueTranslations may decline unsupported, corrupted, illegible or technically unsafe files.",
        },
        {
            type: "text",
            title: "Orders and Pricing",
            description: "Order formation. An Order becomes binding when the user confirms the displayed service details, the applicable amount is deducted from the Balance and QueTranslations issues an on-screen or electronic confirmation. Adding funds to the Balance does not itself create a translation Order.",
        },
        {
            type: "text",
            description: "Price calculation. Prices may be calculated by source-word count, language pair, selected service, urgency, formatting requirements or other factors disclosed before confirmation. The system-calculated source-word count controls unless it is affected by an obvious technical or extraction error.",
        },
        {
            type: "text",
            description: "Material discrepancies. If an apparent file or word-count error materially affects price or timing, QueTranslations may pause the Order and request approval of an adjusted quotation. If the user does not accept the adjustment, the unused amount allocated to that Order will be restored to the Balance.",
        },
        {
            type: "text",
            description: "Currencies and taxes. Funds may be added and services purchased in EUR, GBP or USD. Any applicable VAT or other tax will be shown before the relevant transaction where required. A card issuer or bank may apply its own conversion rate or fees, which are outside QueTranslations’ control.",
        },
        {
            type: "text",
            title: "Balance and Payments",
            description: "Funding. The Balance may be funded using supported Visa or Mastercard cards through a third-party payment processor. QueTranslations does not require users to provide full card details directly to QueTranslations where the payment processor collects them.",
        },
        {
            type: "text",
            description: "Use of Balance. Paid Balance may be used only for QueTranslations services, does not earn interest, is non-transferable between users and does not expire merely because it remains unused. Any promotional or bonus credit, if offered, is not paid money, has no cash value and is not refundable unless expressly stated otherwise.",
        },
        {
            type: "text",
            description: "Unused Balance refunds. A user may request a refund of unused paid Balance at any time by emailing info@quetranslations.com. Subject to reasonable identity, fraud and payment verification, QueTranslations will initiate the refund to the original payment method in the original transaction currency within 14 days and will not charge its own refund fee.",
        },
        {
            type: "text",
            description: "External charges. Card issuers, banks or payment networks may apply external charges, processing delays or exchange-rate adjustments. QueTranslations is not responsible for such third-party amounts and does not guarantee that the amount received after currency conversion will equal an earlier converted amount.",
        },
        {
            type: "text",
            description: "Reversals and chargebacks. A payment reversal, failed payment or chargeback may result in a corresponding Balance adjustment and temporary Account restriction. Users should contact QueTranslations before initiating a chargeback so that the issue can be investigated.",
        },
        {
            type: "text",
            title: "Delivery",
            description: "AI timing. AI Translation is normally delivered within several minutes, depending on file size, format, system load and technical complexity. This is an estimate rather than a guaranteed deadline.",
        },
        {
            type: "text",
            description: "Human timing. Human Translation Orders containing up to 5,000 source words are normally delivered within 24 to 48 hours, depending on volume, language pair, complexity, file quality and translator availability.",
        },
        {
            type: "text",
            description: "Larger Orders. For Human Translation exceeding 5,000 source words, a separate estimated delivery time will be displayed or communicated before the user confirms the Order. QueTranslations is not required to complete such an Order within the standard 24-to-48-hour period.",
        },
        {
            type: "text",
            description: "Dependencies. Delivery estimates assume that Customer Content is complete, legible and technically usable and that the user responds promptly to clarification requests. Delays caused by missing instructions, inaccessible files, user changes, force majeure or third-party infrastructure extend the estimate reasonably.",
        },
        {
            type: "text",
            description: "Method of delivery. Translations are delivered electronically through the Account, by email or by another digital method indicated during the Order process. Users are responsible for downloading and reviewing deliverables within a reasonable period.",
        },
        {
            type: "text",
            title: "Quality, Revisions and Complaints",
            description: "Review. Users should review a delivered translation promptly and provide a clear description of any claimed error, the relevant source passage and the requested correction.",
        },
        {
            type: "text",
            description: "Human Translation corrections. For a demonstrable mistranslation, omission or failure to follow the instructions accepted with a Human Translation Order, QueTranslations will provide a reasonable correction without additional charge. New text, changed instructions, stylistic preferences not stated in the original Order and expanded scope may require a new Order.",
        },
        {
            type: "text",
            description: "AI Translation issues. Because AI Translation is automated, linguistic preferences or ordinary model limitations do not by themselves establish a service defect. If an AI Order fails technically, produces an incomplete file or materially departs from the selected source and target language, QueTranslations may rerun the translation, restore the relevant amount to the Balance or issue a refund as appropriate.",
        },
        {
            type: "text",
            description: "Complaint timing. For efficient investigation, users are encouraged to notify QueTranslations within seven days after delivery. This operational period does not shorten any longer mandatory period for consumer claims.",
        },
        {
            type: "text",
            description: "Written response. Written consumer complaints sent to info@quetranslations.com will be reviewed and answered within 15 days, unless a different mandatory period applies or additional information is reasonably required.",
        },
        {
            type: "text",
            title: "Cancellation and Consumer Withdrawal",
            description: "Immediate performance. Because translation begins immediately after payment from the Balance, a consumer will be asked to expressly request performance during the statutory withdrawal period and acknowledge that the right of withdrawal is lost once the selected service has been fully performed.",
        },
        {
            type: "text",
            description: "AI Orders. Where AI Translation has been fully performed and delivered after the consumer’s prior express request and legally required acknowledgement, the consumer may lose the statutory right of withdrawal to the extent permitted by applicable law.",
        },
        {
            type: "text",
            description: "Human Orders before completion. If a consumer validly withdraws after requesting immediate performance but before Human Translation is fully completed, the consumer may be required to pay an amount proportionate to the work provided before QueTranslations received the withdrawal notice.",
        },
        {
            type: "text",
            description: "Completed services. Once a service has been fully performed with the consumer’s prior express consent and acknowledgement, cancellation for change of mind is not available to the extent permitted by law. Rights relating to defective or non-conforming performance remain unaffected.",
        },
        {
            type: "text",
            description: "How to withdraw. A withdrawal or cancellation request must be sent to info@quetranslations.com and clearly identify the user, the Order and the decision to withdraw or cancel. The separate Refund, Cancellation and Balance Policy forms part of these Terms.",
        },
        {
            type: "text",
            title: "Customer Content",
            description: "Ownership. Users retain their rights in Customer Content. QueTranslations does not acquire ownership of source documents merely because they are uploaded.",
        },
        {
            type: "text",
            description: "Processing permission. The user grants QueTranslations a limited, worldwide, non-exclusive right to host, reproduce, convert, transmit and otherwise process Customer Content only as reasonably necessary to provide, secure and support the Services, comply with law and enforce these Terms.",
        },
        {
            type: "text",
            description: "Authority. The user confirms that they own Customer Content or have all permissions and lawful grounds necessary to submit it for translation, including authority to disclose personal data and confidential information contained in it.",
        },
        {
            type: "text",
            description: "No AI training. QueTranslations does not use Customer Content or deliverables to train AI models and does not opt in to sharing Customer Content for model-training purposes. AI providers may temporarily process or retain limited content for service operation, security or abuse prevention as described in the Privacy Policy.",
        },
        {
            type: "text",
            description: "File retention. Source files and translations may remain available in an active Account for user convenience. They will be deleted after 24 consecutive months of Account inactivity, or earlier following a valid deletion request, subject to backup cycles, dispute preservation and legal retention duties.",
        },
        {
            type: "text",
            title: "Confidentiality and Data Protection",
            description: "Confidential handling. QueTranslations will use commercially reasonable measures to restrict access to Customer Content to authorised personnel, EEA-based human translators and service providers that require access for the Services and are subject to appropriate contractual or legal obligations.",
        },
        {
            type: "text",
            description: "Exceptions. Confidentiality obligations do not apply to information that is lawfully public, independently developed without use of Customer Content, lawfully obtained without a duty of confidence, or required to be disclosed by law or a binding authority request.",
        },
        {
            type: "text",
            description: "Privacy Policy. Personal data is processed as described in the Privacy Policy. Users submitting personal data concerning other individuals are responsible for providing any notice and obtaining any authority required by applicable law.",
        },
        {
            type: "text",
            title: "Intellectual Property",
            description: "Platform rights. The website, software, workflows, design, trademarks, documentation and other platform materials are owned by or licensed to QueTranslations and are protected by intellectual-property laws. No right is granted except the limited right to use the Services under these Terms.",
        },
        {
            type: "text",
            description: "Deliverables. Subject to full payment and the rights in the source material, QueTranslations assigns or grants to the user the transferable rights that QueTranslations holds in the completed translation. This does not transfer rights in the platform, translation technology, models, general know-how or third-party materials.",
        },
        {
            type: "text",
            description: "Non-unique AI output. AI-generated translations may not be unique, and similar or identical wording may be produced for other users. QueTranslations does not warrant that AI output is eligible for copyright protection in every jurisdiction.",
        },
        {
            type: "text",
            description: "Feedback. A user may provide suggestions voluntarily. QueTranslations may use general feedback without identifying the user or disclosing Customer Content, and without an obligation to compensate the user.",
        },
        {
            type: "text",
            title: "Acceptable Use and Restricted Access",
            description: "Lawful use. The Services may not be used to violate law, sanctions, export controls, intellectual-property rights, privacy rights or contractual confidentiality obligations, or to facilitate fraud, threats, exploitation, malware or other unlawful harm.",
        },
        {
            type: "text",
            description: "Restricted countries. The Services are not available to persons located in, ordinarily resident in or accessing the Services from Afghanistan, Belarus, Central African Republic, Cuba, Democratic Republic of the Congo, Haiti, Iran, Iraq, Mali, Myanmar (Burma), North Korea, Russia, Somalia, South Sudan, Sudan, Syria, Venezuela, Yemen or Zimbabwe.",
        },
        {
            type: "text",
            description: "Sanctioned persons. The Services are also unavailable where providing them would violate sanctions or trade restrictions binding on QueTranslations. QueTranslations may perform reasonable screening, reject an Order, restrict an Account or delay a refund where required by law.",
        },
        {
            type: "text",
            description: "Enforcement. If Customer Content or activity presents a legal, security or abuse risk, QueTranslations may refuse, pause or terminate processing. Any unused paid Balance remains refundable unless payment or repayment is prohibited by law or subject to a legitimate fraud or chargeback investigation.",
        },
        {
            type: "text",
            title: "Availability and Changes",
            description: "Service availability. QueTranslations aims to maintain reliable Services but does not guarantee uninterrupted or error-free availability. Maintenance, model outages, translator availability, cyber incidents, third-party failures or events beyond reasonable control may affect access or delivery.",
        },
        {
            type: "text",
            description: "Service changes. Features, supported formats, language pairs, models, pricing methods and technical limits may change. A change will not retroactively alter a confirmed Order without the user’s agreement, except where necessary to comply with law or address a serious security issue.",
        },
        {
            type: "text",
            title: "Disclaimers and Liability",
            description: "Translation judgement. Language involves judgement, context and style. Except for obligations that cannot be excluded, QueTranslations does not warrant that every translation will be error-free, suitable for every purpose or accepted by a court, authority, employer, educational institution or other third party.",
        },
        {
            type: "text",
            description: "User review. Users remain responsible for reviewing deliverables before publication, submission, commercial use or reliance, particularly where an error could cause financial, reputational, legal or safety consequences.",
        },
        {
            type: "text",
            description: "Excluded losses. To the extent permitted by law, QueTranslations is not liable for indirect, incidental, special or consequential loss, loss of profit, revenue, opportunity, goodwill or data, or a decision made in reliance on an unreviewed translation.",
        },
        {
            type: "text",
            description: "Business liability cap. For a business user, QueTranslations’ aggregate liability arising from an Order will not exceed the amount paid for that Order, except for fraud, wilful misconduct, gross negligence or liability that cannot lawfully be limited.",
        },
        {
            type: "text",
            description: "Consumer protection. For consumers, liability is limited only to the extent permitted by mandatory law. Nothing excludes liability for death or personal injury caused by negligence, fraud or any other liability that cannot legally be excluded.",
        },
        {
            type: "text",
            description: "Business indemnity. A business user will indemnify QueTranslations against third-party claims and reasonable costs arising from unlawful Customer Content, lack of required rights or authority, or the business user’s material breach of these Terms, to the extent permitted by law.",
        },
        {
            type: "text",
            title: "Suspension and Termination",
            description: "Suspension. QueTranslations may suspend access where reasonably necessary to investigate security incidents, unauthorised payments, prohibited use, sanctions concerns or a material breach. Where appropriate, the user will be given notice and an opportunity to resolve the issue.",
        },
        {
            type: "text",
            description: "Account closure. A user may request Account closure by emailing info@quetranslations.com. Before closure, QueTranslations will process any valid refund of unused paid Balance and address active Orders, disputes and legal retention requirements.",
        },
        {
            type: "text",
            description: "Effect of termination. Termination ends the right to use the Services but does not affect accrued payment obligations, completed transactions, ownership, confidentiality, liability, dispute or other provisions intended to survive.",
        },
        {
            type: "text",
            title: "Changes to These Terms",
            description: "Updates. QueTranslations may update these Terms to reflect service, legal or security changes. The current version and effective date will be published on the website. Material changes will apply prospectively and will be communicated through the website, Account or email where reasonably appropriate.",
        },
        {
            type: "text",
            title: "Governing Law and Disputes",
            description: "Informal resolution. Users should first send a written complaint to info@quetranslations.com so that QueTranslations can investigate and propose a resolution.",
        },
        {
            type: "text",
            description: "Governing law. These Terms are governed by Estonian law, without prejudice to mandatory consumer protection rules of the consumer’s country of habitual residence.",
        },
        {
            type: "text",
            description: "Consumer redress. Where eligible, a consumer may apply to the Estonian Consumer Disputes Committee after first submitting a complaint to QueTranslations. Information is available at https://ttja.ee/en/consumer-disputes-committee. Cross-border consumers may also seek assistance from the European Consumer Centre in their country.",
        },
        {
            type: "text",
            description: "Courts. Disputes not resolved informally or through an applicable consumer body may be brought before the competent courts determined by applicable law. Business disputes are subject to the courts of Estonia unless the parties agree otherwise in writing.",
        },
        {
            type: "text",
            description: "Contact details. Questions, notices, complaints, withdrawal requests and Balance refund requests may be sent to QUENTICS OÜ at info@quetranslations.com or by post to Rotermanni tn 6, Kesklinna linnaosa, 10111 Tallinn, Harju maakond, Estonia.",
        },
    ],
};

export default termsAndConditionsEn;
