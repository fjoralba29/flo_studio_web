import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, type, primaryPhoto, photos } = body;

        if (!name || !type) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const category = await prisma.category.create({
            data: {
                name,
                description,
                type,
                primaryPhoto,
                photos: photos?.length
                    ? {
                          create: photos.map((url: string) => ({
                              url,
                          })),
                      }
                    : undefined,
            },
            include: {
                photos: true,
            },
        });

        return NextResponse.json(category);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export const runtime = "nodejs";

// GET: Fetch all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                photos: true, // remove if not needed
            },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error("GET /api/categories error:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
