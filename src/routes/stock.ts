import StockController from "@controllers/stocks";
import { validator as filtervalidator } from "@middlewares/validate";
import { Router } from "express";

const stockRouter = Router();

stockRouter.get("/stocks/tickers", StockController.getStockTickers);

stockRouter.get(
  "/stocks",
  filtervalidator,
  StockController.getGroupedStockData
);

stockRouter.get("/stocks/aggregate", StockController.getStockAggregatedData);

// stockRouter.get(
//   "/stocks/open-close",
//   StockController.getDailyOpenCloseStockData
// );

// stockRouter.get("/stocks/prev", StockController.getDailyOpenCloseStockData);

export default stockRouter;
