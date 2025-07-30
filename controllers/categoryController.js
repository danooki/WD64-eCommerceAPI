import Category from "../models/CategoryModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    /*     const category = await Category.findByPk(id); */
    const category = await Category.findByPk(id);

    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const {
      body: { categoryID, categoryName },
    } = req;
    if (!categoryID || !categoryName)
      return res
        .status(400)
        .json({ error: "Category ID and Name are required" });

    const existingCategory = await Category.findOne({ where: { categoryID } });
    if (existingCategory)
      return res
        .status(400)
        .json({ error: "Category with this ID already exists" });

    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const {
      body: { categoryID, categoryName },
      params: { id },
    } = req;
    if (!categoryID || !categoryName)
      return res
        .status(400)
        .json({ error: "Category ID and Name are required" });
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.update(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
