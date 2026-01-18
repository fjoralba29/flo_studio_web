"use client";

import FloatingNav from "@/component/atoms/FloatingNav/FloatingNav";
import Footer from "@/component/molecules/Footer/Footer";
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
            ? photoData.photos?.map((item: any) => {
                  return { url: item.url, id: item.id };
              })
            : [];
    console.log(photoUrls);

    return (
        <div className='bg-grape min-h-screen'>
            <Header />

            {/* Hero Section */}
            <div className='relative'>
                <div
                    className='bg-gradient-to-t from-[#0D0B0F] to-white w-full bg-cover bg-center h-64 sm:h-80 md:h-96 lg:h-[400px]'
                    style={{
                        backgroundImage: `linear-gradient(to top, #0D0B0F, transparent), url("/photos/image38.png")`,
                    }}
                />
                <div className='absolute top-24 sm:top-32 md:top-36 left-0 right-0 text-center text-white flex flex-col gap-2'>
                    <div className='text-3xl sm:text-2xl md:text-5xl font-bold p-6'>
                        PORTFOLIO
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className='px-6 sm:px-6 lg:px-16 py-8 flex flex-col md:flex-row gap-6'>
                {/* FloatingNav */}
                {/* <div className='md:w-1/4'> */}
                <FloatingNav menuItems={items} />
                {/* </div> */}

                {/* Gallery */}
                {/* <div className='md:w-3/4'> */}
                {isLoading ? (
                    <div className='text-white text-center py-20'>
                        Loading...
                    </div>
                ) : error ? (
                    <div className='text-red-500 text-center py-20'>
                        Error loading photos
                    </div>
                ) : (
                    <Gallery images={photoUrls} />
                )}
                {/* </div> */}
            </div>
            <Footer />
        </div>
    );
};

export default PortfolioPage;
