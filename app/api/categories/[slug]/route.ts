import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";

const CategoryType = {
    Collaboration: "Collaboration",
    Category: "Category",
    Wedding: "Wedding",
};
async function getCloudinary() {
    const { v2: cloudinary } = await import("cloudinary");
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
}

function extractPublicId(url: string): string | null {
    try {
        const parts = url.split("/");
        const filename = parts.pop();
        const folder = parts.slice(parts.indexOf("upload") + 1).join("/");

        if (!filename) return null;

        return folder + "/" + filename.split(".")[0];
    } catch {
        return null;
    }
}

// GET: Fetch categories by type
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> },
) {
    const { slug } = await context.params;

    // Check if slug is a valid CategoryType

    const allowedTypes = Object.values(CategoryType);

    if (!isNaN(Number(slug))) {
        return NextResponse.json(
            { error: "Use DELETE with numeric ID, GET expects type" },
            { status: 400 },
        );
    }

    if (!allowedTypes.includes(slug as keyof typeof CategoryType)) {
        return NextResponse.json(
            { error: "Invalid category type" },
            { status: 400 },
        );
    }

    const categories = await prisma.category.findMany({
        where: { type: slug as keyof typeof CategoryType },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(categories);
}

// DELETE: Delete category by ID
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> },
) {
    const { slug } = await context.params;
    const id = Number(slug);
    const cloudinary = await getCloudinary();

    if (isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid category ID" },
            { status: 400 },
        );
    }

    const category = await prisma.category.findUnique({
        where: { id },
        include: { photos: true },
    });

    if (!category) {
        return NextResponse.json(
            { error: "Category not found" },
            { status: 404 },
        );
    }

    // Delete photos from Cloudinary
    for (const photo of category.photos) {
        const publicId = extractPublicId(photo.url);
        if (publicId) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error("Cloudinary delete error:", err);
            }
        }
    }

    // Delete photos from DB
    await prisma.photo.deleteMany({ where: { categoryId: id } });

    // Delete category
    await prisma.category.delete({ where: { id } });

    return NextResponse.json(
        { message: "Category + photos deleted successfully" },
        { status: 200 },
    );
}
