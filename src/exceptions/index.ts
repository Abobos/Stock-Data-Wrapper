const setPrototypeOf = (
  payload: { [prop: string]: any },
  parent: InternalServerError
) => Object.setPrototypeOf(payload, parent);

export class InternalServerError extends Error {
  public message: string;
  public statusCode: number;

  constructor(message: string, code: number = 500) {
    super(message);

    setPrototypeOf(this, InternalServerError.prototype);
    this.name = this.constructor.name;

    this.message = message;
    this.statusCode = code;
  }
}

export class CustomError extends InternalServerError {
  constructor(message: string, code: number) {
    super(message, code);

    setPrototypeOf(this, CustomError.prototype);
    this.name = this.constructor.name;
  }
}
