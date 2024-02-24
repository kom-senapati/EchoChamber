"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
const chatRoute_1 = __importDefault(require("./routes/chatRoute"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', userRoute_1.default);
app.use('/message', messageRoute_1.default);
app.use('/chat', chatRoute_1.default);
if (process.env.db) {
    mongoose_1.default.connect(process.env.db, { dbName: "chat" });
}
else {
    console.log('cant connect to db');
}
const server = app.listen(PORT, () => console.log(`connected to ${PORT}`));
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
        // credentials: true,
    },
});
io.on('connection', (socket) => {
    console.log('socket io connected');
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log('yes connectes');
        socket.emit("connected");
    });
    socket.on("join-chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("new-message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users)
            return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id)
                return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
});
