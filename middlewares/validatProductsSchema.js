import productSchema from "../schemas/productsSchema.js";
const validateProductsSchema = (req, res, next) => {
  const result = productSchema.safeParse(req.body);
  if (!result.success) {
    throw new Error(`Validation error: ${result.error.message}`);
  }
  next();
};

export default validateProductsSchema;
