import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

import orderSchema from "../schemas/orderSchema.js";
import validateSchema from "../middlewares/validateSchema.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(getOrders)
  .post(validateSchema(orderSchema), createOrder);
orderRouter
  .route("/:id")
  .get(getOrderById)
  .put(validateSchema(orderSchema), updateOrder)
  .delete(deleteOrder);

export default orderRouter;
