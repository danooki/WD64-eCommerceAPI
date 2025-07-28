import {
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../controllers/categoryController.js";
import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import categorySchema from "../schemas/categorySchema.js";

const categoryRouter = Router();

categoryRouter
  .route("/") // main route for categories
  .get(getCategories) // GET all categories
  .post(validateSchema(categorySchema), createCategory); // POST create a new category

categoryRouter
  .route("/:id") // id route for specific category
  .get(getCategoryById) // GET category by ID
  .put(validateSchema(categorySchema), updateCategory) // PUT Update category by ID
  .delete(deleteCategory); // DELETE a category by ID

export default categoryRouter;
