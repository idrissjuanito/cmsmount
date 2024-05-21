import { Schema, model, ObjectId, Types } from "mongoose";
import { IApp, IApiKey, IPost, IStack, ITag, ICategory } from "types";
export { default as PostModel } from "./PostModel";
export { default as ProjectModel } from "./ProjectModel";
export { default as UserModel } from "./UserModel";

const appSchema = new Schema({
  name: String,
  userId: {
    type: Types.ObjectId,
    ref: "User",
    require: true,
  },
  keys: [String],
  allowedDomains: [String],
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
  },
  desciption: String,
});

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const stackSchema = new Schema({
  name: String,
  imageUrl: String,
});

export const TagModel = model<ITag>("Tag", tagSchema);
export const CategoryModel = model<ICategory>("Category", categorySchema);
export const AppModel = model<IApp>("Apps", appSchema);
export const StackModel = model<IStack>("Stack", stackSchema);

export default AppModel;
