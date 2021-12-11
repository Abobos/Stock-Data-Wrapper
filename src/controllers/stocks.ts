import { sendSuccessResponse } from "@modules/sendResponse";
import { axiosInstance } from "@services/axios";
import { getValueAndOperator } from "@utils/helpers";
import { Request, Response, NextFunction, query } from "express";

import {
  GroupedData,
  GroupedDataResult,
  TickersResult,
  TransformedGroupData,
} from "./types";

class StockController {
  static async getStockTickers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { cursor } = req.query;

      const response = await axiosInstance.get<TickersResult>(
        "v3/reference/tickers",
        {
          ...(cursor
            ? { cursor }
            : {
                market: "stocks",
                active: true,
                sort: "ticker",
                order: "asc",
                limit: "15",
              }),
        }
      );

      const urlParsed = new URL(response.next_url);
      const cursorFromUrl = urlParsed.search.split("=")[1];

      const nextPage = `${req.protocol}://${req.headers.host}/api/v1/stocks/tickers?cursor=${cursorFromUrl}`;

      sendSuccessResponse(
        res,
        200,
        "Tickers retrieved successfully",
        response.results,
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
      const response = await axiosInstance.get<TickersResult>(
        `v2/aggs/ticker/${req.query.ticker}/range/1/${req.query.day}/${req.query.startDate}/${req.query.endDate}`,
        {
          adjusted: true,
          sort: "asc",
          limit: "15",
        }
      );

      sendSuccessResponse(res, 200, "Aggregate stock data", response.results);
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
      console.log({ query: req.query });

      const response = await axiosInstance.get<GroupedDataResult>(
        "v2/aggs/grouped/locale/us/market/stocks/2020-10-14",
        {
          adjusted: true,
        }
      );

      let results = response.results.map((result) => {
        const returnedObject: TransformedGroupData = {
          ...result,
          d: +(result.c - result.o).toFixed(2),
          p: +(((result.c - result.o) / result.o) * 100).toFixed(2),
        };

        return returnedObject;
      });

      // let filteredResults: GroupedData[];

      results = results.map((result) => {
        let { cost, percentagePer, name, gain, loss } = req.query as any;

        if (cost) {
          cost = getValueAndOperator(cost);

          switch (cost.operator) {
            case "lte": {
              result.c <= cost.value;
            }
            case "gte": {
              result.c >= cost.value;
            }
            default: {
              result.c === cost.value;
            }
          }
        }
      });

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
