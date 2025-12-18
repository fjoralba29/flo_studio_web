import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = Number(id);
        const { eventName } = await req.json();

        if (!eventName) {
            return NextResponse.json(
                { error: "Event name is required" },
                { status: 400 }
            );
        }

        // 1️⃣ Check if event exists
        let event = await prisma.event.findFirst({
            where: { name: eventName },
        });

        // 2️⃣ If event does not exist, create it
        if (!event) {
            event = await prisma.event.create({
                data: { name: eventName },
            });
        }

        // 3️⃣ Create UserEvent relation
        const userEvent = await prisma.userEvent.create({
            data: {
                userId: userId,
                eventId: event.id,
                urls: [], // required because urls is NOT optional
            },
        });

        return NextResponse.json({ success: true, userEvent });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
