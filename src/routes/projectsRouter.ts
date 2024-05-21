import { Router } from "express";
import {
  getAllProjects,
  getProject,
  newProject,
  updateProject,
  deleteProject,
} from "../controllers/ProjectController";

const projectRouter = Router();
projectRouter.post("/", newProject);
projectRouter.get("/", getAllProjects);
projectRouter.get("/:projectId", getProject);
projectRouter.put("/:projectId", updateProject);
projectRouter.delete("/:projectId", deleteProject);

export default projectRouter;
