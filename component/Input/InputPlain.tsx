"use client";

import { useDisclosure } from "@/helpers/useDisclosure";
import clsx from "clsx";
import type { InputHTMLAttributes, FocusEvent } from "react";
import EyeIcon from "@/assets/icons/EyeIcon.svg";
import EyeHiddenIcon from "@/assets/icons/EyeHiddenIcon.svg";
import Image from "next/image";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | React.ReactNode;
    error?: string;
    value?: string;
    onChange?: (value: any) => void;
}

const InputPlain = ({
    label,
    value,
    onChange,
    className,
    type,
    disabled,
    onBlur,
    error,
    ...rest
}: Props) => {
    const { isOpen, open, close } = useDisclosure(!!value);
    const { isOpen: showPassword, toggle: toggleShowPassword } =
        useDisclosure();

    const classes = clsx(
        "w-full",
        "relative",
        "bg-[#F9F9FB]",
        "transition-all",
        "duration-500",
        "h-[42px]",
        "p-6",
        "rounded-[8px]",
        "label-1",
        "focus:outline-none",
        "disabled:text-dark-gray",
        "text-black",
        "border",
        error ? "border-red" : "border-[#E8E7EA] focus:border-black",
        className
    );

    const labelClasses = clsx(
        "block",
        "mb-[5px]",
        "ml-[10px]",
        !!isOpen ? "top-[5px] tiny-normal" : "top-[15px]"
    );

    const inputType = type === "password" && showPassword ? "text" : type;

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        !!e.target.value ? open() : close();
        if (onBlur) onBlur(e);
    };

    const handleOnChange = ({ target }: { target: HTMLInputElement }) => {
        onChange && onChange(target.value);
    };

    return (
        <div className=' h-fit w-full min-h-[42px] relative'>
            {label && <div className={labelClasses}>{label}</div>}

            <div className='relative'>
                <input
                    type={inputType}
                    disabled={disabled}
                    className={classes}
                    onFocus={open}
                    onBlur={handleBlur}
                    {...rest}
                    value={value || ""}
                    onChange={handleOnChange}
                />
                {type === "password" && (
                    <button
                        type='button'
                        disabled={disabled}
                        onClick={toggleShowPassword}
                        className='absolute right-[15px] top-1/2 transform -translate-y-1/2 text-black disabled:text-dark-gray'
                    >
                        {showPassword ? (
                            <Image
                                src={EyeIcon}
                                alt='Show password'
                            />
                        ) : (
                            <Image
                                src={EyeHiddenIcon}
                                alt='Hide password'
                            />
                        )}
                    </button>
                )}
                {error && <div className='text-[#FF0000] text-sm'>{error}</div>}
            </div>
        </div>
    );
};

export default InputPlain;
