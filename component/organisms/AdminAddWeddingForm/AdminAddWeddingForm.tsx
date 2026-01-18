import Button from "@/component/atoms/Button/Button";
import Container from "@/component/atoms/Container/Container";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import { servicesformSchema } from "@/lib/types/CreateServicesSchema";
import { useCreateService } from "@/src/apis/services";

const AdminWeddingForm = () => {
    const { mutate: createServiceMutation, isPending } = useCreateService();

    const handleSubmit = async (data: any) => {
        // await createServiceMutation({
        //     ...data,
        // });
    };

    return (
        <div className='justify-self-start p-5 flex flex-col gap-5'>
            <div className='section-subtitle'>Add Wedding</div>
            <Container isLoading={isPending}>
                <Form
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    schema={servicesformSchema}
                    className='flex flex-col gap-5'
                    resetOnSubmit
                >
                    {/* Responsive grid: 1 column on mobile, 2 on md+ */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <Input
                            name='name'
                            label='Name'
                            className='w-full'
                        />
                        <Input
                            name='description'
                            label='Description'
                            className='w-full'
                        />
                    </div>

                    <Button
                        type='submit'
                        className='mt-5 w-[150px] self-end'
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default AdminWeddingForm;
