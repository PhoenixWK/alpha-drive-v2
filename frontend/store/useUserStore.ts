import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserState = {
    updateUserOwnedPlan: (user_id: string) => void;
    user: UserProfile| null;
    setUser: (newUser: User | null) => void;
    clearUser: () => void;
    isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>()((set, get) => ({
    user: null,
    setUser: (newUser: User | null) => {
        console.log('Setting user in store:', newUser?.id || 'null');
        set({ 
            user: {
                user_id: newUser?.id || '',
                email: newUser?.email || '',
                username: newUser?.user_metadata.username || '',
                role: 'user', // Default role, can be updated later
                created_at: newUser?.created_at || '',
                updated_at: newUser?.updated_at || '',
                profile_image_url: newUser?.user_metadata?.profile_image_url || '',
                owned_plan: ''
            }
        });
    },
    clearUser: () => {
        console.log('Clearing user from store');
        set({ user: null });
    },
    isAuthenticated: () => {
        const state = get();
        return state.user !== null;
    },
    updateUserOwnedPlan: (plan_id: string) => {
        const state = get();
        if(state.user) {
            set({ user: { ...state.user, owned_plan: plan_id } });
        }
    }
}))