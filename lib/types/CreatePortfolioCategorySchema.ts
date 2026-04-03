import z from "zod";

export const fileSchema = z
    .custom<FileList>()
    .refine((files) => files.length > 0, `Image is required.`);

export const portfolioCategoryFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    primaryPhoto: fileSchema,
});
