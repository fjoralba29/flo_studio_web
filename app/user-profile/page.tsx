"use client";

import Image from "next/image";
import Image11 from "@/assets/photos/image11.png";
import Image38 from "@/assets/photos/image38.png";
import Button from "@/component/atoms/Button/Button";
import { useUserStore } from "@/src/store/userStore";
import Gallery from "@/component/molecules/Gallery/Gallery";
import UrlWithDownload from "@/component/molecules/UrlWithDownload/UrlWithDownload";
import UserHeader from "@/component/molecules/Header/UserHeader";
import UserFooter from "@/component/molecules/Footer/UserFooter";
import { useGetUserById } from "@/src/apis/users";
import { useAddUserDataStore } from "@/src/store/addUserData";

const UserProfile = () => {
    const { user } = useUserStore();
    const { id, name, email, phone, type } = user || {}; // Destructure user info safely
    const setSelectedEventId = useAddUserDataStore((s) => s.setSelectedEventId);
    const selectedEventId = useAddUserDataStore((s) => s.selectedEventId);

    const { data } = useGetUserById(id);
    const { events } = data || {};

    const photos =
        events?.find((e: any) => e.id === selectedEventId)?.photos || [];
    const photosUrls = Array.from(photos.map((p: any) => p.url)) || [];

    const urls = events?.find((e: any) => e.id === selectedEventId)?.urls || [];
    const formattedUrls = urls.map((item: string) => ({
        url: item,
        label: item,
    }));

    return (
        <>
            <div className='flex flex-col gap-[50px] '>
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-[400px]'
                    style={{
                        backgroundImage: `url(${Image38.src}) `,
                    }}
                />

                <div className='mt-[-150px] px-[150px] flex items-end gap-[100px]'>
                    <Image
                        src={Image11}
                        alt='Profile'
                        width={250}
                        className='rounded-lg border border-white border-4 shadow-lg'
                    />

                    <div className='flex flex-col gap-[20px] pb-[20px]'>
                        <h1>{name}</h1>
                        <div>{email}</div>
                        <div>{phone}</div>
                    </div>
                </div>
                <div className='flex bg-grey-light justify-center gap-[20px] p-[20px]  mx-[150px] rounded-lg'>
                    {events?.map((e: any) => (
                        <Button
                            theme='tertiary'
                            className=''
                            key={e.id}
                            onClick={() => setSelectedEventId(e.id)}
                        >
                            {e.event.name}
                        </Button>
                    ))}
                </div>
                <div className='px-[150px] flex gap-[20px] '>
                    <div className='section-title w-[70%]'>
                        Photos
                        <div className=''>
                            <Gallery images={photosUrls as string[]} />
                        </div>
                    </div>
                    <div className='section-title w-[30%]'>
                        URL-s
                        <div>
                            <UrlWithDownload urls={formattedUrls} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
