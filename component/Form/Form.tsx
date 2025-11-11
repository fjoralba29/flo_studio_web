"use client";

import React, {
    Children,
    cloneElement,
    isValidElement,
    useCallback,
    useMemo,
    type ReactElement,
} from "react";
import {
    useForm,
    FormProvider,
    type FieldValues,
    type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormChildProps, FormProps } from "@types";

const Form = <T extends FieldValues>({
    onSubmit,
    onReset,
    schema,
    className,
    children,
    defaultValues,
    resetOnSubmit = false,
    isFormReset = false,
}: FormProps<T>) => {
    const methods = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const {
        register,
        formState: { errors, isSubmitting, dirtyFields },
        handleSubmit,
        reset,
    } = methods;

    const handleFormReset = () => {
        reset(defaultValues);
        onReset?.();
    };

    const submitHandler: SubmitHandler<T> = async (data) => {
        await onSubmit(data);
        if (resetOnSubmit) {
            reset();
        }
    };

    const registerChildren = useCallback(
        (children: React.ReactNode): React.ReactNode => {
            return Children.map(children, (child) => {
                if (!isValidElement<FormChildProps<T>>(child)) return child;

                const element = child as ReactElement<FormChildProps<T>>;
                const {
                    name,
                    shouldRegister = true,
                    type,
                    disabled,
                    children: childChildren,
                } = element.props;

                // Clone and register named children
                if (name && shouldRegister) {
                    return cloneElement(element, {
                        key: name,
                        ...register(name),
                        error: errors[name]?.message as string | undefined,
                        children: childChildren
                            ? registerChildren(childChildren)
                            : childChildren,
                    });
                }

                // Handle submit buttons
                if (type === "submit") {
                    return cloneElement(element, {
                        disabled:
                            disabled ||
                            isSubmitting ||
                            (!isFormReset && !Object.keys(dirtyFields).length),
                    });
                }

                // Handle reset buttons
                if (type === "reset") {
                    return cloneElement(element, {
                        onClick: (e: React.MouseEvent) => {
                            const onClickProp = element.props?.onClick;
                            if (typeof onClickProp === "function") {
                                onClickProp(e);
                            }

                            handleFormReset();
                        },
                    });
                }

                // Recursively process children
                if (childChildren) {
                    return cloneElement(element, {
                        children: registerChildren(childChildren),
                    });
                }

                return child;
            });
        },
        [register, errors, isSubmitting, dirtyFields, isFormReset]
    );

    const registeredChildren = useMemo(() => {
        return typeof children === "function"
            ? children(methods)
            : registerChildren(children);
    }, [children, methods, registerChildren]);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className={className}
                noValidate
            >
                {registeredChildren}
            </form>
        </FormProvider>
    );
};

export default Form;
