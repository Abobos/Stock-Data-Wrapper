import {
  sendSuccessResponse,
  sendSuccessResponseWithPagination,
} from "@modules/sendResponse";
import StockService from "@services/stocks";
import { getOffSet, getPaginationMetaData } from "@utils/pagination";
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
  static async getGroupedStockData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { results } = await StockService.getGroupedStockData(req.query);

      const { page = 1, perPage = 15 } = req.query as any;

      const offset = getOffSet(page, perPage);

      const paginatedResult = results.slice(offset, page * perPage);

      const paginationMeta = getPaginationMetaData(
        results.length,
        page,
        perPage,
        paginatedResult.length
      );

      sendSuccessResponseWithPagination(
        res,
        200,
        "Grouped stock data retrieved successfully",
        paginationMeta,
        paginatedResult
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

  static async getPreviouseCLoseStockData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await StockService.getPreviousCloseStockData(req.query);

      sendSuccessResponse(
        res,
        200,
        "Previous/Close stock data retreived",
        results
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getDailyOpenCloseStockData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await StockService.getOpenCloseData(req.query);

      sendSuccessResponse(res, 200, "Open/Close stock data retrieved", results);
    } catch (error) {
      return next(error);
    }
  }

  static async getReportStockData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await StockService.getReportStockData(req.query);

      sendSuccessResponse(
        res,
        200,
        "Best Performing stock data retrieved",
        results
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default StockController;
