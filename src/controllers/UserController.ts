import { UserModel } from "../models";
import { Response, Request, NextFunction } from "express";
import { UnauthorizedError, ServerError, NotFoundError } from "../errors";
import { IUser } from "types";
import { Types } from "mongoose";

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

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user, userId } = res.locals;
  return res.json({ userId, ...user });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user } = res.locals;
  console.log(user);
  if (user.role !== "Admin") return next(new UnauthorizedError());
  try {
    const users = await UserModel.aggregate([
      { $unset: ["__v", "password"] },
    ]).exec();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = res.locals;
  try {
    const result = await UserModel.deleteOne({ _id: userId });
    if (result.deletedCount < 1) return next(new NotFoundError("User"));
    return res.json({ message: "deleted successfully" });
  } catch (error) {
    next(new ServerError());
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = res.locals;
  try {
    const result = await UserModel.updateOne({ _id: userId }, req.body);
    if (result.modifiedCount < 1) return next(new NotFoundError("User"));
    return res.json({ message: "update was successfull" });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};
