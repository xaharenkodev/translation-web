import { NextResponse } from "next/server";

import {
    SupportChatMessage,
    supportChatService,
} from "@/backend/services/support-chat.service";
import { COMPANY_EMAIL } from "@/resources/constants";

/**
 * Simple per-IP throttle so an open, unauthenticated endpoint cannot be used to
 * run up the OpenAI bill. Process-local, which is enough for a widget that a
 * real customer uses a handful of times.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);

    if (hits.size > 5000) hits.clear();

    return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
    if (!supportChatService.isConfigured()) {
        return NextResponse.json(
            {
                error: "unavailable",
                message: `The assistant is unavailable right now. Please email ${COMPANY_EMAIL} and our team will help.`,
            },
            { status: 503 },
        );
    }

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            {
                error: "rate_limited",
                message: `That is a lot of questions at once. Please wait a moment, or email ${COMPANY_EMAIL}.`,
            },
            { status: 429 },
        );
    }

    let messages: SupportChatMessage[];
    try {
        const body = await req.json();
        messages = Array.isArray(body?.messages) ? body.messages : [];
    } catch {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    if (messages.length === 0) {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    try {
        const reply = await supportChatService.reply(messages);
        return NextResponse.json({ reply });
    } catch (error) {
        console.error("[support-chat]", error);
        return NextResponse.json(
            {
                error: "failed",
                message: `Something went wrong on our side. Please email ${COMPANY_EMAIL} and our team will help.`,
            },
            { status: 500 },
        );
    }
}
