import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all videos
export async function GET() {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 },
        );
    }
}

// POST new video
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, url } = body;

        if (!title || !url) {
            return NextResponse.json(
                { error: "Title and URL are required" },
                { status: 400 },
            );
        }

        const video = await prisma.video.create({
            data: { title, url },
        });

        return NextResponse.json(video, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create video" },
            { status: 500 },
        );
    }
}

// /app/api/videos/route.ts
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = Number(searchParams.get("id"));

        if (!id || isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid video ID" },
                { status: 400 },
            );
        }

        await prisma.video.delete({ where: { id } });

        return NextResponse.json({ message: "Video deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete video" },
            { status: 500 },
        );
    }
}
