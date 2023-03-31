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
const mongoose_1 = require("mongoose");
const rol_model_1 = __importDefault(require("../models/rol.model"));
const config_1 = require("../libs/config");
const mongodb_1 = require("mongodb");
const db = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const database = yield (0, mongoose_1.connect)(config_1.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: { w: 'majority' },
            serverApi: mongodb_1.ServerApiVersion.v1
        });
        console.log(`Datbase is connected in ${database.connection.name}`);
        // Buscamos los roles existentes
        const count = yield rol_model_1.default.countDocuments();
        if (count > 1)
            return;
        // Si no existen los roles, los creamos
        const roles = [{ rol: "admin" }, { rol: "user" }, { rol: "dev" }];
        yield rol_model_1.default.create(roles);
        console.log("Roles created successfully");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.default = db;
