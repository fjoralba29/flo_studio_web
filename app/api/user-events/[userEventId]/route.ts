import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(
    req: NextRequest,
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

    try {
        // 1. Fetch all photos to clean Cloudinary
        const photos = await prisma.photo.findMany({
            where: { userEventId: id },
            select: { url: true },
        });

        // 2. Delete Cloudinary images
        for (const p of photos) {
            const publicId = p.url.split("/").pop()?.split(".")[0];
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        // 3. Delete UserEvent → deletes photos automatically due to FK
        await prisma.userEvent.delete({
            where: { id },
        });

        return NextResponse.json({
            message: "Event and all related data deleted",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete event" },
            { status: 500 }
        );
    }
}
