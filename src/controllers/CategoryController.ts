import { CategoryModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { ServerError, NotFoundError } from "../errors";

export const newCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const newCategory = new CategoryModel({ ...req.body, appId });
  try {
    await newCategory.save();
    return res.json({ message: "Category created successfully" });
  } catch (error: any) {
    console.log(error?.message);
    next(new ServerError());
  }
};

export const getAllCategorys = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const users = await CategoryModel.find({ appId }, "-__v");
  return res.json(users);
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const { categoryId } = req.params;
  try {
    const result = await CategoryModel.deleteOne({
      $and: [{ _id: categoryId }, { appId }],
    });
    if (result.deletedCount < 1) return next(new NotFoundError("Category"));
    return res.json({ message: "delete success" });
  } catch (error) {
    next(new ServerError());
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { categoryId } = req.params;
  const { appId } = res.locals;
  const user = await CategoryModel.findOne({
    $and: [{ _id: categoryId }, { appId }],
  })
    .lean()
    .populate("categories", "name")
    .populate("tags", "name")
    .exec();
  if (!user) next(new NotFoundError("Category"));
  return res.json(user);
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { categoryId } = req.params;
  const { appId } = res.locals;
  try {
    const result = await CategoryModel.updateOne(
      { $and: [{ _id: categoryId }, { appId }] },
      req.body,
    );
    if (result.matchedCount < 1) return next(new NotFoundError("Category"));
    return res.json({ message: "update was successfull" });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};
