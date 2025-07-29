const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new Error(`Validation error: ${result.error.message}`);
    }
    next();
  };
};

export default validateSchema;
