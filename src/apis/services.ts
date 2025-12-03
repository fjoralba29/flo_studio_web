import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type ServicePayload = {
    name: string;
    description?: string;
};

export const createService = async (payload: ServicePayload) => {
    const res = await axios.post("/api/services", payload);
    return res.data;
};

export const getServices = async () => {
    const res = await axios.get("/api/services");
    return res.data;
};

export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: ServicePayload) => createService(payload),
        onSuccess: () => {
            alert("Service created successfully!");
            queryClient.invalidateQueries({ queryKey: ["services"] }); // optional: refresh list
        },
        onError: () => {
            alert("Failed to create service");
        },
    });
};

export const useGetServices = () => {
    return useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });
};
