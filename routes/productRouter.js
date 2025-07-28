import {
  getProducts,
  createProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { Router } from "express";
import Products from "../models/ProductModel.js"; // Import the Products model
import validateProductsSchema from "../middlewares/validatProductsSchema.js"; // Import the validation middleware
const productsRouter = Router();

productsRouter
  .route("/")
  .get(getProducts)
  .post(validateProductsSchema, createProducts);
productsRouter
  .route("/:id")
  .get(getProductById)
  .put(validateProductsSchema, updateProduct)
  .delete(deleteProduct);

export default productsRouter;
