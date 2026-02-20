"use client";

import AdminCategoriesCard from "@/component/atoms/AdminCategoriesCard/AdminCategoriesCard";
import AdminWeddingCard from "@/component/atoms/AdminWeddingCard/AdminWeddingCard";
import Button from "@/component/atoms/Button/Button";
import { useDeleteService, useGetServices } from "@/src/apis/services";
import { useDeleteVideo, useGetVideos } from "@/src/apis/videos";
import { useDeleteWedding, useWeddingPackages } from "@/src/apis/wedding";

const AdminVideoPanel = () => {
    const { data: videos = [] } = useGetVideos();
    const { mutate: mutateDelete } = useDeleteVideo();

    const handleDeleteVideo = (id: number) => {
        mutateDelete(id);
    };

    return (
        <div className='flex flex-col flex-1 p-2 md:p-5 gap-5 max-h-[80vh] overflow-y-auto'>
            {/* Header */}
            <div className='flex bg-grey-light justify-center gap-4 p-4 rounded-lg overflow-x-auto'>
                <Button
                    theme='primary'
                    className='whitespace-nowrap'
                >
                    Videos
                </Button>
            </div>

            {/* Video Cards */}
            <div className='flex flex-col gap-3'>
                {videos &&
                    videos?.map((video: any) => {
                        console.log(video);
                        return (
                            <div
                                key={video.id}
                                className='flex  md:flex-row gap-2 md:gap-5 w-full items-center'
                            >
                                <AdminCategoriesCard
                                    title={video.title}
                                    description={video.url}
                                    className='w-full md:flex-1'
                                />
                                <Button
                                    theme='ghost'
                                    onClick={() => handleDeleteVideo(video.id)}
                                    className='md:self-start'
                                >
                                    🗑️
                                </Button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default AdminVideoPanel;
