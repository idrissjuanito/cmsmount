import { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError } from "../errors";
import userRouter from "./usersRoute";
import appRouter from "./appsRouter";
import postsRouter from "./postsRouter";
import projectsRouter from "./projectsRouter";

// main router
const router = Router();

// set userRouter on main router as route for all /users routes
router.use("/users", userRouter);
// user appRouter for all /apps routes
router.use("/apps", appRouter);
router.use("/content/posts", postsRouter);
router.use("/content/projects", projectsRouter);

router.get("/", (req: Request, res: Response) => {
  throw new NotFoundError("Route");
});

export default router;
