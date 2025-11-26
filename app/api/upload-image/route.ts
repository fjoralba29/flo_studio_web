import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const buffer = await file.arrayBuffer();
        const bytes = Buffer.from(buffer);

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

        const cloudinaryRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: (() => {
                    const fd = new FormData();
                    const blob = new Blob([buffer], { type: file.type });
                    fd.append("file", blob);
                    fd.append("file", blob);
                    fd.append("upload_preset", uploadPreset!);
                    return fd;
                })(),
            }
        );

        const data = await cloudinaryRes.json();

        if (!data.secure_url) {
            return NextResponse.json(
                { error: "Upload failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            imageUrl: data.secure_url,
            publicId: data.public_id,
        });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
