import { ObjectProps } from "@utils/types";
import { Response } from "express";

export const sendErrorResponse = (
  res: Response,
  code: number,
  errorMessage: any
) =>
  res.status(code).send({
    status: "failure",
    error: errorMessage,
  });

export const sendSuccessResponse = (
  res: Response,
  code: number,
  message: string,
  data: ObjectProps,
  nextPage?: string
) =>
  res.status(code).send({
    status: "success",
    message,
    nextPage,
    data,
  });

export const sendSuccessResponseII = (
  res: Response,
  code: number,
  message: string
) =>
  res.status(code).send({
    status: "success",
    message,
  });
