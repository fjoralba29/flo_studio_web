"use client";

import Button from "@/component/atoms/Button/Button";
import Container from "@/component/atoms/Container/Container";
import Dropzone from "@/component/atoms/Dropzone/Dropzone";
import Form from "@/component/atoms/Form/Form";
import { Modal } from "@/component/atoms/Modal/Modal";
import { addPhotosSchema } from "@/lib/types/CreateCategoriesSchema";
import { useAddPortfolioPhotos } from "@/src/apis/portfolioCategories";
import { useUploadImage } from "@/src/apis/uploadImage";
import { usePortfolioCategoriesStore } from "@/src/store/portfolioCategories";

const AddPortfolioPhotosModal = () => {
    const {
        isPortfolioPhotoModalOpen,
        setPortfolioPhotoModalOpen,
        selectedPortfolioCategoryName,
        selectedPortfolioCategoryId,
        selectedPortfolioSubCategoryName,
        selectedPortfolioSubCategoryId,
    } = usePortfolioCategoriesStore();

    const { mutate: addPortfolioPhotos } = useAddPortfolioPhotos();
    const uploadImageMutation = useUploadImage();

    const handleSubmit = async (data: any) => {
        // Logic to add photos goes here
        console.log(data);
        const { photos } = data;

        const urls = await Promise.all(
            photos.map(async (base64: string) => {
                return await uploadImageMutation.mutateAsync(base64);
            }),
        );
        console.log(
            selectedPortfolioCategoryId,
            selectedPortfolioSubCategoryId,
            urls,
        );

        // 3️⃣ Send to your API
        await addPortfolioPhotos({
            portfolioCategoryId: Number(selectedPortfolioCategoryId),
            portfolioSubcategoryId: selectedPortfolioSubCategoryId
                ? Number(selectedPortfolioSubCategoryId)
                : null,
            photos: urls,
        });
        setPortfolioPhotoModalOpen(false);
    };

    return (
        <Modal
            title={`Add Photos`}
            isOpen={isPortfolioPhotoModalOpen}
            onClose={() => {
                setPortfolioPhotoModalOpen(false);
            }}
        >
            <Container isLoading={false}>
                <Form
                    onSubmit={handleSubmit}
                    schema={addPhotosSchema}
                    className='flex flex-col gap-5  overflow-auto h-[75vh]'
                    resetOnSubmit
                >
                    <h2 className=' max-w-[300px]'>
                        {!selectedPortfolioSubCategoryName ? (
                            <>
                                You are adding photos to{" "}
                                <strong>{selectedPortfolioCategoryName}</strong>
                                . If you want to add photos to a subcategory,
                                please select the subcategory first and then
                                click on "Add Photos".
                            </>
                        ) : (
                            <>
                                You are adding photos to{" "}
                                <strong>
                                    {selectedPortfolioSubCategoryName}
                                </strong>
                                .
                            </>
                        )}
                    </h2>

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

export default AddPortfolioPhotosModal;
