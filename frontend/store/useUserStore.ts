import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStoreState = {user: User | null}

type UserStoreActions = {
    setUser: (newUser: UserStoreState['user']) => void;
    clearUser: () => void;
}

type UserStore = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    setUser: (newUser) => set({user: newUser }),
    clearUser: () => set({ user: null })
}))