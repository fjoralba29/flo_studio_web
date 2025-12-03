"use client";

import Cards from "../../atoms/Cards/Cards";
import { useGetCategoriesByType } from "@/src/apis/categories";
import { CategoryType } from "@prisma/client";

const Collaborations = () => {
    const { data: collaborations = [] } = useGetCategoriesByType(
        CategoryType.Collaboration
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
                {/* <Cards
                    photo={Image4.src}
                    title='MODELS'
                    description='29/10/2025'
                    type={"collaboration"}
                />
                <Cards
                    photo={Image5.src}
                    title='FOOD'
                    description='29/10/2025'
                    type={"collaboration"}
                />
                <Cards
                    photo={Image15.src}
                    title='ARCHITECTURE'
                    description='29/10/2025'
                    type={"collaboration"}
                />
                <Cards
                    photo={Image7.src}
                    title='FII INSTITUTE'
                    description='29/10/2025'
                    type={"collaboration"}
                /> */}
            </div>
        </div>
    );
};

export default Collaborations;
