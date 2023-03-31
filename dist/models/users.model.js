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
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rolId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Rol"
    },
    active: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
UserSchema.statics.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const passwordEncrypt = yield bcrypt_1.default.hash(password, salt);
    return passwordEncrypt;
});
UserSchema.statics.decryptPassword = (password, encryptPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = yield bcrypt_1.default.compare(password, encryptPassword);
    return decode;
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
