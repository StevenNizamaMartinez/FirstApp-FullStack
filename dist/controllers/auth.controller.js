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
exports.obtainRol = exports.logout = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../libs/config");
const cookie_1 = __importDefault(require("cookie"));
const users_model_1 = __importDefault(require("../models/users.model"));
const rol_model_1 = __importDefault(require("../models/rol.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json("Please enter all fields");
    try {
        const userDb = yield users_model_1.default.findOne({ email });
        if (!userDb)
            return res.status(404).json("User not found");
        const passwordDecrypt = yield users_model_1.default.decryptPassword(password, userDb.password);
        if (!passwordDecrypt)
            return res.status(400).json("Invalid password");
        //Obtener el rol correspondiente
        const rol = yield (0, exports.obtainRol)(userDb._id);
        //Crear el json web token
        const token = jsonwebtoken_1.default.sign({
            id: userDb._id,
            name: userDb.name,
            rol,
        }, config_1.SECRET, {
            expiresIn: 60 * 60 * 24,
        });
        //Guardar el token en una cookie
        const serialized = cookie_1.default.serialize("token", token);
        res.cookie("token", serialized, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24,
            domain: "stevennizama.onrender.com", // Dominio del sitio web
        });
        res.json(token);
    }
    catch (error) {
        res.json(error);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json("Please enter all fields");
    let rolRequest = "user";
    try {
        //Verificar si el usuario ya existe
        const userDb = yield users_model_1.default.findOne({ email });
        if (userDb)
            return res.status(400).json("User already exists");
        //Verificar si el rol existe
        const rolDb = yield rol_model_1.default.findOne({ rol: rolRequest });
        if (!rolDb)
            return res.status(400).json("Rol not found");
        //Encriptar la contraseña
        const passwordEncrypt = yield users_model_1.default.encryptPassword(password);
        // Crear el usuario
        const user = new users_model_1.default({
            name,
            email,
            password: passwordEncrypt,
            rolId: rolDb._id,
            active: true,
        });
        //Guardar el usuario
        const newUser = yield user.save();
        //Obtener el rol correspondiente
        const rol = yield (0, exports.obtainRol)(newUser._id);
        //Crear el json web token
        const token = jsonwebtoken_1.default.sign({
            id: newUser._id,
            name: newUser.name,
            rol,
        }, config_1.SECRET, {
            expiresIn: 60 * 60 * 24,
        });
        //Guardar el token en una cookie
        const serialized = cookie_1.default.serialize("token", token);
        res.cookie("token", serialized, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24,
            domain: "stevennizama.onrender.com", // Dominio del sitio web
        });
        res.json(token);
    }
    catch (error) {
        res.json(error);
    }
});
exports.register = register;
const logout = (req, res) => {
    res.clearCookie("token");
    res.json("Logout");
};
exports.logout = logout;
// Define una función asíncrona para buscar un usuario por su ID y obtener el rol correspondiente
const obtainRol = (usuarioId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rol = yield users_model_1.default.findById(usuarioId).populate("rolId");
        return rol === null || rol === void 0 ? void 0 : rol.rolId.rol; // Imprime el nombre del rol
    }
    catch (error) {
        console.error(error.message);
        return;
    }
});
exports.obtainRol = obtainRol;
