import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ userEventId: string; photoId: string }> } // <- promise wrapper
) {
    const { userEventId, photoId } = await params; // unwrap the promise

    const photoIdNum = Number(photoId);
    if (isNaN(photoIdNum)) {
        return NextResponse.json({ error: "Invalid photoId" }, { status: 400 });
    }

    try {
        const photo = await prisma.photo.findUnique({
            where: { id: photoIdNum },
        });

        if (!photo) {
            return NextResponse.json(
                { error: "Photo not found" },
                { status: 404 }
            );
        }

        const publicId = photo.url.split("/").pop()?.split(".")[0];
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        await prisma.photo.delete({ where: { id: photoIdNum } });

        return NextResponse.json({ message: "Photo deleted" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete photo" },
            { status: 500 }
        );
    }
}
