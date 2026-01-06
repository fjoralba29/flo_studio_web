"use client";

import FloatingNav from "@/component/atoms/FloatingNav/FloatingNav";
import Gallery from "@/component/molecules/Gallery/Gallery";
import Header from "@/component/molecules/Header/Header";
import {
    useGetCategories,
    useGetPhotosByCategoryID,
} from "@/src/apis/categories";
import { useCategoryStore } from "@/src/store/categories";
import { useEffect, useState } from "react";

const tabs = [
    {
        key: "home",
        label: "Home",
        img: "/photos/image38.png",
    },
    {
        key: "profile",
        label: "Profile",
        img: "/photos/image38.png",
    },
    {
        key: "message",
        label: "Message",
        img: "/photos/image38.png",
    },
    {
        key: "camera",
        label: "Camera",
        img: "/photos/image38.png",
    },
    {
        key: "settings",
        label: "Settings",
        img: "/photos/image38.png",
    },
];

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
        <>
            <Header />
            <div className='relative'>
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-[400px]'
                    style={{
                        backgroundImage: `url(${"/photos/image38.png"}) `,
                    }}
                />

                <div className='absolute top-[150px] left-0 right-0 text-center text-white flex flex-col gap-[5px]'>
                    <h1>PORTFOLIO</h1>
                </div>
            </div>
            <FloatingNav menuItems={items} />
            <Gallery images={photoUrls} />
        </>
    );
};

export default PortfolioPage;
