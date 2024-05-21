import { Request, Response } from "express";
import { Router } from "express";
import { NotFoundError } from "../errors";
import {
  newUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/UserController";
import { login, logout } from "../controllers/AuthController";

// main router
const router = Router();

// users specific routes
const userRouter = Router();
userRouter.post("/registration", newUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUser);
userRouter.delete("/:userId", deleteUser);
userRouter.put("/:userId", updateUser);
userRouter.get("/login", login);
userRouter.get("/logout", logout);

// set userRouter on main router as route for all /users routes
router.use("/users", userRouter);

router.get("/", (req: Request, res: Response) => {
  throw new NotFoundError("Route");
});

export default router;
