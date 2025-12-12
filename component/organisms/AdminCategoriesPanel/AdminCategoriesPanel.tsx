import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import {
    useDeleteCategory,
    useGetCategoriesByType,
} from "@/src/apis/categories";
import { useCategoryStore } from "@/src/store/categories";
import { CategoryType } from "@prisma/client";

const AdminCategoriesPanel = () => {
    const { selectedType, setSelectedType } = useCategoryStore();
    const { data: categories = [] } = useGetCategoriesByType(
        selectedType || CategoryType.Category
    );

    const mutateDeleteCategory = useDeleteCategory();

    const handleDeleteCategory = (categoryId: number) => {
        mutateDeleteCategory.mutate(categoryId);
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
            <div className='flex flex-col p-5 gap-5'>
                {categories?.map((category: any, index: number) => (
                    <div className='flex gap-[5px] w-full'>
                        <AdminCategoriesCard
                            key={category.id}
                            title={category.name}
                            description={category.description}
                            image={category.primaryPhoto}
                            className='w-full'
                        />
                        <Button
                            theme='ghost'
                            key={index}
                            onClick={() => handleDeleteCategory(category.id)}
                        >
                            🗑️
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCategoriesPanel;
