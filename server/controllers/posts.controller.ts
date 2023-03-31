import { Request, Response } from "express";
import Users from "../models/users.model";
import Posts from "../models/posts.model";
import { ObjectId } from "mongoose";

export const getPosts = async (req: Request, res: Response) => {
  const {id} = res.locals.user;
  try {
    const posts = await Posts.find({authorId: id});
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
}

export const getPost = async (req: Request, res: Response) => {
  const {id} = res.locals.user;
  try {
    const post = await Posts.find({authorId: id});
    if (!post) return res.status(404).json("Post not found");
    res.json(post);
  } catch (error) {
    res.json(error);
  }
}

export const getPostById = async (req: Request, res: Response) => {
  const {idUser} = req.params;
  try {
    const idPost = idUser as unknown as ObjectId;
    const post = await Posts.find({authorId: idPost});
    if (!post) return res.status(404).json("Post not found");
    res.json(post);
  } catch (error) {
    res.json(error);
  }
}

export const createPost = async (req: Request, res: Response) => {
  const {title} = req.body;
  const {id, name} = res.locals.user;
  if (!title) return res.status(400).json("Please enter all fields");
  try {
    const post:any = new Posts({
      title,
      authorId: id,
      author : name
    });
    const newPost = await post.save();
    res.json(newPost)
  } catch (error) {
    res.json(error);
  } 
}

export const deletePost = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const deletepost = await Posts.findByIdAndRemove(id);
    if (!deletepost) return res.status(404).json("Post not found");
    res.json(deletePost)
  } catch (error) {
    res.json(error);
  }
}

export const editPost = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, done} = req.body;
  if (!title || !done) return res.status(400).json("Please enter all fields");
  try {
    const newPost = await Posts.findByIdAndUpdate(id, {title,done});
    if (!newPost) return res.status(404).json("Post not found");
    res.json(newPost);
  } catch (error) {
    res.json(error);
  }
}

export const editPostDone = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const newPost = await Posts.findById(id);
    if (!newPost) return res.status(404).json("Post not found");
    const status = !newPost.done
    const updatePost = await Posts.findByIdAndUpdate(id, {done: status});
    res.json(updatePost);
  } catch (error) {
    res.json(error);
  }
}