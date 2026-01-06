import Footer from "@/component/molecules/Footer/Footer";
import Header from "@/component/molecules/Header/Header";
import Image from "next/image";

const ContactPage = () => {
    return (
        <>
            <Header />
            <div className='relative'>
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-[400px]'
                    style={{
                        backgroundImage: `url(${"/photos/image38.png"}) `,
                    }}
                />

                <div className='absolute top-[150px] left-0 right-0 text-center text-white flex flex-col gap-[5px]'>
                    <h1>CONTACT</h1>
                </div>
            </div>
            <div className='max-w-6xl mx-auto px-4 py-16 space-y-20'>
                {/* Hero */}
                <section className='text-center space-y-4'>
                    <h1 className='text-4xl md:text-5xl font-bold'>
                        Let’s Create Something Beautiful
                    </h1>
                    <p className='text-gray-600 max-w-2xl mx-auto'>
                        Have a project in mind or want to book a session? Fill
                        out the form below and I’ll get back to you as soon as
                        possible.
                    </p>
                </section>

                {/* Content */}
                <section className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                    {/* Left: Image */}
                    <div className='relative w-full h-[500px] rounded-lg overflow-hidden'>
                        <Image
                            src='/photos/LogoColor.png' // replace with your image
                            alt='Photography contact'
                            fill
                            className='object-cover'
                        />
                    </div>

                    {/* Right: Form */}
                    <form className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Full Name
                            </label>
                            <input
                                type='text'
                                placeholder='Your name'
                                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                placeholder='you@email.com'
                                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Type of Shoot
                            </label>
                            <select className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black'>
                                <option>Wedding</option>
                                <option>Portrait</option>
                                <option>Lifestyle</option>
                                <option>Commercial</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium mb-1'>
                                Message
                            </label>
                            <textarea
                                rows={5}
                                placeholder='Tell me about your project...'
                                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black'
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition'
                        >
                            Send Message
                        </button>
                    </form>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ContactPage;
