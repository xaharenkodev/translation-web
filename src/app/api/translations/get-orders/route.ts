import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { translationController } from "@/backend/controllers/translation.controller";

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (!user?.sub)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const result = await translationController.getOrders(user.sub);
        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
