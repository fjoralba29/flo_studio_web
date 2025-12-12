"use client";

import { useSelectedUserStore } from "@/src/store/selectedUser";
import Image from "next/image";
import Image11 from "@/assets/photos/image11.png";
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

const UserDetailsPage = () => {
    const params = useParams();
    const userId = Number(params.id);

    const selectedEventId = useAddUserDataStore((s) => s.selectedEventId);

    const { data: userData = {} } = useGetUserById(userId);
    console.log(userData);
    const { name, email, phone, events = [] } = userData;

    const photos =
        events.find((e: any) => e.id === selectedEventId)?.photos || [];
    const photosUrls = Array.from(photos.map((p: any) => p.url)) || [];
    const urls = events.find((e: any) => e.id === selectedEventId)?.urls || [];
    const formattedUrls = urls.map((item: string) => ({ url: item }));
    console.log(urls, "urlss from api ");

    // const urlsUrls = urls.map((u: any) => (u.label = u.url)) || [];

    const setPhotoModalOpen = useAddUserDataStore((s) => s.setPhotoModalOpen);
    const setUrlsModalOpen = useAddUserDataStore((s) => s.setUrlsModalOpen);

    return (
        <>
            <div className='h-full p-5 flex flex-col gap-[30px]'>
                <div className='flex items-end gap-[100px]'>
                    <Image
                        src={Image11}
                        alt='Profile'
                        width={150}
                        className='rounded-lg border border-white border-4 shadow-lg'
                    />

                    <div className='flex flex-col gap-[20px] pb-[20px]'>
                        <div className='section-title'>{name}</div>
                        <div>Email: {email}</div>
                        <div>Phone: {phone}</div>
                    </div>
                </div>
                <EventsMenu
                    events={
                        events
                        // [
                        // {
                        //     id: 10,
                        //     event: { id: 1, name: "Wedding" },
                        //     photos: [
                        //         { url: "https://cloudinary.com/photo1.jpg" },
                        //         { url: "https://cloudinary.com/photo2.jpg" },
                        //     ],
                        //     urls: [
                        //         { url: "https://cloudinary.com/photo1.jpg" },
                        //         { url: "https://cloudinary.com/photo2.jpg" },
                        //     ],
                        // },
                        // {
                        //     id: 11,
                        //     event: { id: 2, name: "Birthday" },
                        //     photos: [
                        //         { url: "https://cloudinary.com/photo3.jpg" },
                        //     ],
                        // },
                        // ]
                    }
                />
                <div className='flex w-full gap-[20px]'>
                    <div className='w-[70%] flex flex-col gap-[10px]'>
                        <div className='flex justify-between items-center '>
                            <div className='section-subtitle '>Photos</div>
                            <Button
                                theme='primary'
                                size='xs'
                                onClick={() => setPhotoModalOpen(true)}
                            >
                                Add Photos
                            </Button>
                        </div>
                        <Gallery images={photosUrls as string[]} />
                    </div>
                    <div className='w-[30%] flex flex-col gap-[10px]'>
                        <div className='flex justify-between items-center '>
                            <div className='section-subtitle '>Url-s</div>
                            <Button
                                theme='primary'
                                size='xs'
                                onClick={() => setUrlsModalOpen(true)}
                            >
                                Add Urls
                            </Button>
                        </div>
                        <UrlWithDownload urls={formattedUrls} />
                    </div>
                </div>
            </div>
            <AddEventModal />
            <AddPhotosModal />
            <AddUrlsModal />
        </>
    );
};

export default UserDetailsPage;

// {
//   "id": 1,
//   "name": "John Doe",
//   "events": [
//     {
//       "id": 10,
//       "event": { "id": 1, "name": "Wedding" },
//       "photos": [
//         { "url": "https://cloudinary.com/photo1.jpg" },
//         { "url": "https://cloudinary.com/photo2.jpg" }
//       ],
//         "urls": [
//             { "url": "https://cloudinary.com/photo1.jpg" },
//             { "url": "https://cloudinary.com/photo2.jpg" }
//         ]
//     },
//     {
//       "id": 11,
//       "event": { "id": 2, "name": "Birthday" },
//       "photos": [
//         { "url": "https://cloudinary.com/photo3.jpg" }
//       ]
//     }
//   ]
// }
