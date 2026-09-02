import crypto from "crypto";
import { ENV } from "../config/env";

export interface CreatePaymentPageParams {
    amount: number; // in cents (e.g. 2500 for 25.00)
    clientIp: string;
    email?: string;
    orderId: string;
    description?: string;
    returnUrl?: string;
    cancelUrl?: string;
    returnMethod?: "GET" | "POST";
    language?: "ENG" | "FRE" | "ITA" | "SPA" | "DEU";
    uid?: string;
    firstname?: string;
    lastname?: string;
}

export interface EasytransacPaymentPageResult {
    RequestId?: string;
    OperationType?: string;
    PaymentMethod?: string;
    Status?: string;
    Date?: string;
    DateSent?: string;
    Amount?: string;
    PageUrl?: string;
    Email?: string;
    Phone?: string;
    Live?: string;
    Language?: string;
}

export interface EasytransacStatusResult {
    RequestId?: string;
    Tid?: string;
    Uid?: string;
    OrderId?: string;
    Status?: "pending" | "captured" | "failed" | "authorized" | "refunded" | string;
    UserId?: number;
    CurrencySymbol?: string;
    Description?: string;
    Amount?: string;
    Message?: string;
    Date?: string;
    [key: string]: unknown;
}

export interface EasytransacApiResponse<T> {
    Code: number;
    Signature?: string;
    Result?: T;
    Error?: string;
    Message?: string;
}

/**
 * Calculates SHA1 signature according to Easytransac specifications:
 * 1. Parameters are converted to lowercase keys and sorted alphabetically.
 * 2. Values are concatenated with '$' delimiter.
 * 3. The private API key is appended at the end.
 * 4. The resulting string is hashed with SHA1.
 */
export function getEasytransacSignature(
    params: Record<string, unknown>,
    apiKey: string
): string {
    if (!params || typeof params !== "object") {
        return crypto
            .createHash("sha1")
            .update(String(params ?? "") + "$" + apiKey)
            .digest("hex");
    }

    let signature = "";
    const lowerKeysMap: Record<string, unknown> = {};

    for (const key of Object.keys(params)) {
        const val = params[key];
        if (val !== undefined && val !== null && val !== "") {
            lowerKeysMap[key.toLowerCase()] = val;
        }
    }

    const sortedKeys = Object.keys(lowerKeysMap).sort();

    for (const name of sortedKeys) {
        if (name === "signature") continue;
        const val = lowerKeysMap[name];

        if (typeof val === "object" && val !== null) {
            const subMap: Record<string, unknown> = {};
            for (const subK of Object.keys(val as Record<string, unknown>)) {
                const subVal = (val as Record<string, unknown>)[subK];
                if (subVal !== undefined && subVal !== null && subVal !== "") {
                    subMap[subK.toLowerCase()] = subVal;
                }
            }
            const subSortedKeys = Object.keys(subMap).sort();
            for (const subK of subSortedKeys) {
                signature += String(subMap[subK]) + "$";
            }
        } else {
            signature += String(val) + "$";
        }
    }

    signature += apiKey;

    return crypto.createHash("sha1").update(signature, "utf8").digest("hex");
}

const EASYTRANSAC_PAGE_URL = "https://www.easytransac.com/api/payment/page";
const EASYTRANSAC_STATUS_URL = "https://www.easytransac.com/api/payment/status";

