"use client";

import Button from "@/component/Button/Button";
import { Dropzone } from "@/component/Dropzone/Dropzone";
import { DropzonePlain } from "@/component/Dropzone/DropzonePlain";
import AdminFooter from "@/component/Footer/AdminFooter";
import Form from "@/component/Form/Form";
import AdminHeader from "@/component/Header/AdminHeader";
import Input from "@/component/Input/Input";
import InputPlain from "@/component/Input/InputPlain";
import Select from "@/component/Select/Select";
import { useUploadImage } from "@/src/apis/uploadImage";
import { useState } from "react";
import z, { set } from "zod";

const PageManagement = () => {
    const { mutate: uploadImage } = useUploadImage();
    const [image, setImage] = useState<File | undefined>(undefined);

    const fileSchema = z
        // 1. Ensure it's not empty, but it must be an array-like object (FileList)
        .custom<FileList>()
        .refine((files) => files.length > 0, `Image is required.`);
    // 2. Target the first file for validation

    const formSchema = z.object({
        section: z.string().min(1, "Section is required"),
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        image: fileSchema,
    });
    const handleSubmit = (data: any) => {
        console.log(data);
        const { image: dataImage } = data;
        if (image) uploadImage(image);
    };

    return (
        <div className='h-full flex gap-5 '>
            <div className='justify-self-start h-200 p-5 flex flex-col gap-5'>
                <div className='section-title'>
                    Choose what you want to edit in your landing page
                </div>
                <Form
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    schema={formSchema}
                    className='flex flex-col gap-5'
                    resetOnSubmit
                >
                    <Select
                        name='section'
                        options={[
                            { value: "collaborators", label: "Collaborators" },
                            { value: "Categories", label: "Categories" },
                            { value: "Services", label: "Services" },
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
                    <InputPlain
                        label='Image'
                        type='file'
                        accept='image/*'
                        className='!w-[300px]'
                        value={image ? URL.createObjectURL(image) : undefined}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e?.target?.files?.[0];
                            setImage(file);
                        }}
                    />
                    {/* <DropzonePlain
                        listType={"picture-card"}
                        onChange={(value: any) => {
                            console.log("dropzone value", value);
                        }}
                    /> */}
                    <Button
                        type='submit'
                        className='mt-5'
                    >
                        Submit
                    </Button>
                </Form>
            </div>
            <div className='section-title'>Sections </div>
        </div>
    );
};

export default PageManagement;
