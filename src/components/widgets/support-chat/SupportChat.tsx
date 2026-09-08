"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

import { COMPANY_EMAIL, COMPANY_NAME } from "@/resources/constants";
import { useCookieConsent } from "@/context/CookieConsentContext";
import styles from "./SupportChat.module.scss";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

const GREETING: ChatMessage = {
    role: "assistant",
    content: `Hi — I'm the ${COMPANY_NAME} support assistant. Ask me about ordering a translation, pricing, delivery times, your Account Balance or refunds. For anything about a specific order I'll hand you over to a person.`,
};

export default function SupportChat() {
    const { isBannerVisible } = useCookieConsent();
    const [isOpen, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
    const [draft, setDraft] = useState("");
    const [isSending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, isSending]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    const send = useCallback(async () => {
        const text = draft.trim();
        if (!text || isSending) return;

        const next = [...messages, { role: "user" as const, content: text }];
        setMessages(next);
        setDraft("");
        setError(null);
        setSending(true);

        try {
            const res = await fetch("/api/support-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // The greeting is ours, not part of the conversation to answer.
                body: JSON.stringify({ messages: next.slice(1) }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data?.message ?? `Something went wrong. Please email ${COMPANY_EMAIL}.`);
                return;
            }

            setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } catch {
            setError(`We could not reach the assistant. Please email ${COMPANY_EMAIL}.`);
        } finally {
            setSending(false);
        }
    }, [draft, isSending, messages]);

    // The cookie notice owns the bottom of the screen until it is answered.
    if (isBannerVisible) return null;

    if (!isOpen) {
        return (
            <button
                type="button"
                className={styles.launcher}
                onClick={() => setOpen(true)}
                aria-label="Open support chat"
            >
                <FiMessageCircle aria-hidden="true" />
                <span>Support</span>
            </button>
        );
    }

    return (
        <div className={styles.panel} role="dialog" aria-modal="false" aria-label="Support chat">
            <div className={styles.head}>
                <div>
                    <strong>Support</strong>
                    <span>Answers about orders, pricing and delivery</span>
                </div>
                <button
                    type="button"
                    className={styles.close}
                    onClick={() => setOpen(false)}
                    aria-label="Close support chat"
                >
                    <FiX />
                </button>
            </div>

            <div className={styles.messages} ref={listRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.role === "user" ? styles.fromUser : styles.fromBot}
                    >
                        {message.content}
                    </div>
                ))}

                {isSending && <div className={styles.typing}>Typing…</div>}
                {error && <div className={styles.error}>{error}</div>}
            </div>

            <form
                className={styles.composer}
                onSubmit={(event) => {
                    event.preventDefault();
                    void send();
                }}
            >
                <textarea
                    ref={inputRef}
                    className={styles.input}
                    value={draft}
                    rows={1}
                    placeholder="Ask a question…"
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            void send();
                        }
                    }}
                />
                <button
                    type="submit"
                    className={styles.send}
                    disabled={isSending || !draft.trim()}
                    aria-label="Send message"
                >
                    <FiSend />
                </button>
            </form>

            <p className={styles.foot}>
                Automated assistant — never share card numbers or passwords here. To reach a
                person, email <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a> or use the{" "}
                <Link href="/contact-us">contact form</Link>.
            </p>
        </div>
    );
}
