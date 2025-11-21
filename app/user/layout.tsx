// import UserHeader from "@/components/headers/UserHeader";
// import UserFooter from "@/components/footers/UserFooter";
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

export default function UserLayout({ children }: { children: ReactNode }) {
    const user = { role: "user" }; // replace with real auth

    if (!user || user.role !== "user") {
        redirect("/login"); // protect user pages
    }

    return (
        <html lang='en'>
            <body
                className={`${kodchasanLight.variable} ${kodchasanRegular.variable} ${kodchasanSemiBold.variable} ${kodchasanBold.variable} ${literataLight.variable} ${literataRegular.variable} ${literataSemiBold.variable} ${literataBold.variable} ${literataBlack.variable} antialiased relative `}
            >
                {/* <UserHeader /> */}
                <main>{children}</main>
                {/* <UserFooter /> */}
            </body>
        </html>
    );
}
