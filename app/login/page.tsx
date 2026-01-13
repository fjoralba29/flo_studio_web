"use client";

import Button from "@/component/atoms/Button/Button";
import Form from "@/component/atoms/Form/Form";
import Input from "@/component/atoms/Input/Input";
import { useLogin } from "@/src/apis/auth";
import Image from "next/image";
import z from "zod";

const Login = () => {
    const { mutate: loginUser } = useLogin();

    const formSchema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const handleSubmit = (data: any) => {
        loginUser(data);
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
                <h1 className='section-title text-center'>Log in</h1>

                <Input
                    name='email'
                    label='Email'
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
                        Login
                    </Button>

                    <div className='flex justify-center gap-1 text-sm'>
                        <span>Don&apos;t have an account?</span>
                        <a
                            href='/register'
                            className='font-semibold'
                        >
                            Register
                        </a>
                    </div>
                </div>
            </Form>

            {/* LOGO (hidden on small screens) */}
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

export default Login;
