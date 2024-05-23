import { Router } from "express";
import {
  newApp,
  getApp,
  getAllApps,
  updateApp,
  deleteApp,
} from "../controllers/AppsController";

// Apps specific routes
const appsRouter = Router();
appsRouter.post("/", newApp);
appsRouter.get("/", getAllApps);
appsRouter.get("/:appId", getApp);
appsRouter.put("/:appId", updateApp);
appsRouter.delete("/:appId", deleteApp);

export default appsRouter;
