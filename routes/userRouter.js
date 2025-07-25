import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/", createUser); // POST Create a new user
userRouter.put("/", updateUser); // PUT Update an existing user
userRouter.get("/", getUsers); // GET all users
userRouter.get("/:id", getUserById); // GET user by ID
userRouter.delete("/:id", deleteUser); // DELETE a user by ID

export default userRouter;
