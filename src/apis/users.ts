import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
    console.log(id, "idddddd");

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
