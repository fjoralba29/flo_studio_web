import { cn } from "@/helpers/cn";
import { ListType } from "@/lib/types/Dropzone.types";
import Trash from "@/assets/icons/Trash.svg";
import ImageIcon from "@/assets/icons/Image.svg";
import { ReactNode } from "react";
import { Popover } from "../Popover/Popover";
import { Image } from "../Image/Image";
import { formatFileSize } from "@/helpers/formatFileSize";

type DropzoneItemProps = {
    file: File;
    removeFile: () => void;
    listType?: ListType;
    className?: string;
    previewClass?: string;
    error?: ReactNode;
};

const DropzoneItemPictureCard = ({
    error,
    file,
    removeFile,
    className,
    previewClass,
}: DropzoneItemProps) => {
    const classes = cn(
        "flex bg-light-grey border border-dashed border-grey rounded-[8px] cursor-pointer hover:bg-white transition overflow-hidden p-3 justify-center items-center max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px]",
        error && "border-red",
        className
    );

    const handleOnReject = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        removeFile();
    };

    return (
        <Popover
            trigger='hover'
            placement='top'
            content={
                <div className='flex flex-col '>
                    <div className='base-strong flex gap-3'>
                        <div>{file.name}</div>
                        <div className='text-dark-grey'>
                            ({formatFileSize(file.size)})
                        </div>
                    </div>
                    {error && (
                        <div className='base-normal text-red'>{error}</div>
                    )}
                </div>
            }
        >
            <div className={classes}>
                <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className={cn("min-w-full !min-h-full w-full !h-full")}
                    mediaPreviewClassName={previewClass}
                    extraActions={
                        <Trash
                            onClick={handleOnReject}
                            className='cursor-pointer min-w-3 min-h-3 fill-white'
                        />
                    }
                />
            </div>
        </Popover>
    );
};

const DropzoneItemPictureCircle = ({
    file,
    removeFile,
    className,
}: DropzoneItemProps) => {
    return (
        <DropzoneItemPictureCard
            {...{
                file,
                removeFile,
                className: cn("rounded-full", className),
                previewClass: "rounded-full",
            }}
        />
    );
};

const DropzoneItemPicture = ({
    file,
    removeFile,
    className,
}: DropzoneItemProps) => {
    const classes = cn(
        "max-h-[60px] w-full gap-[12px] flex transition hover:bg-light-grey pr-3 rounded-[8px]",
        className
    );
    return (
        <div className={classes}>
            <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                className='min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px]'
                mediaPreviewClassName='min-w-full min-h-full'
            />
            <div className={cn("flex gap-3 w-full items-center")}>
                <p className='w-full truncate'>{`${file.name} ${formatFileSize(
                    file.size
                )}`}</p>
                <Trash
                    onClick={removeFile}
                    className='cursor-pointer fill-black min-w-4 min-h-4 h-5 w-5'
                />
            </div>
        </div>
    );
};

const DropzoneItemText = ({
    file,
    removeFile,
    className,
}: DropzoneItemProps) => {
    const classes = cn(
        "max-h-[60px] w-full gap-[12px] flex transition hover:bg-light-grey pr-3 rounded-[8px]",
        className
    );

    return (
        <div className={classes}>
            <ImageIcon className='fill-red min-w-[20px] min-h-[20px]' />
            <div className={cn("flex gap-3 w-full items-center")}>
                <p className='w-full truncate'>{`${file.name} ${formatFileSize(
                    file.size
                )}`}</p>
                <Trash
                    onClick={removeFile}
                    className='cursor-pointer fill-black min-w-4 min-h-4 h-5 w-5'
                />
            </div>
        </div>
    );
};

const DropzoneItems = {
    "picture-card": DropzoneItemPictureCard,
    "picture-circle": DropzoneItemPictureCircle,
    picture: DropzoneItemPicture,
    text: DropzoneItemText,
};

const DropzoneItem = ({
    file,
    removeFile,
    className,
    error,
    listType = "picture-card",
}: DropzoneItemProps) => {
    const Component = DropzoneItems[listType] || DropzoneItemPictureCard;

    return (
        <div>
            <Component
                {...{
                    file,
                    removeFile,
                    className,
                    error,
                }}
            />
        </div>
    );
};

export default DropzoneItem;
