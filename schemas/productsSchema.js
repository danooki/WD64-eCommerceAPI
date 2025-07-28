import { z } from "zod/v4";
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().gt(0, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
});

export default productSchema;
