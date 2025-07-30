import z from "zod";

const orderSchema = z.object({
  userId: z.number().min(1, "User ID must be a number and greater than 1"),
});

export default orderSchema;
