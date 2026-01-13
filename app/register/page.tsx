"use client";

import Button from "@/component/atoms/Button/Button";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import { useRegister } from "@/src/apis/auth";
import Image from "next/image";
import z from "zod";

const Register = () => {
    const { mutate: registerUser } = useRegister();

    const formSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const handleSubmit = (data: any) => {
        registerUser(data);
    };

    return (
        <div
            className='min-h-screen w-full bg-cover bg-center flex flex-col lg:flex-row items-center justify-evenly gap-4 px-6 sm:px-10 lg:px-24'
            style={{
                backgroundImage: `url("/photos/background-image.png")`,
            }}
        >
            {/* MOBILE LOGO */}
            <Image
                src='/photos/Logo.png'
                alt='Logo'
                width={180}
                height={180}
                className='block lg:hidden'
            />

            {/* FORM */}
            <Form
                onSubmit={handleSubmit}
                defaultValues={{}}
                schema={formSchema}
                resetOnSubmit
                className='
                    backdrop-blur-lg bg-white/10 border border-white/10
                    shadow-xl hover:shadow-2xl
                    p-6 sm:p-8
                    rounded-xl
                    flex flex-col gap-5
                    text-white
                    w-full max-w-md
                '
            >
                <h1 className='section-title text-center'>JOIN US</h1>

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

                <div className='flex flex-col gap-2'>
                    <Button
                        type='submit'
                        theme='secondary'
                    >
                        Register
                    </Button>

                    <div className='flex justify-center gap-1 text-sm'>
                        <span>Already have an account?</span>
                        <a
                            href='/login'
                            className='font-semibold'
                        >
                            Login
                        </a>
                    </div>
                </div>
            </Form>

            {/* DESKTOP LOGO */}
            <Image
                src='/photos/Logo.png'
                alt='Logo'
                width={400}
                height={400}
                className='hidden lg:block'
            />
        </div>
    );
};

export default Register;
