import { cn } from "@/helpers/cn";
import { SelectOptionType } from "@/lib/types/Select.types";
import CheckedIcon from "@/assets/icons/CheckedIcon.svg";
import UncheckedIcon from "@/assets/icons/UncheckedIcon.svg";
import RadioCheckedIcon from "@/assets/icons/RadioCheckedIcon.svg";
import RadioUncheckedIcon from "@/assets/icons/RadioUncheckedIcon.svg";
import Image from "next/image";

// Define ValueType to match parent components
type ValueType = string | number | boolean | Record<string, unknown>;

// Make Props generic
interface Props<T extends ValueType = ValueType> {
    option: SelectOptionType<T>;
    selectedOptions?: SelectOptionType<T>[] | SelectOptionType<T>;
    multiSelect?: boolean;
    handleOptionClick: (option: SelectOptionType<T>) => void;
    hideIndicator?: boolean;
    disabled?: boolean;
}

const SelectItem = <T extends ValueType>({
    option,
    selectedOptions,
    multiSelect = false,
    handleOptionClick,
    hideIndicator = false,
    disabled = false,
}: Props<T>) => {
    const { value, label } = option;

    const isOptionSelected = Array.isArray(selectedOptions)
        ? selectedOptions.some(
              (selected) =>
                  JSON.stringify(selected.value) === JSON.stringify(value)
          )
        : selectedOptions?.value === value;

    const Icon = multiSelect
        ? isOptionSelected
            ? CheckedIcon
            : UncheckedIcon
        : isOptionSelected
        ? RadioCheckedIcon
        : RadioUncheckedIcon;

    const itemClasses = cn(
        "w-full",
        "flex",
        "items-center",
        "cursor-pointer",
        "px-2.5",
        "py-3",
        "h-[46px]",
        "gap-[5px]",
        "hover:bg-light-grey",
        disabled && "cursor-not-allowed"
    );

    return (
        <div
            className={itemClasses}
            key={JSON.stringify(value)}
            onClick={() => !disabled && handleOptionClick(option)}
        >
            {!hideIndicator && (
                <Image
                    src={Icon}
                    alt='Icon'
                    className='min-w-min min-h-min'
                />
            )}
            <div className='truncate w-full base-normal'>{label}</div>
        </div>
    );
};

export default SelectItem;
