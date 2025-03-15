import axios, { isAxiosError } from 'axios';
import { create } from 'zustand';
import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

export type User = {
    _id: string;
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
    socket: null | ReturnType<typeof io>;
    onlineUsers: string[];
    checkAuth: () => Promise<void>;
    signup: (fullname: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    signin: (email: string, password: string) => Promise<void>;
    signout: () => void;
    updateProfile: (fullname: string | undefined, email: string | undefined, profilePicture: string| undefined) => Promise<void>
    connectionSocket: () => void
    disconnectedSocket: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isCheckingAuth: true,
    isLoading: false,
    error: null,
    socket: null,
    onlineUsers: [],

    checkAuth: async() => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get(`${API_URL}/auth/me`);
            set({ user: response?.data?.user, isCheckingAuth: false});
            get().connectionSocket();
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error);
                set({ isCheckingAuth: false, user: null, error: null });
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
            set({ isLoading: false, error: null });
            return response?.data?.user;
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
            set({ isLoading: false, user: response?.data?.user, error: null });
            get().connectionSocket();
        } catch (error) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error.response?.data.error });
                    throw error;
                }
            }
        }
    },
    signout: async() => {
        set({ isLoading: true });
        try {
            await axios.post(`${API_URL}/auth/logout`);
            set({ user: null, isLoading: false });
            get().disconnectedSocket();
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
    updateProfile: async(fullname, email, profilePicture) => {
        set({ isLoading: true });
        try {
            const response = await axios.put(`${API_URL}/auth/update`, {
                fullname,
                email,
                profilePicture
            });
            set({ user: response?.data?.user, isLoading: false, error: null });
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
    connectionSocket: () => {
        const { user } = get();
        const socket = io(BASE_URL, {
            query: {
                userId: user?._id,
            }
        });
        if(!user || get().socket?.connected) return;
        socket.connect();
        set({ socket: socket });
        socket.on('getOnlineUsers', (userId) => {
            set({ onlineUsers: userId });
        });
    },
    disconnectedSocket: () => {
        if(get().socket?.connected) get().socket?.disconnect();
    },
}));
