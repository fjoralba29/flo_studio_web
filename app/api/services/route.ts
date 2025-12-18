import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

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
    console.time("TOTAL");

    try {
        console.time("DB");
        const services = await prisma.service.findMany();
        console.timeEnd("DB");

        console.time("RESPONSE");
        const res = NextResponse.json(services);
        console.timeEnd("RESPONSE");

        console.timeEnd("TOTAL");
        return res;
    } catch (error) {
        console.error(error);
        console.timeEnd("TOTAL");
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}
