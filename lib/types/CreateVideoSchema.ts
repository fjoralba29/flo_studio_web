import z from "zod";

export const videoformSchema = z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().url("Invalid URL").min(1, "URL is required"),
});
