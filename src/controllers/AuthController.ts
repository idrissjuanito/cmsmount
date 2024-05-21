import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";
import { BadRequestError, NotFoundError, ServerError } from "../errors";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const base64Header = req.get("Authorization");
  if (!base64Header) return next(new BadRequestError("credentials"));
  const credentials = Buffer.from(
    base64Header.split(" ")[1],
    "base64",
  ).toString("utf-8");
  const [email, password] = credentials.split(":");
  try {
    const user = await UserModel.comparePassword(email, password);
    if (!user) return next(new NotFoundError("User"));
    return res.json({ email: user.email });
    // return res.send("processing");
  } catch (error) {
    return next(new ServerError());
  }
};
