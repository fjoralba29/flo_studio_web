import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const getVideos = () => axios.get("/api/videos");

export const useGetVideos = () => {
    return useQuery({
        queryKey: ["videos"],
        queryFn: () => getVideos().then((res) => res.data),
    });
};

export const createVideo = (data: { title: string; url: string }) =>
    axios.post("/api/videos", data);

export const useCreateVideo = () => {
    return useMutation({
        mutationFn: createVideo,
        onSuccess: () => {
            toast.success("Video created successfully");
        },
        onError: () => {
            toast.error("Failed to create video");
        },
    });
};

export const deleteVideo = (id: number) => axios.delete(`/api/videos?id=${id}`);

export const useDeleteVideo = () => {
    return useMutation({
        mutationFn: (id: number) => deleteVideo(id),
        onSuccess: () => {
            toast.success("Video deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete video");
        },
    });
};
