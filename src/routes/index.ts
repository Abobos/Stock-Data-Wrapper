import { Router, Request, Response } from "express";

import {
  sendSuccessResponseII,
  sendErrorResponse,
} from "@modules/sendResponse";

import { validator as filtervalidator } from "@middlewares/validate";

import stockRouter from "./stock";

const router = Router();

router.get("/", (_req: Request, res: Response) =>
  sendSuccessResponseII(res, 200, "Welcome to Stock Data API Service")
);

router.use("/api/v1", filtervalidator, stockRouter);

router.all("*", (_req: Request, res: Response) =>
  sendErrorResponse(res, 404, "This route is unavailable on the server")
);

export default router;
