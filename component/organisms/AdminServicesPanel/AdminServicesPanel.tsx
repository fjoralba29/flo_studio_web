import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import Button from "@/component/atoms/Button/Button";
import { useGetServices } from "@/src/apis/services";

const AdminServicesPanel = () => {
    const { data: services = [] } = useGetServices();

    return (
        <div className='flex flex-col flex-1 p-5'>
            <div className='flex bg-grey-light justify-center gap-[20px] p-[20px]  mx-[150px] rounded-lg'>
                <Button
                    theme='tertiary'
                    className=''
                >
                    Services
                </Button>
            </div>
            <div className='flex flex-col p-5 gap-5'>
                {services?.map((category: any) => (
                    <AdminCategoriesCard
                        key={category.id}
                        title={category.name}
                        description={category.description}
                        image={category.primaryPhoto}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminServicesPanel;
