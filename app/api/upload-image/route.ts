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

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            return NextResponse.json(
                { error: "Cloudinary config missing" },
                { status: 500 }
            );
        }

        const buffer = await file.arrayBuffer();
        const blob = new Blob([buffer], { type: file.type });

        const cloudinaryForm = new FormData();
        cloudinaryForm.append("file", blob);
        cloudinaryForm.append("upload_preset", uploadPreset);

        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: cloudinaryForm,
            }
        );

        const data = await uploadRes.json();

        if (!data.secure_url) {
            return NextResponse.json(
                { error: data.error?.message || "Upload failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            imageUrl: data.secure_url,
            publicId: data.public_id,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
