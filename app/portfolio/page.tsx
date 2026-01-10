"use client";

import FloatingNav from "@/component/atoms/FloatingNav/FloatingNav";
import Gallery from "@/component/molecules/Gallery/Gallery";
import Header from "@/component/molecules/Header/Header";
import {
    useGetCategories,
    useGetPhotosByCategoryID,
} from "@/src/apis/categories";

const PortfolioPage = () => {
    const { data: categories = [] } = useGetCategories();

    const items = categories?.map((item: any) => ({
        key: item.id,
        label: item.name,
        img: item.primaryPhoto,
    }));

    // Call hook at top-level
    const {
        data: photoData = [],
        isLoading,
        error,
    } = useGetPhotosByCategoryID();

    const photoUrls =
        photoData?.photos?.length > 0
            ? photoData.photos?.map((item: any) => item.url)
            : [];

    console.log(photoUrls, photoData);

    return (
        <div className='bg-grape'>
            <Header />
            <div className='relative '>
                <div
                    className=' bg-gradient-to-t from-[#372e39] to-white w-full bg-cover bg-center h-[400px]'
                    style={{
                        backgroundImage: ` linear-gradient(to top, #372e39,  transparent), url(${"/photos/image38.png"}) `,
                    }}
                />

                <div className='absolute top-[150px] left-0 right-0 text-center text-white flex flex-col gap-[5px]'>
                    <h1>PORTFOLIO</h1>
                </div>
            </div>
            <div className='flex gap-4 px-4 py-8'>
                <FloatingNav menuItems={items} />
                <Gallery images={photoUrls} />
            </div>
        </div>
    );
};

export default PortfolioPage;
