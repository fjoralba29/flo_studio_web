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
                relative group w-full ${width} 
                /* Change fixed height to min-height */
                min-h-[140px] h-auto 
                rounded-3xl p-6 cursor-pointer overflow-hidden
                bg-[#e9ecef] text-[#0D0B0F] transition-all duration-500 ease-in-out
                hover:bg-[#adb5bd] hover:shadow-xl
                flex flex-col
                ${isOpen ? "bg-[#adb5bd] shadow-xl justify-start items-start" : "justify-center items-center"}
                
                /* Desktop hover logic */
                md:hover:justify-start md:hover:items-start
            `}
        >
            {/* Title */}
            <div
                className={`
                    text-lg font-semibold transition-all duration-300
                    ${isOpen ? "text-left mb-3" : "text-center"}
                    /* Desktop hover */
                    md:group-hover:text-left md:group-hover:mb-3
                `}
            >
                {title}
            </div>

            {/* Description */}
            {description && (
                <div
                    className={`
                        text-xs leading-relaxed transition-all duration-500
                        /* Mobile: Show fully when open, hide when closed */
                        ${
                            isOpen
                                ? "opacity-100 translate-y-0 max-h-[500px]"
                                : "opacity-0 translate-y-2 max-h-0 md:max-h-0"
                        }
                        
                        /* Desktop: Show on hover */
                        md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:max-h-[500px]
                        
                        /* Ensure text doesn't wrap weirdly during transition */
                        overflow-hidden
                    `}
                >
                    {description}
                </div>
            )}
        </div>
    );
};

export default Cardbox;
