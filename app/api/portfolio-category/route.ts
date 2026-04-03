import { deleteManyFromCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, primaryPhoto } = body;

        // Basic validation
        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 },
            );
        }

        const newCategory = await prisma.portfolioCategory.create({
            data: {
                name,
                primaryPhoto,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
        );
    }
}

export async function GET() {
    try {
        const categories = await prisma.portfolioCategory.findMany({
            include: {
                photos: true,
                subcategories: {
                    include: {
                        photos: true,
                    },
                },
            },
            orderBy: {
                id: "asc",
            },
        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error: any) {
        console.error("ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch categories" },
            { status: 500 },
        );
    }
}
