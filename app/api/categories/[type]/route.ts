import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CategoryType } from "@prisma/client";

export async function GET(
    request: Request,
    context: { params: Promise<{ type: string }> } // note Promise
) {
    try {
        const { type } = await context.params; // ✅ unwrap the promise

        // Validate type
        const allowedTypes = Object.values(CategoryType);
        if (!allowedTypes.includes(type as CategoryType)) {
            return NextResponse.json(
                { error: "Invalid category type" },
                { status: 400 }
            );
        }

        const categories = await prisma.category.findMany({
            where: { type: type as CategoryType },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(categories);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
