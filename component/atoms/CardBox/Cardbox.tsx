"use client";

import { useState } from "react";

const Cardbox = ({
    size,
    title,
    description,
}: {
    size: "small" | "large";
    title: string;
    description?: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const width = size === "small" ? "md:w-[300px]" : "md:w-[600px]";

    return (
        <div
            onClick={() => setIsOpen((prev) => !prev)}
            className={`
                relative group w-full ${width} h-[140px]
                rounded-3xl p-6 cursor-pointer overflow-hidden
                bg-[#e9ecef] text-[#0D0B0F] transition-all duration-300
                hover:bg-[#adb5bd] hover:shadow-xl
                ${isOpen ? "bg-[#adb5bd] shadow-xl" : ""}
            `}
        >
            {/* Title */}
            <div
                className={`
                    absolute inset-0 text-lg font-semibold transition-all duration-300
                    flex items-center justify-center text-center

                    /* Desktop hover */
                    md:group-hover:items-start md:group-hover:justify-start
                    md:group-hover:text-left md:group-hover:pt-6 md:group-hover:pl-6

                    /* Mobile click */
                    ${
                        isOpen
                            ? "items-start justify-start text-left pt-6 pl-6"
                            : ""
                    }
                `}
            >
                {title}
            </div>

            {/* Description */}
            {description && (
                <div
                    className={`
                        absolute left-6 right-6 bottom-6 text-xs leading-relaxed
                        transition-opacity duration-300

                        /* Desktop hover */
                        md:opacity-0 md:group-hover:opacity-100

                        /* Mobile click */
                        ${isOpen ? "opacity-100" : "opacity-0"}
                    `}
                >
                    {description}
                </div>
            )}
        </div>
    );
};

export default Cardbox;
