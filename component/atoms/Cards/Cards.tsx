"use client";

import Image from "next/image";

type Props = {
    photo: string;
    title?: string;
    description?: string;
    type: "category" | "collaboration";
    className?: string;
    onClick?: () => void;
};

const Cards = ({
    photo,
    title,
    description,
    type,
    className,
    onClick,
}: Props) => {
    // Text visibility logic
    const textVisibility =
        type === "collaboration"
            ? "opacity-0 group-hover:opacity-100"
            : "opacity-100";

    // Responsive card sizing
    const cardSize =
        type === "collaboration"
            ? `
                w-full 
                max-w-[300px]
                aspect-[3/4]
              `
            : `
                w-full
                max-w-[565px]
                aspect-[4/3]
              `;

    return (
        <div
            className={`
                relative group cursor-pointer overflow-hidden
                rounded-[15px]
                transition-transform duration-300 hover:scale-[1.02]
                ${cardSize}
                ${className}
            `}
            onClick={onClick}
        >
            {/* Image */}
            <Image
                src={photo}
                alt={title || "Card Image"}
                fill
                sizes='(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       25vw'
                className='object-cover'
            />

            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#372E39] via-[#372E39]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300' />

            {/* Text */}
            <div
                className={`
                    absolute inset-0 flex flex-col justify-end
                    p-4 sm:p-5
                    transition-opacity duration-300
                    ${textVisibility}
                `}
            >
                {title && (
                    <h2 className='text-white text-lg sm:text-xl font-semibold tracking-wide drop-shadow-lg'>
                        {title}
                    </h2>
                )}
                {description && (
                    <p className='text-white text-xs sm:text-sm opacity-90 drop-shadow-lg'>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Cards;
