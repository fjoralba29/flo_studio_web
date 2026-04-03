import { deleteFromCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { portfolioCategoryId, portfolioSubcategoryId, photos } = body;

        // 🔒 Validation
        if (!portfolioCategoryId || !photos || photos.length === 0) {
            return NextResponse.json(
                { error: "portfolioCategoryId and photos are required" },
                { status: 400 },
            );
        }

        // ❗ Ensure at least one target exists
        if (!portfolioSubcategoryId && !portfolioCategoryId) {
            return NextResponse.json(
                { error: "Provide category or subcategory" },
                { status: 400 },
            );
        }

        // 🧠 Decide where to attach
        const createdPhotos = await prisma.photo.createMany({
            data: photos.map((url: string) => ({
                url,
                portfolioCategoryId: portfolioSubcategoryId
                    ? undefined
                    : Number(portfolioCategoryId),

                portfolioSubcategoryId: portfolioSubcategoryId
                    ? Number(portfolioSubcategoryId)
                    : undefined,
            })),
        });

        return NextResponse.json(
            {
                message: "Photos added successfully",
                count: createdPhotos.count,
            },
            { status: 201 },
        );
    } catch (error: any) {
        console.error("ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Failed to add photos" },
            { status: 500 },
        );
    }
}
