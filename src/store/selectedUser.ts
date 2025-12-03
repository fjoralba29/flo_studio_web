import { create } from "zustand";

export type User = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    createdAt: string;
    // add any other fields you need
};

type SelectedUserState = {
    selectedUser: User | null;
    setSelectedUser: (user: User) => void;
    clearSelectedUser: () => void;
};

export const useSelectedUserStore = create<SelectedUserState>((set) => ({
    selectedUser: null,

    setSelectedUser: (user) => set({ selectedUser: user }),

    clearSelectedUser: () => set({ selectedUser: null }),
}));
