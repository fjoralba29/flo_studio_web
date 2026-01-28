import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    try {
        // ⬅️ Unwrap params (required in latest Next.js)
        const { id } = await context.params;

        // ⬅️ Validate ID
        if (!id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 },
            );
        }

        const userId = Number(id);
        if (isNaN(userId)) {
            return NextResponse.json(
                { error: "Invalid user ID" },
                { status: 400 },
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
                { status: 404 },
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("GET /api/users/[id] error:", error);

        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    const { id } = await context.params;
    const userId = Number(id);

    if (isNaN(userId)) {
        return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    try {
        await prisma.$transaction(async (tx) => {
            // 1️⃣ Find all user events
            const userEvents = await tx.userEvent.findMany({
                where: { userId },
                select: { id: true },
            });

            const userEventIds = userEvents.map((ue) => ue.id);

            // 2️⃣ Delete photos linked to user events
            if (userEventIds.length > 0) {
                await tx.photo.deleteMany({
                    where: {
                        userEventId: {
                            in: userEventIds,
                        },
                    },
                });
            }

            // 3️⃣ Delete user events (urls are inside this table)
            await tx.userEvent.deleteMany({
                where: { userId },
            });

            // 4️⃣ Finally delete user
            await tx.user.delete({
                where: { id: userId },
            });
        });

        return NextResponse.json(
            { message: "User and all related data deleted successfully" },
            { status: 200 },
        );
    } catch (error) {
        console.error("DELETE USER ERROR:", error);

        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 },
        );
    }
}
