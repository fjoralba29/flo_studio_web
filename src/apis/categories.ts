import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type CreateCategoryPayload = {
    name: string;
    description?: string;
    type: "Collaboration" | "Category" | "Wedding";
    primaryPhoto: string; // Cloudinary URL
};

// POST API to create a category
export const createCategory = async (payload: CreateCategoryPayload) => {
    const res = await axios.post("/api/categories", payload);
    return res.data;
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),
        onSuccess: () => {
            alert("Category created successfully!");
            queryClient.invalidateQueries({ queryKey: ["categories"] }); // optional: refresh list
        },
        onError: () => {
            alert("Failed to create category");
        },
    });
};

export const getCategoriesByType = async (
    type: "Collaboration" | "Category" | "Wedding"
) => {
    const res = await axios.get(`/api/categories/${type}`);
    return res.data;
};

export const useGetCategoriesByType = (
    type: "Collaboration" | "Category" | "Wedding"
) => {
    return useQuery({
        queryKey: ["categories", type],
        queryFn: getCategoriesByType.bind(null, type),
        enabled: !!type, // only fetch if type exists
    });
};
