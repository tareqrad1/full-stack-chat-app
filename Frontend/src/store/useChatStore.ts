import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

const API_URL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

interface UserTypes {
  _id: string;
  fullname: string;
  email: string;
  profilePicture: string | null;
  createdAt: Date;
}

type MessagesType = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: Date;
}

interface ChatStoreType {
  messages: MessagesType[];
  users: UserTypes[];
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  selectedUser: UserTypes | null;
  getUsers: () => void;
  getMessages: (id: string) => void;
  setSelectedUser: (user: UserTypes | null) => void;
  addMessages: (id: string | undefined, text: string, image: string) => void;
  subscribeToMessage: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatStoreType>((set, get) => ({
  messages: [],
  users: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  selectedUser: null,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axios.get(`${API_URL}/message/users`);
      set({ isUsersLoading: false, users: response.data.users });
    } catch (error: unknown) {
      console.log(error);
      if (isAxiosError(error)) {
        if (error instanceof Error) {
          set({ isUsersLoading: false });
        }
      }
    }
  },
  getMessages: async (id) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axios.get(`${API_URL}/message/${id}`);
      set({ isMessagesLoading: false, messages: response?.data?.messages });
    } catch (error: unknown) {
      console.log(error);
      if (isAxiosError(error)) {
        if (error instanceof Error) {
          toast.error(error.response?.data.error);
          console.log(error.response?.data.error);
        }
      }
      set({ isMessagesLoading: false });
    }
  },
  addMessages: async (id, text, image) => {
    try {
      const response = await axios.post(`${API_URL}/message/send/${id}`, { text, image });
      const newMessage = response?.data?.newMessage;
      set((state) => ({ messages: [...state.messages, newMessage] }));
    } catch (error: unknown) {
      console.log(error);
      if (isAxiosError(error)) {
        if (error instanceof Error) {
          set({ isMessagesLoading: false });
          toast.error(error.response?.data.error);
          console.log(error.response?.data.error);
        }
      }
    }
  },
  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      // Check if message is valid before updating state
      if (newMessage && newMessage.text) {
        set({
          messages: [...get().messages, newMessage],
        });
      }
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));

