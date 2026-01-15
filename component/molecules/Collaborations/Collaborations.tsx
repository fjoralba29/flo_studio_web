"use client";

import { CategoryType } from "@prisma/client";
import { useGetCategories } from "@/src/apis/categories";
import { useRouter } from "next/navigation";
import Cards from "../../atoms/Cards/Cards";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const GAP = 24; // gap-6

const Collaborations = () => {
    const { data } = useGetCategories();
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);

    // Update visible cards based on screen width
    useEffect(() => {
        const updateVisible = () => {
            if (window.innerWidth >= 1280) setVisibleCards(4);
            else if (window.innerWidth >= 1024) setVisibleCards(3);
            else if (window.innerWidth >= 640) setVisibleCards(2);
            else setVisibleCards(1);
        };

        updateVisible();
        window.addEventListener("resize", updateVisible);
        return () => window.removeEventListener("resize", updateVisible);
    }, []);

    const collaborations =
        data?.filter(
            (category: any) =>
                category.type === CategoryType.Collaboration &&
                category.primaryPhoto
        ) || [];

    const maxIndex = Math.max(collaborations.length - visibleCards, 0);

    // We calculate slide percentage based on the number of visible cards
    // 100% / visibleCards gives us the width of one card slot
    const slideX = -(index * (100 / visibleCards));

    return (
        <section className='w-full px-6 sm:px-10 lg:px-20 xl:px-[153px] py-12 sm:py-16'>
            <div className='text-center flex flex-col gap-2 mb-10'>
                <h2 className='section-title text-xl sm:text-2xl lg:text-3xl font-bold'>
                    Collaborations
                </h2>
                <p className='section-subtitle text-sm sm:text-base text-gray-600'>
                    From special occasions to styled shoots
                </p>
            </div>

            <div className='flex flex-col items-center gap-8'>
                {/* Viewport */}
                <div className='overflow-hidden w-full'>
                    <motion.div
                        className='flex'
                        style={{
                            gap: `${GAP}px`,
                            // Ensure the track is wide enough to hold all items without shrinking them
                            width: "100%",
                        }}
                        animate={{
                            x: `calc(${slideX}% - ${
                                (index * GAP) / visibleCards
                            }px)`,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                        }}
                    >
                        {collaborations.map((collaboration: any) => (
                            <div
                                key={collaboration.id}
                                className='shrink-0 place-items-center'
                                // Dynamically set width based on how many cards we want to see
                                style={{
                                    width: `calc((100% - ${
                                        (visibleCards - 1) * GAP
                                    }px) / ${visibleCards})`,
                                }}
                            >
                                <Cards
                                    photo={collaboration.primaryPhoto}
                                    title={collaboration.name}
                                    description={collaboration.description}
                                    type='collaboration'
                                    className='w-full h-full'
                                    onClick={() =>
                                        router.push(
                                            `/portfolio?category=${collaboration.id}`
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className='flex gap-4'>
                    <button
                        onClick={() =>
                            setIndex((prev) => Math.max(prev - 1, 0))
                        }
                        disabled={index === 0}
                        className='bg-white border border-gray-200 shadow-sm rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-2xl pb-1'
                    >
                        ‹
                    </button>

                    <button
                        onClick={() =>
                            setIndex((prev) => Math.min(prev + 1, maxIndex))
                        }
                        disabled={index >= maxIndex}
                        className='bg-white border border-gray-200 shadow-sm rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-2xl pb-1'
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Collaborations;
