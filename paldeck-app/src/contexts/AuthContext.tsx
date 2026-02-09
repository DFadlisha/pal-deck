import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/pocketbaseService';

interface User {
    id: string;
    email?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check current session
        authService.getCurrentUser().then((currentUser) => {
            if (currentUser) {
                setUser({ id: currentUser.id, email: currentUser.email });
            }
            setLoading(false);
        });

        // Listen for auth changes
        const unsubscribe = authService.onAuthStateChange((record) => {
            if (record) {
                setUser({ id: record.id, email: record.email });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            if (typeof unsubscribe === 'function') unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        const { data, error } = await authService.signIn(email, password);
        if (data?.user) setUser(data.user);
        return { data, error };
    };

    const signUp = async (email: string, password: string) => {
        const { data, error } = await authService.signUp(email, password);
        if (data?.user) setUser(data.user);
        return { data, error };
    };

    const signOut = async () => {
        await authService.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
