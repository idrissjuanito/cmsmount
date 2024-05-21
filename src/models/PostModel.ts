import { Schema, Types, model } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  appId: {
    type: Types.ObjectId,
    ref: "Apps",
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
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  categories: [{ type: Types.ObjectId, ref: "Category" }],
});

const PostModel = model("Post", PostSchema);

export default PostModel;
