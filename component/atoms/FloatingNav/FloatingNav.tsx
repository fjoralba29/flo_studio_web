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
            <div className='relative flex items-center gap-10 rounded-2xl bg-white px-10 py-4 shadow-xl'>
                {menuItems?.map((item) => {
                    const isActive = active === item.key;

                    return (
                        <button
                            key={item.key}
                            onClick={() => handleOnClick(item.key)}
                            className='relative flex flex-col items-center justify-center'
                        >
                            {isActive && (
                                // <span className='w-[80px]'>
                                <Image
                                    src={item.img}
                                    alt={item.label}
                                    width={72}
                                    height={28}
                                    className=' absolute -top-15 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all'
                                />
                                // </span>
                            )}

                            <Image
                                src={item.img}
                                alt={item.label}
                                width={48}
                                height={48}
                                className={`transition-opacity rounded-md ${
                                    isActive ? "opacity-0 h-0" : "opacity-100"
                                }`}
                            />

                            <span
                                className={`mt-2 text-sm transition-opacity ${
                                    isActive ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
export default FloatingNav;