export const easytransacService = {
    /**
     * Checks if a valid Easytransac API key is configured.
     */
    isConfigured(): boolean {
        const key = process.env.EASYTRANSAC_API_KEY || ENV.EASYTRANSAC_API_KEY;
        return Boolean(key && key !== "YOUR_EASYTRANSAC_API_KEY_HERE" && key.trim().length > 0);
    },

    /**
     * Creates a hosted payment page session via Easytransac API.
     */
    async createPaymentPage(
        params: CreatePaymentPageParams
    ): Promise<EasytransacApiResponse<EasytransacPaymentPageResult>> {
        const apiKey = (process.env.EASYTRANSAC_API_KEY || ENV.EASYTRANSAC_API_KEY).trim();

        const requestPayload: Record<string, unknown> = {
            Amount: Math.round(params.amount), // in cents
            ClientIP: params.clientIp,
            OrderId: params.orderId,
            ReturnMethod: params.returnMethod || "GET",
            Language: params.language || "ENG",
            Version: "easytransac-node",
        };

        if (params.email) requestPayload.Email = params.email;
        if (params.description) requestPayload.Description = params.description;
        if (params.returnUrl) requestPayload.ReturnUrl = params.returnUrl;
        if (params.cancelUrl) requestPayload.CancelUrl = params.cancelUrl;
        if (params.uid) requestPayload.Uid = params.uid;
        if (params.firstname) requestPayload.Firstname = params.firstname;
        if (params.lastname) requestPayload.Lastname = params.lastname;

        // Calculate signature
        const signature = getEasytransacSignature(requestPayload, apiKey);
        requestPayload.Signature = signature;

        // URL-encode body
        const formBody = new URLSearchParams();
        for (const [key, value] of Object.entries(requestPayload)) {
            if (value !== undefined && value !== null) {
                formBody.append(key, String(value));
            }
        }

        console.log("🚀 [Easytransac Request to /payment/page]", {
            url: EASYTRANSAC_PAGE_URL,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "EASYTRANSAC-API-KEY": apiKey,
            },
            payload: requestPayload,
            encodedBody: formBody.toString(),
        });

        const response = await fetch(EASYTRANSAC_PAGE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "EASYTRANSAC-API-KEY": apiKey,
            },
            body: formBody.toString(),
        });

        const rawText = await response.text();
        let data: EasytransacApiResponse<EasytransacPaymentPageResult>;
        try {
            data = JSON.parse(rawText);
        } catch {
            data = { Code: response.status, Error: rawText || "Non-JSON response from Easytransac" };
        }

        console.log("📥 [Easytransac Response from /payment/page]", {
            httpStatus: response.status,
            httpStatusText: response.statusText,
            data,
        });

        return data;
    },

    /**
     * Fetches payment status by OrderId or RequestId or Tid.
     */
    async getPaymentStatus(params: {
        orderId?: string;
        requestId?: string;
        tid?: string;
        language?: "ENG" | "FRE" | "ITA" | "SPA" | "DEU";
    }): Promise<EasytransacApiResponse<EasytransacStatusResult>> {
        const apiKey = (process.env.EASYTRANSAC_API_KEY || ENV.EASYTRANSAC_API_KEY).trim();

        const requestPayload: Record<string, unknown> = {
            Language: params.language || "ENG",
            Version: "easytransac-node",
        };

        if (params.orderId) requestPayload.OrderId = params.orderId;
        if (params.requestId) requestPayload.RequestId = params.requestId;
        if (params.tid) requestPayload.Tid = params.tid;

        const signature = getEasytransacSignature(requestPayload, apiKey);
        requestPayload.Signature = signature;

        const formBody = new URLSearchParams();
        for (const [key, value] of Object.entries(requestPayload)) {
            if (value !== undefined && value !== null) {
                formBody.append(key, String(value));
            }
        }

        console.log("🚀 [Easytransac Request to /payment/status]", {
            url: EASYTRANSAC_STATUS_URL,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "EASYTRANSAC-API-KEY": apiKey,
            },
            payload: requestPayload,
            encodedBody: formBody.toString(),
        });

        const response = await fetch(EASYTRANSAC_STATUS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "EASYTRANSAC-API-KEY": apiKey,
            },
            body: formBody.toString(),
        });

        const rawText = await response.text();
        let data: EasytransacApiResponse<EasytransacStatusResult>;
        try {
            data = JSON.parse(rawText);
        } catch {
            data = { Code: response.status, Error: rawText || "Non-JSON response from Easytransac" };
        }

        console.log("📥 [Easytransac Response from /payment/status]", {
            httpStatus: response.status,
            httpStatusText: response.statusText,
            data,
        });

        return data;
    },
};
