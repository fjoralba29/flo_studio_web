import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export default cloudinary;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// 🔥 Extract public_id from URL
export const getPublicIdFromUrl = (url: string) => {
    const parts = url.split("/");
    const file = parts.slice(-2).join("/"); // folder/image.jpg
    return file.split(".")[0]; // remove extension
};

// 🔥 Delete single image
export const deleteFromCloudinary = async (url: string) => {
    const publicId = getPublicIdFromUrl(url);
    return cloudinary.uploader.destroy(publicId);
};

// 🔥 Delete multiple
export const deleteManyFromCloudinary = async (urls: string[]) => {
    const publicIds = urls.map(getPublicIdFromUrl);
    return cloudinary.api.delete_resources(publicIds);
};
