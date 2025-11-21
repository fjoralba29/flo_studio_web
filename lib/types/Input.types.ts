import type React from "react";
import type { InputHTMLAttributes, JSX } from "react";

export type InputPlainTheme = "primary" | "secondary";

export type InputPlainProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string | React.ReactNode;
    error?: string;
    value?: string;
    onChange?: (value: string) => void;
    theme?: InputPlainTheme;
    icon?: JSX.Element;
    iconClassName?: string;
    labelClassName?: string;
};

export type InputProps = InputPlainProps & {
    name: string;
};
