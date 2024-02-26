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
// -password means we dont need password when object is being populated
const route = express_1.default.Router();
route.get('/getchats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query.currentUserId);
        if (!req.query.currentUserId)
            res.status(400).json({ errormessage: 'invalid Id' });
        else {
            let chats = yield db_1.Chat.find({ users: { $elemMatch: { $eq: req.query.currentUserId } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 });
            /*       const chats = await Chat.aggregate([
                    {
                      $match: {
                        _id: mongoose.Types.ObjectId(req.query.currentUserId),
                        $or: [
                          { groupAdmin: mongoose.Types.ObjectId(req.query.currentUserId) }, // Check for groupAdmin
                          { users: { $elemMatch: { $eq: req.query.currentUserId } } }
                           // Check if user is in users array
                        ]
                      }
                    }
                  ]); */
            /*       console.log(chats);
             */ const chatList = yield db_1.User.populate(chats, {
                path: "latestMessage.sender"
            });
            res.status(200).json(chatList);
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(401).json({ errormessage: error.message });
    }
}));
route.post('/creategroup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupusers, groupname, user } = req.body;
    if (!groupusers || !groupname) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }
    console.log(req.body);
    if (groupusers.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }
    try {
        const groupChat = yield db_1.Chat.create({
            chatName: groupname,
            users: groupusers,
            isGroupChat: true,
            groupAdmin: user,
        });
        const fullGroupChat = yield db_1.Chat.findOne(groupChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat);
    }
    catch (error) {
        console.log(error.message);
        res.status(401).json({ errormessage: error.message });
    }
}));
exports.default = route;
