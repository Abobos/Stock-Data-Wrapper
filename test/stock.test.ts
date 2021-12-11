import app from "../src/server";

import request from "supertest";
import axios from "axios";

describe("Stock Data", () => {
  test("Should return all Ticket Details that includes the name of stock/equity which is the name of the company ", async () => {
    const mockedAxios = jest.fn(axios);

    mockedAxios.getMockImplementation();

    const res = await request(app).get("/api/v1/stocks/tickers").expect(200);
  });
});
