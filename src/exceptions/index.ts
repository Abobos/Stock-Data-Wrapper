const setPrototypeOf = (payload: { [prop: string]: any }, parent: Error) =>
  Object.setPrototypeOf(payload, parent);

export class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);

    setPrototypeOf(this, CustomError.prototype);
    this.name = this.constructor.name;
  }
}
