"use client";

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
    const { mutate: createCategory } = useCreateCategory();

    const handleSubmit = async (data: any) => {
        const { primaryPhoto, photos, ...rest } = data;

        let primaryPhotoUrl: string | undefined;
        let photoUrls: string[] = [];

        if (primaryPhoto) {
            primaryPhotoUrl = await uploadImageMutation.mutateAsync(
                primaryPhoto
            );
        }

        if (Array.isArray(photos) && photos.length > 0) {
            photoUrls = await Promise.all(
                photos.map((photo: string) =>
                    uploadImageMutation.mutateAsync(photo)
                )
            );
        }

        await createCategory({
            ...rest,
            primaryPhoto: primaryPhotoUrl,
            photos: photoUrls,
        });
    };

    return (
        <div className='p-5 flex flex-col gap-5'>
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
                {/* Main Inputs */}
                <div className='flex flex-col md:flex-row md:items-center md:gap-4 gap-4'>
                    <Select
                        name='type'
                        options={[
                            { value: "Collaboration", label: "Collaboration" },
                            { value: "Category", label: "Category" },
                        ]}
                        label='Section'
                        className='w-full md:w-auto'
                    />
                    <Input
                        name='name'
                        label='Name'
                        className='w-full md:w-[300px]'
                    />
                    <Input
                        name='description'
                        label='Description'
                        className='w-full md:w-[300px]'
                    />
                    <div className='flex flex-col gap-2'>
                        <h5>Image</h5>
                        <Dropzone
                            allowedFiles='image'
                            theme='secondary'
                            inputClassName='max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px]'
                            itemClassName='max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px]'
                            name='primaryPhoto'
                            outputType='base64'
                            multiSelect={false}
                        />
                    </div>
                </div>

                {/* Multiple Photos */}
                <div className='flex flex-col gap-2'>
                    <h5>Photos</h5>
                    <Dropzone
                        allowedFiles='image'
                        theme='secondary'
                        inputClassName='max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px]'
                        itemClassName='max-h-[100px] max-w-[100px] min-h-[100px] min-w-[100px]'
                        name='photos'
                        outputType='base64'
                        multiSelect
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type='submit'
                    className='mt-5 w-full md:w-[150px] self-end'
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AdminAddCategoriesForm;
