import app from "../src/server";

import request from "supertest";
import nock from "nock";

import configuration from "../src/config/configuration";

import tickerResults from "./data/tickerDetails.json";
import groupedStockedData from "./data/groupedStockData.json";

import { TransformedGroupData } from "../src/services/types";

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

  test("Should return all stock data for stocks", async () => {
    const results = groupedStockedData.results.map((result) => {
      return {
        ...result,
        d: +(result.c - result.o).toFixed(2),
        p: +(((result.c - result.o) / result.o) * 100).toFixed(2),
      };
    });

    groupedStockedData.results = results;

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

    expect(res.body).toStrictEqual({
      status: "success",
      message: "Grouped stock data retrieved successfully",
      data: groupedStockedData.results,
    });
  });

  test("Should return all stock data for cost greater than 26", async () => {
    const results = groupedStockedData.results.map((result) => {
      return {
        ...result,
        d: +(result.c - result.o).toFixed(2),
        p: +(((result.c - result.o) / result.o) * 100).toFixed(2),
      };
    });

    groupedStockedData.results = results;

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

    const res = await request(app)
      .get("/api/v1/stocks?cost[gte]=26")
      .expect(200);

    expect(res.body.status).toEqual("success");
    expect(res.body.message).toEqual(
      "Grouped stock data retrieved successfully"
    );

    res.body.data.forEach((datum: TransformedGroupData) => {
      expect(datum.c).toBeGreaterThanOrEqual(26);
    });
  });
});

test("Should return all stock data for name 'COG'", async () => {
  const results = groupedStockedData.results.map((result) => {
    return {
      ...result,
      d: +(result.c - result.o).toFixed(2),
      p: +(((result.c - result.o) / result.o) * 100).toFixed(2),
    };
  });

  groupedStockedData.results = results;

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

  const res = await request(app).get("/api/v1/stocks?name=COG").expect(200);

  expect(res.body.status).toEqual("success");
  expect(res.body.message).toEqual("Grouped stock data retrieved successfully");
  expect(res.body.data[0].T).toEqual("COG");
});

test("Should return all stoc data for salesOutcome 'gain'", async () => {
  const results = groupedStockedData.results.map((result) => {
    return {
      ...result,
      d: +(result.c - result.o).toFixed(2),
      p: +(((result.c - result.o) / result.o) * 100).toFixed(2),
    };
  });

  groupedStockedData.results = results;

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

  const res = await request(app)
    .get("/api/v1/stocks?salesOutcome=gain")
    .expect(200);

  console.log({ res: res.body });

  expect(res.body.status).toEqual("success");
  expect(res.body.message).toEqual("Grouped stock data retrieved successfully");

  res.body.data.forEach((datum: TransformedGroupData) => {
    expect(datum.d).toBeGreaterThan(0);
  });
});

test("Should return all group data filter by salesOutcome 'loss'", async () => {
  const results = groupedStockedData.results.map((result) => {
    return {
      ...result,
      d: +(result.c - result.o).toFixed(2),
      p: +(((result.c - result.o) / result.o) * 100).toFixed(2),
    };
  });

  groupedStockedData.results = results;

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

  const res = await request(app)
    .get("/api/v1/stocks?salesOutcome=loss")
    .expect(200);

  console.log({ res: res.body });

  expect(res.body.status).toEqual("success");
  expect(res.body.message).toEqual("Grouped stock data retrieved successfully");

  res.body.data.forEach((datum: TransformedGroupData) => {
    expect(datum.d).toBeLessThan(0);
  });
});

afterAll(() => {
  app.close();
});
