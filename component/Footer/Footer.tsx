import Image from "next/image";
import Logo from "@/assets/photos/Logo.png";
import Location from "@/assets/icons/Location.svg";
import Phone from "@/assets/icons/Phone.svg";
import Email from "@/assets/icons/Email.svg";
import Web from "@/assets/icons/Web.svg";
import InstagramFill from "@/assets/icons/InstagramFill.svg";
import Whatsapp from "@/assets/icons/Whatsapp.svg";
import Form from "../Form/Form";
import InputPlain from "../Input/InputPlain";
import Button from "../Button/Button";

const Footer = () => {
    return (
        <div className='bg-grape flex justify-between items-center px-[100px] py-[50px] text-white'>
            <div className='flex flex-col gap-[20px]'>
                <Image
                    src={Logo}
                    alt='Logo'
                    width={120}
                    height={120}
                />
                <div className='flex gap-[5px] items-center info-subtext'>
                    <Image
                        src={Location}
                        alt='Location'
                    />{" "}
                    Tirane, Albania
                </div>
                <div className='flex gap-[5px] items-center info-subtext'>
                    <Image
                        src={Phone}
                        alt='Phone'
                    />
                    (+355)685017244
                </div>
                <div className='flex gap-[5px] items-center info-subtext'>
                    <Image
                        src={Email}
                        alt='Email'
                    />{" "}
                    flostudio.al@gmail.com
                </div>
                <div className='flex gap-[5px] items-center info-subtext'>
                    <Image
                        src={Web}
                        alt='Web'
                    />{" "}
                    flostudio.al
                </div>
                <div className='flex gap-[10px] items-center'>
                    <Image
                        src={InstagramFill}
                        alt='Instagram'
                    />
                    <Image
                        src={Whatsapp}
                        alt='Whatsapp'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-[40px] items-center min-w-[400px]'>
                <div className='info-text'>JOIN NOW</div>
                <div className='flex flex-col gap-[20px] w-full items-center'>
                    <InputPlain placeholder='Username' />
                    <InputPlain placeholder='Password' />
                    <Button
                        theme='primary'
                        size='m'
                        className='w-full'
                    >
                        Log In
                    </Button>
                    <div className='flex gap-[5px] info-subtext'>
                        Don't have an account?<a>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
