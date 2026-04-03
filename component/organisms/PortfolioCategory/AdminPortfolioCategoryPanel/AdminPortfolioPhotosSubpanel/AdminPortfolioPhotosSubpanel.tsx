"use client";

import Button from "@/component/atoms/Button/Button";
import {
    useGetPortfolioCategories,
    useGetPortfolioSubcategories,
} from "@/src/apis/portfolioCategories";
import { usePortfolioCategoriesStore } from "@/src/store/portfolioCategories";
import { toast } from "react-hot-toast";
import Gallery from "@/component/molecules/Gallery/Gallery";
import AddPortfolioPhotosModal from "../../AddPortfolioPhotosModal/AddPortfolioPhotosModal";
import { useEffect, useState } from "react";

const AdminPortfolioPhotosSubpanel = () => {
    const { data: portfolioCategories = [] } = useGetPortfolioCategories();
    const { data: subcategories } = useGetPortfolioSubcategories();

    const {
        selectedPortfolioCategoryId,
        selectedPortfolioSubCategoryId,
        setPortfolioPhotoModalOpen,
        selectedPortfolioSubcategoryPhotos,
    } = usePortfolioCategoriesStore();

    const [photos, setPhotos] = useState<any[]>([]);

    useEffect(() => {
        if (!selectedPortfolioCategoryId) {
            setPhotos([]);
            return;
        }

        const category = portfolioCategories.find(
            (c: any) => c.id === selectedPortfolioCategoryId,
        );

        if (!category) {
            setPhotos([]);
            return;
        }

        if (!selectedPortfolioSubCategoryId) {
            setPhotos(category.photos || []);
            return;
        }

        const subcategory = category.subcategories?.find(
            (s: any) => s.id === selectedPortfolioSubCategoryId,
        );

        setPhotos(subcategory?.photos || []);
    }, [
        selectedPortfolioCategoryId,
        selectedPortfolioSubCategoryId,
        portfolioCategories,
        subcategories,
    ]);

    return (
        <div className='flex flex-col md:flex-row gap-5 flex-1'>
            <div className='flex flex-col flex-3 p-2 md:p-5 gap-5 '>
                {/* Header */}
                <div className='flex bg-grey-light justify-center gap-4 p-4 rounded-lg overflow-x-auto'>
                    <Button
                        theme='primary'
                        className='whitespace-nowrap'
                    >
                        Photos
                    </Button>
                    <Button
                        theme='ghost'
                        className='whitespace-nowrap'
                        onClick={() => {
                            selectedPortfolioCategoryId
                                ? setPortfolioPhotoModalOpen(true)
                                : toast.error("Please select a category first");
                        }}
                        disabled={!selectedPortfolioCategoryId}
                    >
                        + Add Photos
                    </Button>
                </div>

                {/* Service Cards */}
                <div className='flex flex-col gap-3 max-h-[40vh] md:max-h-[80vh] overflow-y-auto'>
                    <Gallery images={photos} />
                </div>
            </div>

            <AddPortfolioPhotosModal />
        </div>
    );
};

export default AdminPortfolioPhotosSubpanel;
