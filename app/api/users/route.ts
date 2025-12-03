import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const page = Number(searchParams.get("page") ?? 1);
        const limit = Number(searchParams.get("limit") ?? 10);

        const skip = (page - 1) * limit;

        const users = await prisma.user.findMany({
            skip,
            take: limit,
            orderBy: { id: "desc" },
        });

        const total = await prisma.user.count();
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            content: users,
            nextPage: page < totalPages ? page + 1 : null,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
