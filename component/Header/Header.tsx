import Instagram from "@/assets/icons/Instagram.svg";
import User from "@/assets/icons/User.svg";
import Logo from "@/assets/photos/Logo.png";
import Image from "next/image";

const Header = () => {
    return (
        <div className='absolute  top-0 left-0 right-0 z-10 flex justify-between px-[80px] py-[30px] items-center'>
            <Image
                src={Instagram}
                alt='Logo'
                width={30}
                height={30}
            />
            <div className='flex gap-[90px] items-center'>
                <a
                    href='/'
                    className='text-white navbar'
                >
                    About
                </a>
                <a
                    href='/'
                    className='text-white navbar'
                >
                    Portfolio
                </a>
                <Image
                    src={Logo}
                    alt='Logo'
                    width={60}
                    height={60}
                />
                <a
                    href='/wedding'
                    className='text-white navbar'
                >
                    Wedding
                </a>
                <a
                    href='/'
                    className='text-white navbar'
                >
                    Contact
                </a>
            </div>
            <Image
                src={User}
                alt='User'
                width={30}
                height={30}
            />
        </div>
    );
};

export default Header;
