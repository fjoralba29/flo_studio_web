"use client";

import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import {
    useDeletePortfolioCategory,
    useDeleteSubcategory,
    useGetPortfolioCategories,
} from "@/src/apis/portfolioCategories";
import { usePortfolioCategoriesStore } from "@/src/store/portfolioCategories";

const AdminPortfolioCategorySubpanel = () => {
    const { data: portfolioCategories = [] } = useGetPortfolioCategories();

    const {
        setSelectedPortfolioCategoryName,
        setSelectedPortfolioCategoryId,
        selectedPortfolioCategoryId,
        selectedPortfolioCategoryName,
        setSelectedPortfolioSubCategoryId,
    } = usePortfolioCategoriesStore();

    const { mutate: deletePortfolioCategory } = useDeletePortfolioCategory();

    const handleDeleteCategory = (id: number) => {
        deletePortfolioCategory(id);
    };

    return (
        <div className='flex flex-col md:flex-row gap-5'>
            <div className='flex flex-col flex-1 p-2 md:p-5 gap-5 '>
                {/* Header */}
                <div className='flex bg-grey-light justify-center gap-4 p-4 rounded-lg overflow-x-auto'>
                    <Button
                        theme='primary'
                        className='whitespace-nowrap'
                    >
                        Categories
                    </Button>
                </div>

                {/* Service Cards */}
                <div className='flex flex-col gap-3 max-h-[40vh] md:max-h-[80vh] overflow-y-auto'>
                    {portfolioCategories?.map((category: any) => (
                        <div
                            key={category.id}
                            className='flex  md:flex-row gap-2 md:gap-5 w-full items-center'
                        >
                            <AdminCategoriesCard
                                title={category.name}
                                description={category.description}
                                image={category.primaryPhoto}
                                className={`w-full ${selectedPortfolioCategoryId === category.id && "!bg-[#f7f9fa] "} `}
                                onClick={() => {
                                    selectedPortfolioCategoryId === category.id
                                        ? (setSelectedPortfolioCategoryId(""),
                                          setSelectedPortfolioSubCategoryId(""))
                                        : (setSelectedPortfolioCategoryId(
                                              category.id,
                                          ),
                                          setSelectedPortfolioSubCategoryId(
                                              "",
                                          ));
                                    selectedPortfolioCategoryName ===
                                    category.name
                                        ? setSelectedPortfolioCategoryName("")
                                        : setSelectedPortfolioCategoryName(
                                              category.name,
                                          );
                                }}
                            />
                            <Button
                                theme='ghost'
                                onClick={() =>
                                    handleDeleteCategory(category.id)
                                }
                                className='md:self-start'
                            >
                                🗑️
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPortfolioCategorySubpanel;
