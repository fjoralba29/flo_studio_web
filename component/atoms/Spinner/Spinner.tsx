"use client";

import { cn } from "@/helpers/cn";
import SpinnerIcon from "@/assets/icons/SpinnerIcon.svg";
import Image from "next/image";

const themes = {
    primary: ["fill-white"],
    secondary: ["fill-black"],
    ghost: ["fill-dark-grey", "group-hover:fill-black", "transition"],
};

interface SpinnerProps {
    theme?: keyof typeof themes;
    className?: string;
}

const Spinner = ({ theme = "primary", className }: SpinnerProps) => {
    const classNames = cn(
        "animate-spin",
        "min-h-[16px] min-w-[16px]",
        ...themes[theme],
        className
    );

    return (
        <Image
            src={SpinnerIcon}
            alt='SpinnerIcon'
            className={classNames}
        />
    );
};

export default Spinner;
