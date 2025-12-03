import { useController } from "react-hook-form";
import InputPlain from "./InputPlain";
import { InputProps } from "@/lib/types/Input.types";

const Input = ({ name, ...rest }: InputProps) => {
    const { field, fieldState } = useController({ name });

    return (
        <InputPlain
            {...{
                ...rest,
                error: fieldState.error?.message,
                value: field.value,
                onChange: field.onChange,
            }}
        />
    );
};

export default Input;
