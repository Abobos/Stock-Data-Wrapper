import app from "../src/server";

import request from "supertest";
import nock from "nock";

import configuration from "../src/config/configuration";

import tickerResults from "./tickerDetails.json";
import groupedStockedData from "./groupedStockData.json";

describe("Stock Data", () => {
  test("Should return all Ticket Details that includes the name of stock/equity which is the name of the company ", async () => {
    nock(configuration().Polygon.url, {
      reqheaders: {
        Authorization: `Bearer ${configuration().Polygon.key}`,
      },
    })
      .get("/v3/reference/tickers")
      .query({
        market: "stocks",
        active: true,
        sort: "ticker",
        order: "asc",
        limit: "15",
      })
      .reply(200, tickerResults);

    const res = await request(app).get("/api/v1/stocks/tickers").expect(200);

    expect(res.body).toStrictEqual({
      status: "success",
      message: "Tickers retrieved successfully",
      nextPage: res.body.nextPage,
      data: tickerResults.results,
    });
  });

  test("Should return all Group Data", async () => {
    nock(configuration().Polygon.url, {
      reqheaders: {
        Authorization: `Bearer ${configuration().Polygon.key}`,
      },
    })
      .get("/v2/aggs/grouped/locale/us/market/stocks/2020-10-14")
      .query({
        adjusted: false,
      })
      .reply(200, groupedStockedData);

    const res = await request(app).get("/api/v1/stocks").expect(200);

    const mappedGroupData = groupedStockedData.results.map((result) => {
      return {
        ...result,
        d: +(result.c - result.o).toFixed(2),
        p: +(((result.c - result.o) / result.o) * 100).toFixed(2),
      };
    });

    expect(res.body).toStrictEqual({
      status: "success",
      message: "Grouped stock data retrieved successfully",
      data: mappedGroupData,
    });
  });
});

afterAll(() => {
  app.close();
});
