import crypto from "node:crypto"

const pepper = process.env.API_KEY_PEPPER

export const hashApiKey = (key: string) => {
    if (!pepper) throw new Error("Essencial variable missing")
    return crypto
        .createHmac("sha256", pepper)
        .update(key)
        .digest("hex");
}