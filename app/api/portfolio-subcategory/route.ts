import { deleteManyFromCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, portfolioCategoryId, photos, primaryPhoto } = body;

        // 🔒 Validation
        if (!name || !portfolioCategoryId) {
            return NextResponse.json(
                { error: "Name and portfolioCategoryId are required" },
                { status: 400 },
            );
        }

        // photos should be array of URLs
        // e.g. ["url1", "url2"]
        const newSubcategory = await prisma.portfolioSubcategory.create({
            data: {
                name,
                portfolioCategoryId: Number(portfolioCategoryId),

                photos:
                    photos && photos.length > 0
                        ? {
                              create: photos.map((url: string) => ({
                                  url,
                              })),
                          }
                        : undefined,
                primaryPhoto,
            },
            include: {
                photos: true,
                portfolioCategory: true,
            },
        });

        return NextResponse.json(newSubcategory, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create subcategory" },
            { status: 500 },
        );
    }
}

export async function GET() {
    try {
        const subcategories = await prisma.portfolioSubcategory.findMany({
            include: {
                photos: true, // 🖼️ include all photos
                portfolioCategory: true, // 📂 include parent category (optional)
            },
            orderBy: {
                id: "desc",
            },
        });

        return NextResponse.json(subcategories, { status: 200 });
    } catch (error: any) {
        console.error("ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch subcategories" },
            { status: 500 },
        );
    }
}
