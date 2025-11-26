import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const res = await axios.post("/api/upload-image", file, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data.imageUrl;
        },
    });
};
