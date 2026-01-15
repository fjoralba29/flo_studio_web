"use client";

import Instagram from "@/assets/icons/Instagram.svg";
import User from "@/assets/icons/User.svg";
import Menu from "@/assets/icons/Menu.svg"; // add hamburger icon
import Close from "@/assets/icons/CloseCircleIcon.svg"; // add close icon

import { useClickedOutside } from "@/helpers/useClickedOutside";
import { useDisclosure } from "@/helpers/useDisclosure";
import { useLogout } from "@/src/apis/auth";
import { useUserStore } from "@/src/store/userStore";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();

    const publicPaths = [
        "/",
        "/wedding",
        "/portfolio",
        "/contact",
        "/user-profile",
        "/about",
    ];

    const showHeader = publicPaths.includes(pathname);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { user } = useUserStore();
    const { mutate: logoutUser } = useLogout();

    const {
        isOpen: dropdownOpen,
        close: closeDropdown,
        toggle: toggleDropdown,
    } = useDisclosure();

    const { setRef } = useClickedOutside(toggleDropdown, dropdownOpen);

    const handleLogout = () => {
        logoutUser();
        closeDropdown();
    };

    const NavLinks = () => (
        <>
            <a
                href='/about'
                className='navbar text-white'
            >
                About
            </a>
            <a
                href='/portfolio'
                className='navbar text-white'
            >
                Portfolio
            </a>
            {!mobileMenuOpen && (
                <a href='/'>
                    <Image
                        src='/photos/Logo.png'
                        alt='Logo'
                        width={60}
                        height={60}
                    />
                </a>
            )}
            <a
                href='/wedding'
                className='navbar text-white'
            >
                Wedding
            </a>
            <a
                href='/contact'
                className='navbar text-white'
            >
                Contact
            </a>
        </>
    );

    if (!showHeader) return null;

    return (
        <header className='absolute top-0 left-0 right-0 z-50'>
            {/* TOP BAR */}
            <div className='flex relative z-99 items-center justify-between px-6 sm:px-10 lg:px-[80px] py-6'>
                {/* Instagram */}
                <a
                    href='https://www.instagram.com/flostudio.al'
                    target='_blank'
                >
                    <Image
                        src={Instagram}
                        alt='Instagram'
                        width={28}
                        height={28}
                    />
                </a>

                {/* Desktop Nav */}
                <div className='hidden lg:flex items-center gap-[90px]'>
                    <NavLinks />
                </div>

                {/* Right Icons */}
                <div className='flex items-center gap-4'>
                    {/* User */}
                    <div className='relative'>
                        <Image
                            src={User}
                            alt='User'
                            width={28}
                            height={28}
                            className='cursor-pointer'
                            onClick={toggleDropdown}
                        />

                        {dropdownOpen && (
                            <div
                                ref={setRef}
                                className='absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg'
                            >
                                <ul className='flex flex-col p-2 text-sm'>
                                    {user ? (
                                        <>
                                            <li>
                                                <a
                                                    href={
                                                        user.type === "User"
                                                            ? "/user-profile"
                                                            : "/admin"
                                                    }
                                                    className='block px-4 py-2 hover:bg-gray-100 rounded'
                                                >
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className='w-full text-left px-4 py-2 hover:bg-gray-100 rounded'
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
                                                className='w-full text-left px-4 py-2 hover:bg-gray-100 rounded'
                                            >
                                                Login
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button
                        className='lg:hidden'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Image
                            src={Menu}
                            alt='Menu'
                            width={28}
                            height={28}
                            className='stroke-white'
                        />
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className='fixed inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-6 text-white text-xl lg:hidden'>
                    <NavLinks />
                </div>
            )}
        </header>
    );
};

export default Header;
