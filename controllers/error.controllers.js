const errorGlobal = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || 'fail';

  res.status(statusCode).json({
    status,
    message: error.message,
    error: error,
    stack: error.stack,
  });
};

module.exports = { errorGlobal };
