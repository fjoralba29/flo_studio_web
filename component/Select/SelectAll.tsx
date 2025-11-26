import CheckedIcon from "@/assets/icons/CheckedIcon.svg";
import IntermediateIcon from "@/assets/icons/IntermediateIcon.svg";
import UncheckedIcon from "@/assets/icons/UncheckedIcon.svg";
import { cn } from "@/helpers/cn";

interface ItemProps {
    allSelected: boolean;
    someSelected: boolean;
    handleSelectAll: () => void;
    disabled?: boolean;
    hideIndicator?: boolean;
}

const SelectAll = ({
    allSelected,
    someSelected,
    handleSelectAll,
    disabled,
    hideIndicator,
}: ItemProps) => {
    const Icon = allSelected
        ? CheckedIcon
        : someSelected
        ? IntermediateIcon
        : UncheckedIcon;
    const itemClasses = cn(
        "w-full",
        "flex",
        "items-center",
        "cursor-pointer",
        "px-2.5",
        "bg-light-grey",
        "py-3",
        "gap-[5px]",
        "large-normal",
        disabled && "cursor-pointer"
    );

    return (
        <div
            className={itemClasses}
            onClick={handleSelectAll}
        >
            {!hideIndicator && <Icon className={"min-w-min min-h-min"} />}
            <div className='truncate ... w-full'>All</div>
        </div>
    );
};

export default SelectAll;
