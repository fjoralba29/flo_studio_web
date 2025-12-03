import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { PropsWithChildren, ReactNode } from "react";
import { ComponentType, SVGProps } from "react";
import { ListType } from "@/lib/types/Dropzone.types";
import { cn } from "@/helpers/cn";
import Image from "next/image";
import Upload from "@/assets/icons/Upload.svg";
import Spinner from "../Spinner/Spinner";

type DropzoneInputBaseProps = PropsWithChildren & {
    isDragActive: boolean;
    isLoading: boolean;
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    className?: string;
    label?: ReactNode;
    subLabel?: ReactNode;
    disabled?: boolean;
    labelClassName?: string;
    subLabelClassName?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
    iconClassName?: string;
    spinnerClassName?: string;
    spinner?: ComponentType;
    hideInput?: boolean;
};

type DropzoneInputComponentProps = DropzoneInputBaseProps & {
    listType?: ListType;
};

const DropzoneInputPictureCard = ({
    isDragActive,
    isLoading,
    getRootProps,
    getInputProps,
    className,
    label = "Upload",
    subLabel,
    disabled,
    labelClassName,
    subLabelClassName,
    icon,
    iconClassName,
    spinnerClassName,
    hideInput,
}: DropzoneInputBaseProps) => {
    if (hideInput) return null;

    const classes = cn(
        "flex flex-col items-center justify-center gap-2 bg-light-grey border border-dashed border-grey rounded-[8px] cursor-pointer hover:bg-white transition overflow-hidden p-3 max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px]",
        isDragActive && "bg-blue-100",
        disabled &&
            "cursor-not-allowed disabled:bg-light-grey hover:bg-light-grey border-dark-grey hover:border-dark-grey",
        className
    );
    const labelClasses = cn("max-w-full truncate base-normal", labelClassName);
    const subLabelClasses = cn(
        "max-w-full truncate tiny-normal",
        subLabelClassName
    );

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={classes}>
                {!isLoading && (
                    <Image
                        src={Upload}
                        alt='Upload'
                    />
                )}
                {isLoading && <Spinner className={spinnerClassName} />}
                {label && <div className={labelClasses}>{label}</div>}
                {subLabel && <div className={subLabelClasses}>{subLabel}</div>}
            </div>
        </div>
    );
};

const DropzoneInputPictureCircle = (props: DropzoneInputBaseProps) => {
    return (
        <DropzoneInputPictureCard
            {...props}
            className={cn("rounded-full", props.className)}
        />
    );
};

const DropzoneInputPicture = ({
    isDragActive,
    isLoading,
    getRootProps,
    getInputProps,
    className,
    label = "Upload",
    subLabel,
    disabled,
    labelClassName,
    subLabelClassName,
    icon,
    iconClassName,
    spinnerClassName,
    hideInput,
}: DropzoneInputBaseProps) => {
    if (hideInput) return null;

    const classes = cn(
        "flex w-full h-[100px] gap-3 items-center justify-center bg-light-grey border border-dashed border-grey rounded-[8px] cursor-pointer hover:bg-white transition overflow-hidden p-3",
        isDragActive && "bg-blue-100",
        disabled &&
            "cursor-not-allowed disabled:bg-light-grey hover:bg-light-grey border-dark-grey hover:border-dark-grey",
        className
    );
    const labelClasses = cn("max-w-full truncate base-normal", labelClassName);
    const subLabelClasses = cn(
        "max-w-full truncate tiny-normal",
        subLabelClassName
    );

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={classes}>
                {!isLoading && (
                    <Image
                        src={Upload}
                        alt='Upload'
                    />
                )}
                {isLoading && <Spinner className={spinnerClassName} />}
                <div className='flex flex-col'>
                    {label && <div className={labelClasses}>{label}</div>}
                    {subLabel && (
                        <div className={subLabelClasses}>{subLabel}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const DropzoneInputText = (props: DropzoneInputBaseProps) => {
    return <DropzoneInputPicture {...props} />;
};

const DropzoneInputComponents = {
    "picture-card": DropzoneInputPictureCard,
    "picture-circle": DropzoneInputPictureCircle,
    picture: DropzoneInputPicture,
    text: DropzoneInputText,
};

const DropzoneInput = ({
    listType = "picture-card",
    ...props
}: DropzoneInputComponentProps) => {
    const Component =
        DropzoneInputComponents[listType] || DropzoneInputPictureCard;

    return <Component {...props} />;
};

export default DropzoneInput;
