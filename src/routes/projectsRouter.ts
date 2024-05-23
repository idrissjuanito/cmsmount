import { Router } from "express";
import {
  getAllProjects,
  getProject,
  newProject,
  updateProject,
  deleteProject,
} from "../controllers/ProjectController";
import { BearerAuth, ApiKeyAuth } from "../middlewares";

const projectRouter = Router();

// adds jwt token auth for modify routes
projectRouter.post("/", newProject);
projectRouter.put("/:projectId", updateProject);
projectRouter.delete("/:projectId", deleteProject);

// Add optional api auth got publicly available methods
projectRouter.use(ApiKeyAuth);
projectRouter.get("/", getAllProjects);
projectRouter.get("/:projectId", getProject);
export default projectRouter;
