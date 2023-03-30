import { Router } from "express";
import { getUser, getUserById, getUsers } from "../controllers/users.controller";
import { handleRol } from "../middlewares/auth.middleware";

const usersRouter = Router()

usersRouter.get("/users", handleRol,getUsers)
usersRouter.get("/user", getUser)
usersRouter.get("/user/:id", handleRol,getUserById)

export default usersRouter