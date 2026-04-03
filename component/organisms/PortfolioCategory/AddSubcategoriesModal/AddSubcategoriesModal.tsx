"use client";

import Button from "@/component/atoms/Button/Button";
import Container from "@/component/atoms/Container/Container";
import Dropzone from "@/component/atoms/Dropzone/Dropzone";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import { Modal } from "@/component/atoms/Modal/Modal";
import { addSubcategorySchema } from "@/lib/types/CreateCategoriesSchema";
import { useCreatePortfolioSubcategory } from "@/src/apis/portfolioCategories";
import { useUploadImage } from "@/src/apis/uploadImage";
import { usePortfolioCategoriesStore } from "@/src/store/portfolioCategories";

const AddSubcategoriesModal = () => {
    const isPortfolioSubcategoryModalOpen = usePortfolioCategoriesStore(
        (s) => s.isPortfolioSubcategoryModalOpen,
    );
    const setPortfolioSubcategoryModalOpen = usePortfolioCategoriesStore(
        (s) => s.setPortfolioSubcategoryModalOpen,
    );

    const selectedPortfolioCategoryName = usePortfolioCategoriesStore(
        (s) => s.selectedPortfolioCategoryName,
    );
    const selectedPortfolioCategoryId = usePortfolioCategoriesStore(
        (s) => s.selectedPortfolioCategoryId,
    );

    const { mutate: createPortfolioSubcategory } =
        useCreatePortfolioSubcategory();
    const uploadImageMutation = useUploadImage();

    const handleSubmit = async (data: any) => {
        // Logic to add photos goes here
        console.log(data);
        const { photos, name, primaryPhoto } = data;
        let urls = [];
        if (photos) {
            urls = await Promise.all(
                photos.map(async (base64: string) => {
                    return await uploadImageMutation.mutateAsync(base64);
                }),
            );
        }
        let primaryPhotoUrl: string | undefined;
        if (primaryPhoto) {
            primaryPhotoUrl =
                await uploadImageMutation.mutateAsync(primaryPhoto);
        }

        await createPortfolioSubcategory({
            portfolioCategoryId: Number(selectedPortfolioCategoryId),
            name: name,
            photos: urls,
            primaryPhoto: primaryPhotoUrl,
        });
        setPortfolioSubcategoryModalOpen(false);
    };

    return (
        <Modal
            title={`Add Subcategory to ${selectedPortfolioCategoryName}  `}
            isOpen={isPortfolioSubcategoryModalOpen}
            onClose={() => {
                setPortfolioSubcategoryModalOpen(false);
            }}
        >
            <Container isLoading={false}>
                <Form
                    onSubmit={handleSubmit}
                    schema={addSubcategorySchema}
                    className='flex flex-col gap-5'
                    resetOnSubmit
                >
                    {/* Main Inputs */}
                    <div className='flex flex-col md:flex-row md:items-center gap-4'>
                        <Input
                            name='name'
                            label='Subcategory Name'
                            className='md:w-[300px]'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h5>Primary Photo</h5>
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
                        disabled={false}
                        className='mt-5 w-full md:w-[150px] self-end'
                    >
                        {false ? "Submitting..." : "Submit"}
                    </Button>
                </Form>
            </Container>
        </Modal>
    );
};

export default AddSubcategoriesModal;
