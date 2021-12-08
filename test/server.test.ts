import app from "../src/server";

import request from "supertest";

describe("App", () => {
  it("Should display Welcome to Stock Data API Service", async () => {
    const res = await request(app).get("/").expect(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toEqual("Welcome to Stock Data API Service");
  });
});

it("Should return not found message for unavailable route", async () => {
  const res = await request(app).get("/many").expect(404);

  expect(res.body.status).toBe("failure");
  expect(res.body.error).toEqual("This route is unavailable on the server");
});
