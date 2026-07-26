import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { translationController } from "@/backend/controllers/translation.controller";

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (!user?.sub)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id)
            return NextResponse.json({ message: "Missing order id" }, { status: 400 });

        const result = await translationController.getOrder(user.sub, id);
        return NextResponse.json(result);
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
