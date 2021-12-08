import { sendSuccessResponse } from "@modules/sendResponse";
import { axiosInstance } from "@services/axios";
import { Request, Response, NextFunction } from "express";

class StockController {
  static async getStockTickers(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await axiosInstance.get("v3/reference/tickers", {
        market: "stocks",
        active: true,
        sort: "ticker",
        order: "asc",
        limit: "10",
      });

      sendSuccessResponse(res, 200, "Tickers retrieved successfully", data);
    } catch (error) {
      return next(error);
    }
  }
}

export default StockController;
