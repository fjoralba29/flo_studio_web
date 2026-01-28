import z from "zod";

export const servicesformSchema = z.object({
    name: z.string().min(1, "Name is required"),
});
