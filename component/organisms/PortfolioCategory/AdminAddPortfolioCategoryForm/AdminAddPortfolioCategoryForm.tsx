"use client";

import Button from "@/component/atoms/Button/Button";
import Container from "@/component/atoms/Container/Container";
import Dropzone from "@/component/atoms/Dropzone/Dropzone";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import { portfolioCategoryFormSchema } from "@/lib/types/CreatePortfolioCategorySchema";
import { useCreatePortfolioCategory } from "@/src/apis/portfolioCategories";
import { useUploadImage } from "@/src/apis/uploadImage";

const AdminAddPortfolioCategoryForm = () => {
    const { mutate: createPortfolioCategory, isPending } =
        useCreatePortfolioCategory();
    const uploadImageMutation = useUploadImage();

    const handleSubmit = async (data: any) => {
        const { primaryPhoto, ...rest } = data;

        let primaryPhotoUrl: string | undefined;

        if (primaryPhoto) {
            primaryPhotoUrl =
                await uploadImageMutation.mutateAsync(primaryPhoto);
        }

        await createPortfolioCategory({
            ...rest,
            primaryPhoto: primaryPhotoUrl,
        });
    };

    return (
        <div className='justify-self-start p-5 flex flex-col gap-5'>
            <div className='section-subtitle'>Add Portfolio Categories</div>
            <Container isLoading={isPending}>
                <Form
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    schema={portfolioCategoryFormSchema}
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

export default AdminAddPortfolioCategoryForm;
