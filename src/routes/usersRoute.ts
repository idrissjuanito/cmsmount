import {
  newUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/UserController";
import { Router } from "express";
import { login, logout } from "../controllers/AuthController";
import { BearerAuth } from "../middlewares";

const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.get("/logout", logout);
userRouter.get("/account", getUser);
userRouter.delete("/account", deleteUser);
userRouter.put("/account", updateUser);

export default userRouter;
