"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const secret = process.env.SECRET;
exports.PORT = port;
exports.MONGO_URI = mongoUri;
exports.SECRET = secret;
