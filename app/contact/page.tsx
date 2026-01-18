import Footer from "@/component/molecules/Footer/Footer";
import Header from "@/component/molecules/Header/Header";
import Instagram from "@/assets/icons/Instagram.svg";
import Image from "next/image";

const ContactPage = () => {
    return (
        <>
            <Header />

            {/* Hero Section */}
            <div className='relative'>
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-64 sm:h-80 md:h-96 lg:h-[400px]'
                    style={{
                        backgroundImage: `url("/photos/image38.png")`,
                    }}
                />

                <div className='absolute top-24 sm:top-28 md:top-32 left-0 right-0 text-center text-white flex flex-col gap-2'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
                        CONTACT
                    </h1>
                </div>
            </div>

            {/* Main Content */}

            <main
                className='min-h-screen flex items-center justify-center px-6 
    bg-gradient-to-br from-[#0D0B0F] via-[#adb5bd] to-[#0D0B0F]'
            >
                <div
                    className='max-w-3xl w-full rounded-2xl 
        bg-white/10 backdrop-blur-xl 
        border border-white/15 
        text-white p-10 text-center space-y-10 shadow-2xl'
                >
                    {/* Title */}
                    {/* <h1 className='text-4xl md:text-5xl font-light tracking-wide'>
                        Contact
                    </h1> */}

                    {/* Subtitle */}
                    <p className='text-white/70 text-lg leading-relaxed'>
                        Let’s work together. For collaborations, bookings, or
                        questions — reach out directly.
                    </p>

                    {/* Contact Info */}
                    <div className='flex flex-col gap-6 text-lg'>
                        {/* Email */}
                        <div>
                            <span className='block text-sm text-white/50'>
                                Email
                            </span>
                            <a
                                href='mailto:hello@flostudio.al'
                                className='hover:underline'
                            >
                                hello@flostudio.al
                            </a>
                        </div>

                        {/* Phone */}
                        <div>
                            <span className='block text-sm text-white/50'>
                                Phone / WhatsApp
                            </span>
                            <a
                                href='tel:+355690000000'
                                className='hover:underline'
                            >
                                +355 69 000 0000
                            </a>
                        </div>

                        {/* Instagram */}
                        <div className='flex flex-col items-center gap-2'>
                            <span className='block text-sm text-white/50'>
                                Instagram
                            </span>
                            <a
                                href='https://www.instagram.com/flostudio.al'
                                target='_blank'
                                className='flex items-center gap-2 hover:opacity-80'
                            >
                                <Image
                                    src={Instagram}
                                    alt='Instagram'
                                    width={22}
                                    height={22}
                                />
                                @flostudio.al
                            </a>
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className='text-sm text-white/40 pt-10'>
                        Based in Albania · Available worldwide
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default ContactPage;

//  <div className='max-w-6xl mx-auto px-6 sm:px-10 lg:px-24 py-12 space-y-16'>
//                 {/* Hero Text */}
//                 <section className='text-center space-y-4'>
//                     <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
//                         Let’s Create Something Beautiful
//                     </h1>
//                     <p className='text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg'>
//                         Have a project in mind or want to book a session? Fill
//                         out the form below and I’ll get back to you as soon as
//                         possible.
//                     </p>
//                 </section>

//                 {/* Form & Image */}
//                 <section className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start md:items-center'>
//                     {/* Left: Image */}
//                     <div className='relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden'>
//                         <Image
//                             src='/photos/LogoColor.png' // replace with your image
//                             alt='Photography contact'
//                             fill
//                             className='object-cover'
//                         />
//                     </div>
