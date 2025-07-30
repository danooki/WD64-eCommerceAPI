import { z } from "zod/v4";

const userSchema = z.object({
  completeName: z
    .string("Complete Name is required")
    .min(1, "Complete Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default userSchema;
