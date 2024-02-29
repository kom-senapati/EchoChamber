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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const route = express_1.default.Router();
route.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (username === "" || email === "" || password === "") {
            res.status(400).json({ errormessage: 'fields are empty' });
        }
        const isUsernameExists = yield db_1.User.findOne({ username });
        const isEmailExists = yield db_1.User.findOne({ email });
        if (isEmailExists || isUsernameExists) {
            res.status(400).json({ errormessage: 'email or username already exists' });
        }
        const saveUser = new db_1.User(req.body);
        const isSaved = yield saveUser.save();
        if (isSaved)
            res.json({ message: 'User created successfully', data: isSaved });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ errormessage: error.message });
    }
}));
route.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email == "" || password == "") {
        res.status(400).json({ errormessage: 'fields are empty' });
    }
    const isEmailExists = yield db_1.User.findOne({ email });
    if (!isEmailExists) {
        res.status(400).json({ errormessage: 'email not exists' });
    }
    try {
        if (password === (isEmailExists === null || isEmailExists === void 0 ? void 0 : isEmailExists.password))
            res.status(200).json({ message: 'logged in succesfully', data: isEmailExists });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ errormessage: error.message });
    }
}));
route.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield db_1.User.find({ username: { $regex: '.*' + req.query.search + '.*' } });
        if (!userList)
            res.status(401).json({ message: ' user with specific not foound' });
        res.status(200).json({ userList });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ errormessage: error.message });
    }
}));
route.get('/getUsers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield db_1.User.find();
        if (!userList)
            res.status(401).json({ message: ' user with specific not foound' });
        res.status(200).json({ userList });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ errormessage: error.message });
    }
}));
route.get('/getUsersById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.User.find({ _id: req.query.userId });
        if (!user)
            res.status(401).json({ message: ' user with specific not foound' });
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ errormessage: error.message });
    }
}));
exports.default = route;
