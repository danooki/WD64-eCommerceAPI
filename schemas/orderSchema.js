import z from "zod";

const orderSchema = z.object({
  userId: z.number("User ID must be a number"),
});

export default orderSchema;
