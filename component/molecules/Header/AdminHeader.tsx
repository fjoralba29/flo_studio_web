"use client";

import Instagram from "@/assets/icons/Instagram.svg"; // optional for future use
import User from "@/assets/icons/User.svg";
import Menu from "@/assets/icons/Menu.svg"; // hamburger icon
import { useLogout } from "@/src/apis/auth";
import { useUserStore } from "@/src/store/userStore";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AdminHeader = () => {
    const router = useRouter();
    const pathname = usePathname();

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

    const showHeader = publicPaths.some((p) => pathname.startsWith(p));

    const { user } = useUserStore();
    const { mutate: logoutUser } = useLogout();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logoutUser();
        setDropdownOpen(false);
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { label: "Collabs", href: "/admin/page-management" },
        { label: "Categories", href: "/admin/page-management" },
        { label: "Services", href: "/admin/services-management" },
        { label: "Wedding", href: "/admin/wedding-management" },
        { label: "Users", href: "/admin/user-management" },
    ];

    return (
        showHeader && (
            <header className='bg-grape text-white px-6 sm:px-12 py-4 flex items-center justify-between relative'>
                {/* Logo */}
                <a
                    href='/'
                    className='flex-shrink-0'
                >
                    <Image
                        src='/photos/Logo.png'
                        alt='Logo'
                        width={60}
                        height={60}
                    />
                </a>

                {/* Desktop nav */}
                <nav className='hidden md:flex items-center gap-10'>
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className='navbar'
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* User dropdown */}
                    <div
                        className='relative'
                        ref={menuRef}
                    >
                        <div
                            className='cursor-pointer'
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <Image
                                src={User}
                                alt='User'
                                width={30}
                                height={30}
                            />
                        </div>

                        {dropdownOpen && (
                            <div className='absolute right-0 mt-2 w-40 bg-white text-black border rounded-md shadow-lg z-50'>
                                <ul className='flex flex-col p-2'>
                                    {user ? (
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className='w-full text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer'
                                            >
                                                Logout
                                            </button>
                                        </li>
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
                </nav>

                {/* Mobile Hamburger */}
                <div className='md:hidden flex items-center gap-4'>
                    <div
                        className='cursor-pointer'
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <Image
                            src={User}
                            alt='User'
                            width={30}
                            height={30}
                        />
                    </div>
                    <div
                        className='cursor-pointer'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Image
                            src={Menu}
                            alt='Menu'
                            width={30}
                            height={30}
                        />
                    </div>
                </div>

                {/* Mobile menu dropdown */}
                {/* Mobile menu full-screen */}
                {mobileMenuOpen && (
                    <div className='fixed top-[64px] left-0 right-0 bottom-0 z-40 bg-grape backdrop-blur-sm flex flex-col items-center justify-center gap-6 text-white text-xl md:hidden'>
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className='w-full text-center py-4 hover:bg-[#583C84] transition rounded'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </header>
        )
    );
};

export default AdminHeader;
