import { Schema, Types, model } from "mongoose";
import { types } from "util";

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  appId: {
    type: Types.ObjectId,
    ref: "Apps",
    required: true,
  },
  description: String,
  imageUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  stack: [{ type: Types.ObjectId, ref: "Stack" }],
  link: String,
  repo: String,
});

const ProjectModel = model("Project", ProjectSchema);

export default ProjectModel;
