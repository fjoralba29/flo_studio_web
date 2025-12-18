"use client";

import InfinityTable from "@/component/atoms/Table/InfinityTable";
import { useGetUsers } from "@/src/apis/users";
import { useSelectedUserStore } from "@/src/store/selectedUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserManagement = () => {
    const [search, setSearch] = useState("");
    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
        useGetUsers(search);

    const users = data?.pages.flatMap((p) => p.content) ?? [];

    const setSelectedUser = useSelectedUserStore((s) => s.setSelectedUser);

    const router = useRouter();

    const handleRowClick = (row: any) => {
        setSelectedUser(row);
        router.push(`/admin/user-management/${row.id}`);
    };

    return (
        <div className='flex flex-col h-full p-5'>
            <InfinityTable<any>
                onRowClick={handleRowClick}
                {...{
                    columns: [
                        {
                            header: "Name",
                            accessorKey: "name",
                            // size: 250,
                            meta: {
                                headerStyles: {
                                    textAlign: "right",
                                    backgroundColor: "light-gray",
                                    color: "#ACB9C7",
                                    grow: 1,
                                    borderRadius: "8px",
                                },
                                cellStyles: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                },
                            },
                        },
                        {
                            header: "Email",
                            accessorKey: "email",
                            size: 250,
                        },
                        {
                            header: "Phone",
                            accessorKey: "phone",
                            size: 250,
                        },
                    ],
                    data: users,
                    hasMore: hasNextPage,
                    loadMore: fetchNextPage,
                    isLoadingMore: isFetchingNextPage || isLoading,
                    isLoading,
                }}
            />
        </div>
    );
};

export default UserManagement;
