"use client";

import Button from "@/component/atoms/Button/Button";
import InfinityTable from "@/component/atoms/Table/InfinityTable";
import AdminFooter from "@/component/molecules/Footer/AdminFooter";
import AdminHeader from "@/component/molecules/Header/AdminHeader";
import { useGetUsers } from "@/src/apis/users";
import { useSelectedUserStore } from "@/src/store/selectedUser";
import Image from "next/image";
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

    const handleDeleteUser = (userId: number) => {
        // Implement user deletion logic here
        console.log("Delete User ID:", userId);
    };

    return (
        <>
            <AdminHeader />
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
                            {
                                header: "Actions",
                                accessorKey: "id",
                                size: 150,
                                cell: ({ row }) => {
                                    const { original } = row;
                                    const { id } = original;
                                    return (
                                        <Button
                                            theme='ghost'
                                            size='xs'
                                            onClick={() => handleDeleteUser(id)}
                                        >
                                            🗑️ Delete User
                                        </Button>
                                    );
                                },
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
            <AdminFooter />
        </>
    );
};

export default UserManagement;
