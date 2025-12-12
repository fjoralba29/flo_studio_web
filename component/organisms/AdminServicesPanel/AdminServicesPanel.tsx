import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import { useDeleteService, useGetServices } from "@/src/apis/services";

const AdminServicesPanel = () => {
    const { data: services = [] } = useGetServices();
    const mutateDelete = useDeleteService();

    const handleDeleteService = (id: number) => {
        console.log(id);
        mutateDelete.mutate(id);
    };

    return (
        <div className='flex flex-col flex-1 p-5'>
            <div className='flex bg-grey-light justify-center gap-[20px] p-[20px]  mx-[150px] rounded-lg'>
                <Button
                    theme='primary'
                    className=''
                >
                    Services
                </Button>
            </div>
            <div className='flex flex-col p-5 gap-5'>
                {services?.map((category: any, key: number) => (
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
                            key={key}
                            onClick={() => handleDeleteService(category.id)}
                        >
                            🗑️
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminServicesPanel;
