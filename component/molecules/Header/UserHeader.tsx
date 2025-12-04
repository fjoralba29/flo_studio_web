"use client";

import Instagram from "@/assets/icons/Instagram.svg";
import User from "@/assets/icons/User.svg";
import Logo from "@/assets/photos/Logo.png";
import { useLogout } from "@/src/apis/auth";
import { useUserStore } from "@/src/store/userStore";
import { log } from "console";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const UserHeader = () => {
    const router = useRouter();
    const pathname = usePathname();

    // Define paths where you want the header/footer to appear
    const publicPaths = [
        "/",
        "/wedding",
        "/portfolio",
        "/contact",
        "/user-profile",
        "/admin",
        "/admin/page-management",
        "/admin/services-management",
        "/admin/user-management",
    ];

    // const showHeader = publicPaths.includes(pathname);
    const showHeader = publicPaths.some((p) => pathname.startsWith(p));

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { user } = useUserStore();

    const { mutate: logoutUser } = useLogout();

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Clear user session logic here (e.g., remove token from storage)
        // Then redirect to login page
        logoutUser();
    };
    console.log(user);

    return (
        showHeader && (
            <div className='absolute  top-0 left-0 right-0 z-10 flex justify-between px-[80px] py-[30px] items-center'>
                <div className='flex gap-[90px] items-center'>
                    {/* <a
                        href='/'
                        className='text-white navbar'
                    >
                        About
                    </a> */}
                    <a href='/'>
                        <Image
                            src={Logo}
                            alt='Logo'
                            width={60}
                            height={60}
                        />
                    </a>
                </div>
                <div
                    className='relative'
                    ref={menuRef}
                >
                    <div
                        className='cursor-pointer'
                        onClick={() => setOpen(!open)}
                    >
                        <Image
                            src={User}
                            alt='User'
                            width={30}
                            height={30}
                        />
                    </div>

                    {open && (
                        <div className='absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50'>
                            <ul className='flex flex-col p-2'>
                                {user ? (
                                    <>
                                        <li>
                                            <a
                                                href='/user-profile'
                                                className='block px-4 py-2 hover:bg-gray-100 rounded'
                                            >
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className='w-full text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer'
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <button
                                            onClick={() =>
                                                router.push("/login")
                                            }
                                            className='w-full text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer'
                                        >
                                            Login
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default UserHeader;
