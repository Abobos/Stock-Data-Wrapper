import {
  GroupedDataResult,
  TickersResult,
  TransformedGroupData,
} from "../services/types";

import { axiosInstance } from "../utils/axios";
import { getFilterCondition, getValueAndOperator } from "../utils/helpers";

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
        `v2/aggs/ticker/${query.ticker}/range/1/${query.day}/${query.startDate}/${query.endDate}`,
        {
          adjusted: false,
          sort: "asc",
          limit: "15",
        }
      );

      return { results: response.results };
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

      let { cost, percentagePer, name, gain } = query as any;

      cost = getValueAndOperator(cost);
      percentagePer = getValueAndOperator(percentagePer);
      name = getValueAndOperator(name);
      gain = getValueAndOperator(gain);

      if (cost.value || percentagePer.value || name.value || gain.value) {
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

          if (gain.value) {
            filteredCondition = getFilterCondition(result.d, gain);

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
}

export default StockService;
