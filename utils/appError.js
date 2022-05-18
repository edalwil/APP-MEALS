//4** => cliente error => "error"
//5** => error del servidor => "fail"

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;

    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
