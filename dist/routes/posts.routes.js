"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controller_1 = require("../controllers/posts.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const postsRouter = (0, express_1.Router)();
postsRouter.get("/posts", auth_middleware_1.handleRol, posts_controller_1.getPosts);
postsRouter.post("/post", posts_controller_1.createPost); //Para los usuarios
postsRouter.put("/post/:id", posts_controller_1.editPost); //Para los usuarios
postsRouter.patch("/post/:id", posts_controller_1.editPostDone); //Para los usuarios
postsRouter.delete("/post/:id", auth_middleware_1.handleRol, posts_controller_1.deletePost); //Para los usuarios
postsRouter.get("/post", posts_controller_1.getPost); //para que el usuario logeado pueda ver sus posts
postsRouter.get("/post/:idUser", auth_middleware_1.handleRol, auth_middleware_1.handleUser, posts_controller_1.getPostById); //para obtener un post por el id del usuario solo admin
exports.default = postsRouter;
