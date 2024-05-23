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
    return res.json({ postId: newPost._id });
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
  const { postId } = req.params;
  const { appId } = res.locals;
  try {
    const result = await PostModel.deleteOne({
      $and: [{ _id: postId }, { appId }],
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
  const post = await PostModel.findOne(
    { $and: [{ _id: postId }, { appId }] },
    "-__v -_id",
  )
    .lean()
    .populate("categories", "name")
    .populate("tags", "name")
    .exec();
  if (!post) return next(new NotFoundError("Post"));
  return res.json({ ...post, postId });
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
      { $and: [{ _id: postId }, { appId }] },
      req.body,
    );
    if (result.matchedCount < 1) return next(new NotFoundError("Post"));
    return res.json({ message: "update was successfull" });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};
