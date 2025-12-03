import { create } from "zustand";
import { CategoryType } from "@prisma/client";

interface CategoryStore {
    selectedType: CategoryType | null;
    setSelectedType: (type: CategoryType) => void;
    resetSelectedType: () => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    selectedType: null,
    setSelectedType: (type) => set({ selectedType: type }),
    resetSelectedType: () => set({ selectedType: null }),
}));
