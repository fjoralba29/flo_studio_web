import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
    name: string;
    primaryPhoto?: string;
};
export const createPortfolioCategory = async ({
    name,
    primaryPhoto,
}: Props) => {
    const res = await axios.post("/api/portfolio-category", {
        name,
        primaryPhoto,
    });
    return res.data;
};

export const useCreatePortfolioCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name, primaryPhoto }: Props) =>
            createPortfolioCategory({
                name,
                primaryPhoto,
            }),
        onSuccess: () => {
            toast.success("PortfolioCategory created successfully!");
            queryClient.invalidateQueries({
                queryKey: ["portfolio-categories"],
            }); // optional: refresh list
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error ||
                    "Failed to create Portfolio category",
            );
            // alert("Failed to create category");
        },
    });
};

const getPortfolioCategories = async () => {
    const res = await axios.get("/api/portfolio-category");
    return res.data;
};

export const useGetPortfolioCategories = () => {
    return useQuery({
        queryKey: ["portfolio-categories"],
        queryFn: getPortfolioCategories,
    });
};
const getPortfolioSubcategories = async () => {
    const res = await axios.get("/api/portfolio-subcategory");
    return res.data;
};

export const useGetPortfolioSubcategories = () => {
    return useQuery({
        queryKey: ["portfolio-subcategories"],
        queryFn: getPortfolioSubcategories,
    });
};

type Prop = {
    portfolioCategoryId: number;
    name: string;
    photos?: { title?: string; url: string; description?: string }[];
    primaryPhoto?: string;
};
export const createPortfolioSubcategory = async ({
    portfolioCategoryId,
    name,
    photos,
    primaryPhoto,
}: Prop) => {
    const res = await axios.post("/api/portfolio-subcategory", {
        name,
        portfolioCategoryId,
        photos,
        primaryPhoto,
    });
    return res.data;
};

export const useCreatePortfolioSubcategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            name,
            portfolioCategoryId,
            photos,
            primaryPhoto,
        }: Prop) =>
            createPortfolioSubcategory({
                name,
                portfolioCategoryId, // Replace with actual category ID
                photos,
                primaryPhoto,
            }),
        onSuccess: () => {
            toast.success("PortfolioSubcategory created successfully!");
            queryClient.invalidateQueries({
                queryKey: ["portfolio-subcategories"],
            }); // optional: refresh list
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error ||
                    "Failed to create Portfolio subcategory",
            );
        },
    });
};

const addPortfolioPhotos = async ({
    portfolioCategoryId,
    portfolioSubcategoryId,
    photos,
}: {
    portfolioCategoryId: number;
    portfolioSubcategoryId: number | null;
    photos: string[];
}) => {
    const res = await axios.post("/api/portfolio-photo", {
        portfolioCategoryId,
        portfolioSubcategoryId,
        photos,
    });
    return res.data;
};

export const useAddPortfolioPhotos = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            portfolioCategoryId,
            portfolioSubcategoryId,
            photos,
        }: {
            portfolioCategoryId: number;
            portfolioSubcategoryId: number | null;
            photos: string[];
        }) =>
            addPortfolioPhotos({
                portfolioCategoryId,
                portfolioSubcategoryId,
                photos,
            }),
        onSuccess: () => {
            toast.success("Portfolio photos added successfully!");
            queryClient.invalidateQueries({
                queryKey: [
                    "portfolio-photos",
                    "portfolio-subcategories",
                    "portfolio-categories",
                ],
            }); // optional: refresh list
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error || "Failed to add photos");
        },
    });
};

// 🔹 DELETE category
export const deletePortfolioCategory = async (id: number) => {
    const { data } = await axios.delete(`/api/portfolio-category/${id}`);
    return data;
};

// ❌ DELETE category
export const useDeletePortfolioCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePortfolioCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "portfolio-photos",
                    "portfolio-subcategories",
                    "portfolio-categories",
                ],
            });
            toast.success("Category deleted successfully!");
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error || "Failed to delete category",
            );
        },
    });
};

// 🔹 DELETE subcategory
export const deleteSubcategory = async (id: number) => {
    const { data } = await axios.delete(`/api/portfolio-subcategory/${id}`);
    return data;
};

// ❌ DELETE subcategory
export const useDeleteSubcategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSubcategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "portfolio-photos",
                    "portfolio-subcategories",
                    "portfolio-categories",
                ],
            });
            toast.success("Subcategory deleted successfully!");
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error || "Failed to delete category",
            );
        },
    });
};

// 🔹 DELETE photo
export const deletePortfolioPhoto = async (id: number) => {
    const { data } = await axios.delete(`/api/portfolio-photo/${id}`);
    return data;
};

// ❌ DELETE photo
export const useDeletePortfolioPhoto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePortfolioPhoto,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "portfolio-photos",
                    "portfolio-subcategories",
                    "portfolio-categories",
                ],
            });
            toast.success("Photo deleted successfully!");
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error || "Failed to delete photo");
        },
    });
};
