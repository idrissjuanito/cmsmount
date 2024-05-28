import mongoose from "mongoose";
// import connect from "../src/services/db.service";

describe("Mongodb commection", () => {
  afterAll(() => {
    mongoose.disconnect();
  });
  it("should throw an error", async () => {
    const mockConnect = jest.fn(() =>
      Promise.reject(new Error("connection failed")),
    );
    const mockMongoose = jest.mock("mongoose", () => ({
      connect: mockConnect,
    }));
    const connect = require("../src/services/db.service").default;
    const res = await connect();
    await expect(res).toBe("connection failed");
    expect(mockConnect).toHaveBeenCalled();
    mockConnect.mockRestore();
    jest.unmock("mongoose");
  });

  it("should log in succcess connection", async () => {
    const connect = require("../src/services/db.service").default;
    const logSpy = jest.spyOn(global.console, "log");
    await connect();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Database connection was successfull");
  });
});
