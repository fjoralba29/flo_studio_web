"use client";

import { CategoryType } from "@prisma/client";
import Cards from "../../atoms/Cards/Cards";
import { useGetCategories } from "@/src/apis/categories";

const Collaborations = () => {
    const { data } = useGetCategories();

    const collaborations = data?.filter(
        (category: any) => category.type === CategoryType.Collaboration
    );

    return (
        <div className='px-[153px] py-[65px] flex flex-col items-center gap-[40px]'>
            <div className='text-center flex flex-col gap-[10px]'>
                <div className='section-title'>Collaborations</div>
                <div className='section-subtitle'>
                    From special occasions to styled shoots{" "}
                </div>
            </div>
            <div className='w-full flex  items-center gap-[40px]'>
                {collaborations?.map((collaboration: any) => (
                    <Cards
                        key={collaboration.id}
                        photo={collaboration.primaryPhoto}
                        title={collaboration.name}
                        description={collaboration.description}
                        type={"collaboration"}
                    />
                ))}
            </div>
        </div>
    );
};

export default Collaborations;
