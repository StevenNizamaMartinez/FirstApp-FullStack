import { NextFunction, Request, Response } from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { SECRET } from "../libs/config";
import Users from "../models/users.model";
import Posts from "../models/posts.model";


export const handleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (!cookies.token) return res.status(403).json("Unauthorized cookies");
  const cookieParse = cookie.parse(cookies.token);
  const { token } = cookieParse;
  try {
    const decode = jwt.verify(token, SECRET);
    if (!decode) return res.status(401).json("Unauthorized decode");
    res.locals.user = decode;
    next();
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

export const handleRol = (req: Request, res: Response, next: NextFunction) => {
  const {id, name, rol} = res.locals.user
  if (rol !== "admin") return res.status(401).json("Unauthorized")
  next()
}

export const handleUser = async (req: Request, res: Response, next: NextFunction) => {
  // const {id,name,rol} = res.locals.user
  // const {id : idPost} = req.params
  // const post = await Posts.findById(idPost)
  // if (post?.authorId !== id) return res.status(401).json("Unauthorized")
  next()
}
