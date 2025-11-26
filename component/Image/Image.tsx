"use client";

import { cn } from "@/helpers/cn";
import { useDisclosure } from "@/helpers/useDisclosure";
import { Modal } from "../Modal/Modal";
import EyeFillIcon from "@/assets/icons/EyeFillIcon.svg";

// Props type definition
interface ImageProps {
    src: string;
    alt: string;
    mediaPreviewClassName?: string;
    mediaClassName?: string;
    modalClass?: string;
    width?: string;
    height?: string;
    className?: string;
    overlayClass?: string;
    extraActions?: React.ReactNode;
}

export const Image = ({
    src,
    alt,
    mediaPreviewClassName,
    mediaClassName,
    modalClass,
    className,
    overlayClass,
    extraActions,
}: ImageProps) => {
    const { isOpen, toggle } = useDisclosure(false);

    const classes = cn(
        "relative",
        "w-full",
        "h-full",
        "group",
        "cursor-pointer",
        "border",
        "border-black",
        "rounded-md",
        "overflow-hidden",
        className
    );

    const mediaClasses = cn(
        "object-cover",
        "w-full",
        "h-full",
        "transition",
        "group-hover:scale-105",
        mediaPreviewClassName
    );

    const mediaPreviewClasses = cn(
        "object-cover",
        "transition",
        "group-hover:scale-105",
        mediaClassName
    );

    const overlayClasses = cn(
        "bg-black/40",
        "inset-0",
        "absolute",
        "opacity-0",
        "group-hover:opacity-100",
        "transition",
        "flex-center",
        overlayClass
    );

    return (
        <>
            <div
                style={{ width: "100%", height: "100%" }}
                className={classes}
                onClick={toggle}
            >
                {/* Image Preview */}
                <img
                    src={src}
                    alt={alt}
                    style={{ width: "100%", height: "100%" }}
                    className={mediaPreviewClasses}
                />
                {/* Overlay */}
                <div className={overlayClasses}>
                    <Image
                        src={EyeFillIcon}
                        alt='View'
                    />

                    {extraActions && extraActions}
                </div>
            </div>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={toggle}
                    className={modalClass}
                    header={null}
                >
                    <img
                        src={src}
                        alt={alt}
                        className={mediaClasses}
                    />
                </Modal>
            )}
        </>
    );
};
