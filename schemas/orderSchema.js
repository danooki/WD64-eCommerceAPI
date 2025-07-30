import z from "zod";
import orderItemSchema from "./orderItemSchema.js";

const orderSchema = z.object({
  userId: z.number().min(1, "User ID must be a number and greater than 1"),
  products: z.array(orderItemSchema).min(1),
});

export default orderSchema;
