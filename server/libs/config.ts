import dotenv from "dotenv"
import { Secret } from "jsonwebtoken"

dotenv.config()

const port = process.env.PORT
const mongoUri = process.env.MONGO_URI
const secret = process.env.SECRET

export const PORT =  port 
export const MONGO_URI = mongoUri as String
export const SECRET = secret as Secret