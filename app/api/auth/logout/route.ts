import { NextResponse } from "next/server";

export async function POST() {
    // Delete the cookie by setting it to empty & expires in the past
    const response = NextResponse.json(
        { message: "Logged out" },
        { status: 200 }
    );

    response.cookies.set("token", "", {
        httpOnly: true,
        secure: true,
        path: "/",
        expires: new Date(0), // 👈 expire cookie immediately
    });

    return response;
}
