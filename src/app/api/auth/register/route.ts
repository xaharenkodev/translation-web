import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/backend/controllers/auth.controller";
import { attachAuthCookies } from "@/backend/utils/cookies";
import { registrationGuard } from "@/backend/utils/registrationGuard";

export async function POST(req: NextRequest) {
    try {
        const blocked = await registrationGuard(req);
        if (blocked) return blocked;

        const body = await req.json();

        const { user, tokens } = await authController.register(body);

        const res = NextResponse.json({ user }, { status: 200 });
        attachAuthCookies(
            res,
            tokens.accessToken,
            tokens.refreshToken,
            60 * 60 * 24 * 30
        );
        return res;
    } catch (e: any) {
        console.error("REGISTER ERROR:", e);
        const msg = e?.message || "Registration error";
        const validationErrors = [
            "registered",
            "required",
            "invalid",
            "allowed",
            "match",
        ];
        const code = validationErrors.some((token) =>
            msg.toLowerCase().includes(token)
        )
            ? 400
            : 500;

        return NextResponse.json(
            { type: "RegisterError", message: msg },
            { status: code }
        );
    }
}
