"use client";

import Button from "@/component/atoms/Button/Button";
import { DropzonePlain } from "@/component/atoms/Dropzone/DropzonePlain";
import { Modal } from "@/component/atoms/Modal/Modal";
import { useAddPhotosToUserEvent } from "@/src/apis/addUserData";
import { useAddPhotosToCategory } from "@/src/apis/categories";
import { useUploadImage } from "@/src/apis/uploadImage";
import { useAddUserDataStore } from "@/src/store/addUserData";
import { useCategoryStore } from "@/src/store/categories";

const AddCategoryPhotosModal = () => {
    const isPhotoModalOpen = useAddUserDataStore((s) => s.isPhotoModalOpen);
    const setPhotoModalOpen = useAddUserDataStore((s) => s.setPhotoModalOpen);

    const setSelectedPhotos = useAddUserDataStore((s) => s.setSelectedPhotos);

    const selectedTypeId = useCategoryStore((state) => state.selectedTypeId);
    const selectedPhotos = useAddUserDataStore((s) => s.selectedPhotos);

    const addPhotosToCategoryMutation = useAddPhotosToCategory();
    const uploadImageMutation = useUploadImage();

    const handleAddPhotosForCategory = async () => {
        // Logic to add photos goes here

        const urls = await Promise.all(
            selectedPhotos.map(async (base64) => {
                return await uploadImageMutation.mutateAsync(base64);
            })
        );

        // 2️⃣ Transform URLs into Photo objects
        const photosToAdd = urls.map((url) => ({
            url,
            title: "", // optional
            description: "", // optional
        }));

        // 3️⃣ Send to your API
        await addPhotosToCategoryMutation.mutateAsync({
            categoryId: selectedTypeId as number,
            photos: photosToAdd,
        });
        setPhotoModalOpen(false);
    };

    return (
        <Modal
            title='Add Photos'
            isOpen={isPhotoModalOpen}
            onClose={() => {
                setPhotoModalOpen(false);
            }}
        >
            <div className='flex flex-col gap-[50px]'>
                <DropzonePlain
                    listType={"picture-card"}
                    outputType='base64'
                    onChange={(value) => {
                        setSelectedPhotos(value as string[]);
                    }}
                    multiSelect
                    maxFilesCount={5}
                />
                <Button
                    theme='primary'
                    onClick={handleAddPhotosForCategory}
                >
                    Add Photos
                </Button>
            </div>
        </Modal>
    );
};

export default AddCategoryPhotosModal;
