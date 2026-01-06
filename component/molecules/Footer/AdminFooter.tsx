import Image from "next/image";
import Location from "@/assets/icons/Location.svg";
import Phone from "@/assets/icons/Phone.svg";
import Email from "@/assets/icons/Email.svg";
import Web from "@/assets/icons/Web.svg";
import InstagramFill from "@/assets/icons/InstagramFill.svg";
import Whatsapp from "@/assets/icons/Whatsapp.svg";

const AdminFooter = () => {
    return (
        <div className='bg-grape flex justify-between items-center px-[50px] py-[10px] text-white'>
            <Image
                src={"/photos/Logo.png"}
                alt='Logo'
                width={60}
                height={60}
            />
            <div className='flex gap-[5px] items-center info-subtext !text-[12px]'>
                <Image
                    src={Location}
                    alt='Location'
                    width={18}
                />{" "}
                Tirane, Albania
            </div>
            <div className='flex gap-[5px] items-center info-subtext !text-[12px]'>
                <Image
                    src={Phone}
                    alt='Phone'
                    width={18}
                />
                (+355)685017244
            </div>
            <div className='flex gap-[5px] items-center info-subtext !text-[12px]'>
                <Image
                    src={Email}
                    alt='Email'
                    width={18}
                />{" "}
                flostudio.al@gmail.com
            </div>
            <div className='flex gap-[5px] items-center info-subtext !text-[12px]'>
                <Image
                    src={Web}
                    alt='Web'
                    width={18}
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
    );
};

export default AdminFooter;
