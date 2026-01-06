"use client";

import SelectDropdown from "./SelectDropdown";
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import { useDisclosure } from "@/helpers/useDisclosure";
import { useClickedOutside } from "@/helpers/useClickedOutside";
import {
    SelectOptionType,
    SelectPropsPlainType,
    ValueType,
} from "@/lib/types/Select.types";

const SelectPlain = <T extends ValueType>({
    options,
    label,
    multiSelect = false,
    error,
    onChange,
    className,
    disabled,
    isLoading,
    icon,
    value,
    handleClick,
}: SelectPropsPlainType<T>) => {
    const populateOptions = () => {
        if (multiSelect) {
            return options?.filter((option) =>
                (value as T[])?.some(
                    (v) => JSON.stringify(option.value) === JSON.stringify(v)
                )
            );
        }
        return options?.find(
            (option) => JSON.stringify(option.value) === JSON.stringify(value)
        );
    };

    const [selectedOptions, setSelectedOptions] = useState<
        SelectOptionType<T> | SelectOptionType<T>[] | undefined
    >(populateOptions());

    const {
        isOpen: dropdownOpen,
        close: closeDropdown,
        toggle: toggleDropdown,
    } = useDisclosure();
    const { setRef } = useClickedOutside(toggleDropdown, dropdownOpen);

    const handleOptionClick = (option: SelectOptionType<T>) => {
        if (multiSelect) {
            const currentOptions = Array.isArray(selectedOptions)
                ? selectedOptions
                : [];
            const newValue = currentOptions.some(
                (o) => JSON.stringify(o.value) === JSON.stringify(option.value)
            )
                ? currentOptions.filter(
                      (o) =>
                          JSON.stringify(o.value) !==
                          JSON.stringify(option.value)
                  )
                : [...currentOptions, option];

            setSelectedOptions(newValue);
            onChange(newValue.map(({ value }) => value));
        } else {
            setSelectedOptions(option);
            handleClick && handleClick(option);
            closeDropdown();
            onChange(option.value);
        }
    };

    const allSelected =
        options.length ===
        (Array.isArray(selectedOptions) ? selectedOptions.length : 0);

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedOptions([]);
            onChange([]);
            return;
        }
        setSelectedOptions(options);
        onChange(options.map(({ value }) => value));
    };

    useEffect(() => {
        setSelectedOptions(populateOptions());
    }, [value, options]);

    return (
        <div
            className={`relative min-w-[180px] max-w-[240px] ${className}`}
            ref={setRef}
        >
            <SelectInput
                {...{
                    error,
                    dropdownOpen,
                    selectedOptions,
                    toggleDropdown,
                    label,
                    disabled,
                    isLoading,
                    icon,
                    allSelected,
                    multiSelect,
                }}
            />
            <SelectDropdown
                {...{
                    dropdownOpen,
                    options,
                    selectedOptions,
                    multiSelect,
                    handleOptionClick,
                    disabled,
                    handleSelectAll,
                    allSelected,
                }}
            />
        </div>
    );
};

export default SelectPlain;
