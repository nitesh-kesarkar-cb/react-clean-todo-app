import CryptoJS from "crypto-js";
import { CRYPTO_SECRET_KEY } from "../_constants/envDefaults";
const SECRET_KEY = CRYPTO_SECRET_KEY

export function encryptData<T>(data: T): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decryptData<T>(cipherText: string | null): T | null {
    if (!cipherText) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        const str = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(str) as T;
    } catch (e) {
        console.error("Decrypt failed", e);
        return null;
    }
}
