import { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError } from "../errors";
import userRouter from "./usersRoute";
import appRouter from "./appsRouter";
import postsRouter from "./postsRouter";
import projectsRouter from "./projectsRouter";
import { BearerAuth, Auth } from "../middlewares";
import { newUser } from "../controllers/UserController";
import { login } from "../controllers/AuthController";

// main router
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ status: "Normal" });
});
router.post("/registration", newUser);
router.get("/login", login);

// User authentication for all routes from here down
router.use(BearerAuth, Auth);
// set userRouter on main router as route for all /users routes
router.use("/users", userRouter);

// user appRouter for all /apps routes
router.use("/apps", appRouter);

router.use("/content/posts", postsRouter);
router.use("/content/projects", projectsRouter);

router.get("*", (req: Request, res: Response) => {
  throw new NotFoundError("Route");
});

export default router;
