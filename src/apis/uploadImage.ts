import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
            console.log(res.data.imageUrl);

            return res.data.imageUrl;
        },
    });
};
