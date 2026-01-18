"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useUserStore } from "@/src/store/userStore";
import { useDeletePhotos } from "@/src/apis/uploadImage";
import { usePathname } from "next/navigation";
import Container, { EmptyState } from "@/component/atoms/Container/Container";

type GalleryImage = {
    id: number;
    url: string;
};

type GalleryProps = {
    images: GalleryImage[];
    isLoading?: boolean;
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

const Gallery = ({ images, isLoading = false }: GalleryProps) => {
    const { mutate: deletePhoto } = useDeletePhotos();
    const user = useUserStore((state) => state.user);
    const { type } = user || {};
    const pathname = usePathname();

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

    const handleDeleteImage = (imageId: number) => {
        setGalleryImages((prev) => prev.filter((img) => img.id !== imageId));
        setActiveIndex(null);
        deletePhoto(imageId);
    };

    const canDelete = type === "Admin" && pathname !== "/portfolio";

    return (
        <>
            {/* 🔹 CONTAINER HANDLES LOADING + EMPTY */}
            <Container
                isLoading={isLoading}
                isEmpty={!isLoading && galleryImages.length === 0}
                emptyComponent={
                    <EmptyState
                        title='No images yet'
                        description='Upload your first photo to showcase your work.'
                    />
                }
            >
                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    animate='show'
                    className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'
                >
                    {galleryImages.map((image, idx) => (
                        <motion.div
                            key={image.id}
                            variants={itemVariants}
                            className='relative w-full h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg shadow-md group bg-gray-200'
                        >
                            {/* IMAGE LOADER */}
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

                            {/* DELETE */}
                            {canDelete && (
                                <div className='absolute inset-0 bg-black/40 flex items-start justify-start pointer-events-none md:opacity-0 md:group-hover:opacity-100 transition-opacity'>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteImage(image.id);
                                        }}
                                        className='pointer-events-auto p-3 text-white rounded-full hover:bg-red-700 transition'
                                    >
                                        🗑️
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </Container>

            {/* 🔹 LIGHTBOX */}
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
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
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

                        <button
                            onClick={close}
                            className='absolute top-6 right-6 text-white p-2'
                        >
                            <X size={32} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            className='absolute left-6 text-white p-3'
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            className='absolute right-6 text-white p-3'
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
