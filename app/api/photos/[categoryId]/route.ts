import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ categoryId: string }> }
) {
    try {
        const { categoryId } = await context.params;
        const id = parseInt(categoryId);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid category ID" },
                { status: 400 }
            );
        }

        const photos = await prisma.photo.findMany({
            where: { categoryId: id },
            include: {
                userEvent: {
                    include: {
                        user: true,
                        event: true,
                    },
                },
                category: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ photos });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ categoryId: string }> }
) {
    try {
        const { categoryId } = await context.params;
        const { photos } = await req.json();
        const id = parseInt(categoryId); // get it from URL

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid categoryId" },
                { status: 400 }
            );
        }

        if (!Array.isArray(photos) || photos.length === 0) {
            return NextResponse.json(
                { error: "Photos are required" },
                { status: 400 }
            );
        }

        const category = await prisma.category.findUnique({
            where: { id: id },
        });

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        const createdPhotos = await prisma.photo.createMany({
            data: photos.map((photo) => ({
                url: photo.url,
                title: photo.title ?? null,
                description: photo.description ?? null,
                categoryId: id,
            })),
        });

        return NextResponse.json(
            {
                message: "Photos added successfully",
                count: createdPhotos.count,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * Extract Cloudinary public_id from image URL
 */
const getCloudinaryPublicId = (url: string) => {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return filename.split(".")[0];
};

export async function DELETE(
    req: Request,
    context: { params: Promise<{ categoryId: string }> }
) {
    try {
        const { categoryId } = await context.params;
        const photoId = Number(categoryId);
        if (isNaN(photoId)) {
            return NextResponse.json(
                { error: "Invalid photo id" },
                { status: 400 }
            );
        }

        // 1️⃣ Find photo
        const photo = await prisma.photo.findUnique({
            where: { id: photoId },
            include: {
                category: true,
            },
        });

        if (!photo) {
            return NextResponse.json(
                { error: "Photo not found" },
                { status: 404 }
            );
        }

        // 2️⃣ Delete from Cloudinary
        const publicId = getCloudinaryPublicId(photo.url);
        await cloudinary.uploader.destroy(publicId);

        // 3️⃣ Clear category primary photo if needed
        if (photo.category && photo.category.primaryPhoto === photo.url) {
            await prisma.category.update({
                where: { id: photo.category.id },
                data: { primaryPhoto: null },
            });
        }

        // 4️⃣ Delete photo record
        await prisma.photo.delete({
            where: { id: photoId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE PHOTO ERROR:", error);

        return NextResponse.json(
            { error: "Failed to delete photo" },
            { status: 500 }
        );
    }
}
