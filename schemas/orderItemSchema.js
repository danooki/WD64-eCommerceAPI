import z from "zod";

const orderItemSchema = z.object({
  productId: z.number().min(1, "There is no productID 0"),
  quantity: z.number().int().min(1, "must order minimum 1 item wahaha"),
});

export default orderItemSchema;
