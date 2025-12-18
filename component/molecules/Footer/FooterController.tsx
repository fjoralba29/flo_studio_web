"use client";

import { useUserStore } from "@/src/store/userStore";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Footer = dynamic(() => import("./Footer"), { ssr: false });
const UserFooter = dynamic(() => import("./UserFooter"), { ssr: false });
const AdminFooter = dynamic(() => import("./AdminFooter"), { ssr: false });

const publicPaths = ["/", "/wedding", "/portfolio", "/contact", "/about"];

const FooterController = () => {
    const pathname = usePathname();
    const { user } = useUserStore();
    const { type } = user || {};

    // Show default Footer if not logged in or on a public path
    if (!user || publicPaths.includes(pathname)) {
        return <Footer />;
    }

    // Show based on user type
    if (type === "User") return <UserFooter />;
    if (type === "Admin") return <AdminFooter />;

    // Fallback
    return <Footer />;
};

export default FooterController;
