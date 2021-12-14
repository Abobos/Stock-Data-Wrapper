import {
  GroupedDataResult,
  OpenCloseStockDataResult,
  PreviousCloseResult,
  TickersResult,
  TransformedGroupData,
} from "../services/types";

import {} from "../utils/index";
import {
  getFilterCondition,
  getValueAndOperator,
  axiosInstance,
} from "../utils/index";

import StockDataRepository from "../repositories/stock";

class StockService {
  static async getStockTickers(cursor: string) {
    try {
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

      return { results: response.results, cursorFromUrl };
    } catch (error) {
      throw error;
    }
  }

  static async getStockAggregatedData(query: any) {
    try {
      const response = await axiosInstance.get<TickersResult>(
        `v2/aggs/ticker/${query.name}/range/1/${query.timespan}/${query.startDate}/${query.endDate}`,
        {
          adjusted: false,
          sort: "asc",
          limit: "15",
        }
      );

      return response.results;
    } catch (error) {
      throw error;
    }
  }

  static async getGroupedStockData(query: any) {
    try {
      const response = await axiosInstance.get<GroupedDataResult>(
        "v2/aggs/grouped/locale/us/market/stocks/2020-10-14",
        {
          adjusted: false,
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

      let { cost, percentagePer, name, salesOutcome } = query as any;

      cost = getValueAndOperator(cost);
      percentagePer = getValueAndOperator(percentagePer);
      name = getValueAndOperator(name);
      salesOutcome = getValueAndOperator(salesOutcome);

      if (
        cost.value ||
        percentagePer.value ||
        name.value ||
        salesOutcome.value
      ) {
        results = results.filter((result) => {
          let filteredCondition: boolean;

          if (cost.value) {
            filteredCondition = getFilterCondition(result.c, cost);
            if (!filteredCondition) return;
          }

          if (percentagePer.value) {
            filteredCondition = getFilterCondition(result.p, percentagePer);
            if (!filteredCondition) return;
          }

          if (name.value) {
            filteredCondition = getFilterCondition(result.T, name);

            if (!filteredCondition) return;
          }

          if (salesOutcome.value) {
            if (salesOutcome.value === "gain") {
              filteredCondition = result.d > 0;
            }

            if (salesOutcome.value === "loss") {
              filteredCondition = result.d < 0;
            }

            if (!filteredCondition) return;
          }

          return filteredCondition;
        });
      }

      return { results };
    } catch (error) {
      throw error;
    }
  }

  static async getOpenCloseData(query: any) {
    try {
      const response = await axiosInstance.get<OpenCloseStockDataResult>(
        `v1/open-close/${query.name}/${query.date}`,
        {
          adjusted: false,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getPreviousCloseStockData(query: any) {
    try {
      const response = await axiosInstance.get<PreviousCloseResult>(
        `v2/aggs/ticker/${query.name}/prev`,
        {
          adjusted: false,
        }
      );

      return response.results;
    } catch (error) {
      throw error;
    }
  }

  static async getReportStockData(query: any) {
    try {
      const fields = `ticker_name, cost, gain, percentage_performance, timestamp, created_at`;

      const conditions = `created_at >= '${query.from}' and created_at <= '${query.to}'`;

      const response = StockDataRepository.findAll(fields, conditions);

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default StockService;
