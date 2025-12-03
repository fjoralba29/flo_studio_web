import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, type, primaryPhoto } = body;

        if (!name || !type || !primaryPhoto) {
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
                primaryPhoto, // store the Cloudinary URL
            },
        });

        return NextResponse.json(category);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
