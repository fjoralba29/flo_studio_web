"use client";

import Image from "next/image";
import EventsMenu from "@/component/molecules/EventsMenu/EventsMenu";
import Button from "@/component/atoms/Button/Button";
import Gallery from "@/component/molecules/Gallery/Gallery";
import UrlWithDownload from "@/component/molecules/UrlWithDownload/UrlWithDownload";
import AddEventModal from "@/component/organisms/AddEventModal/AddEventModal";
import AddPhotosModal from "@/component/organisms/AddPhotosModal/AddPhotosModal";
import { useAddUserDataStore } from "@/src/store/addUserData";
import AddUrlsModal from "@/component/organisms/AddUrlsModal/AddUrlsModal";
import { useGetUserById } from "@/src/apis/users";
import { useParams } from "next/navigation";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import AdminFooter from "@/component/molecules/Footer/AdminFooter";

const UserDetailsPage = () => {
    const params = useParams();
    const userId = Number(params.id);

    const selectedEventId = useAddUserDataStore((s) => s.selectedEventId);

    const { data: userData = {} } = useGetUserById(userId);
    const { name, email, phone, events = [] } = userData;

    const photos =
        events.find((e: any) => e.id === selectedEventId)?.photos || [];
    const photosUrls =
        Array.from(photos.map((p: any) => ({ url: p.url, id: p.id }))) || [];
    const urls = events.find((e: any) => e.id === selectedEventId)?.urls || [];
    const formattedUrls = urls.map((item: string) => ({
        url: item,
        eventId: selectedEventId,
    }));

    const setPhotoModalOpen = useAddUserDataStore((s) => s.setPhotoModalOpen);
    const setUrlsModalOpen = useAddUserDataStore((s) => s.setUrlsModalOpen);

    return (
        <>
            <AdminHeader />
            <div className=' p-4 md:p-5 flex flex-col gap-6 md:gap-[30px] max-w-7xl mx-auto'>
                {/* User Info */}
                <div className='flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-[100px]'>
                    <Image
                        src={"/photos/image11.png"}
                        alt='Profile'
                        width={150}
                        height={150}
                        className='rounded-lg border-4 border-white shadow-lg'
                    />

                    <div className='flex flex-col gap-2 md:gap-[20px] text-center md:text-left'>
                        <div className='section-title'>{name}</div>
                        <div>Email: {email}</div>
                        <div>Phone: {phone}</div>
                    </div>
                </div>

                {/* Events Menu */}
                <EventsMenu events={events} />

                {/* Photos & URLs Panels */}
                <div className='flex flex-col md:flex-row w-full gap-4 md:gap-[20px]'>
                    {/* Photos */}
                    <div className='flex-1 flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <div className='section-subtitle'>Photos</div>
                            <Button
                                theme='primary'
                                size='xs'
                                onClick={() => setPhotoModalOpen(true)}
                                disabled={!selectedEventId}
                            >
                                Add Photos
                            </Button>
                        </div>
                        <Gallery images={photosUrls as any} />
                    </div>

                    {/* URLs */}
                    <div className='flex-1 flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <div className='section-subtitle'>Urls</div>
                            <Button
                                theme='primary'
                                size='xs'
                                onClick={() => setUrlsModalOpen(true)}
                                disabled={!selectedEventId}
                            >
                                Add Urls
                            </Button>
                        </div>
                        <UrlWithDownload urls={formattedUrls} />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddEventModal />
            <AddPhotosModal />
            <AddUrlsModal />
            <AdminFooter />
        </>
    );
};

export default UserDetailsPage;
