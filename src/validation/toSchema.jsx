import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title là bắt buộc"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  // * + 1 bổ ích
  completed: z.boolean().default(false),
});
