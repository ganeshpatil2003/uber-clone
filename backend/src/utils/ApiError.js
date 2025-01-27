class ApiError extends Error {
  constructor(
    statuscode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statuscode = statuscode;
    this.message = message;
    this.data = null;
    this.status = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      this.stack = Error.captureStackTrace(this, this.stack);
    }
  }
}

export {ApiError};
