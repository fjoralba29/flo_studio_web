"use client";

import { useUserStore } from "@/src/store/userStore";

import { use } from "react";
import UserFooter from "./UserFooter";
import AdminFooter from "./AdminFooter";
import Footer from "./Footer";

const FooterController = () => {
    const { user } = useUserStore();
    const { type } = user || {}; // Destructure user info safely
    console.log(type);

    return (
        <>
            {type === "User" ? (
                <UserFooter />
            ) : type === "Admin" ? (
                <AdminFooter />
            ) : (
                <Footer />
            )}
        </>
    );
};

export default FooterController;
