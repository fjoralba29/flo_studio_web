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
