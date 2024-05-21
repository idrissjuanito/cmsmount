import UserModel from "../models/UserModel";
import { Response, Request, NextFunction } from "express";
import { ServerError } from "../errors";

export const newUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newUser = new UserModel(req.body);
  try {
    await newUser.save();
    return res.json({ message: "User created successfully" });
  } catch (error: any) {
    console.log(error?.message);
    next(new ServerError());
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const users = await UserModel.find({}, "-__v -createdAt -updatedAt");
  return res.json(users);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  try {
    await UserModel.deleteOne({ _id: userId });
    return res.json({ message: "delete success" });
  } catch (error) {
    next(new ServerError());
  }
};
