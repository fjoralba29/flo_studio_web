import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ userEventId: string }> }
) {
    try {
        const { userEventId } = await params;

        const id = Number(userEventId);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid userEventId" },
                { status: 400 }
            );
        }

        const { photos } = await req.json();
        // photos: [{ title: string, url: string, description?: string }]

        if (!Array.isArray(photos) || photos.length === 0) {
            return NextResponse.json(
                { error: "No photos provided" },
                { status: 400 }
            );
        }

        // Check if UserEvent exists
        const userEvent = await prisma.userEvent.findUnique({
            where: { id: id },
        });

        if (!userEvent) {
            return NextResponse.json(
                { error: "UserEvent not found" },
                { status: 404 }
            );
        }

        // Create photos
        const createdPhotos = await prisma.photo.createMany({
            data: photos.map((p: any) => ({
                title: p.title || null,
                description: p.description || null,
                url: p.url,
                userEventId: id,
            })),
        });

        return NextResponse.json({ success: true, createdPhotos });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to add photos", details: String(err) },
            { status: 500 }
        );
    }
}
