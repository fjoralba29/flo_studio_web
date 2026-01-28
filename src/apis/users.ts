import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export const getUsers = async (search: string, page: number, size: number) => {
    const res = await axios.get(`/api/users`, {
        params: { search, page, size },
    });

    return res.data;
};

export const useGetUsers = (search: string) => {
    return useInfiniteQuery({
        queryKey: ["users", search],
        initialPageParam: 1,

        queryFn: ({ pageParam }) => getUsers(search, pageParam, 10),

        getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
    });
};

export const getUserById = async (id: number | undefined) => {
    if (!id) return null;
    const res = await axios.get(`/api/users/${id}`);
    return res.data;
};

export const useGetUserById = (id: number | undefined) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
        enabled: !!id, // only fetch if id exists
    });
};

export const deleteUser = async (userId: number) => {
    const { data } = await axios.delete(`/api/users/${userId}`);
    return data;
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: number) => deleteUser(userId),

        onSuccess: () => {
            // 🔄 Refresh users list
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};
