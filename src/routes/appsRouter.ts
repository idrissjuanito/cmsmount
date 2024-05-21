import { Router } from "express";
import {
  newApp,
  getApp,
  getAllApps,
  updateApp,
  deleteApp,
} from "../controllers/AppsController";

// Apps specific routes
const appRoute = Router();
appRoute.post("/", newApp);
appRoute.get("/", getAllApps);
appRoute.get("/:appId", getApp);
appRoute.put("/:appId", updateApp);
appRoute.delete("/:appId", deleteApp);

export default appRoute;
