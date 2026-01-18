import Footer from "@/component/molecules/Footer/Footer";
import Header from "@/component/molecules/Header/Header";
import WeddingPackages from "@/component/molecules/WeddingPackages/WeddingPackages";
import { Check } from "lucide-react";
import Image from "next/image";

const WeddingPage = () => {
    return (
        <>
            <Header />
            {/* Hero Section */}
            <div className='relative'>
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-64 sm:h-80 md:h-96 lg:h-[400px]'
                    style={{
                        backgroundImage: `url("/photos/image22.png")`,
                    }}
                />

                <div className='absolute top-24 sm:top-28 md:top-32 left-0 right-0 text-center text-white flex flex-col gap-2'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
                        WEDDING
                    </h1>
                </div>
            </div>
            {/* --- Header Section --- */}
            <section className='max-w-4xl mx-auto text-center py-16 px-6'>
                <h2 className='text-sm tracking-[0.2em] uppercase mb-6 opacity-60'>
                    Our Services
                </h2>
                <p className='text-xl md:text-2xl leading-relaxed italic font-serif'>
                    "We believe every love story deserves to be captured
                    beautifully. Our wedding packages are designed to fit your
                    needs, offering high-quality photography, creativity, and a
                    seamless experience — from the 'I do' to the last dance."
                </p>
            </section>
            {/* --- Pricing Section --- */}
            <section className='relative h-[500px] flex items-center justify-center overflow-hidden'>
                {/* Background Image with Overlay */}
                <div className='absolute inset-0 z-0'>
                    <Image
                        src='/photos/image23.png'
                        alt='Background'
                        fill
                        className='object-cover brightness-50'
                    />
                </div>

                <WeddingPackages />
            </section>
            {/* --- Gallery Grid --- */}
            <section className='max-w-6xl mx-auto py-20 px-4'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]'>
                    <div className='md:col-span-1 md:row-span-1 relative'>
                        <Image
                            src='/photos/image24.png'
                            fill
                            className='object-cover'
                            alt='Flowers'
                        />
                    </div>
                    <div className='md:col-span-2 md:row-span-2 relative'>
                        <Image
                            src='/photos/image25.png'
                            fill
                            className='object-cover'
                            alt='Boat Couple'
                        />
                    </div>
                    <div className='md:col-span-1 md:row-span-1 relative'>
                        <Image
                            src='/photos/image26.png'
                            fill
                            className='object-cover'
                            alt='Architecture'
                        />
                    </div>
                    <div className='md:col-span-1 md:row-span-2 relative'>
                        <Image
                            src='/photos/image32.png'
                            fill
                            className='object-cover'
                            alt='Mirror Reflection'
                        />
                    </div>
                    <div className='md:col-span-1 md:row-span-2 relative'>
                        <Image
                            src='/photos/image33.png'
                            fill
                            className='object-cover'
                            alt='Ceremony Arch'
                        />
                    </div>
                    <div className='md:col-span-1 md:row-span-1 relative'>
                        <Image
                            src='/photos/image30.png'
                            fill
                            className='object-cover'
                            alt='Detail Shot'
                        />
                    </div>
                </div>
            </section>
            {/* --- Profile Section --- */}
            <section className='bg-[#F8F3F0] py-20 px-6'>
                <div className='max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12'>
                    <div className='flex-1 space-y-6'>
                        <h2 className='text-3xl font-serif uppercase tracking-tight'>
                            Your Personal Wedding Profile
                        </h2>
                        <p className='text-sm text-gray-600 leading-relaxed'>
                            When you log in, you'll have access to your own
                            private profile — a secure space where all your
                            wedding memories are stored.
                        </p>
                        <ul className='space-y-3 text-sm italic'>
                            <li className='flex items-center gap-2'>
                                <Check size={14} /> View and download photos in
                                high quality
                            </li>
                            <li className='flex items-center gap-2'>
                                <Check size={14} /> Access private links to your
                                wedding videos
                            </li>
                            <li className='flex items-center gap-2'>
                                <Check size={14} /> Share with friends and
                                family anytime
                            </li>
                        </ul>
                        <p className='font-medium pt-4'>
                            Your story, beautifully captured — always just one
                            click away.
                        </p>
                    </div>
                    <div className='flex-1 w-full max-w-sm aspect-[3/4] relative'>
                        <Image
                            src='/photos/image24.png'
                            fill
                            className='object-cover rounded-sm shadow-xl'
                            alt='Beach Couple'
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default WeddingPage;
