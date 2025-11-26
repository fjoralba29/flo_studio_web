"use client";

import {
    useCallback,
    useState,
    useEffect,
    useMemo,
    ReactNode,
    ComponentType,
    SVGProps,
} from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import DropzoneInput from "./DropzoneInput";
import DropzoneItem from "./DropzoneItem";
import { ALLOWED_FILE_TYPES } from "@/helpers/constants/Media.constants";
import { ListType } from "@/lib/types/Dropzone.types";
import { cn } from "@/helpers/cn";
import { formatFileSize } from "@/helpers/formatFileSize";

export type DropzonePlainOnChangeType = (
    files?: File[] | ArrayBuffer[] | string[] | File | ArrayBuffer | string
) => void;

type AcceptType = keyof typeof ALLOWED_FILE_TYPES;

const DropzoneItemsContainerThemes: Record<ListType, string> = {
    "picture-card": "flex-wrap gap-3",
    "picture-circle": "flex-wrap gap-3",
    picture: "flex-col gap-3 p-3",
    text: "flex-col gap-3",
};

export type DropzonePlainProps = {
    allowedFiles?: AcceptType | AcceptType[];
    multiSelect?: boolean;
    outputType?: "file" | "binary" | "base64";
    maxFileSize?: number;
    maxFilesCount?: number;
    onChange?: DropzonePlainOnChangeType;
    value?: File[] | ArrayBuffer[] | string[] | File | ArrayBuffer | string;
    error?: string;
    label?: ReactNode;
    subLabel?: ReactNode;
    disabled?: boolean;
    inputClassName?: string;
    labelClassName?: string;
    spinnerClassName?: string;
    subLabelClassName?: string;
    iconClassName?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
    listType?: ListType;
};

