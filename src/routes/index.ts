import { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError } from "../errors";
const router = Router();
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ state: "all green" });
});

router.use("/users", userRouter);

router.get("/", (req: Request, res: Response) => {
  throw new NotFoundError("Route");
});

export default router;
