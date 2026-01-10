"use client";

import { useUserStore } from "@/src/store/userStore";
import Image from "next/image";
import { motion, Transition } from "framer-motion";

type GalleryProps = {
    images: string[];
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08, // one-by-one effect
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.96,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.45,
            ease: "easeOut",
        } as Transition,
    },
};

const Gallery = ({ images }: GalleryProps) => {
    const user = useUserStore((state) => state.user);
    const { type } = user || {};

    const handleDeleteImage = () => {};

    return (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='show'
            className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 grid-rows-[max-content]'
        >
            {images.length > 0 ? (
                images.map((src, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className='relative w-full h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg shadow-md group'
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${idx + 1}`}
                            fill
                            className='object-cover transition-transform duration-300 group-hover:scale-110'
                        />

                        {type === "Admin" && (
                            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
                                <button
                                    onClick={handleDeleteImage}
                                    className='p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition'
                                >
                                    🗑️
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))
            ) : (
                <div className='subtitle text-[var(--color-grey-dark)] text-center col-span-full'>
                    No images available.
                </div>
            )}
        </motion.div>
    );
};

export default Gallery;
