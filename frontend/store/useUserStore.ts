import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserState = {
    user: User | null;
    setUser: (newUser: User | null) => void;
    clearUser: () => void;
    isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>()((set, get) => ({
    user: null,
    setUser: (newUser: User | null) => {
        console.log('Setting user in store:', newUser?.id || 'null');
        set({ user: newUser });
    },
    clearUser: () => {
        console.log('Clearing user from store');
        set({ user: null });
    },
    isAuthenticated: () => {
        const state = get();
        return state.user !== null;
    }
}))