"use client";

import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import { useDeleteCategory, useGetCategories } from "@/src/apis/categories";
import { useCategoryStore } from "@/src/store/categories";
import AddCategoryPhotosModal from "../AddCategoryPhotosModal/AddCategoryPhotosModal";
import { useAddUserDataStore } from "@/src/store/addUserData";
export const CategoryType = {
    Collaboration: "Collaboration",
    Category: "Category",
} as const;

export type CategoryTypeValue =
    (typeof CategoryType)[keyof typeof CategoryType];

const AdminCategoriesPanel = () => {
    const { selectedType, setSelectedType } = useCategoryStore();
    const setPhotoModalOpen = useAddUserDataStore((s) => s.setPhotoModalOpen);

    const { data: categories = [] } = useGetCategories();
    const setSelectedTypeId = useCategoryStore(
        (state) => state.setSelectedTypeId,
    );
    const selectedTypeId = useCategoryStore((state) => state.selectedTypeId);

    const selectedCategories = categories.filter(
        (category: any) => category.type === selectedType,
    );

    const mutateDeleteCategory = useDeleteCategory();

    const handleDeleteCategory = (categoryId: number) => {
        mutateDeleteCategory.mutate(categoryId);
    };

    const handleClick = (categoryId: number) => {
        setSelectedTypeId(categoryId);
    };

    return (
        <div className='flex flex-col flex-1 p-5 gap-5'>
            {/* Category type buttons */}
            <div className='flex overflow-x-auto self-center gap-4 p-4 rounded-lg bg-grey-light scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
                {Object.values(CategoryType).map((type, index) => (
                    <Button
                        key={index}
                        theme={selectedType === type ? "primary" : "tertiary"}
                        onClick={() => setSelectedType(type)}
                        className='whitespace-nowrap flex-shrink-0'
                    >
                        {type}
                    </Button>
                ))}
            </div>

            {/* Main panel */}
            <div className='flex flex-col lg:flex-row gap-5 w-full'>
                {/* Categories list */}
                <div className='flex flex-col w-full gap-3'>
                    {selectedCategories?.map((category: any) => (
                        <div
                            key={category.id}
                            className='flex  sm:flex-row gap-2 sm:gap-5 items-center'
                        >
                            <AdminCategoriesCard
                                title={category.name}
                                description={category.description}
                                image={category.primaryPhoto}
                                className={`w-full ${
                                    selectedTypeId === category.id
                                        ? "border-2 !border-white !bg-purple-50"
                                        : ""
                                }`}
                                onClick={() => handleClick(category.id)}
                            />
                            <Button
                                theme='ghost'
                                onClick={() =>
                                    handleDeleteCategory(category.id)
                                }
                            >
                                🗑️
                            </Button>
                        </div>
                    ))}
                </div>

                <AddCategoryPhotosModal />
            </div>
        </div>
    );
};

export default AdminCategoriesPanel;
