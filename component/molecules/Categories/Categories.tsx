"use client";

import Cards from "../../atoms/Cards/Cards";
import { useGetCategoriesByType } from "@/src/apis/categories";
import { CategoryType } from "@prisma/client";

const Categories = () => {
    const { data: categories = [] } = useGetCategoriesByType(
        CategoryType.Category
    );
    return (
        <div className='px-[153px] py-[65px] flex flex-col items-center gap-[40px]'>
            <div className='text-center flex flex-col gap-[10px]'>
                <div className='section-title'>Categories</div>
                <div className='section-subtitle'>
                    From special occasions to styled shoots{" "}
                </div>
            </div>
            <div className='w-full grid grid-cols-2 items-center gap-[40px]'>
                {categories?.map((category: any) => (
                    <Cards
                        key={category.id}
                        photo={category.primaryPhoto}
                        title={category.name}
                        description={category.description}
                        type={"category"}
                    />
                ))}
                {/* <Cards
                    photo={Image4.src}
                    title='MODELS'
                    description='29/10/2025'
                    type={"category"}
                />
                <Cards
                    photo={Image5.src}
                    title='FOOD'
                    type={"category"}
                />
                <Cards
                    photo={Image15.src}
                    title='ARCHITECTURE'
                    type={"category"}
                />
                <Cards
                    photo={Image7.src}
                    title='FII INSTITUTE'
                    type={"category"}
                /> */}
            </div>
        </div>
    );
};

export default Categories;
