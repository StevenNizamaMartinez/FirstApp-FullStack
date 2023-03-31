"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./database/db"));
const config_1 = require("./libs/config");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
//configs
app_1.default.set("port", config_1.PORT || 4000);
//route initial
app_1.default.get("/", (req, res) => {
    res.json({
        name: "Api Steven",
        version: "1.0.0"
    });
});
//middlewares
//routes
app_1.default.use("/api/v1/auth", auth_routes_1.default);
app_1.default.use(auth_middleware_1.handleAuth);
app_1.default.use("/api/v1/", posts_routes_1.default);
app_1.default.use("/api/v1/", users_routes_1.default);
//start server
app_1.default.listen(app_1.default.get("port"), () => {
    console.log(`Server is running on port ${app_1.default.get("port")}`);
    (0, db_1.default)();
});
