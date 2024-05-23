import { Response, Request, NextFunction } from "express";
import AppModel from "../models";
import { ServerError, NotFoundError } from "../errors";
import { Types } from "mongoose";
import { generateApiKey, isValidApiKey } from "../services/keys.service";

export const newApp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = res.locals.userId;
    const { name, allowed } = req.body;

    const appId = new Types.ObjectId();
    const apiKey = await generateApiKey(appId.toString());
    const newApp = new AppModel({
      _id: appId,
      userId,
      name,
      keys: [apiKey],
      allowedDomains: allowed,
    });
    newApp.save();
    return res.json({ appId, apiKey });
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
    const { userId } = res.locals;
    const apps = await AppModel.find({ userId }, "-__v -createdAt -updatedAt");
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
  const { userId } = res.locals;
  try {
    const result = await AppModel.updateOne(
      { $and: [{ _id: appId }, { userId }] },
      req.body,
    );
    console.log(result);
    if (result.modifiedCount < 1) return next(new NotFoundError("App"));
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
  const { userId } = res.locals;
  try {
    const app = await AppModel.findOne(
      { $and: [{ _id: appId }, { userId }] },
      "-__v -updatedAt -_id",
    ).lean();
    if (!app) return next(new NotFoundError("App"));
    return res.json({ ...app, appId });
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
  const { userId } = res.locals;
  try {
    const result = await AppModel.deleteOne({ _id: appId });
    if (result.deletedCount < 1) return next(new NotFoundError("App"));
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};
