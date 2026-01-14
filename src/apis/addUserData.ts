import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAddUserDataStore } from "../store/addUserData";
import toast from "react-hot-toast";

export const addEventToUser = async (userId: number, eventName: string) => {
    const res = await axios.post(`/api/users/${userId}/events`, {
        eventName,
    });

    return res.data;
};

export const useAddEventToUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            eventName,
        }: {
            userId: number;
            eventName: string;
        }) => addEventToUser(userId, eventName),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};

export const addPhotosToUserEvent = async (
    userEventId: number,
    photos: { title?: string; url: string; description?: string }[]
) => {
    const res = await axios.post(`/api/user-events/${userEventId}/photos`, {
        photos,
    });
    return res.data;
};

export const useAddPhotosToUserEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userEventId,
            photos,
        }: {
            userEventId: number;
            photos: { title?: string; url: string; description?: string }[];
        }) => addPhotosToUserEvent(userEventId, photos),

        onSuccess: () => {
            // Refresh user data
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};

export const addUrlsToUserEvent = async (
    userEventId: number,
    urls: string[]
) => {
    const res = await axios.post(`/api/user-events/${userEventId}/urls`, {
        urls,
    });
    return res.data;
};

export const useAddUrlsToUserEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userEventId,
            urls,
        }: {
            userEventId: number;
            urls: string[];
        }) => addUrlsToUserEvent(userEventId, urls),

        onSuccess: () => {
            // Refresh user data
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};

export const deleteUserEventUrl = async (userEventId: number, url: string) => {
    const res = await axios.delete(`/api/user-events/${userEventId}/urls`, {
        data: { url },
    });
    return res.data;
};

export const useDeleteUserEventUrl = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userEventId,
            url,
        }: {
            userEventId: number;
            url: string;
        }) => deleteUserEventUrl(userEventId, url),
        onSuccess: () => {
            toast.success("URL deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["user"] }); // adjust key as needed
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.error || "Failed to delete URL");
        },
    });
};

export const deleteEventToUser = async (userEventId: number) => {
    const res = await axios.delete(`/api/user-events/${userEventId}`);

    return res.data;
};

export const useDeleteEventToUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userEventId }: { userEventId: number }) =>
            deleteEventToUser(userEventId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};
