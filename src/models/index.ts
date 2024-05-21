import { Schema, model, ObjectId, Types } from "mongoose";
import { IApp, IKey, IPost, IStack, ITag, ICategory } from "types";

const appSchema = new Schema({
  name: String,
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  keys: [{ type: Types.ObjectId, ref: "Key" }],
});

const keySchema = new Schema({
  _id: String,
  appId: { type: Types.ObjectId, ref: "Apps" },
  status: {
    type: String,
    default: "Active",
  },
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

const TagModel = model<ITag>("Tag", tagSchema);
const CategoryModel = model<ICategory>("Category", categorySchema);
const AppModel = model<IApp>("Apps", appSchema);
const KeyModel = model<IKey>("Key", keySchema);
const StackModel = model<IStack>("Stack", stackSchema);

export default AppModel;
