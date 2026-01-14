"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useUserStore } from "@/src/store/userStore";
import { useDeletePhotos } from "@/src/apis/uploadImage";

type GalleryImage = {
    id: number;
    url: string;
};

type GalleryProps = {
    images: GalleryImage[];
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
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
    const { mutate: deletePhoto } = useDeletePhotos();
    const user = useUserStore((state) => state.user);
    const { type } = user || {};

    /** 🔥 LOCAL OPTIMISTIC STATE */
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(images);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [loadingImages, setLoadingImages] = useState<boolean[]>([]);

    /** 🔄 Sync when parent data changes */
    useEffect(() => {
        setGalleryImages(images);
        setLoadingImages(Array(images.length).fill(true));
    }, [images]);

    const openImage = (index: number) => setActiveIndex(index);
    const close = () => setActiveIndex(null);

    const next = useCallback(() => {
        setActiveIndex((i) =>
            i === null ? null : (i + 1) % galleryImages.length
        );
    }, [galleryImages.length]);

    const prev = useCallback(() => {
        setActiveIndex((i) =>
            i === null
                ? null
                : (i - 1 + galleryImages.length) % galleryImages.length
        );
    }, [galleryImages.length]);

    const handleImageLoad = (index: number) => {
        setLoadingImages((prev) => {
            const updated = [...prev];
            updated[index] = false;
            return updated;
        });
    };

    /** 🗑️ DELETE (OPTIMISTIC) */
    const handleDeleteImage = (imageId: number) => {
        setGalleryImages((prev) => prev.filter((img) => img.id !== imageId));

        setActiveIndex(null);
        deletePhoto(imageId);
    };

    return (
        <>
            {/* GRID */}
            <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='show'
                className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'
            >
                {galleryImages.length > 0 ? (
                    galleryImages.map((image, idx) => {
                        return (
                            <motion.div
                                key={image.id}
                                variants={itemVariants}
                                className='relative w-full h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg shadow-md group bg-gray-200'
                            >
                                {/* LOADING */}
                                {loadingImages[idx] && (
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin' />
                                    </div>
                                )}

                                {/* IMAGE */}
                                <div
                                    onClick={() => openImage(idx)}
                                    className='absolute inset-0 cursor-pointer'
                                >
                                    <Image
                                        src={image.url}
                                        alt={`Gallery image ${idx + 1}`}
                                        fill
                                        className='object-cover transition-transform duration-300 group-hover:scale-110'
                                        onLoadingComplete={() =>
                                            handleImageLoad(idx)
                                        }
                                    />
                                </div>

                                {/* ADMIN DELETE */}
                                {type === "Admin" && (
                                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none'>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(image.id);
                                            }}
                                            className='pointer-events-auto p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition'
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })
                ) : (
                    <div className='col-span-full flex items-center justify-center text-gray-500'>
                        No images available.
                    </div>
                )}
            </motion.div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {activeIndex !== null && galleryImages[activeIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center'
                        onClick={close}
                    >
                        <motion.div
                            key={galleryImages[activeIndex].id}
                            initial={{
                                scale: 0.9,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 0.9,
                                opacity: 0,
                            }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            className='relative w-[90vw] h-[80vh]'
                        >
                            <Image
                                src={galleryImages[activeIndex].url}
                                alt='Preview image'
                                fill
                                priority
                                className='object-contain'
                            />
                        </motion.div>

                        {/* CONTROLS */}
                        <button
                            onClick={close}
                            className='absolute top-6 right-6 text-white p-2 hover:scale-110 transition'
                        >
                            <X size={32} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            className='absolute left-6 text-white p-3 hover:scale-110 transition'
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            className='absolute right-6 text-white p-3 hover:scale-110 transition'
                        >
                            <ChevronRight size={40} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;