export const DropzonePlain: React.FC<DropzonePlainProps> = ({
    allowedFiles = ["image", "video"],
    multiSelect = false,
    outputType = "file",
    maxFilesCount,
    maxFileSize,
    onChange,
    value = undefined,
    label,
    subLabel,
    disabled = false,
    inputClassName,
    labelClassName,
    spinnerClassName,
    subLabelClassName,
    iconClassName,
    icon,
    listType = "picture-card",
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

    const memoisedAllowedFiles = useMemo(
        () =>
            Array.isArray(allowedFiles)
                ? allowedFiles.reduce(
                      (acc, x) => ({ ...acc, ...ALLOWED_FILE_TYPES[x] }),
                      {}
                  )
                : ALLOWED_FILE_TYPES[allowedFiles],
        [allowedFiles]
    );

    // Sync internal state with external value
    useEffect(() => {
        if (outputType === "file") {
            if (multiSelect) {
                setAcceptedFiles(Array.isArray(value) ? (value as File[]) : []);
            } else {
                setAcceptedFiles(value ? [value as File] : []);
            }
        }
    }, [value, outputType, multiSelect]);

    const processFile = useCallback(
        (file: File): Promise<ArrayBuffer | string | File> => {
            return new Promise((resolve, reject) => {
                if (outputType === "file") return resolve(file);

                const reader = new FileReader();

                reader.onabort = () =>
                    reject(new Error("File reading aborted"));
                reader.onerror = () => reject(new Error("File reading failed"));
                reader.onload = () => {
                    if (outputType === "binary") {
                        resolve(reader.result as ArrayBuffer);
                    } else if (outputType === "base64") {
                        resolve(reader.result as string);
                    }
                };

                if (outputType === "binary") {
                    reader.readAsArrayBuffer(file);
                } else if (outputType === "base64") {
                    reader.readAsDataURL(file);
                }
            });
        },
        [outputType]
    );

    const processAndNotify = useCallback(
        async (files: File[]) => {
            if (files.length === 0) {
                onChange?.(multiSelect ? [] : undefined);
                return;
            }

            try {
                setIsProcessing(true);

                // Handle multi-select
                if (multiSelect) {
                    if (outputType === "file") {
                        onChange?.(files);
                    } else {
                        const processingPromises = files.map(processFile);
                        const processedFiles = await Promise.all(
                            processingPromises
                        );
                        onChange?.(
                            processedFiles as File[] | ArrayBuffer[] | string[]
                        );
                    }
                }
                // Handle single select
                else {
                    if (outputType === "file") {
                        onChange?.(files[0]);
                    } else {
                        const processedFile = await processFile(files[0]);
                        onChange?.(processedFile);
                    }
                }
            } catch (error) {
                console.error("Error processing files:", error);
            } finally {
                setIsProcessing(false);
            }
        },
        [onChange, outputType, multiSelect, processFile]
    );

    const onDrop = useCallback(
        (newlyAcceptedFiles: File[], fileRejections: FileRejection[]) => {
            setFileRejections(fileRejections);

            if (newlyAcceptedFiles.length === 0) return;

            let updatedFiles: File[];

            if (multiSelect) {
                // Calculate how many more files we can accept
                const currentCount = acceptedFiles.length;
                const remainingSlots = maxFilesCount
                    ? maxFilesCount - currentCount
                    : newlyAcceptedFiles.length;
                const filesToAdd = newlyAcceptedFiles.slice(
                    0,
                    Math.max(0, remainingSlots)
                );
                updatedFiles = [...acceptedFiles, ...filesToAdd];
            } else {
                updatedFiles = [newlyAcceptedFiles[0]];
            }

            setAcceptedFiles(updatedFiles);
            processAndNotify(updatedFiles);
        },
        [multiSelect, processAndNotify, acceptedFiles, maxFilesCount]
    );
    const removeFile = (index: number) => {
        const updatedFiles = acceptedFiles.filter((_, i) => i !== index);
        setAcceptedFiles(updatedFiles);
        processAndNotify(updatedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: memoisedAllowedFiles,
        multiple: multiSelect,
        maxSize: maxFileSize,
        maxFiles: maxFilesCount,
    });

    const hideInput =
        !!maxFilesCount &&
        acceptedFiles.length + fileRejections.length >= maxFilesCount;
    const showInputOnTop = ["text", "picture"].includes(listType);

    return (
        <div className='w-full'>
            {showInputOnTop && (
                <DropzoneInput
                    {...{
                        isDragActive,
                        isLoading: isProcessing,
                        getRootProps,
                        getInputProps,
                        className: inputClassName,
                        label,
                        subLabel,
                        labelClassName,
                        spinnerClassName,
                        subLabelClassName,
                        iconClassName,
                        icon,
                        disabled,
                        hideInput,
                        listType,
                    }}
                />
            )}
            {/* Selected files list for multi-select */}

            <div
                className={cn(
                    "w-full flex",
                    DropzoneItemsContainerThemes[listType]
                )}
            >
                {acceptedFiles.map((file, index) => (
                    <DropzoneItem
                        key={`${file.name}-${index}`}
                        {...{
                            listType,
                            file,
                            removeFile,
                        }}
                        listType={listType}
                        file={file}
                        removeFile={() => removeFile(index)}
                    />
                ))}
                {fileRejections.map(({ file, errors }, index) => (
                    <DropzoneItem
                        error={errors.map((e, i) => (
                            <li key={i}>
                                {e.code === "file-too-large"
                                    ? `File is too large (max ${formatFileSize(
                                          maxFileSize || 0
                                      )})`
                                    : e.code === "file-invalid-type"
                                    ? "File type not allowed"
                                    : e.message}
                            </li>
                        ))}
                        key={`${file.name}-${index}`}
                        file={file}
                        removeFile={() => removeFile(index)}
                    />
                ))}
                {!showInputOnTop && (
                    <DropzoneInput
                        {...{
                            isDragActive,
                            isLoading: isProcessing,
                            getRootProps,
                            getInputProps,
                            className: inputClassName,
                            label,
                            subLabel,
                            labelClassName,
                            spinnerClassName,
                            subLabelClassName,
                            iconClassName,
                            icon,
                            disabled,
                            hideInput,
                            listType,
                        }}
                    />
                )}
            </div>
        </div>
    );
};
