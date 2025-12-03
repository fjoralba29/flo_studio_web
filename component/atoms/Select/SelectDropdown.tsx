import SelectItem from "./SelectItem";
import SelectAll from "./SelectAll";
import { SelectOptionType } from "@/lib/types/Select.types";
import { cn } from "@/helpers/cn";

// Define ValueType to match SelectPlain
type ValueType = string | number | boolean | Record<string, unknown>;

// Make Props generic
interface Props<T extends ValueType = ValueType> {
    dropdownOpen: boolean;
    options: SelectOptionType<T>[];
    handleOptionClick: (option: SelectOptionType<T>) => void;
    selectedOptions?: SelectOptionType<T>[] | SelectOptionType<T>;
    multiSelect?: boolean;
    hideIndicator?: boolean;
    disabled?: boolean;
    handleSelectAll: () => void;
    allSelected?: boolean;
}

const SelectDropdown = <T extends ValueType>({
    dropdownOpen,
    options,
    selectedOptions,
    multiSelect,
    handleOptionClick,
    hideIndicator,
    handleSelectAll,
    allSelected = false,
    disabled,
}: Props<T>) => {
    const dropdownClasses = cn(
        "absolute",
        "w-full",
        "bg-white",
        "border",
        "border-t-0",
        "rounded-b-[8px]",
        "overflow-hidden",
        "flex-column",
        "gap-1",
        "z-20",
        "max-h-[300px]",
        "overflow-hidden",
        dropdownOpen
            ? "border-b border-medium-gray"
            : "h-0 p-0 border-b-0 border-medium-grey"
    );

    return (
        <div className={dropdownClasses}>
            {multiSelect && (
                <div className='w-full border-b border-medium-grey'>
                    <SelectAll
                        allSelected={allSelected}
                        someSelected={
                            Array.isArray(selectedOptions) &&
                            selectedOptions.length > 0 &&
                            selectedOptions.length < options.length
                        }
                        handleSelectAll={handleSelectAll}
                    />
                </div>
            )}
            <div className='w-full max-h-[200px] overflow-y-scroll overflow-x-hidden'>
                {options.map((option, index) => (
                    <SelectItem
                        option={option}
                        selectedOptions={selectedOptions}
                        multiSelect={multiSelect}
                        handleOptionClick={handleOptionClick}
                        key={index}
                        hideIndicator={hideIndicator}
                        disabled={disabled} // Pass disabled prop correctly
                    />
                ))}
            </div>
        </div>
    );
};

export default SelectDropdown;
