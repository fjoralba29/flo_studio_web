import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ userEventId: string; photoId: string }> }
) {
    const { userEventId, photoId } = await params;

    const photoIdNum = Number(photoId);

    if (isNaN(photoIdNum)) {
        return NextResponse.json({ error: "Invalid photoId" }, { status: 400 });
    }

    try {
        // 1. Get photo to delete
        const photo = await prisma.photo.findUnique({
            where: { id: photoIdNum },
        });

        if (!photo) {
            return NextResponse.json(
                { error: "Photo not found" },
                { status: 404 }
            );
        }

        // 2. Extract Cloudinary public_id from URL (important!)
        const publicId = photo.url.split("/").pop()?.split(".")[0];

        // 3. Delete from Cloudinary
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        // 4. Delete from database
        await prisma.photo.delete({
            where: { id: photoIdNum },
        });

        return NextResponse.json({ message: "Photo deleted" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete photo" },
            { status: 500 }
        );
    }
}
