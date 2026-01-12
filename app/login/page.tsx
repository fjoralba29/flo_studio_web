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
    }); // Define your form schema here

    const handleSubmit = (data: any) => {
        loginUser(data);
    };
    return (
        <div
            className='w-full h-full bg-cover bg-center flex gap-4 justify-between items-center p-40'
            style={{
                backgroundImage: `url("/photos/background-image.png") `,
            }}
        >
            <Form
                onSubmit={handleSubmit}
                defaultValues={{}}
                schema={formSchema}
                className='backdrop-blur-lg bg-white/10 border border-white/10 shadow-xl transition-all duration-500 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl p-8 rounded-lg flex flex-col gap-[20px] text-white min-w-[400px] '
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
                        theme='secondary'
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
            <Image
                src={"/photos/Logo.png"}
                alt='Background Image'
                width={500}
                height={500}
            />
        </div>
    );
};

export default Login;
