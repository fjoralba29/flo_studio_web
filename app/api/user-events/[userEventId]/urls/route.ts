import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ userEventId: string }> }
) {
    try {
        // 🔥 MUST await params object
        const { userEventId } = await context.params;

        const id = Number(userEventId);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid userEventId" },
                { status: 400 }
            );
        }

        const { urls } = await req.json();

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json(
                { error: "urls must be an array of strings" },
                { status: 400 }
            );
        }

        // 1️⃣ Fetch existing urls
        const existing = await prisma.userEvent.findUnique({
            where: { id },
            select: { urls: true },
        });

        if (!existing) {
            return NextResponse.json(
                { error: "UserEvent not found" },
                { status: 404 }
            );
        }

        // 2️⃣ Merge old + new
        const updatedUrls = [...(existing.urls || []), ...urls];

        // 3️⃣ Update userEvent
        const updated = await prisma.userEvent.update({
            where: { id },
            data: {
                urls: updatedUrls,
            },
        });

        return NextResponse.json({ success: true, updated });
    } catch (error) {
        console.error("Add URLs Error:", error);

        return NextResponse.json(
            { error: "Failed to add URLs" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ userEventId: string }> }
) {
    const { userEventId } = await params;
    const id = Number(userEventId);

    if (isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid userEventId" },
            { status: 400 }
        );
    }

    const { url } = await req.json();

    try {
        const updated = await prisma.userEvent.update({
            where: { id },
            data: {
                urls: {
                    set:
                        (
                            await prisma.userEvent.findUnique({
                                where: { id },
                                select: { urls: true },
                            })
                        )?.urls.filter((u) => u !== url) || [],
                },
            },
        });

        return NextResponse.json({ message: "URL deleted", data: updated });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete URL" },
            { status: 500 }
        );
    }
}
