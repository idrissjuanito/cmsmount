import { Request, Response, NextFunction } from "express";
import CustomError from "../errors";

export const errorHandler = (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof CustomError) {
    return res.status(error.StatusCode).json(error.serialize());
  }
};
