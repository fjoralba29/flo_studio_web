"use client";

import Download from "@/assets/icons/Download.svg";
import Button from "@/component/atoms/Button/Button";
import { useDeleteUserEventUrl } from "@/src/apis/addUserData";
import { useUserStore } from "@/src/store/userStore";
import Image from "next/image";

interface UrlWithDownloadProps {
    urls: { url: string; label?: string; eventId: number }[];
}

export default function UrlWithDownload({ urls }: UrlWithDownloadProps) {
    const user = useUserStore((state) => state.user);
    const { type } = user || {};

    const { mutate: deleteUrl } = useDeleteUserEventUrl();

    const handleDeleteUrl = (url: string, eventId: number) => {
        // Implement URL deletion logic here

        deleteUrl({ userEventId: eventId, url });
    };

    return (
        <div className='space-y-2'>
            {urls.length > 0 ? (
                urls.map((item, idx) => {
                    const fileName = item.url?.split("/").pop() || "download";

                    return (
                        <div
                            key={idx}
                            className='flex items-center justify-between p-3'
                        >
                            {/* Label or URL */}
                            <a
                                href={item.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-[var(--color-lila)] subtitle hover:underline truncate max-w-[80%]'
                            >
                                {item.label || item.url}
                            </a>

                            {/* Download Icon */}
                            <a
                                href={item.url}
                                download={fileName}
                                className='p-2 hover:bg-gray-100 rounded-full transition'
                            >
                                <Image
                                    src={Download}
                                    alt='Download'
                                    className='w-5 h-5 text-gray-700'
                                />
                            </a>
                            {type === "Admin" && (
                                <Button
                                    theme='ghost'
                                    onClick={() =>
                                        handleDeleteUrl(item.url, item.eventId)
                                    }
                                >
                                    🗑️
                                </Button>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className='subtitle text-[var(--color-grey-dark)] text-center'>
                    No URLs available.
                </div>
            )}
        </div>
    );
}
