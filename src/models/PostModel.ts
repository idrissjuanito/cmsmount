import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  appId: {
    type: String,
    required: true,
  },
  body: String,
  featuredImageUrl: String,
  published: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  categories: [String],
});

const PostModel = model("Post", PostSchema);

export default PostModel;
