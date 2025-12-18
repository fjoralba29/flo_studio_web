"use client";

import Cards from "../../atoms/Cards/Cards";
import { useGetCategories } from "@/src/apis/categories";
import { CategoryType } from "@prisma/client";

const Categories = () => {
    const { data } = useGetCategories();

    const categories = data?.filter(
        (category: any) => category.type === CategoryType.Collaboration
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
            </div>
        </div>
    );
};

export default Categories;
