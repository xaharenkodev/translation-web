"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import base from "@/components/widgets/manual-generator/ManualGenerator.module.scss";
import own from "./TranslationOrder.module.scss";

import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAllOrders } from "@/context/AllOrdersContext";
import { renderIcon } from "@/utils/renderIcon";

import {
    TRANSLATION_PLANS,
    TRANSLATION_LANGUAGES,
    TRANSLATION_SUBJECTS,
    MAX_SOURCE_CHARS,
    countWords,
    calcTranslationPrice,
    TranslationPlanId,
} from "@/data/translationConfig";

type SourceMode = "text" | "file";

export default function TranslationOrder() {
    const { showAlert } = useAlert();
    const user = useUser();
    const router = useRouter();
    const { sign, currency, convertFromBase } = useCurrency();
    const { refreshOrders } = useAllOrders();

    const [planType, setPlanType] = useState<TranslationPlanId>("ai");
    const [sourceLanguage, setSourceLanguage] = useState<string>("English");
    const [targetLanguage, setTargetLanguage] = useState<string>("Swedish");
    const [subject, setSubject] = useState<string>("general");
    const [notes, setNotes] = useState("");

    const [sourceMode, setSourceMode] = useState<SourceMode>("text");
    const [sourceText, setSourceText] = useState("");
    const [fileName, setFileName] = useState<string | null>(null);
    const [extracting, setExtracting] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const wordCount = useMemo(() => countWords(sourceText), [sourceText]);
    const totalAmount = useMemo(() => calcTranslationPrice(wordCount, planType), [wordCount, planType]);
    const plan = TRANSLATION_PLANS.find((p) => p.id === planType)!;

    const balance = user?.balance ?? 0;
    const insufficient = wordCount > 0 && totalAmount > balance;
    const sameLanguage = sourceLanguage === targetLanguage;

    const fmt = (amount: number) => `${sign}${convertFromBase(amount).toFixed(2)} ${currency}`;

    async function handleFile(file: File) {
        setExtracting(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await fetch("/api/translations/extract", {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Could not read this document");

            setSourceText(data.text);
            setFileName(data.fileName);
            showAlert("Document loaded", `${data.wordCount} words detected in ${data.fileName}`, "success");
        } catch (err: any) {
            showAlert("Error", err.message || "Could not read this document", "error");
        } finally {
            setExtracting(false);
        }
    }

    function clearFile() {
        setFileName(null);
        setSourceText("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    async function submit() {
        if (!user) {
            router.push("/sign-in");
            return;
        }
        if (sameLanguage) {
            showAlert("Check languages", "Source and target languages must differ.", "error");
            return;
        }
        if (!sourceText.trim()) {
            showAlert("Nothing to translate", "Paste text or upload a document first.", "error");
            return;
        }
        if (insufficient) {
            showAlert("Insufficient balance", "Please top up your Account Balance first.", "error");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/translations/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    planType,
                    sourceLanguage,
                    targetLanguage,
                    subject,
                    notes: notes.trim() || undefined,
                    sourceText,
                    fileName: fileName || undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Order failed");

            await refreshOrders();
            if (planType === "specialist") {
                showAlert(
                    "Order received",
                    "Your document was sent to a specialist. The finished translation will appear in your account within 12–24 hours.",
                    "success"
                );
            } else {
                showAlert("Translation ready", "Your AI translation is ready in your account.", "success");
            }
            router.push("/profile");
        } catch (err: any) {
            showAlert("Error", err.message || "Network or server issue", "error");
        } finally {
            setSubmitting(false);
        }
    }

    const summaryRows = [
        { k: "Service", v: plan.title },
        { k: "Languages", v: `${sourceLanguage} → ${targetLanguage}` },
        { k: "Subject", v: TRANSLATION_SUBJECTS.find((s) => s.id === subject)?.label ?? subject },
        { k: "Words", v: wordCount ? String(wordCount) : "—" },
        { k: "Delivery", v: plan.delivery },
    ];

    return (
        <div className={base.page}>
            <div className={base.container}>
                {/* HERO */}
                <div className={base.hero}>
                    <div className={base.heroText}>
                        <h1>Order a translation</h1>
                        <p>Choose a service level, set your language pair, add your text or document — and get an accurate translation charged directly from your Account Balance.</p>
                    </div>

                    <div className={base.heroSteps}>
                        <div className={base.stepPills}>
                            <span className={base.stepPill}>1</span>
                            <span className={base.stepPill}>2</span>
                            <span className={base.stepPill}>3</span>
                        </div>
                        <div className={base.stepTrail}>Service → Languages → Your text</div>
                    </div>
                </div>

                <div className={base.shell}>
                    <div className={base.main}>
                        {/* STEP 1 — PLAN */}
                        <section className={base.block}>
                            <div className={base.blockHeader}>
                                <div className={base.blockKicker}>STEP 1</div>
                                <div>
                                    <div className={base.blockTitle}>Choose your service level</div>
                                    <div className={base.blockSub}>AI is instant and affordable. Specialist adds professional review and premium formatting.</div>
                                </div>
                            </div>

                            <div className={base.heroCards}>
                                {TRANSLATION_PLANS.map((p) => {
                                    const active = planType === p.id;
                                    return (
                                        <button
                                            key={p.id}
                                            type="button"
                                            className={`${base.heroCard} ${active ? base.heroCardActive : ""}`}
                                            onClick={() => setPlanType(p.id)}
                                        >
                                            <div className={base.heroCardTop}>
                                                <div className={active ? base.iconBadge : base.iconBadgeSoft}>
                                                    {renderIcon(p.id === "ai" ? "speed" : "brain")}
                                                </div>
                                                <div className={base.heroCardMeta}>
                                                    <div className={base.heroCardRow}>
                                                        <div className={base.heroCardTitle}>{p.title}</div>
                                                        <span className={base.heroCardBadge}>{p.badge}</span>
                                                    </div>
                                                    <div className={base.heroCardDesc}>{p.description}</div>
                                                    <ul className={own.featureList}>
                                                        {p.features.map((f) => (
                                                            <li key={f}>{f}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className={base.heroCardBottom}>
                                                <div className={base.heroCardPrice}>
                                                    <span className={base.dot} />
                                                    <span className={base.heroCardTokens}>
                                                        {fmt(p.perWord)} / word · min {fmt(p.minimum)}
                                                    </span>
                                                </div>
                                                <div className={base.selectMark} aria-hidden>
                                                    <span className={active ? base.selectOn : base.selectOff} />
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* STEP 2 — LANGUAGES & SUBJECT */}
                        <section className={base.block}>
                            <div className={base.blockHeader}>
                                <div className={base.blockKicker}>STEP 2</div>
                                <div>
                                    <div className={base.blockTitle}>Languages & subject</div>
                                    <div className={base.blockSub}>Pick the language pair and the type of content so terminology stays accurate.</div>
                                </div>
                            </div>

                            <div className={own.langRow}>
                                <div>
                                    <div className={base.fieldTitle}>Translate from</div>
                                    <select
                                        className={own.langSelect}
                                        value={sourceLanguage}
                                        onChange={(e) => setSourceLanguage(e.target.value)}
                                    >
                                        {TRANSLATION_LANGUAGES.map((l) => (
                                            <option key={l} value={l}>{l}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    className={own.swapBtn}
                                    title="Swap languages"
                                    onClick={() => {
                                        setSourceLanguage(targetLanguage);
                                        setTargetLanguage(sourceLanguage);
                                    }}
                                >
                                    ⇄
                                </button>

                                <div>
                                    <div className={base.fieldTitle}>Translate to</div>
                                    <select
                                        className={own.langSelect}
                                        value={targetLanguage}
                                        onChange={(e) => setTargetLanguage(e.target.value)}
                                    >
                                        {TRANSLATION_LANGUAGES.map((l) => (
                                            <option key={l} value={l}>{l}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {sameLanguage && (
                                <div className={base.muted} style={{ color: "#dc2626", marginTop: "0.5rem" }}>
                                    Source and target languages must differ.
                                </div>
                            )}

                            <div className={base.fieldTitle} style={{ marginTop: "1.2rem" }}>Subject area</div>
                            <div className={base.goalGrid}>
                                {TRANSLATION_SUBJECTS.map((s) => {
                                    const active = subject === s.id;
                                    return (
                                        <button
                                            key={s.id}
                                            type="button"
                                            className={`${base.goalCard} ${active ? base.goalCardActive : ""}`}
                                            onClick={() => setSubject(s.id)}
                                        >
                                            <div className={base.goalMeta}>
                                                <div className={base.goalTitle}>{s.label}</div>
                                                <div className={base.goalSub}>{s.sub}</div>
                                            </div>
                                            <div className={base.goalCheck}>
                                                <span className={active ? base.selectOn : base.selectOff} />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className={base.fieldTitle}>Special instructions (optional)</div>
                            <div className={base.inputWrap}>
                                <input
                                    className={base.input}
                                    value={notes}
                                    maxLength={500}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="e.g. keep brand names in English, formal tone, British spelling..."
                                />
                            </div>
                        </section>

                        {/* STEP 3 — CONTENT */}
                        <section className={base.block}>
                            <div className={base.blockHeader}>
                                <div className={base.blockKicker}>STEP 3</div>
                                <div>
                                    <div className={base.blockTitle}>Your text or document</div>
                                    <div className={base.blockSub}>Paste text directly or upload a document (.pdf, .docx, .txt). The price is based on word count.</div>
                                </div>
                            </div>

                            <div className={own.sourceTabs}>
                                <button
                                    type="button"
                                    className={`${own.sourceTab} ${sourceMode === "text" ? own.sourceTabActive : ""}`}
                                    onClick={() => setSourceMode("text")}
                                >
                                    Paste text
                                </button>
                                <button
                                    type="button"
                                    className={`${own.sourceTab} ${sourceMode === "file" ? own.sourceTabActive : ""}`}
                                    onClick={() => setSourceMode("file")}
                                >
                                    Upload document
                                </button>
                            </div>

                            {sourceMode === "text" ? (
                                <>
                                    <textarea
                                        className={own.textarea}
                                        value={sourceText}
                                        maxLength={MAX_SOURCE_CHARS}
                                        onChange={(e) => {
                                            setSourceText(e.target.value);
                                            setFileName(null);
                                        }}
                                        placeholder="Paste the text you want translated..."
                                    />
                                    <div className={own.wordMeter}>
                                        <span>{wordCount} words</span>
                                        <span>{sourceText.length.toLocaleString()} / {MAX_SOURCE_CHARS.toLocaleString()} characters</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".txt,.md,.pdf,.docx"
                                        hidden
                                        onChange={(e) => {
                                            const f = e.target.files?.[0];
                                            if (f) void handleFile(f);
                                        }}
                                    />
                                    {fileName ? (
                                        <div className={`${own.uploadBox} ${own.uploadBoxActive}`}>
                                            <span className={own.fileChip}>
                                                📄 {fileName} · {wordCount} words
                                                <button type="button" className={own.fileChipRemove} onClick={clearFile} title="Remove file">✕</button>
                                            </span>
                                            <span className={own.uploadHint}>The document text was extracted and is ready to translate.</span>
                                        </div>
                                    ) : (
                                        <div
                                            className={own.uploadBox}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => fileInputRef.current?.click()}
                                            onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const f = e.dataTransfer.files?.[0];
                                                if (f) void handleFile(f);
                                            }}
                                        >
                                            <span className={own.uploadIcon}>{extracting ? "⏳" : "📎"}</span>
                                            <span className={own.uploadTitle}>
                                                {extracting ? "Reading your document..." : "Click to upload or drag & drop"}
                                            </span>
                                            <span className={own.uploadHint}>PDF, DOCX, TXT — up to 15 MB</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </section>

                        <div className={base.bottomNote}>
                            <span>🔒 Secure & confidential</span>
                            <span>🌍 {TRANSLATION_LANGUAGES.length}+ languages</span>
                            <span>💳 Paid from your Account Balance</span>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <aside className={base.sidebar}>
                        <div className={base.summaryCard}>
                            <div className={base.summaryTop}>
                                <div>
                                    <div className={base.summaryLabel}>Order total</div>
                                    <div className={base.summaryCost}>
                                        <span className={base.dotBig} />
                                        <span className={base.summaryCostNum}>
                                            {sign}{convertFromBase(totalAmount).toFixed(2)}
                                        </span>
                                        <span className={base.summaryCostUnit}>{currency}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className={base.ctaButton}
                                    disabled={submitting || extracting || !wordCount || sameLanguage || insufficient}
                                    onClick={() => void submit()}
                                >
                                    {submitting ? "Translating..." : "Order Translation"}
                                </button>
                            </div>

                            <div className={base.summaryDivider} />

                            <div className={base.summaryList}>
                                {summaryRows.map((r) => (
                                    <div key={r.k} className={base.summaryRow}>
                                        <div className={base.summaryKey}>{r.k}</div>
                                        <div className={base.summaryVal}>{r.v}</div>
                                    </div>
                                ))}
                            </div>

                            <div className={base.summaryDivider} />

                            {user ? (
                                <div className={`${own.balanceRow} ${insufficient ? own.balanceLow : ""}`}>
                                    <span>Balance: <strong>{fmt(balance)}</strong></span>
                                    {insufficient && (
                                        <Link href="/pricing" className={own.topUpLink}>Top up</Link>
                                    )}
                                </div>
                            ) : (
                                <div className={own.balanceRow}>
                                    <span><Link href="/sign-in" className={own.topUpLink}>Sign in</Link> to place an order</span>
                                </div>
                            )}

                            {wordCount > 0 && totalAmount === plan.minimum && wordCount * plan.perWord < plan.minimum && (
                                <div className={base.muted} style={{ marginTop: "0.6rem" }}>
                                    A minimum order charge of {fmt(plan.minimum)} applies to short texts.
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

                {/* MOBILE FOOTER */}
                <div className={base.mobileFooter}>
                    <div className={base.mobileCost}>
                        <span className={base.dotBig} />
                        <span className={base.mobileCostNum}>{sign}{convertFromBase(totalAmount).toFixed(2)}</span>
                        <span className={base.mobileCostUnit}>{currency}</span>
                    </div>
                    <button
                        type="button"
                        className={base.mobileCTA}
                        disabled={submitting || extracting || !wordCount || sameLanguage || insufficient}
                        onClick={() => void submit()}
                    >
                        {submitting ? "Translating..." : "Order Translation"}
                    </button>
                </div>
            </div>
        </div>
    );
}
