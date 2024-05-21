import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IApp {
  _id: Types.ObjectId;
  name: string;
  userId: Types.ObjectId;
  keys: Array<string>;
  allowedDomains: Array<string>;
}

export interface IApiKey {
  key: string;
  AppId: Types.ObjectId;
  status: "Active" | "Revoked";
}

export interface IStack {
  _id: Types.ObjectId;
  name: string;
  imageUrl: string;
}
export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  description: string;
}

export interface ITag {
  _id: Types.ObjectId;
  name: string;
}

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  AppId: Types.ObjectId;
  description: string;
  featuredImageUrl: string;
  published: boolean;
  featured: boolean;
  categories: Array<Types.ObjectId>;
  tags: Array<Types.ObjectId>;
}

export interface IProject {
  _id: Types.ObjectId;
  title: string;
  AppId: Types.ObjectId;
  description: string;
  imageUrl: string;
  featured: boolean;
  stacks: Array<Types.ObjectId>;
  link: string;
  repo: string;
}
