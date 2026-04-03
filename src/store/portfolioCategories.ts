import { create } from "zustand";

interface PortfolioCategoriesStore {
    selectedPortfolioCategoryId: string | undefined;
    setSelectedPortfolioCategoryId: (categoryId: string) => void;
    resetSelectedPortfolioCategoryId: () => void;

    selectedPortfolioCategoryName: string | undefined;
    setSelectedPortfolioCategoryName: (categoryName: string) => void;
    resetSelectedPortfolioCategoryName: () => void;

    selectedPortfolioSubCategoryId: string | undefined;
    setSelectedPortfolioSubCategoryId: (subcategoryId: string) => void;
    resetSelectedPortfolioSubCategoryId: () => void;

    selectedPortfolioSubCategoryName: string | undefined;
    setSelectedPortfolioSubCategoryName: (categoryName: string) => void;
    resetSelectedPortfolioSubCategoryName: () => void;

    isPortfolioSubcategoryModalOpen: boolean;
    setPortfolioSubcategoryModalOpen: (isOpen: boolean) => void;

    selectedPortfolioSubcategoryPhotos: string[];

    setSelectedPortfolioSubcategoryPhotos: (photos: string[]) => void;
    resetSelectedPortfolioSubcategoryPhotos: () => void;

    isPortfolioPhotoModalOpen: boolean;
    setPortfolioPhotoModalOpen: (isOpen: boolean) => void;
}

export const usePortfolioCategoriesStore = create<PortfolioCategoriesStore>(
    (set) => ({
        selectedPortfolioCategoryId: "",
        setSelectedPortfolioCategoryId: (categoryId: string) =>
            set({ selectedPortfolioCategoryId: categoryId }),
        resetSelectedPortfolioCategoryId: () =>
            set({ selectedPortfolioCategoryId: undefined }),

        selectedPortfolioCategoryName: "",
        setSelectedPortfolioCategoryName: (categoryName: string) =>
            set({ selectedPortfolioCategoryName: categoryName }),
        resetSelectedPortfolioCategoryName: () =>
            set({ selectedPortfolioCategoryName: undefined }),

        selectedPortfolioSubCategoryId: "",
        setSelectedPortfolioSubCategoryId: (subcategoryId: string) =>
            set({ selectedPortfolioSubCategoryId: subcategoryId }),
        resetSelectedPortfolioSubCategoryId: () =>
            set({ selectedPortfolioSubCategoryId: undefined }),

        selectedPortfolioSubCategoryName: "",
        setSelectedPortfolioSubCategoryName: (subcategoryName: string) =>
            set({ selectedPortfolioSubCategoryName: subcategoryName }),
        resetSelectedPortfolioSubCategoryName: () =>
            set({ selectedPortfolioSubCategoryName: undefined }),

        isPortfolioSubcategoryModalOpen: false,
        setPortfolioSubcategoryModalOpen: (isOpen: boolean) =>
            set({ isPortfolioSubcategoryModalOpen: isOpen }),

        selectedPortfolioSubcategoryPhotos: [],

        setSelectedPortfolioSubcategoryPhotos: (photos: string[]) =>
            set({ selectedPortfolioSubcategoryPhotos: photos }),
        resetSelectedPortfolioSubcategoryPhotos: () =>
            set({ selectedPortfolioSubcategoryPhotos: [] }),

        isPortfolioPhotoModalOpen: false,
        setPortfolioPhotoModalOpen: (isOpen: boolean) =>
            set({ isPortfolioPhotoModalOpen: isOpen }),
    }),
);
