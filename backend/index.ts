import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import 'dotenv/config';
import cors from "cors"
import userRoute from "./routes/userRoute"
import messageRoute from "./routes/messageRoute"
import chatRoute from "./routes/chatRoute"
import { Server } from "socket.io"

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use('/user', userRoute);
app.use('/message', messageRoute)
app.use('/chat', chatRoute)

if (process.env.db) {
  console.log(process.env.db);

  mongoose.connect(process.env.db, { dbName: "chat" } as ConnectOptions)
  console.log('succesfully connected to gb')
} else {
  console.log('cant connect to db');
}

const server = app.listen(PORT, () => console.log(`connected to ${PORT}`));
const io = new Server(server, {
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
    console.log(newMessageRecieved)
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.to(chat._id).emit("new-message", newMessageRecieved);
    });
  });

})


