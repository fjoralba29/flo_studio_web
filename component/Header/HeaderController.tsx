"use client";

import { useUserStore } from "@/src/store/userStore";
import UserHeader from "./UserHeader";
import Header from "./Header";
import AdminHeader from "./AdminHeader";
import { use } from "react";

const HeaderController = () => {
    const { user } = useUserStore();
    const { type } = user || {}; // Destructure user info safely
    console.log(type);

    return (
        <>
            {type === "User" ? (
                <UserHeader />
            ) : type === "Admin" ? (
                <AdminHeader />
            ) : (
                <Header />
            )}
        </>
    );
};

export default HeaderController;
