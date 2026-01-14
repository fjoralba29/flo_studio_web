"use client";

import Image from "next/image";
import Button from "@/component/atoms/Button/Button";
import { useUserStore } from "@/src/store/userStore";
import Gallery from "@/component/molecules/Gallery/Gallery";
import UrlWithDownload from "@/component/molecules/UrlWithDownload/UrlWithDownload";
import { useGetUserById } from "@/src/apis/users";
import { useAddUserDataStore } from "@/src/store/addUserData";
import UserHeader from "@/component/molecules/Header/UserHeader";
import UserFooter from "@/component/molecules/Footer/UserFooter";

const UserProfile = () => {
    const { user } = useUserStore();
    const { id, name, email, phone } = user || {};
    const setSelectedEventId = useAddUserDataStore((s) => s.setSelectedEventId);
    const selectedEventId = useAddUserDataStore((s) => s.selectedEventId);

    const { data } = useGetUserById(id);
    const { events } = data || {};

    const photos =
        events?.find((e: any) => e.id === selectedEventId)?.photos || [];
    const photosUrls = photos.map((p: any) => ({ url: p.url, id: p.id })) || [];
    console.log(events, "photossss");

    const urls = events?.find((e: any) => e.id === selectedEventId)?.urls || [];
    const formattedUrls = urls.map((item: string) => ({
        url: item,
        label: item,
    }));

    return (
        <>
            <UserHeader />
            <div className='flex flex-col gap-12'>
                {/* Hero Image */}
                <div
                    className='bg-gradient-to-b from-purple-400 to-white w-full bg-cover bg-center h-[300px] md:h-[400px]'
                    style={{ backgroundImage: `url("/photos/image38.png")` }}
                />

                {/* Profile Info */}
                <div className='flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-[100px] px-4 md:px-[150px] mt-[-100px] md:mt-[-150px]'>
                    <Image
                        src={"/photos/image11.png"}
                        alt='Profile'
                        width={200}
                        height={200}
                        className='rounded-lg border border-white border-4 shadow-lg w-[150px]  md:w-[250px] '
                    />
                    <div className='flex flex-col gap-3 md:gap-[20px] text-center md:text-left'>
                        <h1 className='text-2xl md:text-4xl font-bold'>
                            {name}
                        </h1>
                        <div>{email}</div>
                        <div>{phone}</div>
                    </div>
                </div>

                {/* Events Menu */}
                <div className='overflow-x-auto whitespace-nowrap py-2 px-4 md:px-[150px] scrollbar-hide'>
                    <div className='inline-flex gap-2 md:gap-4'>
                        {events?.map((e: any) => (
                            <Button
                                theme={
                                    selectedEventId === e.id
                                        ? "primary"
                                        : "tertiary"
                                }
                                key={e.id}
                                onClick={() => setSelectedEventId(e.id)}
                                className='min-w-max'
                            >
                                {e.event.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Photos & URLs */}
                <div className='flex flex-col md:flex-row gap-6 px-4 md:px-[150px]'>
                    <div className='flex-1'>
                        <h2 className='section-title mb-2'>Photos</h2>
                        <Gallery images={photosUrls} />
                    </div>
                    <div className='flex-1'>
                        <h2 className='section-title mb-2'>URL-s</h2>
                        <UrlWithDownload urls={formattedUrls} />
                    </div>
                </div>
            </div>
            <UserFooter />
        </>
    );
};

export default UserProfile;
