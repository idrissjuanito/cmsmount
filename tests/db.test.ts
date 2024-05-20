import mongoose from "mongoose";
import connect from "../src/services/db.service";

describe("Mongodb commection", () => {
  afterAll(() => {
    mongoose.disconnect();
  });
  it("should log in succcess connection", async () => {
    const logSpy = jest.spyOn(global.console, "log");
    await connect();
    expect(logSpy).toHaveBeenCalled();
  });
});
