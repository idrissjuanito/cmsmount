import { Router } from "express";
import {
  getAllPosts,
  getPost,
  newPost,
  updatePost,
  deletePost,
} from "../controllers/PostController";

const postRouter = Router();
postRouter.post("/", newPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:postId", getPost);
postRouter.put("/:postId", updatePost);
postRouter.delete("/:postId", deletePost);

export default postRouter;
