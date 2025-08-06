import { createContext, useContext, useState, type ReactNode, useCallback } from "react";
import { decryptData, encryptData } from "../_utils/crypto";

type StorageContextType = {
    getItem<T>(key: string): T | null;
    setItem<T>(key: string, value: T): void;
};

const StorageContext = createContext<StorageContextType>({
    getItem: () => null,
    setItem: () => { },
});

export const StorageProvider = ({ children }: { children: ReactNode }) => {
    const getItem = <T,>(key: string): T | null => {
        const cipher = localStorage.getItem(key);
        const decrypted = decryptData<string | null>(cipher);
        if (decrypted === null) return null;
        try {
            return JSON.parse(decrypted) as T;
        } catch {
            // If not JSON, return as is
            return decrypted as unknown as T;
        }
    };

    const setItem = <T,>(key: string, value: T) => {
        let toStore: string;
        if (typeof value === "object" && value !== null) {
            toStore = JSON.stringify(value);
        } else {
            toStore = String(value);
        }
        const cipher = encryptData(toStore);
        localStorage.setItem(key, cipher);
    };

    return (
        <StorageContext.Provider value={{ getItem, setItem }}>
            {children}
        </StorageContext.Provider>
    );
};

export function useEncryptedLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (val: T) => void] {
    const { getItem, setItem } = useContext(StorageContext);

    const [state, setState] = useState<T>(() => {
        const decrypted = getItem<T>(key);
        return decrypted !== null ? decrypted : initialValue;
    });

    const setEncrypted = useCallback((newValue: T) => {
        setItem<T>(key, newValue);
        setState(newValue);
    }, [key, setItem]);

    return [state, setEncrypted];
}

export function useStorage() {
    return useContext(StorageContext);
}
