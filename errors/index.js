const CustomAPIError = require("./customError")
const UnauthenticatedError = require("./unauthenticated")
const BadRequestError = require("./badRequest")
const NotFoundError = require("./notFound")
const UnauthorisedError = require("./unauthorised")
const AppError = require("./AppError")
const tryCatch = require("./tryCatch")
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
  UnauthorisedError,
  AppError,
  tryCatch
}
