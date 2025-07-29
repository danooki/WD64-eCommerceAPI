import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";
import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter
  .route("/") // main route for users
  .get(getUsers) // GET all users
  .post(validateSchema(userSchema), createUser); // POST create a new user

userRouter
  .route("/:id") // id route for specific user
  .put(validateSchema(userSchema), updateUser) // PUT Update user by ID
  .get(getUserById) // GET user by ID
  .delete(deleteUser); // DELETE a user by ID

export default userRouter;
