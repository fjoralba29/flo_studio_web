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
