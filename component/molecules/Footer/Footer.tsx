"use client";

import Image from "next/image";
import Location from "@/assets/icons/Location.svg";
import Phone from "@/assets/icons/Phone.svg";
import Email from "@/assets/icons/Email.svg";
import Web from "@/assets/icons/Web.svg";
import InstagramFill from "@/assets/icons/InstagramFill.svg";
import Whatsapp from "@/assets/icons/Whatsapp.svg";
import Form from "../../atoms/Form/Form";
import Button from "../../atoms/Button/Button";
import Input from "@/component/atoms/Input/Input";
import { useLogin } from "@/src/apis/auth";
import z from "zod";
import { useUserStore } from "@/src/store/userStore";

const Footer = () => {
    const { user } = useUserStore();
    const { mutate: loginUser } = useLogin();

    const formSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const handleSubmit = (data: any) => {
        loginUser(data);
    };

    return (
        <footer className='bg-grape text-white px-6 sm:px-10 lg:px-[100px] pt-12 py-6 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)]'>
            <div className='flex flex-col  justify-between gap-12'>
                {/* LEFT SIDE */}
                <div className='flex flex-col lg:flex-row gap-12 lg:gap-64 justify-evenly items-center lg:items-start text-center lg:text-left'>
                    <Image
                        src='/photos/Logo.png'
                        alt='Logo'
                        width={300}
                        height={300}
                    />
                    <div className='flex flex-col gap-6 items-center lg:items-start text-center lg:text-left'>
                        <div className='flex items-center gap-2 text-sm'>
                            <Image
                                src={Location}
                                alt='Location'
                            />
                            Tirane, Albania
                        </div>

                        <div className='flex items-center gap-2 text-sm'>
                            <Image
                                src={Phone}
                                alt='Phone'
                            />
                            (+355) 68 501 7244
                        </div>

                        <div className='flex items-center gap-2 text-sm'>
                            <Image
                                src={Email}
                                alt='Email'
                            />
                            flostudio.al@gmail.com
                        </div>

                        <div className='flex items-center gap-2 text-sm'>
                            <Image
                                src={Web}
                                alt='Web'
                            />
                            flostudio.al
                        </div>

                        <div className='flex gap-4 mt-2'>
                            <a
                                href='https://www.instagram.com/flostudio.al'
                                target='_blank'
                            >
                                <Image
                                    src={InstagramFill}
                                    alt='Instagram'
                                />
                            </a>
                            <a
                                href='https://wa.me/355685017244'
                                target='_blank'
                            >
                                <Image
                                    src={Whatsapp}
                                    alt='Whatsapp'
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='w-full text-center text-sm text-white/70 py-4 bg-grape border-t'>
                    © 2026 Flo Studio. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
