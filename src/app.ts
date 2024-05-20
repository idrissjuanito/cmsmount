import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares";

function createServer() {
  const app = express();
  app.use("/api/v1", router);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandler);
  return app;
}

export default createServer;
