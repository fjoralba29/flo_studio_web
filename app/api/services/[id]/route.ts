import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE /api/services/:id
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> } // params is a Promise in App Router
) {
    try {
        const { id: idParam } = await context.params; // ✅ unwrap params
        const id = Number(idParam); // convert to number

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid service ID" },
                { status: 400 }
            );
        }

        const existing = await prisma.service.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        await prisma.service.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Service deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete Service Error:", error);
        return NextResponse.json(
            { error: "Failed to delete service" },
            { status: 500 }
        );
    }
}
