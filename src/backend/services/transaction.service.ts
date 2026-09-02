import { connectDB } from "../config/db";
import { Transaction } from "@/backend/models/transaction.model";
import mongoose from "mongoose";

/** Extra receipt/consent details captured at checkout. */
export interface TransactionMeta {
    reference?: string;
    chargedCurrency?: string;
    chargedAmount?: number;
    netAmount?: number;
    vatAmount?: number;
    vatRate?: number;
    termsAcceptedAt?: Date;
    withdrawalWaiverAcceptedAt?: Date;
    billingDescriptor?: string;
    simulated?: boolean;
    orderId?: string;
    requestId?: string;
    tid?: string;
    status?: "pending" | "captured" | "failed" | "cancelled" | "refunded";
    paymentProvider?: string;
    failureMessage?: string;
}

export const transactionService = {
    async record(
        userId: mongoose.Types.ObjectId,
        email: string,
        amount: number,
        type: "add" | "spend",
        balanceAfter: number,
        meta: TransactionMeta = {}
    ) {
        await connectDB();
        const tx = await Transaction.create({
            userId,
            email,
            amount,
            type,
            balanceAfter,
            ...meta,
        });
        console.log("🧾 Transaction saved:", tx);
        return tx;
    },

    async findByOrderId(orderId: string) {
        await connectDB();
        return Transaction.findOne({ orderId });
    },

    async updateByOrderId(
        orderId: string,
        updates: Partial<TransactionMeta & { balanceAfter?: number; status?: string }>
    ) {
        await connectDB();
        return Transaction.findOneAndUpdate({ orderId }, { $set: updates }, { new: true });
    },
};
