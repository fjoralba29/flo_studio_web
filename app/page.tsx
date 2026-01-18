import Image from "next/image";
import Header from "@/component/molecules/Header/Header";
import Footer from "@/component/molecules/Footer/Footer";
import dynamic from "next/dynamic";

const Services = dynamic(
    () => import("@/component/molecules/Services/Services")
);
const Categories = dynamic(
    () => import("@/component/molecules/Categories/Categories")
);
const Collaborations = dynamic(
    () => import("@/component/molecules/Collaborations/Collaborations")
);

export default function Home() {
    return (
        <>
            <Header />

            {/* HERO */}
            <div className='relative'>
                <div className='relative w-full h-[60vh] sm:h-[70vh] lg:h-[90vh]'>
                    <Image
                        src='/photos/Image1.jpg'
                        alt='Hero'
                        fill
                        priority
                        className='object-cover'
                    />

                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0D0B0F] to-transparent' />
                </div>

                <div className='absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center text-white text-center px-4'>
                    <div className='primary-title text-5xl sm:text-4xl lg:text-6xl font-bold '>
                        ART STARTS RIGHT HERE
                    </div>
                    <div className='mt-3 text-xs sm:text-sm lg:text-lg tracking-[4px] sm:tracking-[8px]'>
                        TURN MOMENTS INTO MASTERPIECES
                    </div>
                </div>
            </div>

            {/* INTRO SECTION */}
            <div className='bg-[#0D0B0F] flex flex-col lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-[100px] py-16'>
                <div className='border border-[#583C84] rounded-lg max-w-[700px] p-6 sm:p-10 text-white flex flex-col gap-6 text-base sm:text-lg'>
                    <p>
                        From the first click to the final frame, we deliver
                        high-quality artistry and a personalized experience
                        you’ll always remember.
                    </p>

                    <div className='text-end opacity-70'>| floStudio</div>
                    <div className='underline cursor-pointer w-fit'>
                        Learn more
                    </div>
                </div>

                <Image
                    src='/photos/Logo.png'
                    alt='Logo'
                    width={458}
                    height={324}
                    className='w-[200px] sm:w-[300px] lg:w-[450px]'
                />
            </div>

            <Collaborations />
            <Services />
            <Categories />

            {/* PROFILE SECTION */}
            <div className='bg-[#161219] text-white flex flex-col py-12 sm:py-16 px-6 sm:px-12 lg:px-[100px] gap-10'>
                <h2 className='section-title text-xl sm:text-2xl lg:text-3xl '>
                    YOUR PERSONAL PROFILE
                </h2>

                <div className='flex flex-col lg:flex-row items-center justify-between gap-10 '>
                    <div className='flex flex-col gap-6 text-sm sm:text-base max-w-xl'>
                        <p>
                            When you log in, you’ll have access to your own
                            private profile — a secure space where all your
                            wedding memories are stored.
                        </p>

                        <ul className='list-disc pl-5 space-y-2'>
                            <li>
                                View and download your photos in high quality
                            </li>
                            <li>Access private links to your wedding videos</li>
                            <li>Share with friends and family anytime</li>
                        </ul>

                        <p>
                            Your story, beautifully captured — always just one
                            click away.
                        </p>
                    </div>

                    <Image
                        src='/photos/image11.png'
                        alt='Profile preview'
                        width={300}
                        height={300}
                        className='w-full max-w-[350px] sm:max-w-[450px]'
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}
