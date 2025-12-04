import { create } from "zustand";
import { Event, User } from "@prisma/client";

interface UserDataStore {
    selectedEvent: Event | null;
    setSelectedEvent: (event: Event) => void;
    resetSelectedEvent: () => void;

    isEventModalOpen: boolean;
    setEventModalOpen: (isOpen: boolean) => void;

    selectedPhotos:
        | string
        | string[]
        | File
        | File[]
        | ArrayBuffer
        | ArrayBuffer[]
        | undefined;
    setSelectedPhotos: (
        photos:
            | string
            | string[]
            | File
            | File[]
            | ArrayBuffer
            | ArrayBuffer[]
            | undefined
    ) => void;
    resetSelectedPhotos: () => void;

    isPhotoModalOpen: boolean;
    setPhotoModalOpen: (isOpen: boolean) => void;

    selectedUrls: string[];
    setSelectedUrls: (url: string) => void;
    resetSelectedUrls: () => void;

    isUrlsModalOpen: boolean;
    setUrlsModalOpen: (isOpen: boolean) => void;

    selectedUser: User | null;
    setSelectedUser: (user: User) => void;
    resetSelectedUser: () => void;
}

export const useAddUserDataStore = create<UserDataStore>((set) => ({
    selectedEvent: null,
    setSelectedEvent: (event) => set({ selectedEvent: event }),
    resetSelectedEvent: () => set({ selectedEvent: null }),
    isEventModalOpen: false,
    setEventModalOpen: (isOpen) => set({ isEventModalOpen: isOpen }),

    selectedPhotos: [],
    setSelectedPhotos: (photos) => set({ selectedPhotos: photos }),
    resetSelectedPhotos: () => set({ selectedPhotos: [] }),

    isPhotoModalOpen: false,
    setPhotoModalOpen: (isOpen) => set({ isPhotoModalOpen: isOpen }),

    selectedUrls: [],
    setSelectedUrls: (url) =>
        set((state) => ({
            selectedUrls: [...state.selectedUrls, url],
        })),

    resetSelectedUrls: () => set({ selectedUrls: [] }),

    isUrlsModalOpen: false,
    setUrlsModalOpen: (isOpen) => set({ isUrlsModalOpen: isOpen }),

    selectedUser: null,
    setSelectedUser: (user) => set({ selectedUser: user }),
    resetSelectedUser: () => set({ selectedUser: null }),
}));
