import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import { useDeleteService, useGetServices } from "@/src/apis/services";

const AdminWeddingPanel = () => {
    const { data: services = [] } = useGetServices();
    const mutateDelete = useDeleteService();

    const handleDeleteService = (id: number) => {
        // mutateDelete.mutate(id);
    };

    return (
        <div className='flex flex-col flex-1 p-2 md:p-5 gap-5 max-h-[80vh] overflow-y-auto'>
            {/* Header */}
            <div className='flex bg-grey-light justify-center gap-4 p-4 rounded-lg overflow-x-auto'>
                <Button
                    theme='primary'
                    className='whitespace-nowrap'
                >
                    Weddings
                </Button>
            </div>

            {/* Service Cards */}
            <div className='flex flex-col gap-3'>
                {services?.map((service: any) => (
                    <div
                        key={service.id}
                        className='flex  md:flex-row gap-2 md:gap-5 w-full items-center'
                    >
                        <AdminCategoriesCard
                            title={service.name}
                            description={service.description}
                            image={service.primaryPhoto}
                            className='w-full md:flex-1'
                        />
                        <Button
                            theme='ghost'
                            onClick={() => handleDeleteService(service.id)}
                            className='md:self-start'
                        >
                            🗑️
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminWeddingPanel;
