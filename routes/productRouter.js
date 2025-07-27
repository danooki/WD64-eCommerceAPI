import {
  getProducts,
  createProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { Router } from "express";
import Products from "../models/ProductModel.js"; // Import the Products model

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", createProducts);
productsRouter.get("/:id", getProductById);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
