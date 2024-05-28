import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models";
import { BadRequestError, NotFoundError, ServerError } from "../errors";
import jwt from "jsonwebtoken";
import config from "../config";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const base64Header = req.get("Authorization");
  if (!base64Header) return next(new BadRequestError("Missing credentials"));
  const credentials = Buffer.from(
    base64Header.split(" ")[1],
    "base64",
  ).toString("utf-8");
  const [email, password] = credentials.split(":");
  try {
    const user = await UserModel.findComparePassword(email, password);
    if (!user) return next(new NotFoundError("User"));
    const token = jwt.sign({ userId: user.id }, config.secret, {
      expiresIn: 60 * 60,
    });
    return res.json({ email: user.email, token });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.json({ message: "user logged out successfully" });
};
