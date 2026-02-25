import { create } from "zustand";

type CategoryType = "Wedding" | "Collaboration" | "Category";

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
