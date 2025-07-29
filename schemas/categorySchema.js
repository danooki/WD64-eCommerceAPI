import { z } from "zod/v4";

const categorySchema = z.object({
  categoryID: z.string().min(1, "Category ID is required"),
  categoryName: z.string().min(1, "Category Name is required"),
});

export default categorySchema;
