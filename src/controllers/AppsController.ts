import { Response, Request, NextFunction } from "express";
import AppModel from "../models";
import { ServerError, NotFoundError } from "../errors";
import { Types } from "mongoose";

export const newApp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = new Types.ObjectId();
    const result = await AppModel.insertMany({
      name: req.body.name,
      userId,
      keys: [],
    });
    console.log(result);
    return res.send("Insert was success");
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};

export const getAllApps = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apps = await AppModel.find({}, "-__V -createdAt -updatedAt");
    return res.json(apps);
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};

export const updateApp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = req.params;
  try {
    const result = await AppModel.updateOne({ _id: appId }, req.body);
    if (result.matchedCount < 1) return next(new NotFoundError("App"));
    return res.json({ message: "update successfull" });
  } catch (error) {
    console.error(error);
    return next(new ServerError());
  }
};

export const getApp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = req.params;
  try {
    const app = await AppModel.findOne({ _id: appId });
    if (!app) return next(new NotFoundError("App"));
    return res.json(app);
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};

export const deleteApp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = req.params;
  try {
    const result = await AppModel.deleteOne({ _id: appId });
    if (result.deletedCount < 1) return next(new NotFoundError("App"));
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};
