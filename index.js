import express from "express";
import userRouter from "./routes/userRouter.js";
import { Sequelize } from "sequelize";
import sequelize from "./db/dbConnection.js";

console.log(process.env.NEON_URI); // Log the environment variable for debugging

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/users", userRouter); // USERS ROUTER

app.use((req, res) => {
  throw new Error("Page not found");
});

sequelize.sync();

app.listen(port, () => {
  process.env.NODE_ENV === "production" // check if variable NODE_ENV exists, would mean production
    ? console.log("Running in production mode") // Log message for production
    : console.log(`Server is running on DEV mode via http://localhost:${port}`); // development = from PC
}); // Start the server and listen on the specified port
