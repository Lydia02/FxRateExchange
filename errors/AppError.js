class AppError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500; // Set the status code to 500 (Internal Server Error)
  }
}

module.exports = AppError;
