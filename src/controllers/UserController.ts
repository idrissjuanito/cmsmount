import { UserModel } from "../models";
import { Response, Request, NextFunction } from "express";
import { ServerError, NotFoundError } from "../errors";

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
    const result = await UserModel.deleteOne({ _id: userId });
    if (result.deletedCount < 1) return next(new NotFoundError("User"));
    return res.json({ message: "delete success" });
  } catch (error) {
    next(new ServerError());
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) next(new NotFoundError("User"));
  return res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  try {
    const result = await UserModel.updateOne({ _id: userId }, req.body);
    if (result.matchedCount < 1) return next(new NotFoundError("User"));
    return res.json({ message: "update was successfull" });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};
