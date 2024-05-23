import { Router } from "express";
import {
  getAllPosts,
  getPost,
  newPost,
  updatePost,
  deletePost,
} from "../controllers/PostController";
import { BearerAuth, ApiKeyAuth } from "../middlewares";

const postRouter = Router();

postRouter.post("/", newPost);
postRouter.put("/:postId", updatePost);
postRouter.delete("/:postId", deletePost);

postRouter.use(ApiKeyAuth);
postRouter.get("/", getAllPosts);
postRouter.get("/:postId", getPost);

export default postRouter;
