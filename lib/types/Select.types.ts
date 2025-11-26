// Define generic type for the value
export type ValueType = string | number | boolean | Record<string, unknown>;

export interface SelectOptionType<T extends ValueType = ValueType> {
    value: T;
    label: string;
    [key: string]: unknown;
}

export type SelectPropsBaseType = {
    options: SelectOptionType[]; // We'll update this to be generic in components
    label?: string;
    multiSelect?: boolean;
    disabled?: boolean;
    hideIndicator?: boolean;
    className?: string;
    icon?: React.ReactNode;
    isLoading?: boolean;
};

export interface SelectPropsFormType<T extends ValueType = ValueType> {
    options: SelectOptionType<T>[];
    label?: string;
    multiSelect?: boolean;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
    value?: T | T[];
    name: string;
    onChange?: (value: ValueType) => void;
    isDisabled?: boolean;
    handleClick?: (option: SelectOptionType<T>) => void;
}

export interface SelectPropsPlainType<T extends ValueType = ValueType> {
    options: SelectOptionType<T>[];
    label?: string;
    multiSelect?: boolean;
    error?: string;
    onChange: (value: T | T[]) => void;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
    value?: T | T[];
    handleClick?: (option: SelectOptionType<T>) => void;
}
