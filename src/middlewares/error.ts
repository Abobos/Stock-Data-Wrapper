import { CustomError } from "@exceptions/index";
import { Request, Response, NextFunction, Application } from "express";

import { logger } from "../utils";

export const defaultErrorHandler = (app: Application) =>
  app.use(
    (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
      const statusCode = error.statusCode || 500;

      process.env.NODE_ENV !== "production" &&
        statusCode === 500 &&
        logger.error(`${statusCode} ${error.message} \n ${error.stack}`);

      res.status(statusCode).send({
        status: "failure",
        error: statusCode === 500 ? "something went wrong" : error.message,
      });
    }
  );
