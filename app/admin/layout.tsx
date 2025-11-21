// import AdminHeader from "@/components/headers/AdminHeader";
// import AdminFooter from "@/components/footers/AdminFooter";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
    kodchasanLight,
    kodchasanRegular,
    kodchasanSemiBold,
    kodchasanBold,
    literataLight,
    literataRegular,
    literataSemiBold,
    literataBold,
    literataBlack,
} from "@/app/fonts";

export default function AdminLayout({ children }: { children: ReactNode }) {
    // Example: get user role from cookie/session
    const user = { role: "admin" }; // replace with real auth

    if (!user || user.role !== "admin") {
        redirect("/login"); // protect admin pages
    }

    return (
        <html lang='en'>
            <body
                className={`${kodchasanLight.variable} ${kodchasanRegular.variable} ${kodchasanSemiBold.variable} ${kodchasanBold.variable} ${literataLight.variable} ${literataRegular.variable} ${literataSemiBold.variable} ${literataBold.variable} ${literataBlack.variable} antialiased relative `}
            >
                {/* <AdminHeader /> */}
                <main>{children}</main>
                {/* <AdminFooter /> */}
            </body>
        </html>
    );
}
