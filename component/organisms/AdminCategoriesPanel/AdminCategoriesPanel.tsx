"use client";

import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import Gallery from "@/component/molecules/Gallery/Gallery";
import {
    useDeleteCategory,
    useGetCategories,
    useGetPhotosByCategoryID,
} from "@/src/apis/categories";
import { useCategoryStore } from "@/src/store/categories";
import { CategoryType } from "@prisma/client";
import AddCategoryPhotosModal from "../AddCategoryPhotosModal/AddCategoryPhotosModal";
import { useAddUserDataStore } from "@/src/store/addUserData";

const AdminCategoriesPanel = () => {
    const { selectedType, setSelectedType } = useCategoryStore();
    const setPhotoModalOpen = useAddUserDataStore((s) => s.setPhotoModalOpen);

    const { data: categories = [] } = useGetCategories();
    const setSelectedTypeId = useCategoryStore(
        (state) => state.setSelectedTypeId
    );
    const selectedTypeId = useCategoryStore((state) => state.selectedTypeId);

    const selectedCategories = categories.filter(
        (category: any) => category.type === selectedType
    );

    const mutateDeleteCategory = useDeleteCategory();

    const { data: photoData = [] } = useGetPhotosByCategoryID();
    const photoUrls =
        photoData?.photos?.length > 0
            ? photoData.photos?.map((item: any) => ({
                  url: item.url,
                  id: item.id,
              }))
            : [];

    const handleDeleteCategory = (categoryId: number) => {
        mutateDeleteCategory.mutate(categoryId);
    };

    const handleClick = (categoryId: number) => {
        setSelectedTypeId(categoryId);
    };

    return (
        <div className='flex flex-col flex-1 p-5 gap-5'>
            {/* Category type buttons */}
            <div className='flex overflow-x-auto gap-4 p-4 rounded-lg bg-grey-light scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
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

                {/* Photo gallery panel */}
                {selectedTypeId && (
                    <div className='flex flex-col w-full gap-3'>
                        <Button
                            theme='primary'
                            size='xs'
                            onClick={() => setPhotoModalOpen(true)}
                            className='self-end'
                        >
                            Add Photos
                        </Button>
                        <Gallery images={photoUrls} />
                    </div>
                )}

                <AddCategoryPhotosModal />
            </div>
        </div>
    );
};

export default AdminCategoriesPanel;
