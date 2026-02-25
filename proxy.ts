// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Get user type from cookie
const getUserRoleFromRequest = (req: NextRequest) => {
    return req.cookies.get("userType")?.value || null; // "Admin" or "User"
};

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userRole = getUserRoleFromRequest(req);

    const adminOnlyPaths = [
        "/admin",
        "/admin/page-management",
        "/admin/user-management",
        "/admin/services-management",
        "/admin/video-management",
        "/admin/wedding-management",
    ];

    const userOnlyPaths = ["/user-profile"];

    if (adminOnlyPaths.includes(pathname) && userRole !== "Admin") {
        return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    if (userOnlyPaths.includes(pathname) && userRole !== "User") {
        return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/user-profile"],
};
