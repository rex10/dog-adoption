import { create } from 'zustand';
import api from '../utils/api';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (name: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    setError: (error: string | null) => void;
}

const LOCAL_STORAGE_KEY = 'isAuthenticated';

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: localStorage.getItem(LOCAL_STORAGE_KEY) === 'true',
    isLoading: false,
    error: null,
    setError: (error) => set({ error }),

    login: async (name, email) => {
        set({ isLoading: true, error: null });
        try {
            set({ isLoading: true, error: null });
            await api.post('/auth/login', { name, email });
            localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
            set({ isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({
                isAuthenticated: false,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed'
            });
        } finally {
            set({ isLoading: false })
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await api.post('/auth/logout');
        }catch (error) {
            set({
                isAuthenticated: false,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Logout failed'
            });
        } finally {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            set({ isAuthenticated: false, isLoading: false });
        }
    }
}));