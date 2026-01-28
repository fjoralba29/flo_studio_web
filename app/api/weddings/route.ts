import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, items } = body;

        if (!name || !Array.isArray(items)) {
            return NextResponse.json(
                { error: "Name and items array are required" },
                { status: 400 },
            );
        }

        // Create WeddingPackage and PackageItems in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // 1️⃣ Create package items first
            const packageItems = await Promise.all(
                items.map((item: any) =>
                    tx.packageItem.create({
                        data: {
                            name: item.name,
                            description: item.description || null,
                        },
                    }),
                ),
            );

            // 2️⃣ Create wedding package and connect items
            const weddingPackage = await tx.weddingPackage.create({
                data: {
                    name,
                    description: description || null,
                    items: {
                        connect: packageItems.map((pi) => ({ id: pi.id })),
                    },
                },
                include: {
                    items: true,
                },
            });

            return weddingPackage;
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("CREATE WEDDING PACKAGE ERROR:", error);
        return NextResponse.json(
            { error: "Failed to create wedding package" },
            { status: 500 },
        );
    }
}

export async function GET() {
    try {
        const weddingPackages = await prisma.weddingPackage.findMany({
            include: {
                items: true, // Include all PackageItems
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(weddingPackages, { status: 200 });
    } catch (error) {
        console.error("GET WEDDING PACKAGES ERROR:", error);
        return NextResponse.json(
            { error: "Failed to fetch wedding packages" },
            { status: 500 },
        );
    }
}
