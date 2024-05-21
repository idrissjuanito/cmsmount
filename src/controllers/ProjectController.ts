import { ProjectModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { ServerError, NotFoundError } from "../errors";

export const newProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const newProject = new ProjectModel({ ...req.body, appId });
  try {
    await newProject.save();
    return res.json({ message: "Project created successfully" });
  } catch (error: any) {
    console.log(error?.message);
    next(new ServerError());
  }
};

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const users = await ProjectModel.find({ appId }, "-__v");
  return res.json(users);
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { appId } = res.locals;
  const { projectId } = req.params;
  try {
    const result = await ProjectModel.deleteOne({
      $and: [{ _id: projectId }, { appId }],
    });
    if (result.deletedCount < 1) return next(new NotFoundError("Project"));
    return res.json({ message: "delete success" });
  } catch (error) {
    next(new ServerError());
  }
};

export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const { appId } = res.locals;
  const user = await ProjectModel.findOne({
    $and: [{ _id: projectId }, { appId }],
  })
    .lean()
    .populate("stacks", "-_id")
    .exec();
  if (!user) next(new NotFoundError("Project"));
  return res.json(user);
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { projectId } = req.params;
  const { appId } = res.locals;
  try {
    const result = await ProjectModel.updateOne(
      { $and: [{ _id: projectId }, { appId }] },
      req.body,
    );
    if (result.matchedCount < 1) return next(new NotFoundError("Project"));
    return res.json({ message: "update was successfull" });
  } catch (error) {
    console.log(error);
    return next(new ServerError());
  }
};
