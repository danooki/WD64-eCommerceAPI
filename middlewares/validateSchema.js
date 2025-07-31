import z from "zod/v4";

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { data, error } = schema.safeParse(req.body);
    // console.log(result); removed

    if (error) {
      const allErrors = error.issues.map((issue) => issue.message);
      throw new Error(allErrors, { cause: 400 });

      /*   PREVIOUS CODE  
      if (!result.success) {
      console.log(result.error);
            throw new Error(`Validation error: ${result.error}`);
        throw new Error(`Validation error: ${z.prettifyError(result.error)}`);
    } */
    } else {
      req.sanitizedBody = data; // Creates a new property in req object with sanitized data from Zod
    }

    next();
  };
};

export default validateSchema;
