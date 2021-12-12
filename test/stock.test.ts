import app from "../src/server";

import request from "supertest";

import nock from "nock";

import data from "./data.json";

describe("Stock Data", () => {
  test("Should return all Ticket Details that includes the name of stock/equity which is the name of the company ", async () => {
    nock(
      "https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&sort=ticker&order=asc&limit=15",
      {
        reqheaders: {
          "content-type": "application/json",
          authorization: "Bearer l5lFzZ72AW25uCj316ZtypDFwUp6Pkx1",
        },
      }
    )
      .get("")
      .reply(200, {
        data,
      });

    //api.polygon.io/v3/reference/tickers?market=stocks&active=true&sort=ticker&order=asc&limit=1
    const res = await request(app).get("/api/v1/stocks/tickers");

    console.log({ res: res.body });
  });
});

afterAll(() => {
  app.close();
});
