"use client";

import { useUserStore } from "@/src/store/userStore";
import UserHeader from "./UserHeader";
import Header from "./Header";
import AdminHeader from "./AdminHeader";
import { usePathname } from "next/navigation";

const publicPaths = ["/", "/wedding", "/portfolio", "/contact", "/about"];

const HeaderController = () => {
    const pathname = usePathname();
    const { user } = useUserStore();
    const { type } = user || {};

    // Show default Header if not logged in or on a public path
    if (!user || publicPaths.includes(pathname)) {
        return <Header />;
    }

    // Show based on user type
    if (type === "User") return <UserHeader />;
    if (type === "Admin") return <AdminHeader />;

    // Fallback
    return <Header />;
};

export default HeaderController;
