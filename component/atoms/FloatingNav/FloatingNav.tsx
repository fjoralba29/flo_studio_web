"use client";

import Image from "next/image";
import { useCategoryStore } from "@/src/store/categories";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
    menuItems: { key: string; label: string; img: string }[];
};

const FloatingNav = ({ menuItems }: Props) => {
    const setSelectedTypeId = useCategoryStore(
        (state) => state.setSelectedTypeId
    );
    const selectedTypeId = useCategoryStore((state) => state.selectedTypeId);

    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        if (category) {
            setSelectedTypeId(Number(category));
        }
    }, [category]);

    const handleOnClick = (key: any) => {
        setSelectedTypeId(key);
    };

    return (
        <div className='p-4 sm:p-10'>
            {/* Flex container: vertical on md+, horizontal scrollable on mobile */}
            <div className='flex flex-row md:flex-col items-center md:items-center gap-6 md:gap-10 overflow-x-auto md:overflow-visible px-6 md:px-6 py-6 md:py-6 rounded-2xl shadow-xl bg-[#343a40]'>
                {menuItems.map((item) => {
                    const isActive =
                        selectedTypeId !== null &&
                        String(selectedTypeId) === String(item.key);

                    return (
                        <button
                            key={item.key}
                            onClick={() => handleOnClick(item.key)}
                            className='relative flex-shrink-0 flex items-center justify-center'
                        >
                            <div
                                className={`
                                    w-12 h-12
                                    rounded-full
                                    overflow-hidden
                                    transition-all duration-300 ease-out
                                    flex items-center justify-center
                                    ${
                                        isActive
                                            ? "scale-150 -translate-y-2 md:-translate-y-6 shadow-xl z-10"
                                            : "scale-100 opacity-80"
                                    }
                                `}
                            >
                                <Image
                                    src={item.img}
                                    alt={item.label}
                                    fill
                                    className='object-cover'
                                />
                            </div>

                            <div
                                className={`
                                    absolute bottom-0 left-1/2
                                    -translate-x-1/2
                                    text-center
                                    transition-opacity duration-300
                                    ${
                                        isActive
                                            ? "text-white opacity-100 z-10"
                                            : "text-transparent opacity-0"
                                    }
                                `}
                            >
                                {item.label}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FloatingNav;
