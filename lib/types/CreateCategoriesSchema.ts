import z from "zod";

export const fileSchema = z
    .custom<FileList>()
    .refine((files) => files.length > 0, `Image is required.`);

export const formSchema = z.object({
    type: z.string().min(1, "Section is required"),
    name: z.string().min(1, "Name is required"),
    primaryPhoto: fileSchema,
});

export const addSubcategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    primaryPhoto: fileSchema,
    photos: fileSchema.optional(),
});

export const addPhotosSchema = z.object({
    photos: fileSchema,
});
