module.exports = {
  OK: {
    status: 200,
    message: "Ok",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
  },
  BAD_REQUEST: {
    status: 400,
    message: "bad Request",
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    status: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    status: 404,
    message: "Not Found",
  },
  TOO_MANY_REQUEST: {
    status: 429,
    message: "Too Many Request",
  },
  UNPROCESSABLE_ENTITY: {
    status: 422,
    message: "Unprocessable Entity",
  },
  PRECONDITION_FAILED: {
    status: 412,
    message: "Precondition Failed",
  },
};
