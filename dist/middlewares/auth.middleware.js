"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUser = exports.handleRol = exports.handleAuth = void 0;
const cookie_1 = __importDefault(require("cookie"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../libs/config");
const handleAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!cookies.token)
        return res.status(403).json("Unauthorized cookies");
    const cookieParse = cookie_1.default.parse(cookies.token);
    const { token } = cookieParse;
    try {
        const decode = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decode)
            return res.status(401).json("Unauthorized decode");
        res.locals.user = decode;
        next();
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
});
exports.handleAuth = handleAuth;
const handleRol = (req, res, next) => {
    const { id, name, rol } = res.locals.user;
    if (rol !== "admin")
        return res.status(401).json("Unauthorized");
    next();
};
exports.handleRol = handleRol;
const handleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const {id,name,rol} = res.locals.user
    // const {id : idPost} = req.params
    // const post = await Posts.findById(idPost)
    // if (post?.authorId !== id) return res.status(401).json("Unauthorized")
    next();
});
exports.handleUser = handleUser;
