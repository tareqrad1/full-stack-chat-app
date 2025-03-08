import axios, { isAxiosError } from 'axios';
import { create } from 'zustand';

const API_URL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

type User = {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
};
interface AuthState {
    user: null | User;
    isCheckingAuth: boolean;
    isLoading: boolean;
    error: null | string;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isCheckingAuth: true,
    isLoading: false,
    error: null,

    checkAuth: async() => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get(`${API_URL}/auth/me`);
            set({ user: response.data.user, isCheckingAuth: false});
        } catch (error: unknown) {
                if(isAxiosError(error)) {
                    if(error instanceof Error) {
                        console.log(error);
                        set({ isCheckingAuth: false, error: error?.response?.data.error });
                    }
                }
        }
    },
}));
