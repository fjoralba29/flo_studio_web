import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Get user type from cookie
const getUserRoleFromRequest = (req: NextRequest) => {
    return req.cookies.get("userType")?.value || null; // "Admin" or "User"
};

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userRole = getUserRoleFromRequest(req);

    // Pages only accessible by Admin
    const adminOnlyPaths = [
        "/admin",
        "/admin/page-management",
        "/admin/user-management",
        "/admin/services-management",
        "/admin/video-management",
        "/admin/wedding-management",
    ];

    // Pages only accessible by User
    const userOnlyPaths = ["/user-profile"];

    // Redirect non-admin users away from admin pages
    if (adminOnlyPaths.includes(pathname) && userRole !== "Admin") {
        return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    // Redirect non-user users away from user pages
    if (userOnlyPaths.includes(pathname) && userRole !== "User") {
        return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*", // all admin pages
        "/user-profile", // the user-only page
    ],
};
