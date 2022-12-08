class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.operational = true;
    this.status = String(statusCode).startsWith("4") ? "failed" : "failure";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
