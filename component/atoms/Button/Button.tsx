import { cn } from "@/helpers/cn";

import { forwardRef, cloneElement, type ButtonHTMLAttributes } from "react";
import Spinner from "../Spinner/Spinner";

export type ButtonTheme = "primary" | "secondary" | "ghost" | "tertiary";
export type ButtonSize = "xs" | "s" | "m";

const buttonThemes: Record<ButtonTheme, string[]> = {
    primary: [
        "bg-grape",
        "text-white",
        "disabled:bg-[#8695A4]",
        "disabled:text-white",
        "border-black",
        "disabled:border-[#8695A4]",
    ],
    secondary: [
        "bg-sand",
        "text-black",
        "hover:bg-[#F9F9FB]",
        "disabled:text-[#8695A4]",
        "border-medium-grey",
        "disabled:border-[#8695A4]",
    ],
    ghost: [
        "bg-transparent",
        "text-[#8695A4]",
        "border-transparent",
        "hover:!text-black",
    ],
    tertiary: [
        "bg-light-grey",
        "border-0",
        "text-[#454449]",
        "hover:bg-[#583c84]",
        "hover:text-white",
        "hover:border-black",
    ],
};

const iconThemes: Record<ButtonTheme, string[]> = {
    primary: ["fill-white"],
    secondary: ["fill-black"],
    ghost: ["fill-[#8695A4]", "group-hover:fill-black", "transition"],
    tertiary: [
        "fill-transparent ",
        "stroke-[#454449]",
        "hover:stroke-black, group-hover:stroke-black",
    ],
};

const buttonSizes: Record<ButtonSize, string[]> = {
    xs: ["px-[15px]", "py-[5px]"],
    s: ["px-[15px]", "py-[7px]"],
    m: ["px-[15px]", "py-[12px]"],
};

const buttonIconOnlySizes: Record<ButtonSize, string[]> = {
    xs: ["p-[5px]"],
    s: ["p-[9px]"],
    m: ["p-[14px]"],
};
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonTheme;
    size?: ButtonSize;
    icon?: any;
    isLoading?: boolean;
    isReverse?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            theme = "primary",
            className,
            disabled,
            icon: Icon,
            isLoading = false,
            size = "m",
            isReverse = false,
            type = "button",
            ...props
        },
        ref
    ) => {
        const iconOnly = Icon && !children;
        const classes = cn(
            "rounded-md",
            "border",
            "transition",
            "focus:outline-none",
            "select-none",
            "small-strong",
            "flex",
            "items-center",
            "gap-2.5",
            "whitespace-nowrap",
            "group",
            "transition",
            isReverse && "flex-row-reverse",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
            Icon ? "justify-between" : "justify-center",
            iconOnly
                ? buttonIconOnlySizes[size].join(" ")
                : buttonSizes[size].join(" "),
            className,
            ...buttonThemes[theme]
        );

        return (
            <button
                ref={ref}
                disabled={disabled}
                className={classes}
                type={type}
                {...props}
            >
                {children}
                {isLoading ? (
                    <Spinner
                        theme={theme === "primary" ? "primary" : "secondary"}
                    />
                ) : (
                    Icon &&
                    cloneElement(Icon, {
                        className: `transition ${iconThemes[theme].join(" ")}`,
                    })
                )}
            </button>
        );
    }
);

export default Button;
