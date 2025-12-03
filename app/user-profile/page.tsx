"use client";

import Image from "next/image";
import Image11 from "@/assets/photos/image11.png";
import Image38 from "@/assets/photos/image38.png";
import Button from "@/component/atoms/Button/Button";
import { useUserStore } from "@/src/store/userStore";
import Gallery from "@/component/molecules/Gallery/Gallery";
import UrlWithDownload from "@/component/molecules/UrlWithDownload/UrlWithDownload";
import UserHeader from "@/component/molecules/Header/UserHeader";
import UserFooter from "@/component/molecules/Footer/UserFooter";

const UserProfile = () => {
    const { user } = useUserStore();
    const { name, email, phone, type } = user || {}; // Destructure user info safely
    console.log(type, "typeeeeeeeeeee");

    return (
        <>
            <div className='flex flex-col gap-[50px] '>
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-[400px]'
                    style={{
                        backgroundImage: `url(${Image38.src}) `,
                    }}
                />

                <div className='mt-[-150px] px-[150px] flex items-end gap-[100px]'>
                    <Image
                        src={Image11}
                        alt='Profile'
                        width={250}
                        className='rounded-lg border border-white border-4 shadow-lg'
                    />

                    <div className='flex flex-col gap-[20px] pb-[20px]'>
                        <h1>{name}</h1>
                        <div>{email}</div>
                        <div>{phone}</div>
                    </div>
                </div>
                <div className='flex bg-grey-light justify-center gap-[20px] p-[20px]  mx-[150px] rounded-lg'>
                    <Button
                        theme='tertiary'
                        className=''
                    >
                        Birthday
                    </Button>
                    <Button theme='tertiary'>Wedding</Button>
                    <Button theme='tertiary'>Event</Button>
                </div>
                <div className='px-[150px] flex gap-[20px] '>
                    <div className='section-title w-[70%]'>
                        Photos
                        <div className=''>
                            <Gallery
                                images={[
                                    "/photos/image4.png",
                                    "/photos/image9.png",
                                    "/photos/image10.png",
                                    "/photos/image11.png",
                                    "/photos/image11.png",
                                    "/photos/image10.png",
                                    "/photos/image4.png",
                                ]}
                            />
                            <Gallery images={[]} />
                        </div>
                    </div>
                    <div className='section-title w-[30%]'>
                        URL-s
                        <div>
                            <UrlWithDownload
                                urls={[
                                    {
                                        url: "https://google.com",
                                        label: "Google",
                                    },
                                    {
                                        url: "https://google.com",
                                        label: "Google",
                                    },
                                    {
                                        url: "https://google.com",
                                        label: "Google",
                                    },
                                ]}
                            />
                            <UrlWithDownload urls={[]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
