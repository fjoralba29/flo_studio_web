"use client";

import { CategoryType } from "@prisma/client";
import Cards from "../../atoms/Cards/Cards";
import { useGetCategories } from "@/src/apis/categories";
import { useRouter } from "next/navigation";

const Collaborations = () => {
    const { data } = useGetCategories();
    const router = useRouter();

    const collaborations = data?.filter(
        (category: any) => category.type === CategoryType.Collaboration
    );

    return (
        <section className='w-full px-6 sm:px-10 lg:px-20 xl:px-[153px] py-12 sm:py-16'>
            {/* Title */}
            <div className='text-center flex flex-col gap-2 mb-10'>
                <h2 className='section-title text-xl sm:text-2xl lg:text-3xl'>
                    Collaborations
                </h2>
                <p className='section-subtitle text-sm sm:text-base'>
                    From special occasions to styled shoots
                </p>
            </div>

            {/* Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center'>
                {collaborations?.map((collaboration: any) => (
                    <Cards
                        key={collaboration.id}
                        photo={collaboration.primaryPhoto}
                        title={collaboration.name}
                        description={collaboration.description}
                        type='collaboration'
                        onClick={() =>
                            router.push(
                                `/portfolio?category=${collaboration.id}`
                            )
                        }
                    />
                ))}
            </div>
        </section>
    );
};

export default Collaborations;
