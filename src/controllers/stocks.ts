import { sendSuccessResponse } from "@modules/sendResponse";
import StockService from "@services/stocks";
import { Request, Response, NextFunction, query } from "express";

class StockController {
  static async getStockTickers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { cursor } = req.query as any;

      const { results, cursorFromUrl } = await StockService.getStockTickers(
        cursor
      );

      const nextPage = `${req.protocol}://${req.headers.host}/api/v1/stocks/tickers?cursor=${cursorFromUrl}`;

      sendSuccessResponse(
        res,
        200,
        "Tickers retrieved successfully",
        results,
        nextPage
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getStockAggregatedData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await StockService.getStockAggregatedData(req.query);

      sendSuccessResponse(res, 200, "Aggregate stock data", results);
    } catch (error) {
      return next(error);
    }
  }

  static async getGroupedStockData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { results } = await StockService.getGroupedStockData(req.query);

      sendSuccessResponse(
        res,
        200,
        "Stock data retrieved successfully",
        results
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default StockController;
