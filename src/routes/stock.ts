import StockController from "@controllers/stocks";
import { Router } from "express";

const stockRouter = Router();

stockRouter.get("/stocks/tickers", StockController.getStockTickers);

export default stockRouter;
