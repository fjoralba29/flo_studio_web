"use client";

import Image from "next/image";

type Props = {
    photo: string;
    title?: string;
    description?: string;
    type: "category" | "collaboration";
};

const Cards = ({ photo, title, description, type }: Props) => {
    // text visibility logic
    const textVisibility =
        type === "collaboration"
            ? "opacity-0 group-hover:opacity-100"
            : "opacity-100";

    // card size based on type
    const cardSize =
        type === "collaboration"
            ? "w-[300px] h-[412px]"
            : "w-[565px] h-[440px]";

    return (
        <div
            className={`relative group cursor-pointer overflow-hidden rounded-[15px] ${cardSize}`}
        >
            <Image
                src={photo}
                alt={title || "Card Image"}
                fill // image will auto-fit card size
                className='object-cover'
            />

            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#372E39]/100 via-[#372E39]/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500' />

            {/* Text */}
            <div
                className={`absolute inset-0 flex flex-col items-start p-4 justify-end transition-opacity duration-300 ${textVisibility}`}
            >
                {title && (
                    <h2 className='text-white text-xl md:text-2xl font-semibold tracking-wide drop-shadow-lg'>
                        {title}
                    </h2>
                )}
                {description && (
                    <h5 className='text-white text-xs md:text-sm font-semibold tracking-wide drop-shadow-lg'>
                        {description}
                    </h5>
                )}
            </div>
        </div>
    );
};

export default Cards;
