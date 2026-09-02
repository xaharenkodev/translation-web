import { connectDB } from "../config/db";
import { userService } from "../services/user.service";
import { IUserSchema, UserType } from "@/backend/types/user.types";
import { transactionService, TransactionMeta } from "@/backend/services/transaction.service";
import { emailService } from "@/backend/services/email.service";
import {
    formatMoney,
    legacyTokensToBalance,
    roundMoney,
    convertToBaseCurrency,
    isSupportedCurrency,
    SupportedCurrency,
} from "@/utils/money";
import { easytransacService } from "../services/easytransac.service";
import { ENV } from "../config/env";
import { COMPANY_NAME } from "@/resources/constants";

export const userController = {
    async topUpBalance(
        userId: string,
        amount: number,
        options?: { simulated?: boolean; meta?: TransactionMeta }
    ): Promise<UserType> {
        await connectDB();

        const user = await userService.addBalance(userId, amount);

        console.log("💳 Adding balance for user:", userId);
        await transactionService.record(user._id, user.email, amount, "add", user.balance, options?.meta);
        console.log("✅ Transaction created successfully");

        try {
            await emailService.sendOrderConfirmationEmail({
                email: user.email,
                firstName: user.firstName,
                subject: options?.simulated ? "Balance top-up test confirmation" : "Balance top-up confirmation",
                summaryTitle: options?.simulated ? "Simulated payment summary" : "Payment summary",
                summaryLines: [
                    `Order: Balance top-up`,
                    ...(options?.meta?.reference ? [`Receipt number: ${options.meta.reference}`] : []),
                    `Amount added: ${formatMoney(amount)}`,
                    `Wallet balance after payment: ${formatMoney(user.balance)}`,
                    ...(options?.meta?.billingDescriptor
                        ? [`Card statement descriptor: ${options.meta.billingDescriptor}`]
                        : []),
                ],
                amountLabel: "Top-up amount",
                amountValue: formatMoney(amount),
                amountNumeric: amount,
                transactionDate: new Date(),
            });
        } catch (error) {
            console.error("❌ Balance top-up email failed:", {
                userId,
                email: user.email,
                amount,
                error,
            });
        }

        return formatUser(user);
    },

    async initiateTopUp(
        userId: string,
        chargedAmount: number,
        chargedCurrency: string,
        clientIp: string,
        meta: TransactionMeta = {}
    ): Promise<{ pageUrl: string; orderId: string; simulated?: boolean }> {
        await connectDB();
        const user = await userService.getUserById(userId);
        if (!user) throw new Error("User not found");

        const validCurrency: SupportedCurrency = isSupportedCurrency(chargedCurrency)
            ? chargedCurrency
            : "GBP";
        const baseAmount = convertToBaseCurrency(chargedAmount, validCurrency);
        const orderId = `ET_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        const now = new Date();

        const isConfigured = easytransacService.isConfigured();

        // If not configured and in test mode, support simulated hosted checkout
        if (!isConfigured) {
            await transactionService.record(
                user._id,
                user.email,
                baseAmount,
                "add",
                user.balance || 0,
                {
                    ...meta,
                    orderId,
                    status: "pending",
                    paymentProvider: "easytransac_simulated",
                    simulated: true,
                    reference: meta.reference || `ET-${now.getTime().toString(36).toUpperCase()}`,
                }
            );

            return {
                pageUrl: `/processing?orderId=${encodeURIComponent(orderId)}&simulated=1`,
                orderId,
                simulated: true,
            };
        }

        // Live Easytransac configuration
        const returnUrl = `${ENV.APP_URL}/processing?orderId=${encodeURIComponent(orderId)}`;
        const cancelUrl = `${ENV.APP_URL}/checkout?cancelled=1`;

        // Easytransac expects amount in cents
        const amountInCents = Math.round(chargedAmount * 100);

        const etResponse = await easytransacService.createPaymentPage({
            amount: amountInCents,
            clientIp: clientIp || "127.0.0.1",
            email: user.email,
            orderId,
            description: `${COMPANY_NAME || "Que Translations"} - Wallet Top-Up (${chargedAmount.toFixed(2)} ${chargedCurrency})`,
            returnUrl,
            cancelUrl,
            returnMethod: "GET",
            uid: user._id.toString(),
            firstname: user.firstName,
            lastname: user.lastName,
            language: "ENG",
        });

        if (etResponse.Code !== 0 || !etResponse.Result?.PageUrl) {
            const errorMsg =
                etResponse.Error ||
                etResponse.Message ||
                `Easytransac error code ${etResponse.Code}`;
            throw new Error(`Failed to create payment session: ${errorMsg}`);
        }

        await transactionService.record(
            user._id,
            user.email,
            baseAmount,
            "add",
            user.balance || 0,
            {
                ...meta,
                orderId,
                requestId: etResponse.Result.RequestId,
                status: "pending",
                paymentProvider: "easytransac",
                simulated: false,
                reference: meta.reference || `ET-${now.getTime().toString(36).toUpperCase()}`,
            }
        );

        return {
            pageUrl: etResponse.Result.PageUrl,
            orderId,
            simulated: false,
        };
    },

    async checkAndCompleteTopUp(orderId: string): Promise<{
        status: "pending" | "captured" | "failed" | "cancelled" | string;
        orderId: string;
        amount?: number;
        currency?: string;
        message?: string;
        user?: UserType;
    }> {
        await connectDB();
        const tx = await transactionService.findByOrderId(orderId);
        if (!tx) {
            throw new Error("Transaction not found");
        }

        const user = await userService.getUserById(tx.userId.toString());
        if (!user) {
            throw new Error("User not found");
        }

        // If already captured, return success immediately
        if (tx.status === "captured") {
            return {
                status: "captured",
                orderId: tx.orderId!,
                amount: tx.chargedAmount || tx.amount,
                currency: tx.chargedCurrency || "GBP",
                message: "Payment confirmed successfully.",
                user: formatUser(user),
            };
        }

        // If already in a terminal failed state
        if (tx.status === "failed" || tx.status === "cancelled") {
            return {
                status: tx.status,
                orderId: tx.orderId!,
                message: tx.failureMessage || "Payment failed or was cancelled.",
            };
        }

        // Simulated payment check
        if (tx.simulated) {
            const updatedUser = await userService.addBalance(user._id.toString(), tx.amount);

            tx.status = "captured";
            tx.balanceAfter = updatedUser.balance;
            await tx.save();

            try {
                await emailService.sendOrderConfirmationEmail({
                    email: user.email,
                    firstName: user.firstName,
                    subject: "Balance top-up test confirmation",
                    summaryTitle: "Simulated payment summary",
                    summaryLines: [
                        `Order: Balance top-up`,
                        ...(tx.reference ? [`Receipt number: ${tx.reference}`] : []),
                        `Amount added: ${formatMoney(tx.amount)}`,
                        `Wallet balance after payment: ${formatMoney(updatedUser.balance)}`,
                    ],
                    amountLabel: "Top-up amount",
                    amountValue: formatMoney(tx.amount),
                    amountNumeric: tx.amount,
                    transactionDate: new Date(),
                });
            } catch (err) {
                console.error("❌ Email sending failed:", err);
            }

            return {
                status: "captured",
                orderId: tx.orderId!,
                amount: tx.chargedAmount || tx.amount,
                currency: tx.chargedCurrency || "GBP",
                message: "Test payment captured successfully.",
                user: formatUser(updatedUser),
            };
        }

        // Real Easytransac status polling
        if (easytransacService.isConfigured()) {
            const etStatusRes = await easytransacService.getPaymentStatus({
                orderId: tx.orderId,
                requestId: tx.requestId,
            });

            const etStatus = etStatusRes.Result;
            const currentStatus = etStatus?.Status;

            if (currentStatus === "captured") {
                const updatedUser = await userService.addBalance(user._id.toString(), tx.amount);

                tx.status = "captured";
                tx.balanceAfter = updatedUser.balance;
                if (etStatus?.Tid) tx.tid = String(etStatus.Tid);
                if (etStatus?.RequestId) tx.requestId = String(etStatus.RequestId);
                await tx.save();

                try {
                    await emailService.sendOrderConfirmationEmail({
                        email: user.email,
                        firstName: user.firstName,
                        subject: "Balance top-up confirmation",
                        summaryTitle: "Payment summary",
                        summaryLines: [
                            `Order: Balance top-up`,
                            ...(tx.reference ? [`Receipt number: ${tx.reference}`] : []),
                            `Amount added: ${formatMoney(tx.amount)}`,
                            `Wallet balance after payment: ${formatMoney(user.balance)}`,
                            ...(tx.billingDescriptor
                                ? [`Card statement descriptor: ${tx.billingDescriptor}`]
                                : []),
                        ],
                        amountLabel: "Top-up amount",
                        amountValue: formatMoney(tx.amount),
                        amountNumeric: tx.amount,
                        transactionDate: new Date(),
                    });
                } catch (err) {
                    console.error("❌ Email sending failed:", err);
                }

                return {
                    status: "captured",
                    orderId: tx.orderId!,
                    amount: tx.chargedAmount || tx.amount,
                    currency: tx.chargedCurrency || "GBP",
                    message: "Payment captured successfully.",
                    user: formatUser(user),
                };
            } else if (
                currentStatus === "failed" ||
                currentStatus === "cancelled" ||
                currentStatus === "expired"
            ) {
                tx.status = currentStatus === "failed" ? "failed" : "cancelled";
                tx.failureMessage = etStatus?.Message || "Payment was not completed.";
                await tx.save();

                return {
                    status: tx.status,
                    orderId: tx.orderId!,
                    message: tx.failureMessage,
                };
            }

            return {
                status: "pending",
                orderId: tx.orderId!,
                message: "Payment is pending authorization.",
            };
        }

        return {
            status: tx.status || "pending",
            orderId: tx.orderId!,
        };
    },

    async spendBalance(userId: string, amount: number): Promise<UserType> {
        await connectDB();

        const user = await userService.getUserById(userId);
        if (!user) throw new Error("User not found");
        if ((user.balance || 0) < amount) throw new Error("Not enough balance");

        user.balance = roundMoney(user.balance - amount);
        await user.save();

        await transactionService.record(user._id, user.email, amount, "spend", user.balance);

        return formatUser(user);
    },
};

function formatUser(user: IUserSchema): UserType {
    return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Documents created before the field rename still carry the legacy names.
        phoneNumber: user.phoneNumber || user.phone || "",
        phone: user.phoneNumber || user.phone || "",
        dateOfBirth: user.dateOfBirth || user.birthDate,
        birthDate: user.dateOfBirth || user.birthDate,
        address: {
            street: user.address?.street,
            city: user.address?.city,
            country: user.address?.country,
            postCode: user.address?.postCode || user.address?.zip || "",
            zip: user.address?.postCode || user.address?.zip || "",
        },
        role: user.role,
        balance: typeof user.balance === "number" ? user.balance : legacyTokensToBalance(user.tokens || 0),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
