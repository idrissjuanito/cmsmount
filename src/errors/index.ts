export default abstract class CustomError extends Error {
  constructor() {
    super();
  }
  abstract StatusCode: number;
  abstract serialize(): { error: string };
}

class NotFoundError extends CustomError {
  constructor(public resource: string) {
    super();
  }
  StatusCode = 404;
  serialize() {
    return { error: `${this.resource} not found` };
  }
}

class ServerError extends CustomError {
  constructor() {
    super();
  }
  StatusCode = 500;
  serialize() {
    return { error: "Something went wrong on server" };
  }
}

class UnauthorizedError extends CustomError {
  constructor() {
    super();
  }
  StatusCode = 401;
  serialize() {
    return { error: "Access unauthorized" };
  }
}

class BadRequestError extends CustomError {
  constructor(public missing: string) {
    super();
  }
  StatusCode = 400;
  serialize() {
    return { error: `Bad request: ${this.missing}` };
  }
}

export { NotFoundError, ServerError, BadRequestError, UnauthorizedError };
