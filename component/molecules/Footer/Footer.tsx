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

const Footer = () => {
    const { mutate: loginUser } = useLogin();

    const formSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    }); // Define your form schema here

    const handleSubmit = (data: any) => {
        loginUser(data);
    };
    return (
        <div className='bg-grape flex justify-between items-center px-[100px] py-[50px] text-white'>
            <div className='flex flex-col gap-[20px]'>
                <Image
                    src={"/photos/Logo.png"}
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
                <Form
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    schema={formSchema}
                    className='flex flex-col gap-[20px] text-white min-w-[400px] '
                    resetOnSubmit
                >
                    <div className='section-title text-center'>Log in</div>
                    <Input
                        name='email'
                        label='Email'
                    />
                    <Input
                        name='password'
                        label='Password'
                        type='password'
                    />
                    <div className='flex flex-col gap-[5px]'>
                        <Button
                            type='submit'
                            theme='primary'
                            className='!!bg-lila'
                        >
                            Login
                        </Button>
                        <div className='flex items-center justify-center gap-[5px] text-sm '>
                            <div>Don't have an account?</div>
                            <a
                                className='font-bold'
                                href='/register'
                            >
                                Register
                            </a>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Footer;
