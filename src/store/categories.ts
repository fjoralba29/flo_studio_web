import { create } from "zustand";
import { CategoryType } from "@prisma/client";

interface CategoryStore {
    selectedTypeId: number | null;
    setSelectedTypeId: (id: number) => void;
    resetSelectedTypeId: () => void;
    selectedType: CategoryType | null;
    setSelectedType: (type: CategoryType) => void;
    resetSelectedType: () => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    selectedTypeId: null,
    setSelectedTypeId: (id) => set({ selectedTypeId: id }),
    resetSelectedTypeId: () => set({ selectedTypeId: null }),
    selectedType: null,
    setSelectedType: (type) => set({ selectedType: type }),
    resetSelectedType: () => set({ selectedType: null }),
}));
