import {
    SubmitHandler,
    UseFormReturn,
    FieldValues,
    DefaultValues,
    FieldPath,
} from "react-hook-form";
import { ReactNode } from "react";
import { z, ZodType } from "zod";

export type FormChildProps<T extends FieldValues = FieldValues> = {
    name?: FieldPath<T>;
    shouldRegister?: boolean;
    type?: string;
    disabled?: boolean;
    children?: ReactNode;
    [key: string]: unknown;
};

export type FormProps<T extends FieldValues> = {
    onSubmit: SubmitHandler<T>;
    onReset?: () => void;
    schema: ZodType<T, any, any>;
    className?: string;
    children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
    defaultValues?: DefaultValues<T>;
    resetOnSubmit?: boolean;
    isFormReset?: boolean;
};
