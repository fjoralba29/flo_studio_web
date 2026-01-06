import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import Gallery from "@/component/molecules/Gallery/Gallery";
import {
    useDeleteCategory,
    useGetCategories,
    useGetCategoriesByType,
    useGetPhotosByCategoryID,
} from "@/src/apis/categories";
import { useCategoryStore } from "@/src/store/categories";
import { CategoryType } from "@prisma/client";

const AdminCategoriesPanel = () => {
    const { selectedType, setSelectedType } = useCategoryStore();

    const { data: categories = [] } = useGetCategories();
    const setSelectedTypeId = useCategoryStore(
        (state) => state.setSelectedTypeId
    );
    const selectedTypeId = useCategoryStore((state) => state.selectedTypeId);

    const selectedCategories = categories.filter(
        (category: any) => category.type === selectedType
    );

    const mutateDeleteCategory = useDeleteCategory();

    const {
        data: photoData = [],
        isLoading,
        error,
    } = useGetPhotosByCategoryID();

    const photoUrls =
        photoData?.photos?.length > 0
            ? photoData.photos?.map((item: any) => item.url)
            : [];

    const handleDeleteCategory = (categoryId: number) => {
        mutateDeleteCategory.mutate(categoryId);
    };

    const handleClick = (categoryId: number) => {
        console.log("Category clicked:", categoryId);
        setSelectedTypeId(categoryId);
    };

    return (
        <div className='flex flex-col flex-1 p-5'>
            <div className='flex bg-grey-light justify-center gap-[20px] p-[20px]  mx-[150px] rounded-lg'>
                {Object.values(CategoryType).map((type, index) => (
                    <Button
                        key={index}
                        theme={selectedType === type ? "primary" : "tertiary"}
                        className=''
                        onClick={() => setSelectedType(CategoryType[type])}
                    >
                        {type}
                    </Button>
                ))}
            </div>
            <div className='w-full flex justify-between '>
                <div className='w-full flex flex-col p-5 gap-5'>
                    {selectedCategories?.map((category: any, index: number) => (
                        <div className='flex gap-[5px] w-full'>
                            <AdminCategoriesCard
                                key={category.id}
                                title={category.name}
                                description={category.description}
                                image={category.primaryPhoto}
                                className={`w-full ${
                                    selectedTypeId === category.id
                                        ? "border-2 !border-white !bg-purple-50"
                                        : ""
                                } `}
                                onClick={() => handleClick(category.id)}
                            />
                            <Button
                                theme='ghost'
                                key={index}
                                onClick={() =>
                                    handleDeleteCategory(category.id)
                                }
                            >
                                🗑️
                            </Button>
                        </div>
                    ))}
                </div>
                <Gallery images={photoUrls} />
            </div>
        </div>
    );
};

export default AdminCategoriesPanel;
