import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  appId: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  stack: [String],
  link: String,
  repo: String,
});

const ProjectModel = model("Project", ProjectSchema);

export default ProjectModel;
