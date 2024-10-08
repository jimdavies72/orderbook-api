const {
  InvalidTokenError,
  UnauthorizedError,
} = require("express-oauth2-jwt-bearer");

exports.errorHandler = (error, request, response, next) => {
  if (error instanceof InvalidTokenError) {
    const message = "Bad credentials";

    return response.status(error.status).json({ message });
  }

  if (error instanceof UnauthorizedError) {
    const message = "Requires authentication";

    return response.status(error.status).json({ message });
  }

  const status = 500;
  const message = "Internal Server Error";

  response.status(status).json({ message });
};
