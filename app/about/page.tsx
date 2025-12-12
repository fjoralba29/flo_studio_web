import Image from "next/image";
import Image38 from "@/assets/photos/image38.png";

const AboutPage = () => {
    return (
        <>
            {" "}
            <div className='relative'>
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-[400px]'
                    style={{
                        backgroundImage: `url(${Image38.src}) `,
                    }}
                />

                <div className='absolute top-[150px] left-0 right-0 text-center text-white flex flex-col gap-[5px]'>
                    <h1>ABOUT</h1>

                    <div className='subtitle tracking-[10px]'>
                        LEARN MORE ABOUT US
                    </div>
                </div>
            </div>
            <div>
                {/* My Story */}
                <section className='flex flex-col md:flex-row items-center gap-8'>
                    <div className='md:w-1/2'>
                        <Image
                            src='/my-story.jpg' // replace with your photo
                            alt='Photographer'
                            width={500}
                            height={500}
                            className='rounded-lg object-cover'
                        />
                    </div>
                    <div className='md:w-1/2 space-y-4'>
                        <h2 className='text-3xl font-semibold'>My Story</h2>
                        <p>
                            Hi, I’m [Your Name], a passionate photographer based
                            in [City]. Photography has been my life for [X]
                            years, turning fleeting moments into timeless
                            memories. I believe every picture tells a story, and
                            my mission is to capture yours in its most authentic
                            form.
                        </p>
                    </div>
                </section>

                {/* Style & Philosophy */}
                <section className='space-y-6'>
                    <h2 className='text-3xl font-semibold text-center'>
                        My Style & Philosophy
                    </h2>
                    <p className='text-center max-w-3xl mx-auto'>
                        I specialize in [portrait / wedding / lifestyle /
                        editorial] photography. My style is [candid, natural,
                        artistic], focusing on genuine emotions and beautiful
                        storytelling. Every session is unique, tailored to your
                        personality and the moments that matter most.
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                        <Image
                            src='/style1.jpg'
                            alt='Sample 1'
                            width={400}
                            height={300}
                            className='rounded-lg object-cover'
                        />
                        <Image
                            src='/style2.jpg'
                            alt='Sample 2'
                            width={400}
                            height={300}
                            className='rounded-lg object-cover'
                        />
                        <Image
                            src='/style3.jpg'
                            alt='Sample 3'
                            width={400}
                            height={300}
                            className='rounded-lg object-cover'
                        />
                    </div>
                </section>

                {/* Behind the Scenes */}
                <section className='flex flex-col md:flex-row items-center gap-8'>
                    <div className='md:w-1/2 space-y-4'>
                        <h2 className='text-3xl font-semibold'>
                            Behind the Scenes
                        </h2>
                        <p>
                            I love what I do, and I believe the process should
                            be just as enjoyable as the final images. From
                            creative shoots to spontaneous moments, I ensure
                            every session is fun, comfortable, and memorable.
                        </p>
                    </div>
                    <div className='md:w-1/2'>
                        <Image
                            src='/behind.jpg' // replace with behind the scenes photo
                            alt='Behind the scenes'
                            width={500}
                            height={500}
                            className='rounded-lg object-cover'
                        />
                    </div>
                </section>

                {/* Achievements & Recognition */}
                <section className='space-y-6 text-center'>
                    <h2 className='text-3xl font-semibold'>
                        Achievements & Recognition
                    </h2>
                    <p>
                        Over the years, I’ve had the honor to work with amazing
                        clients, feature in [magazines, blogs, exhibitions], and
                        receive [awards/certifications]. Each project fuels my
                        passion for capturing stories that last a lifetime.
                    </p>
                    <div className='flex justify-center gap-4 flex-wrap mt-4'>
                        <Image
                            src='/award1.jpg'
                            alt='Award 1'
                            width={100}
                            height={100}
                            className='rounded-full'
                        />
                        <Image
                            src='/award2.jpg'
                            alt='Award 2'
                            width={100}
                            height={100}
                            className='rounded-full'
                        />
                        <Image
                            src='/award3.jpg'
                            alt='Award 3'
                            width={100}
                            height={100}
                            className='rounded-full'
                        />
                    </div>
                </section>

                {/* Call to Action */}
                <section className='text-center space-y-6'>
                    <h2 className='text-3xl font-semibold'>
                        Let’s Work Together
                    </h2>
                    <p>
                        Whether it’s a wedding, family session, or personal
                        portrait, I’d love to capture your story.
                    </p>
                    <a
                        href='/contact'
                        className='inline-block px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition'
                    >
                        Book Your Session
                    </a>
                </section>
            </div>
        </>
    );
};

export default AboutPage;
