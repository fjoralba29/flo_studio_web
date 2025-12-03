import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }

        const service = await prisma.service.create({
            data: {
                name,
                description,
            },
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create service" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(services);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}
