"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    author: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)("Posts", PostSchema);
