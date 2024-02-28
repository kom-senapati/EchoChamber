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
route.get('/getmessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*     console.log(req.query.chatId)
         */ const messages = yield db_1.Message.find({ chat: req.query.chatId }).populate("sender").populate("chat");
        res.status(200).json(messages);
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ errormessage: error.message });
    }
}));
route.post('/sendmessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, content, chatId } = req.body;
    if (!content || !chatId || !userId) {
        console.log("Invalid data passed into request");
        return res.status(400).json({ errormessage: 'Invalid data passed into request' });
    }
    let newMessage = {
        sender: userId,
        content: content,
        chat: chatId,
    };
    try {
        var message = yield db_1.Message.create(newMessage);
        message = yield message.populate("sender");
        message = yield message.populate("chat");
        message = yield db_1.User.populate(message, { path: "chat.users" });
        yield db_1.Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
        res.json(message);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}));
exports.default = route;
