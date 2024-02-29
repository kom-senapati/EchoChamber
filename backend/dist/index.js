"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const messageRoute_1 = __importDefault(require("./routes/messageRoute"));
const chatRoute_1 = __importDefault(require("./routes/chatRoute"));
require("dotenv/config");
const socket_io_1 = require("socket.io");
const socketService_1 = __importDefault(require("./socket/socketService"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3000;
app.use('/user', userRoute_1.default);
app.use('/message', messageRoute_1.default);
app.use('/chat', chatRoute_1.default);
app.use('/', (req, res) => {
    res.json('working');
});
if (process.env.db) {
    console.log(process.env.db);
    mongoose_1.default.connect(process.env.db, { dbName: "chat" });
    console.log('succesfully connected to gb');
}
else {
    console.log('cant connect to db');
}
const server = app.listen(PORT, () => console.log(`connected to ${PORT}`));
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
    },
});
(0, socketService_1.default)(io);
/*  Trash, dont look here

const httpServer = http.createServer(app);

const socketServiceInstance = new SocketService();
socketServiceInstance.initListeners();

socketServiceInstance.io.attach(httpServer);

httpServer.listen(PORT, () => {
  console.log(`HTTP Server started at PORT:${PORT}`)

})

*/
