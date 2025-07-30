import express from "express";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import orderRouter from "./routes/orderRouter.js";
import "./db/associations.js"; // Import associations to ensure they are set up
import errorHandler from "./middlewares/errorHandler.js";

// console.log(process.env.NEON_URI); // Log the environment variable for debugging

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/users", userRouter); // USERS ROUTER
app.use("/products", productRouter); // PRODUCTS ROUTER
app.use("/categories", categoryRouter); // CATEGORIES ROUTER
app.use("/orders", orderRouter); // ORDER ROUTER

app.use((req, res) => {
  throw new Error("Page doesnt exist!", { cause: 404 }); // Example route to test error handling
});

app.use(errorHandler); // Error handling middleware

app.listen(port, () => {
  process.env.NODE_ENV === "production" // check if variable NODE_ENV exists, would mean production
    ? console.log("Running in production mode") // Log message for production
    : console.log(`Server is running on DEV mode via http://localhost:${port}`); // development = from PC
}); // Start the server and listen on the specified port
