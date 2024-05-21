import { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError } from "../errors";
import {
  newUser,
  getAllUsers,
  deleteUser,
} from "../controllers/UserController";
import { login } from "../controllers/AuthController";

// main router
const router = Router();

// users specific routes
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/registration", newUser);
userRouter.delete("/:userId", deleteUser);
userRouter.get("/login", login);

// set userRouter on main router as route for all /users routes
router.use("/users", userRouter);

router.get("/", (req: Request, res: Response) => {
  throw new NotFoundError("Route");
});

export default router;
