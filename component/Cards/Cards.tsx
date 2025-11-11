"use client";

import Image from "next/image";

type Props = {
    photos: string[];
    title?: string;
};

const Cards = ({ photos, title }: Props) => {
    return (
        <div className='relative group cursor-pointer overflow-hidden rounded-[15px]'>
            <div className='flex gap-[5px] cursor-pointer rounded-[15px]'>
                {photos?.map((src, i) => {
                    return (
                        <Image
                            key={i}
                            src={src}
                            alt={`Model ${i + 1}`}
                            width={278}
                            height={417}
                        />
                    );
                })}
            </div>
            {/* Gradient overlay (always visible, intensifies on hover) */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#372E39]/100 via-[#372E39]/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500' />
            {/* Centered text */}
            <div className='absolute inset-0 flex items-end pb-4 justify-center'>
                <h2 className='text-white text-3xl md:text-4xl font-semibold tracking-wide drop-shadow-lg'>
                    {title}
                </h2>
            </div>
        </div>
    );
};

export default Cards;
