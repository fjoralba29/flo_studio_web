"use client";

import Cards from "@/component/atoms/Cards/Cards";
import Footer from "@/component/molecules/Footer/Footer";
import Gallery from "@/component/molecules/Gallery/Gallery";
import Header from "@/component/molecules/Header/Header";
import {
    useGetPortfolioCategories,
    useGetPortfolioSubcategories,
} from "@/src/apis/portfolioCategories";
import { useState } from "react";

const PortfolioPage = () => {
    const [categorySelected, setCategorySelected] = useState<number | null>(
        null,
    );
    const [subcategorySelected, setSubcategorySelected] = useState<
        number | null
    >(null);

    const { data: categories = [] } = useGetPortfolioCategories();
    const { data: subcategories = [] } = useGetPortfolioSubcategories();

    // Filter subcategories by selected category
    const filteredSubcategories = subcategories.filter(
        (item: any) => item.portfolioCategory.id === categorySelected,
    );

    // Get selected subcategory object
    const selectedSubcategory = filteredSubcategories.find(
        (item: any) => item.id === subcategorySelected,
    );

    // Get category photos
    const categoryPhotos =
        categories.find((c: any) => c.id === categorySelected)?.photos || [];

    // Get subcategory photos
    const subcategoryPhotos = selectedSubcategory?.photos || [];

    console.log("categoryPhotos:", categorySelected);
    console.log("subcategoryPhotos:", subcategorySelected);

    console.log("filter:", filteredSubcategories, subcategories);

    return (
        <div className='bg- min-h-screen'>
            <Header />

            {/* Hero Section */}
            <div className='relative'>
                <div
                    className='bg-gradient-to-t from-[#0D0B0F] to-white w-full bg-cover bg-center h-64 sm:h-80 md:h-96 lg:h-[400px]'
                    style={{
                        backgroundImage: `linear-gradient(to top, #b4b3b5, transparent), url("/photos/image38.png")`,
                    }}
                />
                <div className='absolute top-24 sm:top-32 md:top-36 left-0 right-0 text-center text-black flex flex-col gap-2'>
                    <div className='text-3xl sm:text-2xl md:text-5xl font-bold p-6'>
                        PORTFOLIO
                    </div>
                    <div className='subtitle tracking-[5px] sm:tracking-[10px] text-sm sm:text-base md:text-lg'>
                        FROM HERE YOU CAN SEE OUR WORKS
                    </div>
                </div>
            </div>

            <div
                className={`px-6 sm:px-6 lg:px-16 py-8 flex ${!categorySelected ? "flex-row" : "flex-col"}  gap-6 mb-12`}
            >
                {/* STEP 1: Show Categories */}
                {!categorySelected &&
                    categories.map((category: any) => (
                        <Cards
                            key={category.id}
                            photo={category.primaryPhoto}
                            title={category.name}
                            description={category.description}
                            type='category'
                            className='rounded-sm'
                            onClick={() => {
                                setCategorySelected(category.id);
                                setSubcategorySelected(null);
                            }}
                        />
                    ))}

                {/* STEP 2: When category is selected */}
                {categorySelected && !subcategorySelected && (
                    <>
                        <div
                            className='cursor-pointer mb-4'
                            onClick={() => {
                                selectedSubcategory
                                    ? setSubcategorySelected(null)
                                    : setCategorySelected(null);
                            }}
                        >
                            ← Back
                        </div>

                        {/* Subcategories ALWAYS visible if they exist */}
                        <div className='w-full flex flex-col gap-4'>
                            <div className='flex gap-4'>
                                {filteredSubcategories.length > 0 &&
                                    filteredSubcategories.map(
                                        (subcategory: any) => (
                                            <Cards
                                                key={subcategory.id}
                                                photo={subcategory.primaryPhoto}
                                                title={subcategory.name}
                                                description={
                                                    subcategory.description
                                                }
                                                type='category'
                                                className='!w-[500px] rounded-sm'
                                                onClick={() => {
                                                    setSubcategorySelected(
                                                        subcategory.id,
                                                    );
                                                }}
                                            />
                                        ),
                                    )}
                            </div>
                            <Gallery images={categoryPhotos} />
                        </div>
                    </>
                )}

                {/* STEP 3: Show Subcategory Gallery */}
                {categorySelected && subcategorySelected && (
                    <>
                        <div
                            className='cursor-pointer mb-4'
                            onClick={() => {
                                selectedSubcategory
                                    ? setSubcategorySelected(null)
                                    : setCategorySelected(null);
                            }}
                        >
                            ← Back
                        </div>
                        <Gallery images={subcategoryPhotos} />
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default PortfolioPage;
