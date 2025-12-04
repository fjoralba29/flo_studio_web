"use client";

import Button from "@/component/atoms/Button/Button";
import { DropzonePlain } from "@/component/atoms/Dropzone/DropzonePlain";
import InputPlain from "@/component/atoms/Input/InputPlain";
import { Modal } from "@/component/atoms/Modal/Modal";
import { useAddUserDataStore } from "@/src/store/addUserData";
import { useState } from "react";
import { set } from "zod";

const AddUrlsModal = () => {
    const [value, setValue] = useState("");
    const isUrlsModalOpen = useAddUserDataStore((s) => s.isUrlsModalOpen);
    const setUrlsModalOpen = useAddUserDataStore((s) => s.setUrlsModalOpen);

    const setSelectedUrls = useAddUserDataStore((s) => s.setSelectedUrls);
    const selectedUrls = useAddUserDataStore((s) => s.selectedUrls);
    console.log(value, "value");

    return (
        <Modal
            title='Add Urls'
            isOpen={isUrlsModalOpen}
            onClose={() => {
                setUrlsModalOpen(false);
            }}
        >
            <div className='flex flex-col gap-[20px]'>
                <div className='flex items-center gap-[20px]'>
                    <InputPlain
                        value={value}
                        onChange={(value) => {
                            console.log("value changed", value);

                            setValue(value);
                        }}
                    />
                    <Button
                        theme='primary'
                        onClick={() => {
                            setSelectedUrls(value);
                            setValue("");
                        }}
                        className='!h-[48px]'
                    >
                        +
                    </Button>
                </div>
                <div className='text-gray-700'>
                    {selectedUrls.map((url, index) => (
                        <div>{url}</div>
                    ))}
                </div>
                <Button theme='primary'>Add Urls</Button>
            </div>
        </Modal>
    );
};

export default AddUrlsModal;
