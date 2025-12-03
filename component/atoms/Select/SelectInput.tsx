"use client";

import { SelectOptionType } from "@/lib/types/Select.types";
import SelectSuffix from "./SelectSuffix";
import { cloneElement, isValidElement, type JSX } from "react";
import { cn } from "@/helpers/cn";

type ValueType = string | number | boolean | Record<string, unknown>;

interface Props<T extends ValueType = ValueType> {
    error?: string;
    label?: string;
    dropdownOpen: boolean;
    selectedOptions?: SelectOptionType<T> | SelectOptionType<T>[];
    disabled?: boolean;
    toggleDropdown: () => void;
    isLoading?: boolean;
    allSelected?: boolean;
    icon?: React.ReactNode; // Changed from JSX.Element to ReactNode
}

const SelectInput = <T extends ValueType>({
    error,
    label,
    dropdownOpen,
    selectedOptions,
    disabled,
    toggleDropdown,
    isLoading,
    allSelected,
    icon: Icon,
}: Props<T>) => {
    const classes = cn(
        "w-full",
        "relative",
        "bg-white",
        "border",
        "h-[50px]",
        "p-[15px]",
        "flex",
        "items-center",
        error
            ? "!border-red"
            : dropdownOpen
            ? "!border-black"
            : "border-[#8695A4]",
        disabled || isLoading
            ? "!cursor-not-allowed text-dark-grey"
            : "cursor-pointer",
        dropdownOpen ? "rounded-t-[8px]" : "rounded-[8px]"
    );

    const labelClasses = cn(
        "pl-[20px]",
        "w-10/12",
        "pointer-events-none",
        "text-sm",
        error ? "text-red" : "text-black"
    );

    const handleClickInput = () => {
        if (disabled) return;
        toggleDropdown();
    };

    return (
        <div className='flex flex-col gap-[8px]'>
            {label && <div className={labelClasses}>{label}</div>}
            <div
                className={classes}
                onClick={handleClickInput}
                tabIndex={0}
            >
                <div className='flex justify-between w-full'>
                    {Icon &&
                        // Type guard to ensure Icon is a JSX.Element for cloneElement
                        (isValidElement(Icon)
                            ? cloneElement(Icon as JSX.Element, {
                                  className: `transition min-w-4 min-h-4 ${
                                      disabled ? "fill-dark" : "fill-mid-grey"
                                  }`,
                              })
                            : Icon)}
                    <div className='large-normal w-full max-w-full truncate '>
                        {Array.isArray(selectedOptions) ? (
                            !!selectedOptions.length ? (
                                allSelected ? (
                                    "All"
                                ) : (
                                    selectedOptions
                                        .map((option) => option.label)
                                        .join(", ")
                                )
                            ) : (
                                ""
                            )
                        ) : selectedOptions ? (
                            selectedOptions.label
                        ) : (
                            <div className='text-[#8695A4]'>Select</div>
                        )}
                    </div>
                    <SelectSuffix {...{ dropdownOpen, isLoading }} />
                </div>
            </div>
            {error && <div className='text-[#FF0000] text-sm'>{error}</div>}
        </div>
    );
};

export default SelectInput;
