"use client";

import Image from "next/image";

import Cardbox from "../../atoms/CardBox/Cardbox";
import { useGetServices } from "@/src/apis/services";

// type ServiceCard = {
//     title: string;
//     description?: string;
// };

// const cards: ServiceCard[] = [
//     {
//         title: "Photography",
//         description:
//             "Studio Photography • Outdoor Photography • Portraits & Headshots • Product Photography",
//     },
//     {
//         title: "Photography",
//         description:
//             "Fashion & Editorial • Event Photography • Commercial & Branding Photography",
//     },
//     { title: "Photography" },
//     { title: "Photography" },
//     { title: "Photography" },
//     { title: "Photography" },
// ];

const Services = () => {
    const { data: services = [] } = useGetServices();

    return (
        <section className='relative w-full min-h-screen flex items-center justify-center py-4'>
            {/* Background Image */}
            <div className='absolute inset-0 -z-10'>
                <Image
                    src={"/photos/image35.jpg"}
                    alt='Background'
                    fill
                    className='object-cover opacity-70'
                />
                <div className='absolute inset-0 bg-black/30' />
            </div>

            {/* Content Container */}
            <div className='w-full p-4  flex flex-col items-center text-white'>
                {/* Title */}
                <h1 className='section-title text-4xl md:text-5xl font-bold drop-shadow-lg'>
                    SERVICES
                </h1>
                {/* Subtitle */}
                <p className='section-subtitle mt-2 text-lg md:text-xl opacity-90'>
                    From special occasions to styled shoots
                </p>
                {/* Cards Grid */}
                <div className='flex items-center gap-4 mx-[80px] p-[60px] flex-wrap justify-center'>
                    {services.map((card: any, index: number) => {
                        const row = Math.floor(index / 2);
                        const isFirstInRow = index % 2 === 0;
                        const isSmall =
                            row % 2 === 0 ? isFirstInRow : !isFirstInRow;

                        return (
                            <Cardbox
                                key={index}
                                size={isSmall ? "small" : "large"}
                                title={card.name}
                                description={card.description}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
