import StockController from "@controllers/stocks";
import { Router } from "express";

const stockRouter = Router();

stockRouter.get("/stocks/tickers", StockController.getStockTickers);

stockRouter.get("/stocks", StockController.getGroupedStockData);

stockRouter.get("/stocks/aggregate", StockController.getStockAggregatedData);

stockRouter.get(
  "/stocks/open-close",
  StockController.getDailyOpenCloseStockData
);

stockRouter.get("/stocks/prev", StockController.getPreviouseCLoseStockData);

stockRouter.get("/stocks/reports", StockController.getReportStockData);

export default stockRouter;
