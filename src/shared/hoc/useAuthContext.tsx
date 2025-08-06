import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import type { UserProfile } from '../../(common)/features/user/di/UserInterface';
import { useStorage } from './useStorageContext';

interface AuthContextType {
    user: UserProfile | null;
    getUserProfile: () => UserProfile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const storage = useStorage();
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const storedUser: UserProfile | null = storage.getItem('user-profile');
        if (storedUser) {
            setUser(storedUser);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]); // Only run on initial mount

    const getUserProfile = () => {
        const storedUser: UserProfile | null = storage.getItem('user-profile');
        // if (storedUser) {
        //     setUser(storedUser);
        // }
        return storedUser;
    };

    return (
        <AuthContext.Provider value={{ user, getUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
