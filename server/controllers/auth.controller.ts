import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../libs/config";
import cookie from "cookie";
import Users from "../models/users.model";
import Rols from "../models/rol.model";
import { ObjectId } from "mongoose";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json("Please enter all fields");
  try {
    const userDb = await Users.findOne({ email });
    if (!userDb) return res.status(404).json("User not found");
    const passwordDecrypt = await Users.decryptPassword(
      password,
      userDb.password
    );
    if (!passwordDecrypt) return res.status(400).json("Invalid password");
    //Obtener el rol correspondiente
    const rol = await obtainRol(userDb._id);
    //Crear el json web token
    const token = jwt.sign(
      {
        id: userDb._id,
        name: userDb.name,
        rol,
      },
      SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    //Guardar el token en una cookie
    const serialized = cookie.serialize("token", token);
    res.cookie("token", serialized, {
      httpOnly: true,
      secure: true, // Solo se establecerá en conexiones HTTPS
      sameSite: "none", // Configuración de SameSite en None
      maxAge: 1000 * 60 * 60 * 24,
      domain: "https://stevennizama.onrender.com", // Dominio del servidor
    });
    res.json(token);
  } catch (error) {
    res.json(error);
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json("Please enter all fields");
  let rolRequest = "user";
  try {
    //Verificar si el usuario ya existe
    const userDb = await Users.findOne({ email });
    if (userDb) return res.status(400).json("User already exists");
    //Verificar si el rol existe
    const rolDb = await Rols.findOne({ rol: rolRequest });
    if (!rolDb) return res.status(400).json("Rol not found");
    //Encriptar la contraseña
    const passwordEncrypt = await Users.encryptPassword(password);
    // Crear el usuario
    const user = new Users({
      name,
      email,
      password: passwordEncrypt,
      rolId: rolDb._id,
      active: true,
    });
    //Guardar el usuario
    const newUser = await user.save();
    //Obtener el rol correspondiente
    const rol = await obtainRol(newUser._id);
    //Crear el json web token
    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        rol,
      },
      SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    //Guardar el token en una cookie
    const serialized = cookie.serialize("token", token);
    res.cookie("token", serialized, {
      httpOnly: true,
      secure: true, // Solo se establecerá en conexiones HTTPS
      sameSite: "none", // Configuración de SameSite en None
      maxAge: 1000 * 60 * 60 * 24,
      domain: "https://stevennizama.onrender.com", // Dominio del servidor
    });
    res.json(token);
  } catch (error) {
    res.json(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json("Logout");
};

// Define una función asíncrona para buscar un usuario por su ID y obtener el rol correspondiente
export const obtainRol = async (usuarioId: ObjectId) => {
  try {
    const rol = await Users.findById(usuarioId).populate("rolId");
    return rol?.rolId.rol; // Imprime el nombre del rol
  } catch (error: any) {
    console.error(error.message);
    return;
  }
};
