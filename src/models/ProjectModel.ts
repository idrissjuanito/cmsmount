import { Schema, Types, model } from "mongoose";
import { types } from "util";

const ProjectSchema = new Schema(
  {
    projectId: Types.ObjectId,
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
    link: String,
    repo: String,
    stack: [{ type: Types.ObjectId, ref: "Stack" }],
  },
  { _id: false },
);

const ProjectModel = model("Project", ProjectSchema);

export default ProjectModel;
