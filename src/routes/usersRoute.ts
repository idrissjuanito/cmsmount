import {
  newUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/UserController";
import { Router } from "express";
import { login, logout } from "../controllers/AuthController";

const userRouter = Router();
userRouter.post("/registration", newUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUser);
userRouter.delete("/:userId", deleteUser);
userRouter.put("/:userId", updateUser);
userRouter.get("/login", login);
userRouter.get("/logout", logout);

export default userRouter;
