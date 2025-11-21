"use client";

import BackgroundImage from "@/assets/photos/background-image.png";
import Logo from "@/assets/photos/Logo.png";
import Button from "@/component/Button/Button";
import Form from "@/component/Form/Form";
import Input from "@/component/Input/Input";
import Image from "next/image";
import z from "zod";

const Register = () => {
    const formSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    }); // Define your form schema here

    const handleSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <div
            className='w-full h-full bg-cover bg-center flex gap-4 justify-between items-center p-40'
            style={{
                backgroundImage: `url(${BackgroundImage.src}) `,
            }}
        >
            <Form
                onSubmit={handleSubmit}
                defaultValues={{}}
                schema={formSchema}
                className='bg-cocoa p-8 rounded-md flex flex-col gap-[20px] text-white min-w-[400px] '
                resetOnSubmit
            >
                <div className='section-title text-center'>JOIN US</div>
                <Input
                    name='name'
                    label='Name'
                />
                <Input
                    name='email'
                    label='Email'
                />
                <Input
                    name='phone'
                    label='Phone'
                />
                <Input
                    name='password'
                    label='Password'
                    type='password'
                />
                <div className='flex flex-col gap-[5px]'>
                    <Button
                        type='submit'
                        theme='secondary'
                    >
                        Register
                    </Button>
                    <div className='flex items-center justify-center gap-[5px] text-sm '>
                        <div>Already have an account?</div>
                        <a
                            className='font-bold'
                            href='/login'
                        >
                            Login
                        </a>
                    </div>
                </div>
            </Form>
            <Image
                src={Logo}
                alt='Background Image'
                width={500}
            />
        </div>
    );
};

export default Register;
