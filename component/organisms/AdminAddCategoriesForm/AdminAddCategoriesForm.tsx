import Button from "@/component/atoms/Button/Button";
import Dropzone from "@/component/atoms/Dropzone/Dropzone";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import Select from "@/component/atoms/Select/Select";
import { formSchema } from "@/lib/types/CreateCategoriesSchema";
import { useCreateCategory } from "@/src/apis/categories";
import { useUploadImage } from "@/src/apis/uploadImage";

const AdminAddCategoriesForm = () => {
    const uploadImageMutation = useUploadImage();
    const createCategoryMutation = useCreateCategory();

    const handleSubmit = async (data: any) => {
        console.log(data);
        const { primaryPhoto } = data;
        let imageUrl;
        if (primaryPhoto) {
            imageUrl = await uploadImageMutation.mutateAsync(primaryPhoto);
        }

        await createCategoryMutation.mutateAsync({
            ...data,
            primaryPhoto: imageUrl,
        });
    };
    return (
        <div className='justify-self-start p-5 flex flex-col gap-5'>
            <div className='section-subtitle'>
                Add Collaboration, Category or Services
            </div>
            <Form
                onSubmit={handleSubmit}
                defaultValues={{}}
                schema={formSchema}
                className='flex flex-col gap-5'
                resetOnSubmit
            >
                <div className='grid grid-cols-2 gap-5'>
                    <Select
                        name='type'
                        options={[
                            {
                                value: "Collaboration",
                                label: "Collaboration",
                            },
                            { value: "Category", label: "Category" },
                        ]}
                        label='Section'
                    />
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
                    <div className='flex flex-col gap-2'>
                        <h5>Image</h5>
                        <Dropzone
                            allowedFiles={"image"}
                            theme='secondary'
                            inputClassName='max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px]'
                            itemClassName='max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px]'
                            name='primaryPhoto'
                            outputType='base64'
                            multiSelect={false}
                        />
                    </div>
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

export default AdminAddCategoriesForm;
