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
exports.editPostDone = exports.editPost = exports.deletePost = exports.createPost = exports.getPostById = exports.getPost = exports.getPosts = void 0;
const posts_model_1 = __importDefault(require("../models/posts.model"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals.user;
    try {
        const posts = yield posts_model_1.default.find({ authorId: id });
        res.json(posts);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals.user;
    try {
        const post = yield posts_model_1.default.find({ authorId: id });
        if (!post)
            return res.status(404).json("Post not found");
        res.json(post);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getPost = getPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    try {
        const idPost = idUser;
        const post = yield posts_model_1.default.find({ authorId: idPost });
        if (!post)
            return res.status(404).json("Post not found");
        res.json(post);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const { id, name } = res.locals.user;
    if (!title)
        return res.status(400).json("Please enter all fields");
    try {
        const post = new posts_model_1.default({
            title,
            authorId: id,
            author: name
        });
        const newPost = yield post.save();
        res.json(newPost);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletepost = yield posts_model_1.default.findByIdAndRemove(id);
        if (!deletepost)
            return res.status(404).json("Post not found");
        res.json(exports.deletePost);
    }
    catch (error) {
        res.json(error);
    }
});
exports.deletePost = deletePost;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, done } = req.body;
    if (!title || !done)
        return res.status(400).json("Please enter all fields");
    try {
        const newPost = yield posts_model_1.default.findByIdAndUpdate(id, { title, done });
        if (!newPost)
            return res.status(404).json("Post not found");
        res.json(newPost);
    }
    catch (error) {
        res.json(error);
    }
});
exports.editPost = editPost;
const editPostDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const newPost = yield posts_model_1.default.findById(id);
        if (!newPost)
            return res.status(404).json("Post not found");
        const status = !newPost.done;
        const updatePost = yield posts_model_1.default.findByIdAndUpdate(id, { done: status });
        res.json(updatePost);
    }
    catch (error) {
        res.json(error);
    }
});
exports.editPostDone = editPostDone;
