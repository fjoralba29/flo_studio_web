"use client";

import { useState } from "react";
import Image from "next/image";
import { useCategoryStore } from "@/src/store/categories";

type Props = {
    menuItems: { key: string; label: string; img: string }[];
};

const FloatingNav = ({ menuItems }: Props) => {
    const [active, setActive] = useState("home");
    const setSelectedTypeId = useCategoryStore(
        (state) => state.setSelectedTypeId
    );

    const handleOnClick = (key: any) => {
        setActive(key);
        setSelectedTypeId(key);
    };

    return (
        <div className='p-[50px]'>
            <div className='flex flex-col items-center gap-10 rounded-2xl px-10 py-6 shadow-xl'>
                {menuItems.map((item) => {
                    const isActive = active === item.key;

                    return (
                        <button
                            key={item.key}
                            onClick={() => handleOnClick(item.key)}
                            className='relative flex items-center justify-center'
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
                                            ? "scale-150 -translate-y-6 shadow-xl"
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
                                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${
                                    isActive ? "text-white" : "text-transparent"
                                }`}
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
