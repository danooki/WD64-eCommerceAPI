import {
  getProducts,
  createProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import productSchema from "../schemas/productsSchema.js";
const productsRouter = Router();

productsRouter
  .route("/")
  .get(getProducts)
  .post(validateSchema(productSchema), createProducts);
productsRouter
  .route("/:id")
  .get(getProductById)
  .put(validateSchema(productSchema), updateProduct)
  .delete(deleteProduct);

export default productsRouter;
