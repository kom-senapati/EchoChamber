import Redis from "ioredis";
import "dotenv/config"

type users = {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type chat = {
  _id: string;
  users: users[];
  chatName: string;
};

type chatObj = {
  sender: users;
  content: string;
  chat: chat;
};

const pub = new Redis({
  host: "redis-361e97a7-ebuthor-87b8.a.aivencloud.com",
  port: 15563,
  username: "default",
  password: "AVNS_Y--CCv6Ti3EQ_iBPrQ-",
});

const sub = new Redis({
  host: "redis-361e97a7-ebuthor-87b8.a.aivencloud.com",
  port: 15563,
  username: "default",
  password: "AVNS_Y--CCv6Ti3EQ_iBPrQ-",
});



const SocketFun = (io: any) => {


  io.on("connection", (socket: any) => {
    /*     console.log('socket io connected --->', socket.id);
     */

    socket.on("join-chat", (room: string) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

    socket.on("new-message", async (newMessageRecieved: chatObj) => {

      await pub.publish("MESSAGEOBJECT", JSON.stringify(newMessageRecieved));
      var chat = newMessageRecieved.chat;
      if (!chat.users) return console.log("chat.users not defined");
      /*   chat.users.forEach((user: any) => {
          if (user._id == newMessageRecieved.sender._id) return;
          socket.to(chat._id).emit("new-message", newMessageRecieved);
        }); */
    });


    sub.subscribe("MESSAGEOBJECT");


    sub.on("message", (channel, msg) => {
      if (channel === "MESSAGEOBJECT") {
        const msgObj: chatObj = JSON.parse(msg);
        socket.emit("new-message", msgObj)
      }
    });
  });
};

export default SocketFun;


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
