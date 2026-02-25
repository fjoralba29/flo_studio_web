import { create } from "zustand";

type User = {
    name: string;
    id: number;
    email: string;
    phone: string | null;
    password: string;
    type: string;
    createdAt: Date;
};

interface UserDataStore {
    selectedEvent: string | undefined;
    selectedEventId: number | undefined;
    setSelectedEventId: (id: number) => void;
    resetSelectedEventId: () => void;
    setSelectedEvent: (event: string) => void;
    resetSelectedEvent: () => void;

    isEventModalOpen: boolean;
    setEventModalOpen: (isOpen: boolean) => void;

    selectedPhotos: string[];

    setSelectedPhotos: (photos: string[]) => void;
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
    selectedEvent: "",
    setSelectedEvent: (eventName) => set({ selectedEvent: eventName }),
    resetSelectedEvent: () => set({ selectedEvent: undefined }),
    selectedEventId: undefined,
    setSelectedEventId: (id) => set({ selectedEventId: id }),
    resetSelectedEventId: () => set({ selectedEventId: undefined }),
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
