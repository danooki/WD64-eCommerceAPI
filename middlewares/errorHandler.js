const errorHandler = (err, req, res, next) => {
  res
    .status(err.cause || 500)
    .json({ error: err.message || "Internal Server Error" });
  console.log(err);
};

export default errorHandler;
