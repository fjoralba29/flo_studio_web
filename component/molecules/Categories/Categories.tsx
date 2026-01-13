"use client";

import Cards from "../../atoms/Cards/Cards";
import { useGetCategories } from "@/src/apis/categories";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/navigation";

const Categories = () => {
    const { data } = useGetCategories();
    const router = useRouter();

    const categories = data?.filter(
        (category: any) => category.type === CategoryType.Category
    );

    return (
        <section className='w-full px-6 sm:px-10 lg:px-20 xl:px-[153px] py-12 sm:py-16'>
            {/* Title */}
            <div className='text-center flex flex-col gap-2 mb-10'>
                <h2 className='section-title text-xl sm:text-2xl lg:text-3xl'>
                    Categories
                </h2>
                <p className='section-subtitle text-sm sm:text-base'>
                    From special occasions to styled shoots
                </p>
            </div>

            {/* Cards grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 place-items-center'>
                {categories?.map((category: any) => (
                    <Cards
                        key={category.id}
                        photo={category.primaryPhoto}
                        title={category.name}
                        description={category.description}
                        type='category'
                        onClick={() =>
                            router.push(`/portfolio?category=${category.id}`)
                        }
                    />
                ))}
            </div>
        </section>
    );
};

export default Categories;
