"use client";

import { MouseEvent, PropsWithChildren, useRef, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/helpers/cn";
import Image from "next/image";
import CloseCircleIcon from "@/assets/icons/CloseCircleIcon.svg";

type ModalHeaderProps = {
    title?: string;
    subtitle?: string;
    className?: string;
    onClose?: () => void;
};

const ModalHeader = ({
    className,
    onClose,
    title,
    subtitle,
}: ModalHeaderProps) => {
    return (
        <div
            className={cn(
                "w-full",
                "sticky",
                "top-0",
                "right-0",
                "left-0",
                "pb-5",
                className
            )}
        >
            <div className='w-full flex justify-between'>
                <div className='flex flex-col'>
                    {title && (
                        <div
                            className={cn(
                                "text-black",
                                "large-strong",
                                "box-border"
                            )}
                        >
                            {title}
                        </div>
                    )}
                    {subtitle && (
                        <div
                            className={cn(
                                "text-black",
                                "base-normal",
                                "box-border"
                            )}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
                {onClose && (
                    <Image
                        src={CloseCircleIcon}
                        alt='Close'
                        className={cn(
                            "cursor-pointer",
                            "fill-black",
                            "hover:fill-white",
                            "min-w-6",
                            "min-h-6",
                            "sm:min-w-4",
                            "sm:min-h-4"
                        )}
                    />
                )}
            </div>
        </div>
    );
};

type ModalProps = PropsWithChildren & {
    isOpen?: boolean;
    className?: string;
    onClose?: () => void;
    maskClosable?: boolean;
    muskClassNames?: string;
    // header
    header?:
        | ((props: PropsWithChildren<{ className?: string }>) => JSX.Element)
        | null;
    headerClassName?: string;
    hideHeader?: boolean;
    title?: string;
    subtitle?: string;
    // footer
    footer?: (props: PropsWithChildren<{ className?: string }>) => JSX.Element;
};

export const Modal = ({
    className = "",
    muskClassNames = "",
    isOpen = true,
    onClose,
    children,
    maskClosable = true,
    //modal header
    header: Header = ModalHeader,
    title = "Title",
    subtitle = "Subtitle",
    headerClassName,
    hideHeader = true,
    //modal footer
    footer: Footer,
}: ModalProps) => {
    const backdropRef = useRef(null);
    const onCloseHandler =
        (doTargetCheck: boolean) => (e: MouseEvent<HTMLDivElement>) => {
            if (doTargetCheck && e.target !== backdropRef.current) return;
            if (maskClosable) {
                onClose?.();
            }
        };

    const classes = cn(
        "relative",
        "bg-black",
        "border",
        "border-black",
        "text-black",
        "rounded-md",
        "overflow-hidden",
        "p-5",
        "min-w-[370px]",
        "max-w-[370px]",
        "sm:max-w-fit",
        className
    );

    const muskClasses = cn(
        "fixed",
        "inset-0",
        "grid",
        "place-content-center",
        "bg-black/40",
        "backdrop-blur-xs",
        "z-[800]",
        muskClassNames
    );

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={backdropRef}
                    className={muskClasses}
                    onClick={onCloseHandler(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={classes}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        {hideHeader && Header && (
                            <Header
                                {...{
                                    className: headerClassName,
                                    onClose,
                                    title,
                                    subtitle,
                                }}
                            />
                        )}
                        {children}
                        {Footer && <Footer />}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};
