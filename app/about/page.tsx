import Image from "next/image";
import Header from "@/component/molecules/Header/Header";
import Footer from "@/component/molecules/Footer/Footer";

const AboutPage = () => {
    return (
        <>
            <Header />

            {/* Hero section */}
            <div className='relative'>
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-64 sm:h-80 md:h-96 lg:h-[400px]'
                    style={{
                        backgroundImage: `url("/photos/image38.png")`,
                    }}
                />
                <div className='absolute top-32 sm:top-36 md:top-40 left-0 right-0 text-center text-white flex flex-col gap-2'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
                        ABOUT
                    </h1>
                    <div className='subtitle tracking-[5px] sm:tracking-[10px] text-sm sm:text-base md:text-lg'>
                        LEARN MORE ABOUT US
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className='px-6 sm:px-10 lg:px-24 py-12 flex flex-col gap-12'>
                {/* My Story */}
                {/* About Us – Team Section */}
                <section className='px-6 sm:px-10 lg:px-24 py-16 text-center max-w-5xl mx-auto'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-6'>
                        A Full-Service Photography & Videography Team
                    </h2>

                    <p className='text-sm sm:text-base md:text-lg leading-relaxed text-gray-700'>
                        We are a fully equipped team of professional
                        photographers and videographers, specialized in
                        capturing powerful visual stories. With years of
                        experience and high-end equipment, we have successfully
                        completed numerous projects across Albania and
                        internationally.
                        <br />
                        <br />
                        From commercial campaigns and events to creative
                        productions and cinematic storytelling, our team
                        delivers high-quality visuals that meet global
                        standards. Every project is approached with creativity,
                        precision, and a deep understanding of our clients’
                        vision.
                    </p>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10'>
                        <Image
                            src='/photos/image11.png'
                            alt='Photography project'
                            width={400}
                            height={300}
                            className='rounded-lg object-cover w-full'
                        />
                        <Image
                            src='/photos/image11.png'
                            alt='Videography project'
                            width={400}
                            height={300}
                            className='rounded-lg object-cover w-full'
                        />
                        <Image
                            src='/photos/image11.png'
                            alt='International project'
                            width={400}
                            height={300}
                            className='rounded-lg object-cover w-full'
                        />
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default AboutPage;
