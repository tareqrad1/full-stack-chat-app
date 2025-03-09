import axios, { isAxiosError } from 'axios';
import { create } from 'zustand';

const API_URL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

type User = {
    fullname: string;
    email: string;
    password: string;
    profilePicture: string;
};
interface AuthState {
    user: null | User;
    isCheckingAuth: boolean;
    isLoading: boolean;
    error: null | string;
    checkAuth: () => void;
    signup: (fullname: string, email: string, password: string, confirmPassword: string) => void;
    signin: (email: string, password: string) => void;
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
            set({ user: response.data?.user, isCheckingAuth: false});
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error);
                set({ isCheckingAuth: false, error: null });
                throw error;
            }
            
        }
    },
    signup: async(fullname, email, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {
                fullname,
                email,
                password,
                confirmPassword,
            });
            set({ isLoading: false, user: response?.data, error: null });
        } catch (error: unknown) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error.response?.data.error });
                    throw error;
                }
            }
        }
    },
    signin: async(email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            set({ isLoading: false, user: response?.data, error: null });
        } catch (error) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error.response?.data.error });
                    throw error;
                }
            }
        }
    }
}));
