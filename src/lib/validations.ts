import { z } from "zod";

export const petIdSchema = z.string().cuid();

export const petFromSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(20),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner name is required" })
    .max(20),
  imageUrl: z.union([
    z.literal(""),
    z.string().url({
      message: "Image URL must be a valid URL",
    }),
  ]),
  age: z.coerce.number().min(0).max(100),
  notes: z.union([
    z.literal(""),
    z.string().trim().max(500, {
      message: "Notes must not exceed 500 characters",
    }),
  ]),
});

export type TPetForm = z.infer<typeof petFromSchema>;
