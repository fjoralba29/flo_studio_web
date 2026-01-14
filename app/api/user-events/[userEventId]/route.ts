import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

const getCloudinaryPublicId = (url: string) => {
    if (!url) return null;
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return filename?.split(".")[0] ?? null;
};

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ userEventId: string }> }
) {
    try {
        const { userEventId } = await params;
        const id = Number(userEventId);

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid id" }, { status: 400 });
        }

        // 1️⃣ Find user-event with photos
        const userEvent = await prisma.userEvent.findUnique({
            where: { id: id },
            include: {
                photos: true,
            },
        });

        if (!userEvent) {
            return NextResponse.json(
                { error: "UserEvent not found" },
                { status: 404 }
            );
        }

        // 2️⃣ Delete Cloudinary images
        for (const photo of userEvent.photos) {
            const publicId = getCloudinaryPublicId(photo.url);
            if (!publicId) continue;

            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.warn("Cloudinary delete failed:", publicId);
            }
        }

        // 3️⃣ Delete photos from DB
        await prisma.photo.deleteMany({
            where: { id },
        });

        // 4️⃣ Delete user-event (urls array removed automatically)
        await prisma.userEvent.delete({
            where: { id: id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE USER EVENT ERROR:", error);

        return NextResponse.json(
            { error: "Failed to delete user event" },
            { status: 500 }
        );
    }
}
