import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.get("/", getOrders); // GET all orders
orderRouter.get("/:id", getOrderById); // GET order by ID
orderRouter.post("/", createOrder); // POST Create a new order
orderRouter.put("/", updateOrder); // PUT Update an existing order
orderRouter.delete("/:id", deleteOrder); // DELETE a order by ID

export default orderRouter;
