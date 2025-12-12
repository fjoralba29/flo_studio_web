import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAddUserDataStore } from "../store/addUserData";

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
