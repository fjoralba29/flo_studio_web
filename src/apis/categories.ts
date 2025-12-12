import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

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

export const deleteCategory = async (id: number) => {
    const res = await axios.delete(`/api/categories/${id}`);
    return res.data;
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteCategory(id),

        onSuccess: () => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },

        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error || "Failed to delete category"
            );
        },
    });
};
