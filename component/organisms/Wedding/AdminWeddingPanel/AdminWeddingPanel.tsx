import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import AdminWeddingCard from "@/component/atoms/AdminWeddingCard/AdminWeddingCard";
import Button from "@/component/atoms/Button/Button";
import { useDeleteService, useGetServices } from "@/src/apis/services";
import { useDeleteWedding, useWeddingPackages } from "@/src/apis/wedding";

const AdminWeddingPanel = () => {
    const { data: weddingPackages = [] } = useWeddingPackages();
    const { mutate: mutateDelete } = useDeleteWedding();

    const handleDeleteWedding = (id: number) => {
        mutateDelete(id);
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

            {/* Wedding Cards */}
            <div className='flex flex-col gap-3'>
                {weddingPackages &&
                    weddingPackages?.map((wedding: any) => (
                        <div
                            key={wedding.id}
                            className='flex  md:flex-row gap-2 md:gap-5 w-full items-center'
                        >
                            <AdminWeddingCard
                                title={wedding.name}
                                items={wedding.items}
                                className='w-full md:flex-1'
                            />
                            <Button
                                theme='ghost'
                                onClick={() => handleDeleteWedding(wedding.id)}
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
