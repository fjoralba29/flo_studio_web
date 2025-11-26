"use client";

import Image from "next/image";

type GalleryProps = {
    images: string[];
};

const Gallery = ({ images }: GalleryProps) => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {images.length > 0 ? (
                images?.map((src, idx) => (
                    <div
                        key={idx}
                        className='relative w-full h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg shadow-md group'
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${idx + 1}`}
                            fill
                            className='object-cover transition-transform duration-300 group-hover:scale-110'
                        />
                    </div>
                ))
            ) : (
                <div className='subtitle text-[var(--color-grey-dark)] text-center col-span-full'>
                    No images available.
                </div>
            )}
        </div>
    );
};

export default Gallery;
