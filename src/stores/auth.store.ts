import { create } from 'zustand';
import api from '../utils/api';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    login: (name: string, email: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    isLoading: true,
    error: null,
    setError: (error) => set({ error }),

    checkAuth: async () => {
        try {
            await api.get('/dogs/breeds', {
                _isAuthCheck: true
            });
            set({ isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({
                isAuthenticated: false, isLoading: false,
                // error: error instanceof Error ? error.message : 'Please Login'
            });
        }
    },

    login: async (name, email) => {
        try {
            set({ isLoading: true, error: null });
            await api.post('/auth/login', { name, email });
            set({ isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({
                isAuthenticated: false,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed'
            });
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            set({ isAuthenticated: false, isLoading: false });
        }
    }
}));