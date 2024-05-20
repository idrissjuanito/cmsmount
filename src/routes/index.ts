import { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError } from "../errors";
import {
  newUser,
  getAllUsers,
  deleteUser,
} from "../controllers/UserController";

const router = Router();
const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/registration", newUser);
userRouter.delete("/:userId", deleteUser);

router.use("/users", userRouter);

router.get("/", (req: Request, res: Response) => {
  throw new NotFoundError("Route");
});

export default router;
