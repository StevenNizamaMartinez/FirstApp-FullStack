import app from "./app";
import db from "./database/db";
import { PORT } from "./libs/config";
import { handleAuth} from "./middlewares/auth.middleware";
import authRouter from "./routes/auth.routes";
import postsRouter from "./routes/posts.routes";
import usersRouter from "./routes/users.routes";

//configs
app.set("port",PORT || 4000)

//route initial
app.get("/", (req, res) => {
  res.json({
    name : "Api Steven",
    version : "1.0.0"
  });
})

//middlewares

//routes
app.use("/api/v1/auth", authRouter)
app.use(handleAuth)
app.use("/api/v1/", postsRouter)
app.use("/api/v1/", usersRouter)

//start server
app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
  db()
})