import { Request, Response } from "express";
import Users from "../models/users.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  console.log(res.locals.user.id);
  try {
    const user = await Users.findById(res.locals.user.id);
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
}