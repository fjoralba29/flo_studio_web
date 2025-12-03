import { cn } from "@/helpers/cn";
import { useDisclosure } from "@/helpers/useDisclosure";
import { Modal } from "../Modal/Modal";
import EyeIcon from "@/assets/icons/EyeIcon.svg";
import Image from "next/image";

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
    allowPreview?: boolean;
}

const ImageComponent = ({
    src,
    alt,
    mediaPreviewClassName,
    mediaClassName,
    modalClass,
    className,
    overlayClass,
    extraActions,
    allowPreview = true,
}: ImageProps) => {
    const { isOpen, toggle } = useDisclosure(false);

    const classes = cn(
        "relative",
        "w-full",
        "h-full",
        "group",
        "cursor-pointer",
        "border",
        "border-light-grey",
        "overflow-hidden",
        className
    );

    const mediaClasses = cn(
        "object-cover",
        "w-full",
        "h-full",
        "transition",
        "group-hover:scale-105",
        "p-5",
        mediaPreviewClassName
    );

    const mediaPreviewClasses = cn(
        "object-cover",
        "flex-center",
        "transition",
        "group-hover:scale-105",
        mediaClassName
    );

    const overlayClasses = cn(
        "bg-black/20",
        "inset-0",
        "absolute",
        "opacity-0",
        "group-hover:opacity-100",
        "transition",
        "flex-center",
        overlayClass
    );

    const modalClassNames = cn("min-w-[50%]", "flex-center", modalClass);

    return (
        <>
            <div
                style={{ width: "100%", height: "100%" }}
                className={classes}
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
                    {allowPreview && (
                        <Image
                            src={EyeIcon}
                            alt={alt}
                            onClick={toggle}
                            className={`w-[20px] h-[20px] fill-white`}
                        />
                    )}
                    {extraActions && extraActions}
                </div>
            </div>
            {isOpen && allowPreview && (
                <Modal
                    title={alt}
                    isOpen={isOpen}
                    onClose={toggle}
                    className={modalClassNames}
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

export default ImageComponent;
