"use client";

import Button from "@/component/atoms/Button/Button";
import { DropzonePlain } from "@/component/atoms/Dropzone/DropzonePlain";
import { Modal } from "@/component/atoms/Modal/Modal";
import { useAddUserDataStore } from "@/src/store/addUserData";

const AddPhotosModal = () => {
    const isPhotoModalOpen = useAddUserDataStore((s) => s.isPhotoModalOpen);
    const setPhotoModalOpen = useAddUserDataStore((s) => s.setPhotoModalOpen);

    const setSelectedPhotos = useAddUserDataStore((s) => s.setSelectedPhotos);
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
                        console.log("dropzone value", value);
                        setSelectedPhotos(value);
                    }}
                    multiSelect
                    maxFilesCount={5}
                />
                <Button theme='primary'>Add Photos</Button>
            </div>
        </Modal>
    );
};

export default AddPhotosModal;
