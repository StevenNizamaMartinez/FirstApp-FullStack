import { Request, Response } from "express";
import Users from "../models/users.model";
import Rol from "../models/rol.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    const usersRol: any = await Promise.all(
      users.map(async (user) => {
        const rol = await Users.findById(user.id).populate("rolId");
        const newUser = {
          _id: user._id,
          name: user.name,
          email: user.email,
          rol: rol?.rolId.rol,
        };
        return newUser;
      })
    );
    res.json(usersRol);
  } catch (error) {
    res.json(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(res.locals.user.id);
    if (!user) return res.status(404).json("User not found");
    const rol = await Rol.findById(user.rolId);
    if (!rol) return res.status(404).json("User not found");
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      rol: rol.rol,
    });
  } catch (error) {
    res.json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};
