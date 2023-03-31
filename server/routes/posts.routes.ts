import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  editPostDone,
  getPost,
  getPostById,
  getPosts,
} from "../controllers/posts.controller";
import { handleRol, handleUser } from "../middlewares/auth.middleware";

const postsRouter = Router();

postsRouter.get("/posts", handleRol, getPosts);
postsRouter.post("/post", createPost); //Para los usuarios
postsRouter.put("/post/:id", handleRol,editPost); //Para los usuarios
postsRouter.patch("/post/:id", handleRol,editPostDone); //Para los usuarios
postsRouter.delete("/post/:id", handleRol,deletePost); //Para los usuarios
postsRouter.get("/post",handleUser,getPost); //para que el usuario logeado pueda ver sus posts
postsRouter.get("/post/:idUser",handleRol,handleUser,getPostById); //para obtener un post por el id del usuario solo admin

export default postsRouter;
