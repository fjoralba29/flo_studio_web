"use client";

import Image from "next/image";
import Location from "@/assets/icons/Location.svg";
import Phone from "@/assets/icons/Phone.svg";
import Email from "@/assets/icons/Email.svg";
import Web from "@/assets/icons/Web.svg";
import InstagramFill from "@/assets/icons/InstagramFill.svg";
import Whatsapp from "@/assets/icons/Whatsapp.svg";

const AdminFooter = () => {
    return (
        <div className='bg-grape text-white px-4 py-6 md:px-16 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0'>
            {/* Logo */}
            <div className='flex justify-center md:justify-start'>
                <Image
                    src={"/photos/Logo.png"}
                    alt='Logo'
                    width={60}
                    height={60}
                />
            </div>

            {/* Contact info */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 text-[12px] text-center md:text-left'>
                <div className='flex items-center justify-start md:justify-start gap-1 md:gap-2'>
                    <Image
                        src={Location}
                        alt='Location'
                        width={16}
                        height={16}
                    />
                    Tirane, Albania
                </div>
                <div className='flex items-center justify-end md:justify-start gap-1 md:gap-2'>
                    <Image
                        src={Phone}
                        alt='Phone'
                        width={16}
                        height={16}
                    />
                    (+355)685017244
                </div>
                <div className='flex items-center justify-start md:justify-start gap-1 md:gap-2'>
                    <Image
                        src={Email}
                        alt='Email'
                        width={16}
                        height={16}
                    />
                    flostudio.al@gmail.com
                </div>
                <div className='flex items-center justify-end md:justify-start gap-1 md:gap-2'>
                    <Image
                        src={Web}
                        alt='Web'
                        width={16}
                        height={16}
                    />
                    flostudio.al
                </div>
            </div>

            {/* Social icons */}
            <div className='flex justify-center md:justify-end gap-4'>
                <Image
                    src={InstagramFill}
                    alt='Instagram'
                    width={24}
                    height={24}
                />
                <Image
                    src={Whatsapp}
                    alt='Whatsapp'
                    width={24}
                    height={24}
                />
            </div>
        </div>
    );
};

export default AdminFooter;
