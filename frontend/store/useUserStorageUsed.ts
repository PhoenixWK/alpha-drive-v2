
import { create } from "zustand";

type UserStorageUsedState = {
    userStorageUsed: UserStorageUsed | null,
    setUserStorageUsed: (newUserStorageUsed: UserStorageUsed | null) => void
}

export const useUserStorageUsed = create<UserStorageUsedState>((set, get) => ({
    userStorageUsed: null,
    setUserStorageUsed: (newUserStorageUsed: UserStorageUsed | null) => {
        set({ userStorageUsed: newUserStorageUsed });
    },
}));