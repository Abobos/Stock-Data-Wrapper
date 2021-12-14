import StockService from "./stocks";
import scheduler from "node-cron";

import StockDataRepositoryInstance from "../repositories/stock";
import { logger } from "../utils";

export const saveBestStockEntities = () => {
  logger.info("A job is schedule to run on daily 12:00am");
  scheduler.schedule("0 0 0 * * *", async () => {
    try {
      logger.info("About to retrieve stock Data from Stock Data Service");

      const { results } = await StockService.getGroupedStockData({});

      logger.info("About to sort stock Data accorfing to performance");

      results.sort((a, b) => b.p - a.p);

      const [bestStock1, bestStock2, bestStock3] = results;

      logger.info("About to save the three best stock Data to database");

      const stockDataPromise = [bestStock1, bestStock2, bestStock3].map(
        (stockData) => {
          const column =
            "ticker_name, cost, gain, percentage_performance, timestamp";

          const values = `'${stockData.T}', '${stockData.c}', '${stockData.d}', '${stockData.p}', '${stockData.t}'`;

          return StockDataRepositoryInstance.create(column, values);
        }
      );

      const resultCreated = await Promise.all(stockDataPromise);

      logger.info(
        `3 best performing stock data saved successfully to the database
        ${JSON.stringify(resultCreated)}`
      );
    } catch (error: any) {
      logger.info(`An error occurred from scheduler ${error}, ${error.stack}`);
    }
  });
};
