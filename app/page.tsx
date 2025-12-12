import Image from "next/image";
import PrimaryPhoto from "../assets/photos/PrimaryPhoto.png";
import Logo from "@/assets/photos/Logo.png";
import Image11 from "@/assets/photos/image11.png";
import Categories from "@/component/molecules/Categories/Categories";
import Footer from "@/component/molecules/Footer/Footer";
import Collaborations from "@/component/molecules/Collaborations/Collaborations";
import Services from "@/component/molecules/Services/Services";
import Header from "@/component/molecules/Header/Header";

export default function Home() {
    return (
        <>
            <div className='relative'>
                <Image
                    src={PrimaryPhoto}
                    alt='Logo'
                    className='w-full'
                    height={770}
                />
                <div className='absolute top-[450px] left-0 right-0 text-center text-white flex flex-col gap-[5px]'>
                    <h1>ART STARTS RIGHT HERE</h1>

                    <div className='subtitle tracking-[10px]'>
                        TURN MOMENTS INTO MASTERPIECES
                    </div>
                </div>
            </div>
            <div className='bg-grape flex items-center p-[100px] justify-between'>
                <div className='border border-[#583C84] rounded-[8px] max-w-[700px] p-[60px] text-white flex flex-col gap-6 text-lg'>
                    <p>
                        From the first click to the final frame, we deliver
                        high-quality artistry and a personalized experience
                        you’ll always remember.
                    </p>
                    <div className=' xp text-end'>| floStudio</div>
                    <div className='xp'>Learn more</div>
                </div>
                <div>
                    <Image
                        src={Logo}
                        alt='Logo'
                        width={458}
                        height={324}
                    />
                </div>
            </div>
            <Collaborations />
            <Services />
            <Categories />

            <div className='bg-lila text-white flex flex-col py-[50px] px-[100px] items-center gap-[20px]'>
                <div className='info-text'>YOUR PERSONAL PROFILE</div>
                <div className='flex items-center justify-between gap-[20px]'>
                    <div className='flex flex-col gap-[50px] info-subtext'>
                        When you log in, you’ll have access to your own private
                        profile — a secure space where all your wedding memories
                        are stored.
                        <ul className='info-subtext'>
                            <li className='info-subtext'>
                                View and download your photos in high quality
                            </li>
                            <li className='info-subtext'>
                                Access private links to your wedding videos
                            </li>
                            <li className='info-subtext'>
                                Share with friends and family anytime
                            </li>
                        </ul>
                        <p className='info-subtext'>
                            Your story, beautifully captured — always just one
                            click away.
                        </p>
                    </div>
                    <Image
                        src={Image11}
                        alt='Image'
                        width={500}
                    />
                </div>
            </div>
        </>
    );
}
