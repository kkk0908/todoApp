module.exports = {
    DUPLICATE: {
        status: 200,
        message: "Data Already Existed!",
    },
    CREATED: {
        status: 200,
        message: "Data Created Successfully!",
    },
    UPDATED: {
        status: 200,
        message: "Data Updated Successfully!",
    },
    RESET_PASSWORD: {
        status: 200,
        message: "Password Updated Successfully!",
    },
    LOGOUT: {
        status: 200,
        message: "Logout Successfully!",
    },
    DELETED: {
        status: 200,
        message: "Data Deleted Successfully!",
    },
    FETCHED: {
        status: 200,
        message: "Data Fetched Successfully!",
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
