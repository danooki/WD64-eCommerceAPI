import express from "express";

console.log(process.env.NEON_URI); // Log the environment variable for debugging

const app = express();
const port = process.env.PORT || 8081;
