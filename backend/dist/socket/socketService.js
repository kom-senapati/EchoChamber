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
const ioredis_1 = __importDefault(require("ioredis"));
require("dotenv/config");
const pub = new ioredis_1.default({
    host: "redis-361e97a7-ebuthor-87b8.a.aivencloud.com",
    port: 15563,
    username: "default",
    password: "AVNS_Y--CCv6Ti3EQ_iBPrQ-",
});
const sub = new ioredis_1.default({
    host: "redis-361e97a7-ebuthor-87b8.a.aivencloud.com",
    port: 15563,
    username: "default",
    password: "AVNS_Y--CCv6Ti3EQ_iBPrQ-",
});
const SocketFun = (io) => {
    io.on("connection", (socket) => {
        /*     console.log('socket io connected --->', socket.id);
         */
        socket.on("join-chat", (room) => {
            socket.join(room);
            console.log("User Joined Room: " + room);
        });
        socket.on("new-message", (newMessageRecieved) => __awaiter(void 0, void 0, void 0, function* () {
            yield pub.publish("MESSAGEOBJECT", JSON.stringify(newMessageRecieved));
            var chat = newMessageRecieved.chat;
            if (!chat.users)
                return console.log("chat.users not defined");
            /*   chat.users.forEach((user: any) => {
                if (user._id == newMessageRecieved.sender._id) return;
                socket.to(chat._id).emit("new-message", newMessageRecieved);
              }); */
        }));
        sub.subscribe("MESSAGEOBJECT");
        sub.on("message", (channel, msg) => {
            if (channel === "MESSAGEOBJECT") {
                const msgObj = JSON.parse(msg);
                socket.emit("new-message", msgObj);
            }
        });
    });
};
exports.default = SocketFun;
/*


/*  Trash, dont look here


 class SocketService {
  private _io: Server;

  constructor() {
    console.log('Init Socket Service...');
    this._io = new Server({
      pingTimeout: 60000,
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    })
    sub.subscribe("MESSAGEOBJECT");
  }

  public initListeners() {
    const io = this._io;
    console.log("Init Socket Listeners...");
    io.on("connect", (socket) => {
      console.log('new socket connected with ID', socket.id);


      socket.on("new-message", async (newMessageRecieved: chatObj) => {
        var chat: chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        await pub.publish("MESSAGEOBJECT", JSON.stringify(newMessageRecieved))
        chat.users.forEach((user: users) => {
          if (user._id == newMessageRecieved.sender._id) return;
          console.log(chat._id);
          this._io.to(chat._id).emit("new-message", newMessageRecieved);
        });
      });

      /*    sub.on("message", (channel, msg) => {
           if (channel === 'MESSAGEOBJECT') {
             const msgObj: chatObj = JSON.parse(msg)
             msgObj.chat.users.forEach((user: any) => {
               if (msgObj.sender == user._id) return;
               console.log("message from redis", msgObj.content);
               socket.emit("new-message", msg);
             })
           }
         }) */
//  })
/*   }
  get io() {
    return this._io;
  } */
//}
