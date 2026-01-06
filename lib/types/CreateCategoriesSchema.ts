import z from "zod";

export const fileSchema = z
    .custom<FileList>()
    .refine((files) => files.length > 0, `Image is required.`);

export const formSchema = z.object({
    type: z.string().min(1, "Section is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    primaryPhoto: fileSchema,
    photos: fileSchema,
});
