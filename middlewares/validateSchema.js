import { z } from "zod/v4";

const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    // console.log(result);
    if (!result.success) {
      console.log(result.error.issues);
      /*       throw new Error(`Validation error: ${result.error}`);
       */

      throw new Error(`Validation error: ${z.prettifyError(result.error)}`);
    }
  };
};

export default validateSchema;
