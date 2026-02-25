import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (fileOrBase64: File | string): Promise<string> => {
            const formData = new FormData();

            let file: File;

            if (typeof fileOrBase64 === "string") {
                // Convert base64 → File
                const arr = fileOrBase64.split(",");
                const mime = arr[0].match(/:(.*?);/)![1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }

                file = new File([u8arr], "upload.png", { type: mime });
            } else {
                file = fileOrBase64;
            }

            formData.append("file", file);

            const res = await axios.post("/api/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data.imageUrl;
        },
    });
};

export const deletePhotos = async (id: number) => {
    const res = await axios.delete(`/api/photos/${id}`);
    return res.data;
};

export const useDeletePhotos = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deletePhotos(id),

        onSuccess: () => {
            toast.success("Photos deleted successfully");
            queryClient.invalidateQueries({
                queryKey: [
                    "categories",
                    "category-photos",
                    "photos",
                    "event-photos",
                    "user-photos",
                ],
            });
        },

        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error || "Failed to delete Photos",
            );
        },
    });
};
