"use client";

import Button from "@/component/atoms/Button/Button";
import Container from "@/component/atoms/Container/Container";
import Dropzone from "@/component/atoms/Dropzone/Dropzone";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import Select from "@/component/atoms/Select/Select";
import { formSchema } from "@/lib/types/CreateCategoriesSchema";
import { useCreateCategory } from "@/src/apis/categories";
import { useUploadImage } from "@/src/apis/uploadImage";

const AdminAddCategoriesForm = () => {
    const uploadImageMutation = useUploadImage();
    const { mutateAsync: createCategory, isPending: isCreating } =
        useCreateCategory();

    const isLoading = uploadImageMutation.isPending || isCreating;

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

            {/* 🔒 Container handles loading state */}
            <Container isLoading={isLoading}>
                <Form
                    onSubmit={handleSubmit}
                    schema={formSchema}
                    className='flex flex-col gap-5'
                    resetOnSubmit
                >
                    {/* Main Inputs */}
                    <div className='flex flex-col md:flex-row md:items-center gap-4'>
                        <Select
                            name='type'
                            label='Section'
                            options={[
                                {
                                    value: "Collaboration",
                                    label: "Collaboration",
                                },
                                { value: "Category", label: "Category" },
                            ]}
                        />

                        <Input
                            name='name'
                            label='Name'
                            className='md:w-[300px]'
                        />

                        <Input
                            name='description'
                            label='Description'
                            className='md:w-[300px]'
                        />

                        <div className='flex flex-col gap-2'>
                            <h5>Image</h5>
                            <Dropzone
                                allowedFiles='image'
                                theme='secondary'
                                name='primaryPhoto'
                                outputType='base64'
                                multiSelect={false}
                                inputClassName='size-[100px]'
                                itemClassName='size-[100px]'
                            />
                        </div>
                    </div>

                    {/* Multiple Photos */}
                    <div className='flex flex-col gap-2'>
                        <h5>Photos</h5>
                        <Dropzone
                            allowedFiles='image'
                            theme='secondary'
                            name='photos'
                            outputType='base64'
                            multiSelect
                            inputClassName='size-[100px]'
                            itemClassName='size-[100px]'
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type='submit'
                        disabled={isLoading}
                        className='mt-5 w-full md:w-[150px] self-end'
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default AdminAddCategoriesForm;
