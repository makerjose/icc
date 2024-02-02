const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};


export { notFound, errorHandler };
