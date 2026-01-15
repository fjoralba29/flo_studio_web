import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useCategoryStore } from "../store/categories";

export type CreateCategoryPayload = {
    name: string;
    description?: string;
    type: "Collaboration" | "Category" | "Wedding";
    primaryPhoto: string; // Cloudinary URL
};

// POST API to create a category
type Props = CreateCategoryPayload & {
    photos?: { title?: string; url: string; description?: string }[];
};

export const createCategory = async ({
    name,
    description,
    type,
    primaryPhoto,
    photos,
}: Props) => {
    const res = await axios.post("/api/categories", {
        name,
        description,
        type,
        primaryPhoto,
        photos,
    });
    return res.data;
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            name,
            description,
            type,
            primaryPhoto,
            photos,
        }: Props) =>
            createCategory({ name, description, type, primaryPhoto, photos }),
        onSuccess: () => {
            alert("Category created successfully!");
            toast.success("Category created successfully!");
            queryClient.invalidateQueries({ queryKey: ["categories"] }); // optional: refresh list
        },
        onError: () => {
            toast.error("Failed to create category");
            alert("Failed to create category");
        },
    });
};

export const getCategoriesByType = async (
    type: "Collaboration" | "Category" | "Wedding" | undefined
) => {
    const res = await axios.get(`/api/categories/${type}`);
    return res.data;
};

export const useGetCategoriesByType = (
    type: "Collaboration" | "Category" | "Wedding" | undefined
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

export const getCategories = async () => {
    const res = await axios.get(`/api/categories`);
    return res.data;
};

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
};

export const getPhotosByCategoryID = async (categoryId: number) => {
    const res = await axios.get(` /api/photos/${categoryId}`);
    return res.data;
};

export const useGetPhotosByCategoryID = () => {
    const selectedCategoryId = useCategoryStore(
        (state) => state.selectedTypeId
    );
    return useQuery({
        queryKey: ["category-photos", selectedCategoryId],
        queryFn: () => getPhotosByCategoryID(selectedCategoryId as number),
        enabled: !!selectedCategoryId,
    });
};

export interface PhotoInput {
    url: string;
    title?: string;
    description?: string;
}

// Send photos to the API with categoryId in the URL
export const addPhotosToCategory = async (
    categoryId: number,
    photos: PhotoInput[]
) => {
    const res = await axios.post(`/api/photos/${categoryId}`, { photos });
    return res.data;
};

export const useAddPhotosToCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            categoryId,
            photos,
        }: {
            categoryId: number;
            photos: PhotoInput[];
        }) => addPhotosToCategory(categoryId, photos),
        onSuccess: () => {
            alert("Photos added successfully!");
            queryClient.invalidateQueries({
                queryKey: ["categories", "category-photos"],
            }); // optional refresh
        },
        onError: () => {
            alert("Failed to add photos");
        },
    });
};
