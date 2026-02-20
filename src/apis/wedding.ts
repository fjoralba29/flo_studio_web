"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const createWeddingPackage = async (data: {
    name: string;
    description?: string;
    items: { name: string; description?: string }[];
}) => {
    const response = await axios.post("/api/weddings", data);
    return response.data;
};

export const useCreateWeddingPackage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createWeddingPackage,

        onSuccess: () => {
            // Refresh wedding packages list if you have a query for it
            queryClient.invalidateQueries({ queryKey: ["weddingPackages"] });
        },

        onError: (error: any) => {
            console.error("Error creating wedding package:", error);
            alert(
                error.response?.data?.error ||
                    "Failed to create wedding package",
            );
        },
    });
};

export const getWeddingPackages = async () => {
    const response = await axios.get("/api/weddings");
    return response.data;
};

export const useWeddingPackages = () => {
    return useQuery({
        queryKey: ["weddingPackages"],
        queryFn: getWeddingPackages,
    });
};

export const deleteWedding = async (id: number) => {
    const res = await axios.delete(`/api/weddings/${id}`);
    return res.data;
};

export const useDeleteWedding = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteWedding(id),

        onSuccess: () => {
            toast.success("Wedding deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["weddings"] });
        },

        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error || "Failed to delete Wedding",
            );
        },
    });
};
