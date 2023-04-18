import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./libs/corsOptions";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


export default app;
