import { deleteManyFromCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    const { id: strId } = await context.params;
    const id = Number(strId);

    try {
        // 1. Delete photos under subcategories
        await prisma.photo.deleteMany({
            where: {
                portfolioCategoryId: id,
            },
        });

        // 2. Delete subcategory photos
        await prisma.photo.deleteMany({
            where: {
                portfolioSubcategory: {
                    portfolioCategoryId: id,
                },
            },
        });

        // 3. Delete subcategories
        await prisma.portfolioSubcategory.deleteMany({
            where: {
                portfolioCategoryId: id,
            },
        });

        // 4. Delete category
        await prisma.portfolioCategory.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
