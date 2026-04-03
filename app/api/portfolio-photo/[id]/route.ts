import { deleteFromCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    const { id: idStr } = await context.params;
    const id = Number(idStr);

    try {
        // 1. Get photo
        const photo = await prisma.photo.findUnique({
            where: { id },
        });

        if (!photo) {
            return NextResponse.json(
                { error: "Photo not found" },
                { status: 404 },
            );
        }

        // 2. Delete from Cloudinary
        await deleteFromCloudinary(photo.url);

        // 3. Delete from DB
        await prisma.photo.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Photo deleted" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Delete failed" },
            { status: 500 },
        );
    }
}
