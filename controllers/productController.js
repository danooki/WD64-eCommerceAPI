import { Sequelize } from "sequelize";
import Products from "../models/ProductModel.js";
import sequelize from "../db/dbConnection.js";

export const getProducts = async (req, res) => {
  try {
    const product = await Products.findAll();
    res.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProducts = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // Validate all required fields
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({
        error:
          "All fields (name, description, price, categoryId) are required.",
      });
    }

    // Check if product with the same name already exists
    const existingProduct = await Products.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(400).json({
        error: "Product with this name already exists.",
      });
    }

    // Create new product
    const product = await Products.create({
      name,
      description,
      price,
      categoryId,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;

    // Validate all required fields
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({
        error:
          "All fields (name, description, price, categoryId) are required.",
      });
    }

    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update({ name, description, price, categoryId });
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
