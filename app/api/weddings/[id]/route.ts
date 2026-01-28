import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    id: string;
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const params = await context.params;
        const id = Number(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid package ID" },
                { status: 400 },
            );
        }

        // Check if the package exists
        const existingPackage = await prisma.weddingPackage.findUnique({
            where: { id },
            include: { items: true }, // optional, just to see connected items
        });

        if (!existingPackage) {
            return NextResponse.json(
                { error: "Wedding package not found" },
                { status: 404 },
            );
        }

        // Delete the wedding package (Prisma will handle the many-to-many join table)
        await prisma.weddingPackage.delete({
            where: { id },
        });

        return NextResponse.json({
            message: "Wedding package deleted successfully.",
        });
    } catch (error) {
        console.error("DELETE WEDDING PACKAGE ERROR:", error);
        return NextResponse.json(
            { error: "Failed to delete wedding package" },
            { status: 500 },
        );
    }
}
