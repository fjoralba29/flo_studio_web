import { deleteManyFromCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    const { id: idStr } = await context.params;
    const id = Number(idStr);

    try {
        // 1. Get photos
        const photos = await prisma.photo.findMany({
            where: { portfolioSubcategoryId: id },
            select: { url: true },
        });

        const urls = photos.map((p) => p.url);

        // 2. Delete from Cloudinary
        if (urls.length) {
            await deleteManyFromCloudinary(urls);
        }

        // 3. Delete DB
        await prisma.$transaction(async (tx) => {
            await tx.photo.deleteMany({
                where: { portfolioSubcategoryId: id },
            });

            await tx.portfolioSubcategory.delete({
                where: { id },
            });
        });

        return NextResponse.json({ message: "Subcategory deleted" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Delete failed" },
            { status: 500 },
        );
    }
}
