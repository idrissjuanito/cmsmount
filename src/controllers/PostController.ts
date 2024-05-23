import { PostModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { ServerError, NotFoundError } from "../errors";

export const newPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const newPost = new PostModel({ ...req.body, appId });
  try {
    await newPost.save();
    return res.json({ message: "Post created successfully" });
  } catch (error: any) {
    console.log(error?.message);
    next(new ServerError());
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const users = await PostModel.find({ appId }, "-__v");
  return res.json(users);
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const { postId } = req.params;
  try {
    const result = await PostModel.deleteOne({
      $and: [{ postId: postId }, { appId }],
    });
    if (result.deletedCount < 1) return next(new NotFoundError("Post"));
    return res.json({ message: "delete success" });
  } catch (error) {
    next(new ServerError());
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { postId } = req.params;
  const { appId } = res.locals;
  const user = await PostModel.findOne({ $and: [{ postId }, { appId }] })
    .lean()
    .populate("categories", "name")
    .populate("tags", "name")
    .exec();
  if (!user) next(new NotFoundError("Post"));
  return res.json(user);
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { postId } = req.params;
  const { appId } = res.locals;
  try {
    const result = await PostModel.updateOne(
      { $and: [{ postId }, { appId }] },
      req.body,
    );
    if (result.matchedCount < 1) return next(new NotFoundError("Post"));
    return res.json({ message: "update was successfull" });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};
