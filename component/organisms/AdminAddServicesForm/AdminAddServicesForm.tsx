import Button from "@/component/atoms/Button/Button";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import { servicesformSchema } from "@/lib/types/CreateServicesSchema";
import { useCreateService } from "@/src/apis/services";

const AdminAddServicesForm = () => {
    const { mutate: createServiceMutation } = useCreateService();

    const handleSubmit = async (data: any) => {
        await createServiceMutation({
            ...data,
        });
    };
    return (
        <div className='justify-self-start p-5 flex flex-col gap-5'>
            <div className='section-subtitle'>Add Services</div>
            <Form
                onSubmit={handleSubmit}
                defaultValues={{}}
                schema={servicesformSchema}
                className='flex flex-col gap-5'
                resetOnSubmit
            >
                <div className='grid grid-cols-2 gap-5'>
                    <Input
                        name='name'
                        label='Name'
                        className='!w-[300px]'
                    />
                    <Input
                        name='description'
                        label='Description'
                        className='!w-[300px]'
                    />
                </div>
                <Button
                    type='submit'
                    className='mt-5 w-[150px] self-end'
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AdminAddServicesForm;
