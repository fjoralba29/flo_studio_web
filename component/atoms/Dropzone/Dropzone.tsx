"use client";

import { DropzonePlain, DropzonePlainProps } from "./DropzonePlain";
import { useController } from "react-hook-form";

type DropzoneProps = DropzonePlainProps & {
    name: string;
};

const Dropzone = ({ name, onChange, ...rest }: DropzoneProps) => {
    const { field, fieldState } = useController({ name });

    const handleOnChange = (
        value?: File[] | ArrayBuffer[] | string[] | File | ArrayBuffer | string
    ) => {
        onChange?.(value);
        field.onChange(value);
    };

    return (
        <DropzonePlain
            {...rest}
            value={field.value}
            error={fieldState.error?.message}
            onChange={handleOnChange}
        />
    );
};

export default Dropzone;
