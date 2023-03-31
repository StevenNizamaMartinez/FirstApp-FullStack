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
exports.getUserById = exports.getUser = exports.getUsers = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const rol_model_1 = __importDefault(require("../models/rol.model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_model_1.default.find();
        const usersRol = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const rol = yield users_model_1.default.findById(user.id).populate("rolId");
            const newUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                rol: rol === null || rol === void 0 ? void 0 : rol.rolId.rol,
            };
            return newUser;
        })));
        res.json(usersRol);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.default.findById(res.locals.user.id);
        if (!user)
            return res.status(404).json("User not found");
        const rol = yield rol_model_1.default.findById(user.rolId);
        if (!rol)
            return res.status(404).json("User not found");
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            rol: rol.rol,
        });
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json("User not found");
        res.json(user);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUserById = getUserById;
