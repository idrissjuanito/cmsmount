import { Schema, model, ObjectId } from "mongoose";

const appSchema = new Schema({
  name: String,
  userId: String,
  keys: [String],
});

const keySchema = new Schema({
  _id: String,
  appId: { type: String },
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

const TagModel = model("Tag", tagSchema);
const CategoryModel = model("Category", categorySchema);
const AppModel = model("Apps", appSchema);
const KeyModel = model("Key", keySchema);

export default AppModel;
