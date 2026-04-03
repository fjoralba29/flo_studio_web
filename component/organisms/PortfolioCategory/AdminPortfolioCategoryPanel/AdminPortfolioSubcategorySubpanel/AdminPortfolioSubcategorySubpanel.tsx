"use client";

import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import {
    useDeleteSubcategory,
    useGetPortfolioCategories,
    useGetPortfolioSubcategories,
} from "@/src/apis/portfolioCategories";
import { usePortfolioCategoriesStore } from "@/src/store/portfolioCategories";
import { toast } from "react-hot-toast";
import AddSubcategoriesModal from "../../AddSubcategoriesModal/AddSubcategoriesModal";
import { EmptyState } from "@/component/atoms/Container/Container";
import { useEffect, useState } from "react";

const AdminPortfolioSubcategorySubpanel = () => {
    const { data: portfolioCategories = [] } = useGetPortfolioCategories();
    const { data: subcategories } = useGetPortfolioSubcategories();
    const [portfolioSubcategories, setPortfolioSubcategories] = useState([]);

    const {
        setPortfolioSubcategoryModalOpen,
        selectedPortfolioCategoryId,
        setSelectedPortfolioSubCategoryId,
        setSelectedPortfolioSubCategoryName,
        selectedPortfolioSubCategoryName,
        selectedPortfolioSubCategoryId,
        setSelectedPortfolioSubcategoryPhotos,
    } = usePortfolioCategoriesStore();
    console.log(subcategories, "subcat");

    useEffect(() => {
        if (!selectedPortfolioCategoryId) return;

        const filtered = subcategories.filter(
            (subcategory: any) =>
                subcategory.portfolioCategoryId === selectedPortfolioCategoryId,
        );

        setPortfolioSubcategories(filtered);
    }, [subcategories, selectedPortfolioCategoryId]);

    const { mutate: deleteSubcategory } = useDeleteSubcategory();

    const handleDeleteSubcategory = (id: number) => {
        deleteSubcategory(id);
    };

    return (
        <div className='flex flex-col md:flex-row gap-5'>
            <div className='flex flex-col flex-1  p-2 md:p-5 gap-5 '>
                {/* Header */}
                <div className='flex bg-grey-light justify-center gap-4 p-4 rounded-lg overflow-x-auto'>
                    <Button
                        theme='primary'
                        className='whitespace-nowrap'
                    >
                        Subcategories
                    </Button>

                    <Button
                        theme='ghost'
                        className='whitespace-nowrap'
                        onClick={() => {
                            selectedPortfolioCategoryId
                                ? setPortfolioSubcategoryModalOpen(true)
                                : toast.error("Please select a category first");
                        }}
                    >
                        + Add Subcategories
                    </Button>
                </div>

                {/* Service Cards */}
                <div className='flex flex-col gap-3 max-h-[40vh] md:max-h-[80vh] overflow-y-auto'>
                    {portfolioSubcategories?.length > 0 ? (
                        <>
                            {portfolioSubcategories?.map((subcategory: any) => (
                                <div
                                    key={subcategory.id}
                                    className='flex  md:flex-row gap-2 md:gap-5 w-full items-center'
                                >
                                    <AdminCategoriesCard
                                        title={subcategory.name}
                                        description={subcategory.description}
                                        image={subcategory.primaryPhoto}
                                        className={`w-full ${selectedPortfolioSubCategoryId === subcategory.id && "!bg-[#f7f9fa] "} `}
                                        onClick={() => {
                                            selectedPortfolioSubCategoryId ===
                                            subcategory.id
                                                ? setSelectedPortfolioSubCategoryId(
                                                      "",
                                                  )
                                                : (setSelectedPortfolioSubCategoryId(
                                                      subcategory.id,
                                                  ),
                                                  setSelectedPortfolioSubcategoryPhotos(
                                                      subcategory.photos,
                                                  ));
                                            selectedPortfolioSubCategoryName ===
                                            subcategory.name
                                                ? setSelectedPortfolioSubCategoryName(
                                                      "",
                                                  )
                                                : setSelectedPortfolioSubCategoryName(
                                                      subcategory.name,
                                                  );
                                        }}
                                    />
                                    <Button
                                        theme='ghost'
                                        onClick={() =>
                                            handleDeleteSubcategory(
                                                subcategory.id,
                                            )
                                        }
                                        className='md:self-start'
                                    >
                                        🗑️
                                    </Button>
                                </div>
                            ))}
                        </>
                    ) : (
                        <EmptyState title='No subcategories added yet' />
                    )}
                </div>
            </div>

            <AddSubcategoriesModal />
        </div>
    );
};

export default AdminPortfolioSubcategorySubpanel;
