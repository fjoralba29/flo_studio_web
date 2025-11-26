"use client";

import React, { ReactElement } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverPlacement } from "@/lib/types/Popover.types";
import { cn } from "@/helpers/cn";

type PopoverRef = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
};

type PopoverProps = {
    children: ReactElement;
    content: React.ReactNode;
    placement?: PopoverPlacement;
    offset?: number;
    trigger?: "click" | "hover";
    onOpen?: () => void;
    onClose?: () => void;
    className?: string;
    arrowClassName?: string;
    hideArrow?: boolean;
    ref?: React.Ref<PopoverRef>;
};

interface ChildProps {
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
    ref?: React.Ref<unknown>;
    [key: string]: unknown;
}

export const Popover = React.forwardRef<PopoverRef, PopoverProps>(
    (
        {
            children,
            content,
            placement = "bottom",
            offset = 8,
            trigger = "click",
            onOpen,
            onClose,
            className = "",
            arrowClassName = "",
            hideArrow = false,
        },
        ref
    ) => {
        const contentClasses = cn(
            "z-50 border min-w-[120px] p-2",

            "rounded-md",
            "bg-white",
            "bg-black",
            className
        );

        const arrowClasses = cn("fill-black", arrowClassName);
        const [isOpen, setIsOpen] = React.useState(false);

        // Map your placement values to Radix's side and align
        const getRadixPlacement = (placement: PopoverPlacement) => {
            const placementMap: Record<
                PopoverPlacement,
                {
                    side: "top" | "bottom" | "left" | "right";
                    align?: "start" | "center" | "end";
                }
            > = {
                top: { side: "top", align: "center" },
                "top-start": { side: "top", align: "start" },
                "top-end": { side: "top", align: "end" },
                bottom: { side: "bottom", align: "center" },
                "bottom-start": { side: "bottom", align: "start" },
                "bottom-end": { side: "bottom", align: "end" },
                left: { side: "left", align: "center" },
                "left-start": { side: "left", align: "start" },
                "left-end": { side: "left", align: "end" },
                right: { side: "right", align: "center" },
                "right-start": { side: "right", align: "start" },
                "right-end": { side: "right", align: "end" },
            };
            return placementMap[placement];
        };

        const { side, align } = getRadixPlacement(placement);

        const handleOpenChange = (open: boolean) => {
            setIsOpen(open);
            if (open) {
                onOpen?.();
            } else {
                onClose?.();
            }
        };

        const open = () => handleOpenChange(true);
        const close = () => handleOpenChange(false);
        const toggle = () => handleOpenChange(!isOpen);

        // Expose methods via ref
        React.useImperativeHandle(ref, () => ({
            isOpen,
            open,
            close,
            toggle,
        }));

        const handleMouseEnter = () => {
            if (trigger === "hover") {
                handleOpenChange(true);
            }
        };

        const handleMouseLeave = () => {
            if (trigger === "hover") {
                handleOpenChange(false);
            }
        };

        const childProps = children.props as ChildProps;

        return (
            <PopoverPrimitive.Root
                open={isOpen}
                onOpenChange={
                    trigger === "click" ? handleOpenChange : undefined
                }
            >
                <PopoverPrimitive.Trigger asChild>
                    {React.cloneElement(children, {
                        ...(trigger === "hover" && {
                            onMouseEnter: (e: React.MouseEvent) => {
                                childProps.onMouseEnter?.(e);
                                handleMouseEnter();
                            },
                            onMouseLeave: (e: React.MouseEvent) => {
                                childProps.onMouseLeave?.(e);
                                handleMouseLeave();
                            },
                        }),
                    })}
                </PopoverPrimitive.Trigger>

                <PopoverPrimitive.Portal>
                    <PopoverPrimitive.Content
                        className={contentClasses}
                        side={side}
                        align={align}
                        sideOffset={offset}
                        onMouseEnter={
                            trigger === "hover" ? handleMouseEnter : undefined
                        }
                        onMouseLeave={
                            trigger === "hover" ? handleMouseLeave : undefined
                        }
                        onCloseAutoFocus={(e) => {
                            // Prevent focus from being stolen when the popover closes
                            e.preventDefault();
                        }}
                    >
                        {content}

                        {!hideArrow && (
                            <PopoverPrimitive.Arrow className={arrowClasses} />
                        )}
                    </PopoverPrimitive.Content>
                </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>
        );
    }
);

Popover.displayName = "Popover";
