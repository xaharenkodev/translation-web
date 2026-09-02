import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/backend/controllers/user.controller";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const orderId = url.searchParams.get("orderId");

        if (!orderId) {
            return NextResponse.json(
                { message: "Missing orderId parameter." },
                { status: 400 }
            );
        }

        const result = await userController.checkAndCompleteTopUp(orderId);
        return NextResponse.json(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error checking payment status.";
        return NextResponse.json({ message, status: "error" }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        let orderId: string | null = null;

        const contentType = req.headers.get("content-type") || "";
        if (contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await req.formData();
            orderId = (formData.get("OrderId") || formData.get("orderId")) as string | null;
        } else if (contentType.includes("application/json")) {
            const body = await req.json();
            orderId = body.OrderId || body.orderId;
        }

        if (!orderId) {
            const url = new URL(req.url);
            orderId = url.searchParams.get("orderId");
        }

        if (!orderId) {
            return NextResponse.json(
                { message: "Missing orderId in request." },
                { status: 400 }
            );
        }

        const result = await userController.checkAndCompleteTopUp(orderId);
        return NextResponse.json(result);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error handling payment notification.";
        return NextResponse.json({ message, status: "error" }, { status: 400 });
    }
}
