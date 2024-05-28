import { Request, Response, NextFunction } from "express";
import {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../errors";
import { IBearerPayload } from "types";
import { UserModel, AppModel } from "../models";
import CustomError from "../errors";
import jwt from "jsonwebtoken";
import config from "../config";

export const errorHandler = (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof CustomError) {
    return res.status(error.StatusCode).json(error.serialize());
  }
  console.log(error);
  return res.status(500).json({ error: "Server Error" });
};

export const BearerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerHeader = req.get("Authorization");
  if (!bearerHeader) return next();
  const [bearer, jsonwt] = bearerHeader.split(" ");
  if (bearer !== "Bearer") return next(new BadRequestError("Missing Token"));
  try {
    const decoded = (await jwt.verify(jsonwt, config.secret)) as IBearerPayload;
    if (!decoded) return next(new UnauthorizedError());
    res.locals.userId = decoded.userId;
    next();
  } catch (err: any) {
    console.error(err.message);
    if (err?.name === "TokenExpiredError") return next(new UnauthorizedError());
    return next(new ServerError());
  }
};

export const ApiKeyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.get("X-API-KEY");
  if (!apiKey) return next();
  res.locals.apiKey = apiKey;
  next();
};

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  // checks if any form of auth has been set
  // will then fetch apps associated with the user or key authenticated
  const { apiKey, userId } = res.locals;
  if (!apiKey && !userId) return next(new UnauthorizedError());
  try {
    const app = await AppModel.findOne({
      $or: [{ keys: { $elemMatch: { $eq: apiKey } } }, { userId: userId }],
    })
      .lean()
      .exec();

    // Must be an app associated to an api key
    if (!app && apiKey) return next(new UnauthorizedError());
    let user = null;
    if (userId) {
      user = await UserModel.findById(
        userId,
        "-_id -__v -createdAt -password -updatedAt",
      ).lean();
      if (!user) return next(new NotFoundError("User"));
      res.locals.user = user;
    }
    res.locals.appId = app?._id;
    next();
  } catch (err: any) {
    console.error(err.message);
    if (err?.name === "TokenExpiredError") return next(new UnauthorizedError());
    return next(new ServerError());
  }
};
