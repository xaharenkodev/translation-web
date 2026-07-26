import { translationService, CreateTranslationOrderBody } from "../services/translation.service";
import { connectDB } from "../config/db";

export const translationController = {
    async createOrder(userId: string, email: string, body: CreateTranslationOrderBody) {
        await connectDB();
        const order = await translationService.createOrder(userId, email, body);
        return { order };
    },

    async getOrders(userId: string) {
        await connectDB();
        const orders = await translationService.getOrders(userId);
        return { orders };
    },

    async getOrder(userId: string, id: string) {
        await connectDB();
        const order = await translationService.getOrderById(userId, id);
        if (!order) throw new Error("Order not found");
        return { order };
    },
};
