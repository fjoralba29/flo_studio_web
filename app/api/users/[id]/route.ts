import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // ⬅️ Unwrap params (required in latest Next.js)
        const { id } = await context.params;

        // ⬅️ Validate ID
        if (!id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const userId = Number(id);
        if (isNaN(userId)) {
            return NextResponse.json(
                { error: "Invalid user ID" },
                { status: 400 }
            );
        }

        // ⬅️ Fetch user with events + event details + photos
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                events: {
                    include: {
                        event: true, // Event model
                        photos: true, // Photos under UserEvent
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("GET /api/users/[id] error:", error);

        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        );
    }
}
