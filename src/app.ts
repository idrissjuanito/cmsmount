import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares";
import helmet from "helmet";

function createServer() {
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.disable("x-powered-by");
  app.use("/api/v1", router);
  app.use(errorHandler);
  return app;
}

export default createServer;
