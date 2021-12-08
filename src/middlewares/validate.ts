import { Request, Response, NextFunction } from "express";

import {
  emailRegex,
  nameRegex,
  validateAgainstRegex,
  errorChecker,
  magicTrimmer,
} from "@modules/validator";

import { sendErrorResponse } from "@modules/sendResponse";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const userData = magicTrimmer(req.body);

  const { name, email } = userData;

  const validationSchema = {
    name: validateAgainstRegex(name, nameRegex, "name"),
    email: validateAgainstRegex(email, emailRegex, "email"),
  };

  const errors = errorChecker(validationSchema);

  if (errors) return sendErrorResponse(res, 422, errors);

  next();
};
