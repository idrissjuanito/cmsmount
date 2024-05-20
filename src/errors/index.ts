export default abstract class CustomError extends Error {
  constructor() {
    super();
  }
  abstract StatusCode: number;
  abstract serialize(): { message: string };
}

class NotFoundError extends CustomError {
  constructor(public resource: string) {
    super();
  }
  StatusCode = 404;
  serialize() {
    return { message: `${this.resource} not found` };
  }
}

class ServerError extends CustomError {
  constructor() {
    super();
  }
  StatusCode = 500;
  serialize() {
    return { message: "Something went wrong on server" };
  }
}

class UnauthorizedError extends CustomError {
  constructor() {
    super();
  }
  StatusCode = 401;
  serialize() {
    return { message: "Access unauthorized" };
  }
}

class BadRequestError extends CustomError {
  constructor(public missing: string) {
    super();
  }
  StatusCode = 401;
  serialize() {
    return { message: `Bad request: Missing ${this.missing}` };
  }
}

export { NotFoundError, ServerError, BadRequestError, UnauthorizedError };
