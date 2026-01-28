"use client";

import useEmblaCarousel from "embla-carousel-react";

const videos = [
    {
        url: "https://www.youtube.com/watch?v=v2tGm0Upyhs",
        title: "Cinematic Reel",
    },
    {
        url: "https://www.youtube.com/watch?v=UZ0gPzxdeVg",
        title: "Commercial Video",
    },
    {
        url: "https://www.youtube.com/watch?v=tIfOpITNBt8",
        title: "Behind the Scenes",
    },
];

const getYouTubeId = (url: string) => {
    const regExp =
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

export default function VideoSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
    });

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    return (
        <section className='bg-black text-white py-24'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='flex flex-col lg:flex-row gap-12 items-center'>
                    {/* DESCRIPTION */}
                    <div className='w-full lg:w-5/12'>
                        <h2 className='text-4xl md:text-5xl font-light'>
                            Video Production
                        </h2>

                        <p className='mt-6 text-gray-300 leading-relaxed'>
                            Cinematic storytelling through motion. From photo
                            sets and portraits to brand-driven commercial
                            visuals — every video is crafted with intention and
                            emotion.
                        </p>
                    </div>

                    {/* VIDEO CAROUSEL */}
                    <div className='relative w-full lg:w-7/12'>
                        {/* LEFT ARROW */}
                        <button
                            onClick={scrollPrev}
                            className='absolute left-4 top-1/2 -translate-y-1/2 z-10
                         bg-black/60 hover:bg-black text-white
                         w-12 h-12 rounded-full flex items-center justify-center
                         backdrop-blur transition'
                            aria-label='Previous video'
                        >
                            ←
                        </button>

                        {/* RIGHT ARROW */}
                        <button
                            onClick={scrollNext}
                            className='absolute right-4 top-1/2 -translate-y-1/2 z-10
                         bg-black/60 hover:bg-black text-white
                         w-12 h-12 rounded-full flex items-center justify-center
                         backdrop-blur transition'
                            aria-label='Next video'
                        >
                            →
                        </button>

                        <div
                            ref={emblaRef}
                            className='overflow-hidden rounded-2xl'
                        >
                            <div className='flex'>
                                {videos.map((video, index) => {
                                    const videoId = getYouTubeId(video.url);
                                    if (!videoId) return null;

                                    return (
                                        <div
                                            key={index}
                                            className='flex-[0_0_100%]'
                                        >
                                            <div className='relative aspect-video rounded-2xl overflow-hidden shadow-2xl'>
                                                <iframe
                                                    className='absolute inset-0 w-full h-full'
                                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&playlist=${videoId}`}
                                                    allow='autoplay; encrypted-media'
                                                    allowFullScreen
                                                />
                                            </div>

                                            <p className='mt-4 text-sm text-gray-400 text-center'>
                                                {video.title}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
