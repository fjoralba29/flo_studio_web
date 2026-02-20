"use client";

import Button from "@/component/atoms/Button/Button";
import Container from "@/component/atoms/Container/Container";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import InputPlain from "@/component/atoms/Input/InputPlain";
import { servicesformSchema } from "@/lib/types/CreateServicesSchema";
import { videoformSchema } from "@/lib/types/CreateVideoSchema";
import { useCreateService } from "@/src/apis/services";
import { useCreateVideo } from "@/src/apis/videos";
import { useCreateWeddingPackage } from "@/src/apis/wedding";
import { useState } from "react";

const AdminVideoForm = () => {
    const { mutate: createVideo, isPending: isVideoPending } = useCreateVideo();

    const handleSubmit = async (data: any) => {
        await createVideo({
            ...data,
        });
    };

    return (
        <div className='justify-self-start p-5 flex flex-col gap-5'>
            <div className='section-subtitle'>Add Video</div>
            <Container isLoading={isVideoPending}>
                <Form
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    schema={videoformSchema}
                    className='flex flex-col gap-5'
                    resetOnSubmit
                >
                    {/* Responsive grid: 1 column on mobile, 2 on md+ */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <Input
                            name='title'
                            label='Title'
                            className='w-full'
                        />
                        <Input
                            name='url'
                            label='Video URL'
                            className='w-full'
                        />
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

export default AdminVideoForm;
