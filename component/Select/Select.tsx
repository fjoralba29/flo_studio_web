import { useController } from "react-hook-form";
import SelectPlain from "./SelectPlain";
import { SelectPropsFormType } from "@/lib/types/Select.types";

const Select = ({ name, ...props }: SelectPropsFormType) => {
    const { field, fieldState } = useController({ name });

    return (
        <SelectPlain
            {...{
                ...props,
                error: fieldState.error?.message,
                value: field.value,
                onChange: field.onChange,
            }}
        />
    );
};

export default Select;
